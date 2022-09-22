import { getI18nFile, writeI18nJson } from "../../../utils/i18n";
import fs from "fs-extra";

async function i18nextSort(codes: string[]) {
  for (const code of codes) {
    try {
      const fileName = await getI18nFile(code);
      const data = await fs.readJson(fileName);
      await writeI18nJson(code, data);
    } catch (e) {
      console.error(e);
      return;
    }
  }

  console.log("多语言格式化成功");
}

export default i18nextSort;
