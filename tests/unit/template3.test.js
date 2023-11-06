
import path from "node:path";
import fs from "node:fs";
import { init } from "../../bin/init.js";
import initCI from "../../template/ci/index.js";
import initCommitlint from "../../template/commitlint/index.js";

/**
 *  测试Commitlint、cI、test
 */
const cmdPath = process.cwd() + "/";
const projectName = "tests/demo/project3";
const options = {
  name: "clone-test",
  npmname: "clone-test",
  username: "laoyuan",
  description: "一个深度克隆函数",
  prettier: true,
  eslint: true,
  typescript: true,
  commitlint: { 'standard-version': true },
  test: { Vitest: true },
  husky: true,
  manager: null,
  ci: 'circleci'
}

function pathJoin(filePath) {
  return path.join(cmdPath + projectName, filePath);
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

describe("测试Commitlint初始化", () =>{
  it("选择的是standard-version", () =>{
    const result = readPackage();
    const exists = checkExists("/.versionrc");
    expect(result).toContain("standard-version");
    expect(exists).toBeTruthy();
  })
})

describe("测试CI初始化", () =>{
  it("选择的circleci", () =>{
    const exists = checkExists("/.circleci/config.yml");
    expect(exists).toBeTruthy();
  })
})

describe("测试Test初始化", () =>{
  it("选择的是vitest", () =>{
    const exists2 = checkExists("/vite.config.js");
    expect(exists2).toBeTruthy();
  })
})
