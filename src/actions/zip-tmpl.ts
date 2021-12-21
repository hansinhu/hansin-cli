const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const makeDir = require('make-dir')
const pump = require('pump')
const compressing = require('compressing')

async function zipTmp() {
  const tplTypePath = path.join(__dirname, '../tmp/')
  const data = await fs.readdirSync(tplTypePath)
  const tplList = data
    .filter((item: string | string[]) => item.includes('-tmp'))
  tplList.forEach(async (tpl: any) => {
    const tplData = await fs.readdirSync(path.join(__dirname, `../tmp/${tpl}/`))
    tplData
      .filter((item: string) => {
        // 过滤.zip .XX等临时文件
        return !item.startsWith('.') && !item.includes('.zip')
      })
      .forEach(async (item: any) => {
        const itemPath = path.join(__dirname, `../tmp/${tpl}/${item}`)
        const itemData = await fs.readdirSync(itemPath)
        const zipStream = new compressing.zip.Stream()
        // 过滤掉node_modules
        itemData
          .filter((itemFile: string | string[]) => {
            return !itemFile.includes('node_modules')
          })
          .forEach((itemFile: any) => {
            zipStream.addEntry(`${itemPath}/${itemFile}`)
          })

        const destStream = fs.createWriteStream(`${itemPath}.zip`)

        pump(zipStream, destStream, (err: any) => {
          err && console.log(err)
        })
      })

    setTimeout(() => {
      process.exit()
    }, 3000)
  })
}

zipTmp()
