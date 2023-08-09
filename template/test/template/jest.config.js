/*
 * https://jestjs.io/zh-Hans/docs/configuration
 */

export default {
  testMatch: ['**/tests/**/*.test.[jt]s?(x)'],
  // 用来匹配 @/ 都指向到根目录/src/前文中(.*)`匹配的分组
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  // 覆盖率报告的目录，测试报告所存放的位置
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.[jt]sx?$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
  },
  // 覆盖率修改，如果分支、行和函数覆盖率低于 80%，则会报错
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
