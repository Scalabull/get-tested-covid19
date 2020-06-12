const fs = require('fs').promises;
const path = require('path');
const S3_UNVER_DIFFS_PATH = path.join(__dirname, '..', 'CHRONOLOGICAL_DIFF_KEYS.json');

async function loadDiffFile(){
    const file = await fs.readFile(S3_UNVER_DIFFS_PATH);
    const jsonData = JSON.parse(file);
    return jsonData;
}

module.exports = {
    loadDiffFile
}