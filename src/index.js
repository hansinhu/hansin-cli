#!/usr/bin/env node
const {createApp} = require('./actions')
const chalk = require('chalk')
const path = require('path')
const prompts = require('prompts')
const Commander = require('commander')
const packageJson = require('../package.json')
const helpers = require('./helpers')

let appType, appName, appPath, appFrame = ''
let appInstall = false

const appList = helpers.appList

// hansin new <app-type> <app-name>
const program = Commander
  .version(packageJson.version)
  .option('new <app-type> <app-name>', '创建项目')
  .option('-i, --install', '创建项目后执行 npm install')
  .action((commander) => {
    ({ type: appType, name: appName } = commander);
  })
  .allowUnknownOption()
  .parse(process.argv)

// 解析项目类型与名称
const processArgs = process.argv.slice(2)
if (processArgs && processArgs[0] === 'new') {
  if (processArgs[1]) {
    appType = processArgs[1]
  }
  if (processArgs[2]) {
    appName = processArgs[2]
  }
}
// 解析是否自动安装
if (processArgs.includes('-i')) {
  appInstall = true
}

async function main() {
  if (typeof program.name === 'string') {
    appName = program.name.trim()
  }

  // 项目类型校验：node/web
  const {valid: validType, problems: typeProblems} = helpers.validateAppType(appType)

  if (!appType || !validType) {
    console.log(chalk.yellow(typeProblems.join("\n"))) // 如果项目类型校验不通过，给出提示
    console.log(chalk.green('Please specify the project type（项目类型）:'))
    const res = await prompts({
      type: 'select',
      name: 'type',
      message: 'Pick project type: ',
      choices: appList,
    })

    appType = res.type
  }

  // 项目名称格式及存在校验:
  const {valid: validName, problems: nameProblems} = helpers.validateAppName(appName)

  if (!appName || !validName) {
    if (appName && nameProblems && nameProblems.length) {
      console.log(chalk.yellow(nameProblems.join("\n"))) // 如果项目名称校验不通过，给出提示
    }

    console.log('Please input the project name (项目名称):')
    const res = await prompts({
      type: 'text',
      name: 'name',
      message: 'What is your project name?',
      initial: 'my_app',
      validate: name => {
        // 名称校验
        const validation = helpers.validateAppName(path.basename(path.resolve(name)))
        if (validation.valid) {
          return true
        }
        return 'Invalid project name: ' + validation.problems[0] || ''
      },
    })

    appName = res.name
  }

  const frameRes = await prompts({
    type: 'select',
    name: 'frame',
    message: 'choose your front-end frame:',
    choices: [
      {title: 'react', value: 'react', description: '选用React'},
      {title: 'vue', value: 'vue', description: '选用Vue'},
    ],
  })
  appFrame = frameRes.frame;

  appPath = path.resolve(appName)

  console.log()
  console.log(
    `Will Create App:
      ${chalk.cyan('项目类型：')} ${chalk.green(appType)}
      ${chalk.cyan('项目名称：')} ${chalk.green(appName)}
      ${chalk.cyan('项目目录：')} ${chalk.green(appPath)}
      ${chalk.cyan('前端框架：')} ${chalk.green(appFrame)}
    `
  )

  await createApp({
    appType,
    appPath,
    appName,
    appFrame,
    appInstall,
  })
}

main()
  .then((res) => {

  })
  .catch(err => {
    console.log()
    console.log('Aborting installation.')
    if (err.command) {
      console.log(`  ${chalk.cyan(err.command)} has failed.`)
    } else {
      console.log(chalk.red('Unexpected error. Please report it as a bug:'))
      console.log(err)
    }
    console.log()
    process.exit(1)
  })
