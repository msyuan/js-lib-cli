import path from "node:path";
import fs from "node:fs";
import { init } from "../../bin/init.js";
import initManager from "../../template/manager/index.js";

/**
 *  测试初始化安装依赖的功能，测试git init 和 pnpm install
 */
const cmdPath = process.cwd() + "/";
const projectName = "tests/demo/project2";
const options = {
  name: "clone-test",
  npmname: "clone-test",
  username: "laoyuan",
  description: "一个深度克隆函数",
  prettier: true,
  eslint: true,
  typescript: true,
  commitlint: { commitlint: true },
  test: { Vitest: true },
  husky: true,
  manager: null,
}

// 拼接路径
function pathJoin(filePath) {
  return path.join(cmdPath + projectName, filePath);
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
  it("initManager初始化", async () => {
    const data = await initManager(cmdPath, projectName, options);
    if (data) {
      const exists1 = readFile("/package.json");
      const exists2 = readFile("/.git/config");
      expect(exists1).toContain("rollup");
      expect(exists2).toContain("filemode");
    }
  })
})

