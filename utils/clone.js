// 判断类型
export function type(data) {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
}

// 深度克隆函数
export function clone(source) {
  // 首先判断类型
  const t = type(source);
  // 如果是基本数据类型，直接返回即可
  if (t !== "object" && t !== "array") {
    return source;
  }
  let target;
  // 如果是对象
  if (t === "object") {
    // target要设置为一个对象
    target = {};
    for (const key in source) {
      // 判断是否是对象的私有属性
      if (source.hasOwnProperty(key)) {
        // 避免一层死循环 a.b = a
        target[key] = source[key] === source ? target : clone(source[key]);
      }
    }
  } else if (t === "array") {
    // target要设置为一个数组
    target = [];
    for (let i = 0; i < source.length; i++) {
      // 避免一层死循环 a.b = a
      target[i] = source[i] === source ? target : clone(source[i]);
    }
  }
  return target;
}
