import path from "node:path";
import { copyTmpl } from "../../utils/copy.cjs";
import { currentPathResolve } from "../../utils/helper.js";

// 拼接当前目录下template的绝对路径
function pathDirResolve(p) {
  return path.join(currentPathResolve("/ci/template/"), p);
}
function initCI(cmdPath, name, option) {
  console.log(cmdPath, name, option);
  if (!option.ci) {
    return;
  }
  if (option.ci === "github") {
    copyTmpl(
      pathDirResolve(`.github.yml.tmpl`),
      path.resolve(cmdPath, name, ".github/workflows/ci.yml"),
      option,
    );
  } else if (option.ci === "circleci") {
    copyTmpl(
      pathDirResolve(`.circleci.yml.tmpl`),
      path.resolve(cmdPath, name, ".circleci/config.yml"),
      option,
    );
  }
}

export default initCI;
