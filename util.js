const fs = require('fs');

function readJsonFile(path) {
    let data = {};
    try {
        data = JSON.parse(fs.readFileSync(path));
    } catch (error) {
        console.log('文件解析出错啦~');
    }
    return data;
}

module.exports = {
    readJsonFile
};