import path from "node:path";
import { copyTmpl, copyFile } from "../../utils/copy.cjs";
import { mergeTmpl2JSON, mergeJSON2JSON } from "../../utils/merge.js";
import { currentPathResolve, checkFileExists } from "../../utils/helper.js";

// 拼接当前目录下template的绝对路径
function pathDirResolve(p) {
  return path.join(currentPathResolve("/test/template/"), p);
}

// console.log("调试pathDirResolve", pathDirResolve(`jest.config.js`));

function initTest(cmdPath, name, option) {
  console.log(cmdPath, name, option);
  if (!option.test) {
    return;
  }

  // 判断单元测试选择的是Jest
  if (option.test.Jest) {
    copyTmpl(
      pathDirResolve(`jest.config.js`),
      path.resolve(cmdPath, name, "jest.config.js"),
      option,
    );
    // 复制单元测试demo文件到tests根目录文件夹下
    copyFile(pathDirResolve(`tests/sum.spec.js`), path.resolve(cmdPath, name, "tests/sum.spec.js"));
    if (checkFileExists(path.join(cmdPath + name, "/babel.config.json"))) {
      // 如果存在就合并babel.config.json
      mergeTmpl2JSON(
        pathDirResolve(`babel.config.json.tmpl`),
        path.resolve(cmdPath, name, "babel.config.json"),
        option,
      );
    } else {
      copyFile(
        pathDirResolve(`babel.config.json`),
        path.resolve(cmdPath, name, "babel.config.json"),
      );
    }
  } else if (option.test.Vitest) {
    // 选择的是vitest
    copyTmpl(
      pathDirResolve(`vite.config.js`),
      path.resolve(cmdPath, name, "vite.config.js"),
      option,
    );
    // 复制单元测试demo文件到tests根目录文件夹下
    copyFile(pathDirResolve(`tests/sum.test.js`), path.resolve(cmdPath, name, "tests/sum.test.js"));
  }
  mergeTmpl2JSON(
    pathDirResolve(`package.json.tmpl`),
    path.resolve(cmdPath, name, "package.json"),
    option,
  );
}

export default initTest;
