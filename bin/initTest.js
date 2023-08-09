import ora from "ora";
import { error, checkProjectExists } from "../utils/helper.js";
import initRoot from "../template/root/index.js";
import initTypeScript from "../template/typescript/index.js";
import initCommitlint from "../template/commitlint/index.js";
import initEslint from "../template/eslint/index.js";
import initHusky from "../template/husky/index.js";
import initPrettier from "../template/prettier/index.js";
import initTest from "../template/test/index.js";
import initCI from "../template/ci/index.js";
import initManager from "../template/manager/index.js";

export function init(answers, projectName, cmdPath) {
  const spinner = ora(`Loading unicorns`).start();

  const { typescript, commitlint, test, husky, ci, prettier, eslint } = answers;

  // 运行命令
  if (!projectName) {
    error("error: js create need name");
    return;
  }
  // 检测目录存在
  if (checkProjectExists(cmdPath, projectName)) {
    error("error: The project name is already existed!");
    return;
  }

  // 初始化生成各个模块代码的函数
  initRoot(cmdPath, projectName, answers);
  if (typescript) initTypeScript(cmdPath, projectName, answers);
  if (eslint) initEslint(cmdPath, projectName, answers);
  if (prettier) initPrettier(cmdPath, projectName, answers);
  if (test.Jest || test.Vitest) initTest(cmdPath, projectName, answers);
  if (commitlint.commitlint || commitlint["standard-version"]) {
    initCommitlint(cmdPath, projectName, answers);
  }
  if (husky) initHusky(cmdPath, projectName, answers);
  if (ci) initCI(cmdPath, projectName, answers);

  initManager(cmdPath, projectName, answers)
    .then(() => {
      spinner.succeed("Create lib successfully");
    })
    .catch(() => {
      spinner.fail("Create lib failure");
    });
}
