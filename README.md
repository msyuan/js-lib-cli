# JS Lib CLI 快速创建JS库开发的CLI工具

一个方便快速创建JavaScript库开发项目的CLI工具

## 一、功能

* 支持可持续构建到github。
* 支持eslint和prettier。
* 支持commitlint。
* 支持单元测试，可选择vite和jest。
* 提供issue_template。
* 提供好vscode的配置。
* 使用rollup打包。
* 支持输出多种模块的（CJS、UMD、ESM）规范格式。

## 二、使用者指南

### 1、通过pnpm等下载全局安装

```bash
pnpm i -g @msyuan/js-lib-cli ||  npm i -g @msyuan/js-lib-cli
```

### 2、如何初始化一个JS开发库项目

#### 2.1、运行以下命令来创建一个新项目

mylib为您的项目名

```js
js create mylib
```

#### 2.2、你会被提示选取一个preset

![preset](./public/demo.png)

### 3、自主安装依赖说明

* 如果在提示预选阶段没有选择package manager，创建项目成功后，需执行下面的命令自主安装依赖。
* 如果在提示预选阶段选择了husky，则需先初始化git仓库, 然后再安装依赖。

```js
git init
pnpm install
```

如果在提示预选阶段选择了package manager为pnpm\yarn\npm, 则会自动git init，然后自动安装依赖。

### 4、其他说明

lib文件夹中的入口文件，文件名需修改成自己实际的JS库名, dist也是如此（它们只是一个demo，build后可删除demo文件）。

### 5、可选项帮助命令

```js
js --help
```

## 三、参与贡献

1.  Fork 本仓库
2.  新建 Feat-xxx 分支
3.  提交代码
4.  新建 Pull Request