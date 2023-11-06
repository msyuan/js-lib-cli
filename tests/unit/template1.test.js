import path from "node:path";
import fs from "node:fs";
import { init } from "../../bin/init.js";
/**
 *  测试模板初始化功能，模拟都选择值的情况
 */
const cmdPath = process.cwd() + "/";
const projectName = "tests/demo/project1";
const options = {
  name: "clone-test",
  npmname: "clone-test",
  username: "laoyuan",
  description: "一个深度克隆函数",
  prettier: true,
  eslint: true,
  typescript: true,
  commitlint: { commitlint: true },
  test: { Jest: true },
  husky: true,
  ci: "github",
  manager: "pnpm",
}


function pathJoin(filePath) {
  return path.join(cmdPath + projectName, filePath);
}

// 判断文件是否存在
function checkExists(path) {
  return fs.existsSync(pathJoin(path));
}

// 读取package.json文件
function readPackage() {
  return fs.readFileSync(pathJoin("package.json"), "utf8");
}

// 读取某个文件
function readFile(path) {
  return fs.readFileSync(pathJoin(path), "utf8");
}


describe("测试初始化", () =>{
  it("init初始化", async () =>{
    await init(options, projectName);
    const result = readFile("/README.md");
    const exists = fs.existsSync(pathJoin(".editorconfig"));
    expect(result).toContain("clone");
    expect(exists).toBeTruthy();
  })
})

describe("测试root初始化", () =>{
  it("initRoot函数", () =>{
    const result = fs.readFileSync(pathJoin("package.json"), "utf8");
    const exists = checkExists("/.editorconfig");
    expect(result).toContain("clone-test");
    expect(exists).toBeTruthy();
  })
})


describe("测试typescript初始化", () =>{
  it("initTypescript函数", () =>{
    const result = readPackage();
    const exists = checkExists("/tsconfig.json");
    expect(result).toContain("typescript");
    expect(exists).toBeTruthy();
  })
})

describe("测试Eslint初始化", () =>{
  it("initEslint函数", () =>{
    const result = readPackage();
    const exists = checkExists("/.eslintrc.cjs");
    expect(result).toContain("eslint");
    expect(exists).toBeTruthy();
  })
})

describe("测试Prettier初始化", () =>{
  it("initPrettier函数", () =>{
    const result = readPackage();
    const exists = checkExists("/.prettierrc.cjs");
    expect(result).toContain("prettier");
    expect(exists).toBeTruthy();
  })
})

describe("测试Commitlint初始化", () =>{
  it("选择的是commitlint", () =>{
    const result = readPackage();
    const exists = checkExists("/commitlint.config.cjs");
    expect(result).toContain("@commitlint/cli");
    expect(exists).toBeTruthy();
  })
})

describe("测试Husky初始化", () =>{
  it("initHusky函数", () =>{
    const result = readPackage();
    const exists = checkExists("/.husky/pre-commit");
    expect(result).toContain("husky");
    expect(exists).toBeTruthy();
  })
})

describe("测试CI初始化", () =>{
  it("选择的github", () =>{
    const exists = checkExists("/.github/workflows/ci.yml");
    expect(exists).toBeTruthy();
  })
})

describe("测试Test初始化", () =>{
  it("选择的是jest", () =>{
    const exists = checkExists("/jest.config.js");
    expect(exists).toBeTruthy();
  })
})
