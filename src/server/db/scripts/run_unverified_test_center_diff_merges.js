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

async function loadDiffFile(){
    const file = await fs.readFile(S3_UNVER_DIFFS_PATH);
    const jsonData = JSON.parse(file);
    return jsonData;
}

// NOTE: Order of CHRONOLOGICAL_S3_DIFF_KEYS array must be preserved.
async function identifyNewDiffs(diffObj, priorDiffs){
    let pendingDiffKeys = diffObj.CHRONOLOGICAL_S3_DIFF_KEYS;
    let newDiffKeys = [];

    let mappedDiffSet = new Set(priorDiffs);

    for(let i = 0; i < pendingDiffKeys.length; i++){
        const currDiffKey = pendingDiffKeys[i];
        if(!mappedDiffSet.has(currDiffKey)){
            newDiffKeys.push(pendingDiffKeys[i])
        }
    }

    return newDiffKeys;
}

async function loadPriorDiffs(){
    const unverDiffRecords = await db.UnverDiff.findAll({});
    const mappedDiffRecords = unverDiffRecords.map((diff) => {
        return diff.diff_s3_url
    });
    return mappedDiffRecords;
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

// NOTE: Sequence of diff application is crucial. Order of original list must be preserved.
// If a failure occurs, halt in place.
async function handleAllNewDiffsSequentially(newDiffKeysArr){
    for(let i = 0; i < newDiffKeysArr.length; i++){
        const unverDiffKey = newDiffKeysArr[i];

        try{
            const diffObj = await loadNewDiffFromS3(unverDiffKey);
            const diffBody = JSON.parse(diffObj['Body']);
            console.log(JSON.stringify(diffBody, null, '\t'));

            const diffInsertStatus = await runDiffInstallationTransaction(unverDiffKey, diffBody);
        }
        catch(err){
            console.log('Failure processing diff with key: ', unverDiffKey, '. This diff and any diffs after this one in the CHRONOLOGICAL_S3_DIFF_KEYS array have not been uploaded.');
            throw err;
        }
    }
}

async function checkAndLoadUnverifiedDiffs(){
    const ident = await checkAWSAccount();
    console.log('AWS ident loaded: ', ident);
    console.log('DB MODELS DIR: ', MODELS_DIR);

    let diffFile = await loadDiffFile();
    console.log('diff file: ', diffFile);

    let priorDiffs = await loadPriorDiffs();
    console.log('# of diffs already run on current system: ', priorDiffs.length);
    console.log('all prior diffs: ', priorDiffs);

    let newDiffs = await identifyNewDiffs(diffFile, priorDiffs);
    console.log('new Diffs: ', newDiffs);
    
    let status = await handleAllNewDiffsSequentially(newDiffs);
    return status;
}

checkAndLoadUnverifiedDiffs();
