module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-empty': [2, 'never'], // 必填项，代表此次提交的日志信息
    'scope-empty': [0], // 影响范围非必填
    'header-max-length': [0, 'always', 120], // 最大长度
    'type-empty': [2, 'never'], // 提交类型必填
    'type-case': [2, 'always', 'lowerCase'], // 提交类型总是小写
    'type-enum': [
      2, // level: 0-disable, 1-warning, 2-error
      'always', // 应用与否: always | never
      [
        'feat', // 新增功能(feature)
        'fix', // 修复(bug)
        'docs', // 文档更新
        'perf', // 性能优化相关 - 更改代码以提高性能
        'test', // 测试相关
        'merge', // 合并分支
        'refactor', // 重构代码逻辑，不修改功能
        'config', // 配置文件修改
      ],
    ],
  },
};
