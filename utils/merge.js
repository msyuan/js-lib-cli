import { readTmpl } from "./copy.cjs";
import fs from "node:fs";
import lodash from "lodash";

function mergeObj2JSON(object, to) {
  const json = JSON.parse(fs.readFileSync(to, { encoding: "utf8" }));
  // 得到合并后的对象
  const obj = lodash.merge(json, object);
  // 写入到目标文件
  fs.writeFileSync(to, JSON.stringify(obj, null, "  "), { encoding: "utf8" });
}

// 合并json文件
export function mergeJSON2JSON(from, to) {
  const json = JSON.parse(fs.readFileSync(from, { encoding: "utf8" }));
  mergeObj2JSON(json, to);
}

// 合并tmpl模板文件到JSON
export function mergeTmpl2JSON(from, to, data = {}) {
  // 先解析模板文件
  const tmplData = readTmpl(from, data);
  const json = JSON.parse(tmplData);
  mergeObj2JSON(json, to);
}
