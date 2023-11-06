import chalk from "chalk";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

// 打印日志
export const log = console.log;

export const success = (...args) => {
  log(chalk.bold.green(...args));
};

export const error = (...args) => {
  log(chalk.bold.red(...args));
};

export const warn = (...args) => {
  log(chalk.hex("#FFA500")(...args));
};

export const info = (...args) => {
  log(chalk.bold.blue(...args));
};

// 判断项目目录是否存在
export function checkProjectExists(cmdPath, name) {
  return name ? fs.existsSync(path.resolve(cmdPath, name)) : false;
}

// 判断文件是否存在
export function checkFileExists(filePath) {
  return fs.existsSync(filePath);
}

//  filename包含当前模块文件的绝对路径
const filename = fileURLToPath(import.meta.url);
// 通过使用某些函数创建一个自定义__dirname变量来修复“__dirname is not defined in ES module scope”错误。
export const __dirname = path.dirname(filename);
// console.log("__dirname", __dirname, filename);

/**
 * @desc 获取脚手架template目录下的绝对路径
 * @param p {string} path：目录路径
 */
export const currentPathResolve = p => {
  return path.join(path.dirname(__dirname) + "/template/", p);
};
