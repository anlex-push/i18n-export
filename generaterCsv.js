const fs = require('fs');
const { languages } = require('./config');
const { readJsonFile } = require('./util');
const { stringify } = require("csv-stringify");


// 编辑好相应的描述后，再生成csv文件，交付翻译
function generaterCsv() {
    const columns = {
        id: "Message ID",
        defaultMessage: "Default Message",
        description: "Description",
    };

    // 读取i8n中的所有配置json文件
    const record = {};
    languages.forEach((item, index) => {
        record[item] = readJsonFile(`./i18n/${item}.json`);
        columns[item] = item;
    });

    // 读取编辑好的message.json文件
    const messageData = readJsonFile('./message.json');

    const data = [];
    for (const key in messageData) {
        if (Object.prototype.hasOwnProperty.call(messageData, key)) {
            const el = messageData[key];
            const rowData = {
                id: key,
                defaultMessage: el.defaultMessage,
                description: el.description,
            };
            languages.forEach((lang) => {
                rowData[lang] = record[lang][key] ?? '';
            });
            data.push(rowData);
        }
    }


    stringify(data, { header: true, columns }, function (err, output) {
        fs.writeFileSync("./output/messages.csv", output);
        console.log('已生成最新csv文件，文件位于/output/messages.csv');
        console.log('上传文件到Google文档,共享访问连接，在config中配置地址，翻译完成后，执行npm run stepThree 生成最新的JSON多语言文件');
    });
}

generaterCsv();
