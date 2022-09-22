import open from "open";
import fse from "fs-extra";
import inquirer from "inquirer";
import _ from "lodash";
import xlsx from "xlsx";
import getConfig from "../../utils/getConfig";
import logger from "../../utils/logger";
import { I18N, getI18nExportFile, getI18nFile } from "../../utils/i18n";

const STRING_NOT_TRANSLATED = "__STRING_NOT_TRANSLATED__";

function getSheetData(result: any, languages: any) {
  const i18nCodes = Array.from(
    new Set(
      Object.values(result)
        .map((lang: any) => Object.keys(lang))
        .flat(Infinity)
    )
  );

  return i18nCodes.map((code: any) => {
    const itemJson = {
      code,
    } as any;
    languages.forEach((lang: any) => {
      // @ts-ignore
      const langName = I18N[lang].name;
      const langText = result[lang][code];
      itemJson[langName] = langText;
    });

    return itemJson;
  });
}

async function exportExcel(sheetData: any, exportPath: string) {
  sheetData = _.sortBy(sheetData, ["code"]);

  const wb = xlsx.utils.book_new();
  const wx = xlsx.utils.json_to_sheet(sheetData);

  xlsx.utils.book_append_sheet(wb, wx, "导出");
  // @ts-ignore
  xlsx.writeFileAsync(exportPath, wb, () => {
    inquirer
      .prompt([
        {
          type: "confirm",
          name: "openFile",
          message: "Do you want to open the generated file?",
          default: false,
        },
        {
          type: "confirm",
          name: "openBrowser",
          message: "Do you want to open the localize website?",
          default: false,
        },
        {
          type: "list",
          name: "localizeUrl",
          message: "What kind of localize website do you want?",
          choices: ["Daily", "Pre"],
          filter: function(input: string) {
            switch (input) {
              case "Daily":
                return "https://xxxxxx/apply-language/5001?type=2&moduleType=3";

              case "Pre":
                return "https://xxxxxx/apply-language/5001?type=2&moduleType=3";

              default:
                return "https://xxxxxx/apply-language/5001?type=2&moduleType=3";
            }
          },
          when(answers: any) {
            return answers.openBrowser;
          },
        },
      ])
      .then(async (answers: any) => {
        if (answers.openFile) {
          await open(exportPath);

          console.log("打开 Excel 文件成功");
        }

        if (answers.openBrowser) {
          await open(answers.localizeUrl, { app: { name: "google chrome" } });

          console.log("打开浏览器成功");
        }

        logger.info(`Export path ${exportPath}`);
      });
  });
}

async function i18nextExport(options: { all: boolean; merge: boolean }) {
  const result = {} as any;
  const {
    i18n: { languages },
  } = await getConfig();
  const pickedI18n = languages.reduce((acc: any, lang: any) => {
    // @ts-ignore
    acc[lang] = I18N[lang];
    return acc;
  }, {});

  for (const code of languages) {
    try {
      const data = await fse.readJson(getI18nFile(code));
      result[code] = data;
    } catch (e) {
      logger.error(e);
    }
  }

  let sheetData = getSheetData(result, languages) as any;

  sheetData = sheetData.filter((data: any) => {
    if (options.all) {
      return true;
    }

    let needTranslated = false;
    for (const item in pickedI18n) {
      // @ts-ignore
      const name = pickedI18n[item].name;
      if (data[name] === STRING_NOT_TRANSLATED || !data[name]) {
        console.log(`待翻译字段：${data.code} - ${name}`);
        needTranslated = true;
        break;
      }
    }

    return needTranslated;
  });

  if (sheetData.length === 0) {
    logger.warn("暂无数据");
    return;
  }

  const i18nExportFile = await getI18nExportFile();

  try {
    await fse.remove(i18nExportFile);
  } catch (e) {
    logger.error(e);
    return;
  }

  exportExcel(sheetData, i18nExportFile);
  return;
}

export default i18nextExport;
