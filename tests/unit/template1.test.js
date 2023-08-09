import path from "node:path";
import fs from "node:fs";
import initRoot from "../../template/root/index.js";
import initTypeScript from "../../template/typescript/index.js";
import initCommitlint from "../../template/commitlint/index.js";
import initEslint from "../../template/eslint/index.js";
import initHusky from "../../template/husky/index.js";
import initTest from "../../template/test/index.js";
import initPrettier from "../../template/prettier/index.js";
import initCI from "../../template/ci/index.js";
import { clone } from "@utils/clone.js";

/**
 *  测试模板初始化功能，模拟都选择值得情况
 */
const cmdPath = path.join(process.cwd(), "/tests/");
const projectName = "project";
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

// 判断文件是否存在
function checkExists(path) {
  return fs.existsSync(cmdPath + projectName + path);
}

// 读取package.json文件
function readPackage() {
  return fs.readFileSync(cmdPath + projectName + "/package.json", "utf8");
}

describe("测试root初始化", () =>{
  it("initRoot函数", async () =>{
    await initRoot(cmdPath, projectName, options);
    const result = fs.readFileSync(cmdPath + projectName + "/README.md", "utf8");
    const exists = checkExists("/.editorconfig");
    expect(result).toContain("clone");
    expect(exists).toBeTruthy();
  })
})


describe("测试typescript初始化", () =>{
  it("initTypescript函数", async () =>{
    await initTypeScript(cmdPath, projectName, options);
    const result = readPackage();
    const exists = checkExists("/tsconfig.json");
    expect(result).toContain("typescript");
    expect(exists).toBeTruthy();
  })
})

describe("测试Eslint初始化", () =>{
  it("initEslint函数", async () =>{
    await initEslint(cmdPath, projectName, options);
    const result = readPackage();
    const exists = checkExists("/.eslintrc.cjs");
    expect(result).toContain("eslint");
    expect(exists).toBeTruthy();
  })
})

describe("测试Prettier初始化", () =>{
  it("initPrettier函数", async () =>{
    await initPrettier(cmdPath, projectName, options);
    const result = readPackage();
    const exists = checkExists("/.prettierrc.cjs");
    expect(result).toContain("prettier");
    expect(exists).toBeTruthy();
  })
})

describe("测试Commitlint初始化", () =>{
  it("选择的是commitlint", async () =>{
    await initCommitlint(cmdPath, projectName, options);
    const result = readPackage();
    const exists = checkExists("/commitlint.config.cjs");
    expect(result).toContain("@commitlint/cli");
    expect(exists).toBeTruthy();
  })
  it("选择的是standard-version", async () =>{
    const params = clone(options);
    params.commitlint = { "standard-version": true };
    await initCommitlint(cmdPath, projectName, params);
    const result = readPackage();
    const exists = checkExists("/.versionrc");
    expect(result).toContain("standard-version");
    expect(exists).toBeTruthy();
  })
})

describe("测试Husky初始化", () =>{
  it("initHusky函数", async () =>{
    await initHusky(cmdPath, projectName, options);
    const result = readPackage();
    const exists = checkExists("/.husky/pre-commit");
    expect(result).toContain("husky");
    expect(exists).toBeTruthy();
  })
})

describe("测试CI初始化", () =>{
  it("选择的github", async () =>{
    await initCI(cmdPath, projectName, options);
    const exists = checkExists("/.github/workflows/ci.yml");
    expect(exists).toBeTruthy();
  })
  it("选择的circleci", async () =>{
    const params = clone(options);
    params.ci = "circleci";
    await initCI(cmdPath, projectName, params);
    const exists = checkExists("/.circleci/config.yml");
    expect(exists).toBeTruthy();
  })
})

describe("测试Test初始化", () =>{
  it("选择的是jest", async () =>{
    await initTest(cmdPath, projectName, options);
    const exists1 = checkExists("/jest.config.js");
    expect(exists1).toBeTruthy();
  })
  it("选择的是vitest", async () =>{
    const params = {
      ...options
    }
    params.test = { Vitest: true };
    await initTest(cmdPath, projectName, params);
    const exists2 = checkExists("/vite.config.js");
    expect(exists2).toBeTruthy();
  })
})
