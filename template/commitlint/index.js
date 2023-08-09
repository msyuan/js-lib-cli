import path from "node:path";
import { copyFile } from "../../utils/copy.cjs";
import { mergeTmpl2JSON } from "../../utils/merge.js";
import { currentPathResolve } from "../../utils/helper.js";

// 拼接当前目录下template的绝对路径
function pathDirResolve(p) {
  return path.join(currentPathResolve("/commitlint/template/"), p);
}

function initCommitlint(cmdPath, name, option) {
  // 初始化commitlint.config.cjs
  if (option.commitlint.commitlint) {
    copyFile(
      pathDirResolve(`commitlint.config.cjs`),
      path.resolve(cmdPath, name, "commitlint.config.cjs"),
    );
  }
  // 初始化.versionrc
  else if (option.commitlint["standard-version"]) {
    copyFile(pathDirResolve(`.versionrc`), path.resolve(cmdPath, name, ".versionrc"));
  }
  mergeTmpl2JSON(
    pathDirResolve(`package.json.tmpl`),
    path.resolve(cmdPath, name, "package.json"),
    option,
  );
}

export default initCommitlint;
