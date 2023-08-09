import path from "node:path";
import { copyTmpl } from "../../utils/copy.cjs";
import { mergeTmpl2JSON } from "../../utils/merge.js";
import { currentPathResolve } from "../../utils/helper.js";

// 拼接当前目录下template的绝对路径
function pathDirResolve(p) {
  return path.join(currentPathResolve("/husky/template/"), p);
}

function initHusky(cmdPath, name, option) {
  console.log(cmdPath, name, option);
  if (!option.husky) {
    return;
  }

  if (option.commitlint.commitlint) {
    copyTmpl(
      pathDirResolve(`commit-msg.tmpl`),
      path.resolve(cmdPath, name, ".husky/commit-msg"),
      option
    );
  }

  copyTmpl(
    pathDirResolve(`pre-commit.tmpl`),
    path.resolve(cmdPath, name, ".husky/pre-commit"),
    option
  );

  mergeTmpl2JSON(
    pathDirResolve(`package.json.tmpl`),
    path.resolve(cmdPath, name, "package.json"),
    option
  );
}

export default initHusky;
