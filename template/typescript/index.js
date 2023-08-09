import path from "node:path";
import { copyFile } from "../../utils/copy.cjs";
import { mergeJSON2JSON } from "../../utils/merge.js";
import { currentPathResolve } from "../../utils/helper.js";

// 拼接当前目录下template的绝对路径
function pathDirResolve(p) {
  return path.join(currentPathResolve("/typescript/template/"), p);
}

function initTypeScript(cmdPath, name, option) {
  console.log(cmdPath, name, option);

  mergeJSON2JSON(
    pathDirResolve(`package.json`),
    path.resolve(cmdPath, name, "package.json"),
    option,
  );
  // 初始化tsconfig.json
  copyFile(pathDirResolve(`tsconfig.json`), path.resolve(cmdPath, name, "tsconfig.json"));
}

export default initTypeScript;
