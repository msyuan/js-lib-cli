import inquirer from "inquirer";
import validate from "validate-npm-package-name";

// 是否需要输入项目名称选项
const projectName = name => {
  return [
    {
      type: "input",
      message: "your project name",
      name: "projectName",
      default: name,
      validate: function (val) {
        if (!val) {
          return "Please enter name";
        }
        if (val.match(/\s+/g)) {
          return "Forbidden project name";
        }
        return true;
      },
    },
  ];
};

// 交互选项逻辑
const promptList = name => {
  return [
    {
      type: "input",
      message: "your library name",
      name: "name",
      default: name,
      validate: function (val) {
        if (!val) {
          return "Please enter name";
        }
        if (val.match(/\s+/g)) {
          return "Forbidden library name";
        }
        return true;
      },
    },
    {
      type: "input",
      message: "npm package name",
      name: "npmname",
      default: name,
      validate: function (val) {
        if (!validate(val).validForNewPackages) {
          return "Forbidden npm name";
        }
        return true;
      },
    },
    {
      type: "input",
      message: "author name",
      name: "username",
    },
    {
      type: "input",
      message: "description",
      name: "description",
      default: "JavaScript库开发",
    },
    {
      type: "confirm",
      name: "prettier",
      message: "use prettier?",
      default: true,
    },
    {
      type: "confirm",
      name: "eslint",
      message: "use eslint?",
      default: true,
    },
    {
      type: "confirm",
      name: "typescript",
      message: "use typescript?",
      default: false,
    },
    {
      type: "checkbox",
      message: "use commitlint:",
      name: "commitlint",
      choices: ["commitlint", "standard-version"],
      default: ["commitlint"],
      filter: function (values) {
        return values.reduce((res, cur) => ({ ...res, [cur]: true }), {});
      },
    },
    {
      type: "checkbox",
      message: "use test:",
      name: "test",
      choices: ["Jest", "Vitest"],
      default: ["Jest"],
      filter: function (values) {
        return values.reduce((res, cur) => ({ ...res, [cur]: true }), {});
      },
    },
    {
      type: "confirm",
      name: "husky",
      message: "use husky?",
      default: true,
    },
    {
      type: "list",
      name: "ci",
      message: "use ci:",
      choices: ["github", "circleci", "none"],
      filter: function (value) {
        return {
          github: "github",
          circleci: "circleci",
          none: null,
        }[value];
      },
    },
    {
      type: "list",
      message: "package manager:",
      name: "manager",
      default: "pnpm",
      choices: ["no install", "pnpm", "yarn", "npm"],
      filter: function (value) {
        return {
          pnpm: "pnpm",
          yarn: "yarn",
          npm: "npm",
          "no install": null,
        }[value];
      },
    },
  ];
};

/**
 *  带项目同名交互选项的逻辑处理
 */
export function initProjectPrompt(name) {
  const list = [...projectName(name), ...promptList(name)];
  return inquirer.prompt(list);
}

/**
 *  设置交互选项逻辑
 */
export function initPrompt(name) {
  // 判断是否需要输入项目名
  const list = [...promptList(name)];
  return inquirer.prompt(list);
}
