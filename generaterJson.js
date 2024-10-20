const { execSync } = require('child_process');
const { parse } = require("csv-parse/sync");
const fs = require('fs');
const { sheetLink } = require('./config');

execSync(`curl -L ${sheetLink}/export?format=csv -o ./temp/messageTemp.csv`, {
    stdio: 'ignore'
});

const input = fs.readFileSync("./temp/messageTemp.csv");

const data = parse(input, { columns: true });

const zhCNBundle = {};
const enUSBundle = {};

data.forEach(item => {
    const keys = Object.keys(item);
    const key = item[keys[0]];
    const valueZhCN = item[keys[3]];
    const valueEnUS = item[keys[4]];

    zhCNBundle[key] = valueZhCN;
    enUSBundle[key] = valueEnUS;
})

// console.log(zhCNBundle);
// console.log(enUSBundle);

fs.writeFileSync('./output/zh-CN.json', JSON.stringify(zhCNBundle, null, 2));
fs.writeFileSync('./output/en-US.json', JSON.stringify(enUSBundle, null, 2));

console.log('您已成功生成对应最新的JSON文件，拷贝到您的项目中使用吧。。。');