# 第一步：生成message.json文件，保留旧的message.json中描述信息
如果你是重新开始使用，请先删除message.json文件，替换i18n文件夹里的文件，更新config中的language配置
之后只需更新i18n中的文件即可。
执行
```js
npm run stepOne
```

# 第二步：根据message.json文件和i18n中的json，生成csv文件
修改生成出来的message.json文件，添加或更新对应的描述信息，方便在后续文档中理解翻译
修改之后便执行命令
```js
npm run stepTwo
```
# 同步到在线excel编辑器
上传csv到google文档表格中，新创建的需要共享访问，后续方便直接根据地址下载并解析
创建好之后，将在线文档连接添加到config配置中，
链接形式如： https://docs.google.com/spreadsheets/d/【你的文档ID】
# 第三步： 交给产品经理翻译，完成后，下载后解析生成相应的i18n文件
当通知翻译完成之后，我们只需执行命令
```js
npm run stepThree
```
新生成的json文件就都在output中了，拷贝复制到项目中使用即可。
注意： 生成的文档是对所有的国际化文本进行编辑，拷贝到项目中注意查看变更，核实变动范围。
