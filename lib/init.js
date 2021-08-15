// 交互式命令行
const inquirer = require('inquirer')
// 修改控制台字符串的样式
const chalk = require('chalk')
const fs = require('fs')
const path = require('path');
// 进度转轮插件
const ora = require('ora')
// 读取根目录下的 template.json
const tplObj = require("./template")
// 下载
const download = require("download-git-repo");

const Utils = require('./util/utils');



module.exports = function (template,name) {
   // 自定义交互式命令行的问题及简单的校验
let question = [
  {
    name: "name",
    type: 'input',
    message: "Project name (" + name + ')',
    // validate (val) {
    //   if (val === '') {
    //     return 'Name is required!'
    //   } else if (tplObj[val]) {
    //     return 'Template has already existed!'
    //   } else {
    //     return true
    //   }
    // }
  },
  {
    name: "description",
    type: 'input',
    message: "Project description",
    validate (val) {
      if (val === '') {
        return 'Description is required!'
      } else {
        return true
      }
    }
  },
]


  inquirer
  .prompt(question).then(answers => {
    console.log(answers)
    // answers 就是用户输入的内容，是个对象
    let { name, url } = answers;
        // 出现加载图标
const spinner = ora("Downloading...");
spinner.start();
    let rootPath = path.join(process.cwd(), name);
    if (!fs.existsSync(rootPath)) {
      Utils.mkdirs(rootPath);
    }

    // // 过滤 unicode 字符
    // tplObj[name] = url.replace(/[\u0000-\u0019]/g, '')
    // // 把模板信息写入 template.json 文件中
    // fs.writeFile(`${__dirname}/../template.json`, JSON.stringify(tplObj), 'utf-8', err => {
    //   if (err) console.log(err)
    //   console.log('\n')
    //   console.log(chalk.green('Added successfully!\n'))
    //   console.log(chalk.grey('The latest template list is: \n'))
    //   console.log(tplObj)
    //   console.log('\n')
    // })
  })

// 执行下载方法并传入参数
// download (
//   url,
//   projectName,
//   err => {
//     if (err) {
//       spinner.fail();
//       console.log(chalk.red(`Generation failed. ${err}`))
//       return
//     }
//     // 结束加载图标
//     spinner.succeed();
//     console.log(chalk.green('\n Generation completed!'))
//     console.log('\n To get started')
//     console.log(`\n    cd ${projectName} \n`)
//   }
// )

};

  