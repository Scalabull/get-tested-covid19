const path = require('path');
const MODELS_DIR = path.join(__dirname, '../', 'models')
const db = require(MODELS_DIR)
const { Op } = require('sequelize')
const fs = require('fs').promises;
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const S3_UNVER_DIFFS_PATH = path.join(__dirname, '../../../', 'unver_s3_diffs.json');

/*
NOTE to devs: In order to test this file locally, you must:
1. Have an AWS account with our organization with sufficient permissions set up on your local machine.
2. You must manually load these AWS credentials into your shell before launching 'docker-compose up'.

export AWS_ACCESS_KEY_ID=$(aws --profile default configure get aws_access_key_id)
export AWS_SECRET_ACCESS_KEY=$(aws --profile default configure get aws_secret_access_key)

(replace 'default' with whichever profile from ~/.aws/profiles you want to use)

3. You should run this script thru docker-compose. e.g. :
docker-compose exec api sh
node run_unverified_test_center_diff_merges.js

It is not recommended to run this code locally unless you are developing a new feature that requires it.
*/

async function checkAWSAccount(callback){
    const sts = new AWS.STS();
    const ident = await sts.getCallerIdentity({}).promise();
    return ident;
}

function getSetDifference(setA, setB) {
    let _difference = new Set(setA)
    for (let elem of setB) {
        _difference.delete(elem)
    }
    return _difference
}

async function loadDiffFile(){
    const file = await fs.readFile(S3_UNVER_DIFFS_PATH);
    const jsonData = JSON.parse(file);
    return jsonData;
}

// TODO: confirm set difference logic works properly.
async function identifyNewDiffs(diffObj){
    let pendingDiffs = diffObj.S3_DIFF_KEYS;

    const unverDiffRecords = await db.UnverDiff.findAll({});
    console.log('# of diffs loaded from UnverDiffs table: ', unverDiffRecords.length)

    const mappedDiffRecords = unverDiffRecords.map((diff) => {
        return diff.diff_s3_url
    });
    let mappedDiffSet = new Set(mappedDiffRecords);
    let pendingDiffSet = new Set(pendingDiffs)

    let newDiffs = getSetDifference(pendingDiffSet, mappedDiffSet);
    let diffArr = Array.from(newDiffs);
    return diffArr;
}


async function loadNewDiffFromS3(diffS3Key){
    // load object from S3
    const params = {
        Bucket: 'staging-gtc-data-batches',
        Key: 'unver-staged-jobs/' + diffS3Key
    }
    const diff = await s3.getObject(params).promise();
    return diff;
}

async function runDiffInstallationTransaction(unverDiffKey, diffObj){
    const result = await db.sequelize.transaction(async (t) => {

        let testCenterRows = diffObj['post_processing_stats']['unmatched_rows'];
        const unverifiedTestCenterPromises = testCenterRows.map(async testCenter => {
            const testCenterSubmission = await insertUnverifiedTestCenter(testCenter, t);
            return testCenterSubmission;
        });

        const unverifiedSubmissionStatus = await Promise.all(unverifiedTestCenterPromises);
        const unverDiffStatus = await insertUnverDiff(unverDiffKey, t);
        
        return unverDiffStatus;
    });
    return result;
}

async function insertUnverifiedTestCenter(testCenterObj, transaction){
    const { staging_row_id, google_place_id } = testCenterObj

    if (!((staging_row_id === 0 || staging_row_id) && google_place_id)) {
      throw new Error('staging_row_id and google_place_id must both be provided.');
    }

    const testCenterMatch = await db.UnverifiedTestCenter.findOne(
    { where: 
        {
          [Op.or]: [
            { staging_row_id },
            { google_place_id }
          ]
        } 
    }, { transaction: transaction });

    if(testCenterMatch) {
      throw new Error('This row is a duplicate of an existing Unverified test center row');
    }

    const testCenter = await db.UnverifiedTestCenter.create(testCenterObj, { transaction: transaction })
    return testCenter;
}

async function insertUnverDiff(unverDiffKey, transaction){
    let unverDiffObj = {
        diff_s3_url: unverDiffKey
    };
    const unverDiff = await db.UnverDiff.create(unverDiffObj, { transaction: transaction })
    return unverDiff;
}

// TODO: determine protocol for handling failures.
async function handleAllNewDiffs(newDiffKeysArr){
    for(let i = 0; i < newDiffKeysArr.length; i++){
        const unverDiffKey = newDiffKeysArr[i];
        const diffObj = await loadNewDiffFromS3(unverDiffKey);
        const diffBody = JSON.parse(diffObj['Body']);
        console.log(JSON.stringify(diffBody, null, '\t'));

        const diffInsertStatus = await runDiffInstallationTransaction(unverDiffKey, diffBody);
    }
}

async function checkAndLoadUnverifiedDiffs(){
    const ident = await checkAWSAccount();
    console.log('AWS ident loaded: ', ident);
    console.log('DB MODELS DIR: ', MODELS_DIR);

    diffObj = await loadDiffFile();
    console.log('diffObj: ', diffObj);

    newDiffs = await identifyNewDiffs(diffObj);
    console.log('new Diffs: ', newDiffs);
    
    status = await handleAllNewDiffs(newDiffs);
}

checkAndLoadUnverifiedDiffs();
