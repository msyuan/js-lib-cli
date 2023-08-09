import path from "node:path";
import { copyFile, copyTmpl } from "../../utils/copy.cjs";
import { mergeTmpl2JSON } from "../../utils/merge.js";
import { currentPathResolve } from "../../utils/helper.js";

// 拼接当前目录下template的绝对路径
function pathDirResolve(p) {
  return path.join(currentPathResolve("/eslint/template/"), p);
}

function initEslint(cmdPath, name, option) {
  console.log(cmdPath, name, option);

  copyFile(pathDirResolve(`.eslintignore`), path.resolve(cmdPath, name, ".eslintignore"));

  copyTmpl(
    pathDirResolve(`.eslintrc.cjs.tmpl`),
    path.resolve(cmdPath, name, ".eslintrc.cjs"),
    option,
  );

  mergeTmpl2JSON(
    pathDirResolve(`package.json.tmpl`),
    path.resolve(cmdPath, name, "package.json"),
    option,
  );
}

export default initEslint;
