import { checkFileExists } from "@utils/helper.js";
import path from "node:path";

const pathTarget = path.join(process.cwd(), "/tests/target/");
describe("判断文件是否存在", () => {
  it("checkFileExists", () => {
    // 判断是否存在file1.json
    const exists = checkFileExists(pathTarget + "file1.json")
    expect(exists).toBeTruthy();
  })
})
