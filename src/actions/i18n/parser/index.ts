import sortJson from "sort-json";
import i18nextSort from "./i18next-sort";
import { spawn } from "child_process";
import path, { dirname } from "path";
import inquirer from "inquirer";
import shell from "shelljs";
import { fileURLToPath } from "url";
import getConfig from "../../../utils/getConfig";
import getNoUseKeys from "./get-no-use-keys";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function i18nextParser(options: any, command: any) {
  console.log(options, command);
  if (!shell.which("i18next")) {
    console.log("首先需要全局安装 i18next-parser 才能执行这个命令");

    inquirer
      .prompt([
        {
          type: "list",
          name: "package",
          message: "What package management tool do you like?",
          choices: ["yarn", "npm"],
        },
      ])
      .then((answers: any) => {
        const useYarn = answers.package === "yarn";

        let cmd;
        let args;

        if (useYarn) {
          cmd = "yarn";
          args = ["global", "add", "i18next-parser"];
        } else {
          cmd = "npm";
          args = ["i", "-g", "i18next-parser"];
        }

        spawn(cmd, args, { stdio: "inherit" });
      });
  } else {
    const config = await getConfig();
    const args = [];

    args.push(
      "--config",
      `${path.resolve(__dirname, "../../../../i18next-parser.config.cjs")}`
    );

    const parserOutput = config.i18n.parserOutput;
    // 生成新json，而不是追加到原有json，用于对比哪些 key 不用了
    if (options.peer) {
      args.push("--output", parserOutput.replace(".json", ".peer.json"));
    } else {
      args.push("--output", parserOutput);
    }

    console.log("parser args:");
    console.log(args);

    // 执行 i18next parser
    const i18next = spawn("i18next", args, {
      stdio: "inherit",
    });

    //
    i18next.on("close", () => {
      // json 排序
      i18nextSort(["zh", "en"]);

      if (options.peer) {
        getNoUseKeys();
      }
    });
  }
}

export default i18nextParser;
