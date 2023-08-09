import path from "node:path";
import { exec } from "node:child_process";
import ora from "ora";

// 初始化npm安装函数
function initManager(cmdPath, name, option) {
  const manager = option.manager;
  if (!manager) {
    return Promise.resolve();
  }
  return new Promise(function (resolve, reject) {
    // 子进程的当前工作目录
    const cmdDir = path.resolve(cmdPath, name);
    // 先初始化git，否则husky安装会报错
    exec("git init", { cwd: cmdDir }, (error, stdout, stderr) => {
      if (error) {
        console.warn("git init失败, 跳过install过程");
        resolve();
        return;
      }
      const spinner = ora(`Installing packages from npm, wait for a second...`);
      spinner.start();
      // 再执行pnpm install安装所有依赖
      exec(`${manager} install`, { cwd: cmdDir }, (error, stdout, stderr) => {
        // 成功后，error 将是 null。 出错时，error 将是 Error 的实例
        if (error) {
          reject();
          return;
        }
        spinner.succeed(`Install packages successfully!`);
        resolve();
        setTimeout(() => {
          spinner.stop();
        }, 500);
      });
    });
  });
}

export default initManager;
