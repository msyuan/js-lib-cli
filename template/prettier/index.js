import path from "node:path";
import { copyFile, copyTmpl } from "../../utils/copy.cjs";
import { mergeJSON2JSON } from "../../utils/merge.js";
import { currentPathResolve } from "../../utils/helper.js";

// 拼接当前目录下template的绝对路径
function pathDirResolve(p) {
  return path.join(currentPathResolve("/prettier/template/"), p);
}

function initPrettier(cmdPath, name, option) {
  console.log(cmdPath, name, option);

  // 初始化prettierrc.cjs
  copyFile(pathDirResolve(`.prettierrc.cjs`), path.resolve(cmdPath, name, ".prettierrc.cjs"));

  // 初始化prettierignore
  copyTmpl(
    pathDirResolve(`.prettierignore`),
    path.resolve(cmdPath, name, ".prettierignore"),
    option,
  );

  // 初始化package.json
  mergeJSON2JSON(
    pathDirResolve(`package.json`),
    path.resolve(cmdPath, name, "package.json"),
    option,
  );
}

export default initPrettier;
