import fse from "fs-extra";
import xlsx from "xlsx";
import path from "path";
import os from "os";
import SortKeys from "sort-keys";
import filenamify from "filenamify";
import { getBranchNameSync } from "./getBranchName";
import getConfig from "./getConfig";
import logger from "./logger";

const cwd = process.cwd();

export const I18N = {
  zh: {
    code: "zh",
    name: "简体中文",
  },
  en: {
    code: "en",
    name: "英语",
  },
  ja: {
    code: "ja",
    name: "日语",
  },
  es: {
    code: "es",
    name: "西班牙语",
  },
  th: {
    code: "th",
    name: "泰语",
  },
};

const STRING_NOT_TRANSLATED = "__STRING_NOT_TRANSLATED__";

export async function getI18nExportFile() {
  const {
    i18n: { appId },
  } = await getConfig();
  return path.resolve(
    os.homedir(),
    "Downloads",
    `${appId}.${filenamify(getBranchNameSync())}.xlsx`
  );
}

export async function writeI18nJson(code: string, data: any) {
  const outFileName = await getI18nFile(code);
  return fse.writeJson(outFileName, SortKeys(data), {
    spaces: 2,
  });
}

export function getI18nExportFileSheetData(i18nExportFile: any) {
  const workbook = xlsx.readFile(i18nExportFile);
  const worksheet = workbook.Sheets["导出"];

  return xlsx.utils.sheet_to_json(worksheet);
}

export async function getI18nFile(code: string, peer?: boolean) {
  const {
    i18n: { dir },
  } = await getConfig();
  return `${cwd}${dir}${code}/translation${peer ? ".peer" : ""}.json`;
}

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

export const readI18nJsonData = async (
  peer?: boolean
): Promise<Record<string, string>> => {
  const result = {} as any;
  const {
    i18n: { languages },
  } = await getConfig();

  for (const code of languages) {
    try {
      const fileName = await getI18nFile(code, peer);
      const data = await fse.readJson(fileName);
      result[code] = data;
    } catch (e) {
      logger.error(e);
    }
  }
  return result;
};

export const readJsonData = async (
  code: string,
  peer?: boolean
): Promise<Record<string, string>> => {
  const fileName = await getI18nFile(code, peer);
  const data = await fse.readJson(fileName);
  return data;
};
