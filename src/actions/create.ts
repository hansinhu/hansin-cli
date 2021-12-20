const AdmZip = require('adm-zip'),
  fs = require('fs').promises,
  makeDir = require('make-dir'),
  path = require('path'),
  chalk = require('chalk'),
  consolidate = require('consolidate');
const { exec } = require('child_process');

export interface CreateAppParams {
	appType: string;
	appPath: string;
	appName: string;
	opts?: Record<string, string>;
}

async function createApp({appType, appPath, appName, opts = {}}: CreateAppParams) {
	console.log('opts', opts)
	const { frame, install } = opts
  const root = path.resolve(appPath)
  const tplPath = path.join(__dirname, `../tmp/${appType}-tmp`);
  let tplName = ''
  if (appType === 'component') {
    tplName = `${frame}`
  } else {
    tplName = `${frame}`
  }
  
  await makeDir(root)

  // 解压到目标路径
  let zip = new AdmZip(path.join(tplPath, `${tplName}.zip`));
  zip.extractAllTo(root, true);
  // 重命名项目
  // await fs.rename(path.resolve(`.${tplName}`), path.resolve(appName))

  // package.json数据填充
  // const packageContent = await consolidate.ejs(path.join(root, 'package.json'), {
  //   name: appName,
  // })
  // await fs.writeFile(path.join(root, 'package.json'), packageContent);

  var packageContent = await fs.readFile(path.join(root, 'package.json'), 'utf-8');
  await fs.writeFile(
    path.join(root, 'package.json'),
    packageContent.replace(`${appType}-tmp-${tplName}`, appName),
    'utf-8'
  );

  if (install) {
    // npm 包安装
    console.log(chalk.green('begin to install packages, please wait ...'))
    exec('npm i', {
      cwd: root
    }, (err: any) => {
      if (err) {
        console.log(chalk.red('install packages failed.'))
      } else {
        console.log(chalk.green('All packages are installed.Have fun with coding.'))
      }
    })
  }
}

export {
	createApp
}