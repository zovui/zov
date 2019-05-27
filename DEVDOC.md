# zov

### 装包

```
yarn install
```

### 开发环境

```
yarn run serve
```

### 压缩core

```
yarn run lib
```

### 提交代码

> 注意：提交代码需要用此命令，而不是 git commit

```
yarn run commit
```

### release

> 版本发布，生成changelog。

## 目录

```bash
.
├── README.md
├── babel.config.js
├── core                                            // 【zov 开发目录】
│   ├── README.md
│   ├── components
│   │   ├── button
│   │   │   ├── button.vue
│   │   │   └── index.js
│   │   ├── cascader
│   │   │   ├── cascader-column.vue
│   │   │   ├── cascader-mixin.js
│   │   │   ├── cascader.vue
│   │   │   └── index.js
│   ├── directives
│   │   ├── index.js
│   │   ├── v-zov-spin.js
│   │   └── v-zov-tooltip.js
│   ├── icons
│   │   ├── fonts
│   │   │   ├── zov_iconfont.eot
│   │   │   ├── zov_iconfont.ttf
│   │   │   ├── zov_iconfont.woff
│   │   │   └── zov_iconfont.woff2
│   │   └── index.css
│   ├── styles
│   │   ├── README.md
│   │   ├── animation
│   │   ├── common
│   │   ├── components
│   │   │   ├── button.scss
│   │   │   └── cascader.scss
│   │   ├── mixins
│   │   ├── custom.scss
│   │   └── colors.scss
│   ├── utils
│   ├── worker
│   ├── index.js                                    // npm引用js入口
│   └── index.scss                                  // npm引用css入口
├── docs                                            // 【zov文档网站在github-page上的暴露目录，是npm run build的结果】
├── lib                                             // 【zov lib打包，提供给browser端引用】
│   ├── fonts
│   │   ├── zov_iconfont.woff2
│   │   ├── zov_iconfont.ttf
│   │   ├── zov_iconfont.eot
│   │   └── zov_iconfont.woff
│   ├── demo.html                                   // 测试页面
│   ├── zov.min.css                                 // css包
│   └── zov.min.js                                  // js包
├── public                                          // 【入口html、图标】
├── src                                             // 【demo 开发目录】
│   ├── assets
│   │   └── logo.png
│   ├── main.js
│   ├── router.js
│   ├── views
│   │   ├── BigDataListDemo.vue
│   │   └── ButtonDemo.vue
│   ├── App.vue
│   └── app.scss
├── package.json
├── postcss.config.js
├── vue.config.js
└── yarn.lock
```

## 版本

版本分为3个级别：`一.二.三`

#### 一级版本：大版本更新

背景：往往因为技术选型变动、大的思路调整或者项目重构而发布的新版本。

涉及：不一定向下兼容，保留旧版本，告知用户可以自行选择使用。

#### 二级版本：小版本更新

背景：往往会在拓展功能、新增组件、丰富api后发布新版本。

涉及：向下兼容，选择性保留旧版本，告知用户使用新功能。

#### 三级版本：小版本更新

背景：在bug修复、缺陷优化后发布新版本。

涉及：向下兼容，不保留旧版本，用户无感。

> 说明：
>
> 当前版本是根据vue@v2.5.17开发的，现在vue@v2.6.6发布，项目已经跟新到vue@v2.6.6，对目前已开发部分无影响，vue在2.6 与 2.5 版本中有一些语法上的差异，后续我会找出逐一修改，让zov项目更接近vue@v2.6.6，项目后续开发也将遵循2.6的规范。如：slot。

## 开发规范

#### core开发

见【/core/REAMME.md】

#### demo开发

本项目由于交互的复杂性没有断言类的unit测试代码，所有自测都是通过写demo。demo页面中要根据组件参数和应用场景写出多个case，并在页首写参数说明及注意事项。

参考：【/src/views/CascaderDemo.vue】

#### 多人协作

##### 分支

###### master

发版

###### dev

开发总分支

##### 代码提交

开发者需有自己的开发分支并提交到remote，通过发起pull request请求，进行合并。合并前会审核代码。

##### commit规范

贡献者需要通过

遵循 [Angular 规范](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.greljkmo14y0)，进行commit msg的描述，可以参考[阮一峰commit mis](<http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html>)一文中介绍的Header、Body、Footer的内容。

提交命令为 npm run commit。如：

```zsh
➜  zov git:(dev) ✗ npm run commit 

> zov@0.1.5 commit /Users/zhangjun/workspace/zov
> git-cz

cz-cli@3.0.7, cz-conventional-changelog@2.1.0


Line 1 will be cropped at 100 characters. All other lines will be wrapped after 100 characters.

? Select the type of change that you're committing: (Use arrow keys)
❯ feat:     A new feature 
  fix:      A bug fix 
  docs:     Documentation only changes 
  style:    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) 
  refactor: A code change that neither fixes a bug nor adds a feature 
  perf:     A code change that improves performance 
  test:     Adding missing tests or correcting existing tests 
(Move up and down to reveal more choices)
```

说明：

**build**：【热】影响构建系统或外部依赖项的更改（示例范围：Gulp、broccoli、NPM）

 **ci**：改变CI配置文件和脚本

 **docs**：【热】只改变文档

 **feat**：【热】一个新功能

 **fix**：【热】一个bug fix

 **perf**：【热】代码更改,提高了性能

 **refactor**：【热】代码重构

 **style**：【热】不影响代码含义的更改（空格、格式、缺少分号等）

 **test**：添加缺失的测试或修正现有的测试

**revert**：还原以前的提交

**chore**：不修改src或测试文件的其他更改

> 以上标【热】的都是较为常用的msg提示

项目配置了commitlint会校验提交信息是否符合规定，否则会拒提。如：

```zsh
➜  zov git:(dev) ✗ git commit -m"test"
husky > commit-msg (node v10.15.3)

⧗   input: test
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]
✖   found 2 problems, 0 warnings 
    (Need help? -> https://github.com/conventional-changelog/commitlint#what-is-commitlint )


husky > commit-msg hook failed (add --no-verify to bypass)
```

下面是一个提交的示例：

```zsh
➜  zov git:(dev) ✗ npm run commit

> zov@0.1.5 commit /Users/zhangjun/workspace/zov
> git-cz

cz-cli@3.1.0, cz-conventional-changelog@2.1.0

Line 1 will be cropped at 100 characters. All other lines will be wrapped after 100 characters.

? Select the type of change that you're committing: build:    Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
? What is the scope of this change (e.g. component or file name)? (press enter to skip)
 package.json node_modules
? Write a short, imperative tense description of the change:
 规范了commit msg
? Provide a longer description of the change: (press enter to skip)
 规范了 commit msg ，增加了commit lint
? Are there any breaking changes? No
? Does this change affect any open issues? No
husky > commit-msg (node v10.15.3)

⧗   input: build(package.json node_modules): 规范了commit msg
✔   found 0 problems, 0 warnings 
    (Need help? -> https://github.com/conventional-changelog/commitlint#what-is-commitlint )
```

