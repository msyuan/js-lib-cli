const fs = require("node:fs");
const path = require("node:path");
const copydir = require("copy-dir");
const template = require("template_js");

// 判断是否是模板文件
function isTemplate(pathname) {
  return path.extname(pathname) === ".tmpl";
}

// 文件目录拷贝
function copyDir(from, to, options) {
  // console.log("目录拷贝", from, to, options);
  copydir.sync(from, to, options);
}

/**
 *  @desc 拷贝文件到某一个目录
 *  用法：比如：copyFile(pathResolve("demo/111.js"), pathResolve("bin/demo/111.js"));
 *  此时bin下111.js的内容就等于demo下111.js的内容了，当然也可以重新命名一个新的
 *  copyFile(pathResolve("demo/111.js"), pathResolve("bin/demo/222.js"))，这时
 *  222.js的内容则等于111.js的内容
 */
function copyFile(from, to) {
  const buffer = fs.readFileSync(from);
  const parentPath = path.dirname(to);
  // 目录不存在处理
  if (!fs.existsSync(parentPath)) {
    mkdirSyncFunc(parentPath);
  }
  fs.writeFileSync(to, buffer);
}

// 创建目录
function mkdirSyncFunc(target) {
  try {
    // recursive 表示递归创建目录
    fs.mkdirSync(target, { recursive: true });
  } catch (e) {
    mkdirp(target);
    function mkdirp(dir) {
      if (fs.existsSync(dir)) {
        return true;
      }
      const dirname = path.dirname(dir);
      mkdirp(dirname);
      fs.mkdirSync(dir);
    }
  }
}

// 读取模板文件
function readTmpl(from, data = {}) {
  const text = fs.readFileSync(from, { encoding: "utf-8" });
  return template(text, data);
}

// 拷贝模板文件
function copyTmpl(from, to, data = {}) {
  // 如果不是模板文件，则直接拷贝即可
  if (!isTemplate(from)) {
    return copyFile(from, to);
  }
  const parentPath = path.dirname(to);
  mkdirSyncFunc(parentPath);
  fs.writeFileSync(to, readTmpl(from, data), { encoding: "utf8" });
}

exports.isTemplate = isTemplate;
exports.copyDir = copyDir;
exports.copyFile = copyFile;
exports.readTmpl = readTmpl;
exports.copyTmpl = copyTmpl;
