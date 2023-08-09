#!/usr/bin/env node

import yargs from "yargs";
import path from "node:path";
import { hideBin } from "yargs/helpers";
import { initPrompt } from "./init-prompt.js";
import { init } from "./initTest.js";
import { error, warn, checkProjectExists } from "../utils/helper.js";
import { figletLogo } from "../utils/figlet.js";

figletLogo();

const processArgv = hideBin(process.argv);

// 获取当前工作目录
const cmdPath = process.cwd();

yargs(processArgv)
  .usage("usage: js <command> [options]")
  .example("js create mylib", "新建一个库mylib")
  .alias("h", "help")
  .alias("v", "version")
  .strict() // 严格模式，参数错误直接抛出异常
  .command(
    ["create <project-name>", "c <project-name>"],
    "创建一个项目(create a new project powered by js-lib-cli)",
    function (yargs) {
      // console.log("yargs", yargs);
    },
    function (argv) {
      const projectName = String(argv.projectName);
      // 检测目录是否存在
      if (checkProjectExists(cmdPath, projectName)) {
        error("error: The project name is already existed!");
        return;
      }
      initPrompt(projectName).then(function (answers) {
        // console.log("结果为：", answers);
        // 初始化项目逻辑
        const cmdDir = path.join(projectName, "/demo/");
        init(answers, projectName, cmdDir);
      });
    },
  )
  .epilog("copyrght 2022-2023")
  .demandCommand()
  .fail(function (msg) {
    // 此处捕获yargs执行异常或者抛出的异常【throw new Error】
    warn("-------命令执行错误，信息如下--------");
    error(msg);
    process.exit(1);
  })
  .help("help", "查看命令行帮助").argv;
