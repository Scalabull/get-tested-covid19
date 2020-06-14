const AWS = require('aws-sdk');
AWS.config.logger = console;

if(process.env.AWS_CONTAINER_CREDENTIALS_RELATIVE_URI || process.env.AWS_CONTAINER_CREDENTIALS_FULL_URI){
    AWS.config.credentials = new AWS.ECSCredentials({
        httpOptions: { timeout: 5000 },
        maxRetries: 3,
        retryDelayOptions: { base: 200 }
    });
}

async function loadNewDiffFromS3(diffS3Key){
    const s3 = new AWS.S3();

    const params = {
        Bucket: 'staging-gtc-data-batches',
        Key: 'unver-staged-jobs/' + diffS3Key
    }

    console.log('Getting diff with s3 params: ', JSON.stringify(params))
    const diff = await s3.getObject(params).promise();
    return diff;
}

module.exports = {
    loadNewDiffFromS3
}