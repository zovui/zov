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
├── lib                                             // 【zov lib打包，提供给browser端引用】
│   ├── fonts
│   │   ├── zov_iconfont.woff2
│   │   ├── zov_iconfont.ttf
│   │   ├── zov_iconfont.eot
│   │   └── zov_iconfont.woff
│   ├── css
│   │   └── zov.css                                 // css包
│   ├── demo.html                                   // 测试页面
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