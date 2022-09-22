import fse from 'fs-extra'
import logger from '../../utils/logger'
import getConfig from '../../utils/getConfig'
import {
  I18N,
  getI18nExportFile,
  getI18nExportFileSheetData,
  writeI18nJson,
	readI18nJsonData,
} from '../../utils/i18n'

interface Params {
	path?: string
}

async function i18nextImport({ path: importPath }: Params = {}) {
  const i18nExportFile = importPath || getI18nExportFile()
  const sheetData = getI18nExportFileSheetData(i18nExportFile)
	const { i18n: { languages } } = await getConfig()
  const data = await readI18nJsonData()

  sheetData.forEach((item) => {
    for (const code of languages) {
			// @ts-ignore
      data[code][item.code] = item[I18N[code].name]
    }
  })

  for (const code in data) {
    try {
      await writeI18nJson(code, data[code])
    } catch (e) {
      logger.error(e)

      return
    }
  }

  logger.info(`导入 ${i18nExportFile} 成功`)
}

export default i18nextImport
