import axios from "axios";
import getConfig from "../../utils/getConfig";
import _ from "lodash";
import fse from "fs-extra";
import path from "path";
import sortJson from "sort-json";

type Item = {
  code: string;
  displays: Array<{
    value: string;
    localeId: string;
  }>;
};

const STRING_NOT_TRANSLATED = "__STRING_NOT_TRANSLATED__";

let debug = 1;

async function pullLocalize({ env }: { env: string }) {
  const {
    i18n: { appId, languages, dir },
  } = await getConfig();

  await Promise.all(
    languages.map((lang) => {
      return fetchLang({ lang, appId, env, dir });
    })
  );
}

async function fetchLang({
  lang,
  appId,
  env,
  dir,
}: {
  lang: string;
  appId: string;
  env: string;
  dir?: string;
}) {
  const url = `${
    env === "daily"
      ? "https://xxxxxx/apply-language/5001?type=2&moduleType=3"
      : "https://xxxxxx/apply-language/5001?type=2&moduleType=3"
  }/global/api/getI18nData`;
  const response = await axios.request({
    method: "GET",
    url,
    headers: {
      "x-cache-clear": true,
    },
    params: {
      moduleName: "FE-WEB应用",
      version: "",
      lang,
      bizId: appId,
    },
  });

  if (debug === 1) {
    console.log(response.request.headers);
    debug = 2;
  }

  if (response.data.status !== "ok") {
    return Promise.reject(_.pick(response, ["config", "data"]));
  }

  const result = {} as Record<string, Record<string, string>>;

  if (response.data.result && Array.isArray(response.data.result.items)) {
    const originalItems = response.data.result.items as Item[];
    const filterItems = originalItems.filter(
      (item) =>
        !item.displays.find(
          (display) => display.value === STRING_NOT_TRANSLATED
        )
    );
    filterItems.forEach((item) => {
      if (Array.isArray(item.displays)) {
        item.displays.forEach(({ localeId, value }) => {
          if (Object.prototype.hasOwnProperty.call(result, localeId)) {
            result[localeId][item.code] = value;
          } else {
            result[localeId] = {
              [item.code]: value,
            };
          }
        });
      }
    });
  }

  const data = lang === "zh" ? result["zh-Hans"] : result[lang];

  const dirPath = path.resolve(`${process.cwd()}${dir}${lang}/`);
  try {
    await fse.mkdir(dirPath);
  } catch (err) {}

  try {
    const filePath = path.resolve(
      `${process.cwd()}${dir}${lang}/translation.json`
    );
    await fse.writeJson(filePath, sortJson(data), {
      spaces: 2,
    });
  } catch (err) {
    console.log(err);
    console.log(data);
    console.log("****", lang);
    process.exit();
  }
}

export default pullLocalize;
