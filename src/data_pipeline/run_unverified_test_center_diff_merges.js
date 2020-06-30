/*
This script is intended to be run on startup of our APIDockerfile. It's called from the dockerfile's ENTRYPOINT,
via entrypoint.sh.

The script is comparable to a database seed operation, and seeds the UnverifiedTestCenters table with new data. 
The data originally comes from a variety of sources, is dumped to CSV files, and merged to the system using the cmd_load_new_test_centers.py tool.

The seed process in this script does the following:
1. It loads the CHRONOLOGICAL_DIFF_KEYS JSON object
2. It checks against the UnverDiff database table. If any of the keys aren't present in the database, those keys will be processed, in order.
3. To process a key, a 'diff' file is downloaded from S3. The file contains prepared objects to be inserted into the UnverifiedTestCenters table.
4. The objects are inserted into the database. This process repeats for each new key. If any key fails, the process terminates and the deployment fails.

Deployment failure due to this process should be fatal. The quick fix is to remove the aggrevating key from the CHRONOLOGICAL_DIFF_KEYS file.

*/

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

const path = require('path');
const MODELS_DIR = path.join(__dirname, '../server/db', 'models')
const db = require(MODELS_DIR)
const { Op } = require('sequelize')
const awsUtils = require('./node_helpers/awsUtils')
const fileUtils = require('./node_helpers/fileUtils')

// Order of CHRONOLOGICAL_S3_DIFF_KEYS array must be preserved.
// If keys are run out-of-order, different results may be produced in our database.
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

async function runDiffInstallationTransaction(unverDiffKey, diffObj){
    const result = await db.sequelize.transaction(async (t) => {

        let testCenterRows = diffObj['post_processing_stats']['unmatched_rows'];
        let processedRows = diffObj['processed_rows'];

        const unverifiedTestCenterPromises = testCenterRows.map(async testCenter => {
            const testCenterSubmission = await insertUnverifiedTestCenter(testCenter, t);
            return testCenterSubmission;
        });

        const updatePromises = processedRows.map(async testCenter => {
            if(testCenter.matches && testCenter.matches.length > 0 && testCenter.matches[0].proposed_updates){
                const testCenterUpdate = await patchUnverifiedTestCenter(testCenter.matches[0].unverified_row_id, testCenter.matches[0].proposed_updates, t)
                return testCenterUpdate;
            }

            return null;
        });

        const unverifiedSubmissionStatus = await Promise.all(unverifiedTestCenterPromises);
        const updateStatuses = await Promise.all(updatePromises);
        const unverDiffStatus = await insertUnverDiff(unverDiffKey, t);
        
        return unverDiffStatus;
    });
    return result;
}

async function patchUnverifiedTestCenter(unverifiedTestCenterID, proposedUpdates, transaction){
    const updates = await db.UnverifiedTestCenter.update(proposedUpdates, { where: { id: unverifiedTestCenterID }, transaction: transaction })
    return updates;
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

// Sequence of diff application is important. Order of original list must be preserved.
// If a failure occurs, halt in place.
async function handleAllNewDiffsSequentially(newDiffKeysArr){
    for(let i = 0; i < newDiffKeysArr.length; i++){
        const unverDiffKey = newDiffKeysArr[i];

        try{
            const diffObj = await awsUtils.loadNewDiffFromS3(unverDiffKey);
            const diffBody = JSON.parse(diffObj['Body']);

            const diffInsertStatus = await runDiffInstallationTransaction(unverDiffKey, diffBody);
        }
        catch(err){
            console.log('Failure processing diff with key: ', unverDiffKey, '. This diff and any diffs after this one in the CHRONOLOGICAL_S3_DIFF_KEYS array have not been uploaded.');
            throw err;
        }
    }
}

async function checkAndLoadUnverifiedDiffs(){
    console.log('DB MODELS DIR: ', MODELS_DIR);

    let diffFile = await fileUtils.loadDiffFile();

    let priorDiffs = await loadPriorDiffs();
    console.log('# of diffs already run on current system: ', priorDiffs.length);
    console.log('all prior diffs: ', priorDiffs);

    let newDiffs = await identifyNewDiffs(diffFile, priorDiffs);
    console.log('new Diffs: ', newDiffs);
    
    let status = await handleAllNewDiffsSequentially(newDiffs);
    return status;
}

if(process.env.NODE_ENV === 'development' && process.env.AWS_ACCESS_KEY_ID === ''){
    console.log('Skipping UnverDiff merge process. To run this procedure, load AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY into your local environment.')
} else {
    checkAndLoadUnverifiedDiffs();
}