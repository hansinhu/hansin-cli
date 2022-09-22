import getConfig from "utils/getConfig";
import { readJsonData } from "utils/i18n";

async function getNoUseKeys() {
  const originData = await readJsonData("en");
  const currentData = await readJsonData("en", true);
  Object.entries(originData).forEach(([key]) => {
    if (!currentData[key]) {
      console.log(key);
    }
  });
}

export default getNoUseKeys;
