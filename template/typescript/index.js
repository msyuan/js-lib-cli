import path from "node:path";
import { copyFile } from "../../utils/copy.cjs";
import { mergeJSON2JSON } from "../../utils/merge.js";
import { currentPathResolve, checkFileExists } from "../../utils/helper.js";

// 拼接当前目录下template的绝对路径
function pathDirResolve(p) {
  return path.join(currentPathResolve("/typescript/template/"), p);
}

function initTypeScript(cmdPath, name, option) {
  mergeJSON2JSON(pathDirResolve(`package.json`), path.resolve(cmdPath, name, "package.json"));
  // 初始化tsconfig.json
  copyFile(pathDirResolve(`tsconfig.json`), path.resolve(cmdPath, name, "tsconfig.json"));
  if (checkFileExists(path.join(cmdPath + name, "/babel.config.json"))) {
    console.log("执行合并了么babel.config");
    // 如果存在就合并babel.config.json
    mergeJSON2JSON(
      pathDirResolve(`babel.config.json`),
      path.resolve(cmdPath, name, "babel.config.json"),
    );
  } else {
    copyFile(pathDirResolve(`babel.config.json`), path.resolve(cmdPath, name, "babel.config.json"));
  }
  // 初始化ts的demo文件index.ts
  copyFile(pathDirResolve(`src/index.ts`), path.resolve(cmdPath, name, "src/index.ts"));
}

export default initTypeScript;
