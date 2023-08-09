import path from "node:path";
import { copyTmpl } from "../../utils/copy.cjs";
import { mergeTmpl2JSON } from "../../utils/merge.js";
import { currentPathResolve } from "../../utils/helper.js";

// 拼接当前目录下template的绝对路径
function pathDirResolve(p) {
  return path.join(currentPathResolve("/test/template/"), p);
}

// console.log("调试pathDirResolve", pathDirResolve(`jest.config.js`));

function initTest(cmdPath, name, option) {
  console.log(cmdPath, name, option);
  if (!option.husky) {
    return;
  }

  // 判断单元测试选择的是Jest
  if (option.test.Jest) {
    copyTmpl(
      pathDirResolve(`jest.config.js`),
      path.resolve(cmdPath, name, "jest.config.js"),
      option,
    );
  } else if (option.test.Vitest) {
    // 选择的是vitest
    copyTmpl(
      pathDirResolve(`vite.config.js`),
      path.resolve(cmdPath, name, "vite.config.js"),
      option,
    );
  }
  mergeTmpl2JSON(
    pathDirResolve(`package.json.tmpl`),
    path.resolve(cmdPath, name, "package.json"),
    option,
  );
}

export default initTest;
