const AWS = require('aws-sdk');

async function checkAWSAccount(callback){
    const sts = new AWS.STS();
    const ident = await sts.getCallerIdentity({}).promise();
    return ident;
}

async function loadNewDiffFromS3(diffS3Key){
    const s3 = new AWS.S3();
    
    const params = {
        Bucket: 'staging-gtc-data-batches',
        Key: 'unver-staged-jobs/' + diffS3Key
    }
    const diff = await s3.getObject(params).promise();
    return diff;
}

module.exports = {
    checkAWSAccount,
    loadNewDiffFromS3
}