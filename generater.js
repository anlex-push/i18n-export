const { languages } = require('./config');
const { readJsonFile } = require('./util');
const fs  = require('fs');

/**
 * 生成message.json文件
 */
function generater () {
    const bundleData = languages.map(item => {
        return readJsonFile(`./i18n/${item}.json`);
    });

    const msgData = readJsonFile('./message.json');

    // console.log(bundleData);

    const data = {};

    bundleData.forEach((item, index) => {
        for (const key in item) {
            if (Object.prototype.hasOwnProperty.call(item, key)) {
                if(!data[key]){
                    data[key] = {
                        defaultMessage: item[key],
                        description: msgData[key]?.description || '',
                    };
                }
            }
        }
    });

    fs.writeFileSync('./message.json',JSON.stringify(data));
    console.log('已成功生成message.json文件，检查核实信息，添加对应的描述信息，方便翻译理解');
}

generater();