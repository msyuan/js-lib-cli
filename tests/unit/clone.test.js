import { clone } from "@utils/clone.js";

describe("深拷贝函数 clone", () => {
  test("函数参数 source", () => {
    // 基本数据类型
    expect(clone("abc")).toEqual("abc");

    // 对象
    const obj = { a: { b: 1 } };
    const cloneObj = clone(obj);
    expect(cloneObj).not.toBe(obj);
    expect(cloneObj).toEqual(obj);

    // 数组
    const arr = [1, 2, 3, 4, 5];
    const cloneArr = clone(arr);
    expect(cloneArr).not.toBe(arr);
    expect(cloneArr).toEqual(arr);
  });

  // 边界值测试用例
  test("边界值测试用例", () => {
    expect(clone()).toBeUndefined();
    expect(clone(undefined)).toBeUndefined();
    expect(clone(null)).toBeNull();
  });
});
