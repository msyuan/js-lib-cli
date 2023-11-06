import { mergeJSON2JSON, mergeTmpl2JSON } from "@utils/merge.js";
import { json3, json4, json5 } from "../data/merge.js";
import path from "node:path";
import fs from "node:fs";

const pathDir = path.join(process.cwd(), "/tests/data/");
const pathTarget = path.join(process.cwd(), "/tests/target/");

describe("合并json文件", () => {
  it("mergeJSON2JSON函数", async () => {
    const fromPath = pathDir + "merge2.json";
    const toPath = pathTarget + "merge2.json";
    await mergeJSON2JSON(fromPath, toPath);
    const expected = fs.readFileSync(pathTarget + "merge2.json", { encoding: "utf-8" });
    expect(JSON.parse(expected)).toMatchObject(json3);
  });
});

describe("合并模板tmpl文件到json文件", () => {
  const data = {
    name: 'clone',
    prettier: true,
  }
  it("mergeTmpl2JSON函数", async () => {
    const fromPath = pathDir + "merge1.json.tmpl";
    const toPath = pathTarget + "merge1.json";
    await mergeTmpl2JSON(fromPath, toPath, data);
    const expected = fs.readFileSync(pathTarget + "merge1.json", { encoding: "utf-8" });
    expect(JSON.parse(expected)).toMatchObject(json4);
  });
});
