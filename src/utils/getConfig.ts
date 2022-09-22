import path from "path";
import { promises, existsSync } from "fs";

interface Config {
  libra: {};
  i18n: {
    appId: string;
    languages: string[];
    parserOutput: string;
    dir: string;
    dailyUrl: string;
    preUrl: string;
    prodUrl: string;
  };
}

type Item<T> = keyof T;

const getConfig = async () => {
  // 默认从package.json中读取appId
  const packagePath = path.resolve(process.cwd(), "package.json");
  const packageStr = await promises.readFile(packagePath, "utf-8");
  const packageObj = JSON.parse(packageStr);
  const defaultConfig: Config = {
    libra: {},
    i18n: {
      appId: packageObj.name,
      dir: "/client/static/locales/",
      dailyUrl:
        "https://xxxxxx/apply-language/5001?type=2&moduleType=3",
      preUrl:
        "https://xxxxxx/apply-language/5001?type=2&moduleType=3",
      prodUrl:
        "https://xxxxxx/apply-language/5001?type=2&moduleType=3",
      languages: ["en", "zh"],
      parserOutput: "client/static/locales/$LOCALE/$NAMESPACE.json",
    },
  };

  // 如果有tm.config.json，则覆盖默认配置
  let configObj = {} as Config;
  const configPath = path.resolve(process.cwd(), "tm.config.json");
  if (existsSync(configPath)) {
    const configStr = await promises.readFile(configPath, "utf-8");
    configObj = JSON.parse(configStr);
  }
  return Object.keys(configObj).reduce((acc: Config, cur) => {
    const cur2 = cur as Item<Config>;
    Object.keys(configObj[cur2]).forEach((key) => {
      const key2 = key as Item<Config[Item<Config>]>;
      acc[cur2][key2] = configObj[cur2][key2];
    });
    return acc;
  }, defaultConfig);
};

export default getConfig;
