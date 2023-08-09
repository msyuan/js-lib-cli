import { isTemplate, readTmpl, copyTmpl } from "@utils/copy.cjs";
import path from "node:path";
import fs from "node:fs";

const pathDir = path.join(process.cwd(), "/tests/data/");
const pathTarget = path.join(process.cwd(), "/tests/target/");

const data = {
  npmname: 'copy',
  username: 'test',
  name: 'copy',
}

describe("判断是否是模板文件", () => {
  it("isTemplate函数", () => {
    expect(isTemplate(pathDir + "copy1.json.tmpl")).toBeTruthy();
    expect(isTemplate(pathDir + "copy.json")).toBeFalsy();
  })
})

describe("读取模板文件", () => {
  it("readTmpl函数", () => {
    const result = readTmpl(pathDir + "copy1.json.tmpl", data);
    const expected = fs.readFileSync(pathTarget + "copy1.json", { encoding: "utf-8" });
    expect(result).toEqual(expected);
  })
})


describe("拷贝模板文件", () => {
  it("copyTmpl函数", () => {
    copyTmpl(pathDir + "copy2.json.tmpl", pathTarget + "copy2.json", data);
    // 判断是否存在copy过去的文件copy2.json
    const exists = fs.existsSync(pathTarget + "copy2.json")
    expect(exists).toBeTruthy();
  })
})
