const fs = require('fs'),
  path = require('path'),
  chalk = require('chalk'),
  makeDir = require('make-dir'),
  pump = require('pump'),
  compressing = require('compressing');

async function zipTmp() {
  const tplTypePath = path.join(__dirname, `../tmp/`);
  const data = await fs.readdirSync(tplTypePath)
  const tplList = data
    .filter(item => item.includes('-tmp'))
  tplList.forEach(async (tpl) => {
    const tplData = await fs.readdirSync(path.join(__dirname, `../tmp/${tpl}/`))
    tplData
      .filter(item => {
        // 过滤.zip .XX等临时文件
        return !item.startsWith('.') && !item.includes('.zip')
      })
    .forEach(async item => {
      const itemPath = path.join(__dirname, `../tmp/${tpl}/${item}`)
      const itemData = await fs.readdirSync(itemPath)
      const zipStream = new compressing.zip.Stream();
      // 过滤掉node_modules
      itemData
        .filter(itemFile => {
          return !itemFile.includes('node_modules')
        })
        .forEach(itemFile => {
          zipStream.addEntry(`${itemPath}/${itemFile}`);
        })

      const destStream = fs.createWriteStream(`${itemPath}.zip`);

      pump(zipStream, destStream, (err) => {
        err && console.log(err)
      });
    })

    setTimeout(() => {
      process.exit()
    }, 3000);
  })
}

zipTmp()
