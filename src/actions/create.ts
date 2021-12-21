import path from 'path'
import chalk from 'chalk'
// const consolidate = require('consolidate');
import { exec } from 'child_process'
import { promises as fs } from 'fs'
import { IAppType, getTmplGitUrl } from '../helpers/app-type'
import clone from 'git-clone/promise'
import rimraf from 'rimraf'

export interface CreateAppParams {
  appType: IAppType
  appPath: string
  appName: string
  opts?: Record<string, string>
}

async function createApp({ appType, appPath, appName, opts = {} }: CreateAppParams) {
  const { frame, install } = opts
  const { tmplName, gitUrl } = getTmplGitUrl(appType, opts)

  // clone 模板项目
  await clone(gitUrl, appPath)
  // 删除git配置
  rimraf.sync(`${appPath}/.git`)

  const tplPath = path.join(__dirname, `../tmp/${appType}-tmp`)
  let tplName = ''
  if (appType === 'component') {
    tplName = `${frame}`
  } else {
    tplName = `${frame}`
  }

  // 解压到目标路径
  // let zip = new AdmZip(path.join(tplPath, `${tplName}.zip`));
  // zip.extractAllTo(appPath, true);
  // 重命名项目
  // await fs.rename(path.resolve(`.${tplName}`), path.resolve(appName))

  // package.json数据填充
  // const packageContent = await consolidate.ejs(path.join(root, 'package.json'), {
  //   name: appName,
  // })
  // await fs.writeFile(path.join(root, 'package.json'), packageContent);

  const packageContent = await fs.readFile(path.join(appPath, 'package.json'), 'utf-8')
  await fs.writeFile(path.join(appPath, 'package.json'), packageContent.replace(tmplName, appName), 'utf-8')

  if (install) {
    // npm 包安装
    console.log(chalk.green('begin to install packages, please wait ...'))
    exec(
      'npm i',
      {
        cwd: appPath,
      },
      (err: any) => {
        if (err) {
          console.log(chalk.red('install packages failed.'))
        } else {
          console.log(chalk.green('All packages are installed.Have fun with coding.'))
        }
      },
    )
  }
}

export { createApp }
