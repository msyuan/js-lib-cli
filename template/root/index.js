import path from "node:path";
import { copyDir, copyTmpl } from "../../utils/copy.cjs";
import { currentPathResolve } from "../../utils/helper.js";

// 拼接当前目录下template的绝对路径
function pathDirResolve(p) {
  return path.join(currentPathResolve("/root/template/"), p);
}

/**
 *  初始化项目根目录下的公共文件
 */
function initRoot(cmdPath, name, option) {
  console.log("初始化的参数", cmdPath, name, option);
  // 初始化base
  copyDir(pathDirResolve(`base`), path.resolve(cmdPath, name));

  // 初始化readme
  copyTmpl(
    pathDirResolve(`README.md.tmpl`),
    path.resolve(cmdPath, name, "README.md"),
    option
  );

  // 初始化license, 增加一个变量
  const newOption = {
    ...option,
    currentYear: new Date().getFullYear(),
  };
  copyTmpl(
    pathDirResolve(`license.tmpl`),
    path.resolve(cmdPath, name, "license"),
    newOption
  );

  // 初始化package.json
  copyTmpl(
    pathDirResolve(`package.json.tmpl`),
    path.resolve(cmdPath, name, "package.json"),
    option
  );

  // 初始化rollup.config.js
  copyTmpl(
    pathDirResolve(`rollup.config.js.tmpl`),
    path.resolve(cmdPath, name, "rollup.config.js"),
    option
  );
}

export default initRoot;
