import path from "node:path";
import fs from "node:fs";
import { init } from "../../bin/initTest.js";

/**
 *  测试模板初始化功能，模拟不选择值得情况
 */
const cmdPath = path.join(process.cwd(), "/tests/");
const projectName = "demo/project3";
const options = {
  name: "clone",
  npmname: "clone",
  username: "laoyuan",
  description: "一个深度克隆函数",
  prettier: false,
  eslint: false,
  typescript: false,
  commitlint: { commitlint: false },
  test: { Jest: false },
  husky: false,
}

// 判断文件是否存在
function checkExists(path) {
  return fs.existsSync(cmdPath + projectName + path);
}

// 读取package.json文件
function readPackage() {
  return fs.readFileSync(cmdPath + projectName + "/package.json", "utf8");
}

describe("测试init初始化", () =>{
  it("初始化init", async () => {
    await init(options, projectName, cmdPath);
  })
  it("不选择typescript", async () => {
    const result = readPackage();
    const exists = checkExists("/tsconfig.json");
    expect(result).not.toContain("typescript");
    expect(exists).toBeFalsy();
  })
  it("不选择eslint", async () =>{
    const result = readPackage();
    const exists = checkExists("/.eslintrc.cjs");
    expect(result).not.toContain("eslint");
    expect(exists).toBeFalsy();
  })
  it("不选择prettier", async () =>{
    const result = readPackage();
    const exists = checkExists("/.prettierrc.cjs");
    expect(result).not.toContain("prettier");
    expect(exists).toBeFalsy();
  })
  it("不选择commitlint", async () =>{
    const result = readPackage();
    const exists = checkExists("/commitlint.config.cjs");
    expect(result).not.toContain("@commitlint/cli");
    expect(exists).toBeFalsy();
  })
  it("不选择husky", async () =>{
    const result = readPackage();
    const exists = checkExists("/.husky/pre-commit");
    expect(result).not.toContain("husky");
    expect(exists).toBeFalsy();
  })
  it("不选择test", async () =>{
    const exists1 = checkExists("/jest.config.js");
    const exists2 = checkExists("/vite.config.js");
    expect(exists1).toBeFalsy();
    expect(exists2).toBeFalsy();
  })
})

