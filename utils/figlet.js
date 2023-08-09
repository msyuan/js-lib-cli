import { success } from "./helper.js";
import pkg from "figlet";

// 打印logo艺术字体
export function figletLogo() {
  success(
    pkg.textSync("js-lib-cli", {
      font: "Univers",
      horizontalLayout: "default",
      verticalLayout: "default",
      fontSize: 10,
      width: 120,
      whitespaceBreak: true,
    }),
  );
}
