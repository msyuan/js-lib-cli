import path from "node:path";
import fs from "node:fs";
// import { init } from "../../bin/init.js";
import initTypeScript from "../../template/typescript/index.js";
import initTest from "../../template/test/index.js";

/**
 *  测试模板初始化功能，模拟选择值的情况
 */
const cmdPath = process.cwd() + "/";
const projectName = "tests/demo/project-jest-ts";
const options = {
  name: "clone",
  npmname: "clone",
  username: "laoyuan",
  description: "一个深度克隆函数demo",
  prettier: false,
  eslint: false,
  typescript: true,
  commitlint: { commitlint: false },
  test: { Jest: true },
  husky: false,
}

// 拼接路径
function pathJoin(filePath) {
  return path.join(cmdPath + projectName, filePath);
}

// 判断文件是否存在
function checkExists(path) {
  return fs.existsSync(pathJoin(path));
}

// 读取某个文件
function readFile(path) {
  return fs.readFileSync(pathJoin(path), "utf8");
}

describe("测试typescript初始化", () =>{
  it("initTypescript函数", async () =>{
    await initTypeScript(cmdPath, projectName, options);
    const result = readFile("babel.config.json");
    const exists = checkExists("/tsconfig.json");
    expect(result).toContain("typescript");
    expect(exists).toBeTruthy();
  })
})

describe("测试Test初始化", () =>{
  it("选择的是jest", async () =>{
    await initTest(cmdPath, projectName, options);
    const result = readFile("babel.config.json");
    const exists = fs.existsSync(pathJoin("babel.config.json"));
    const exists1 = checkExists("/jest.config.js");
    expect(result).toMatch(/(current)/i);
    expect(exists1).toBeTruthy();
    expect(exists).toBeTruthy();
  })
})

