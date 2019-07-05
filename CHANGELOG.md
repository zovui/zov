# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

# [0.8.0](https://github.com/zovui/zov/compare/v0.7.0...v0.8.0) (2019-06-26)


### Bug Fixes

* **notice:** notice success icon ([b302e92](https://github.com/zovui/zov/commit/b302e92))
* **progress:** 初始化时，若percent为100，且不为exception状态时，需将状态变更为success ([fa11dcf](https://github.com/zovui/zov/commit/fa11dcf))
* **switch:** 增加事件 ([d52d5b5](https://github.com/zovui/zov/commit/d52d5b5))


### Features

* **upload:** 新建上传组件 ([85dabc7](https://github.com/zovui/zov/commit/85dabc7))


### Performance Improvements

* **switch:** 修改宽度 ([4d4eba3](https://github.com/zovui/zov/commit/4d4eba3))



# [0.7.0](https://github.com/zovui/zov/compare/v0.6.0...v0.7.0) (2019-06-06)


### Bug Fixes

* **color-picker:** draging ([0be0726](https://github.com/zovui/zov/commit/0be0726))
* **input:** suffix 判断逻辑 ([fe27b64](https://github.com/zovui/zov/commit/fe27b64))
* **tabs:** 修复pane内容改变时，tab内容会消失的问题 ([f4a926e](https://github.com/zovui/zov/commit/f4a926e)), closes [#23](https://github.com/zovui/zov/issues/23)
* **tabs:** 修复resize监听逻辑缺少的问题 ([dd88d40](https://github.com/zovui/zov/commit/dd88d40))
* **tooltip:** 去掉click的stop ([70c2933](https://github.com/zovui/zov/commit/70c2933))


### Features

* **progress:** 新增进度条组件 ([e3b2d61](https://github.com/zovui/zov/commit/e3b2d61))
* 新增avatar组件 ([4a0cce8](https://github.com/zovui/zov/commit/4a0cce8))


### Performance Improvements

* **icon:** icon custom icon ([36bc720](https://github.com/zovui/zov/commit/36bc720))



# [0.6.0](https://github.com/zovui/zov/compare/v0.5.1...v0.6.0) (2019-06-03)


### Bug Fixes

* **color-picker:** active状态下值重置 ([92021fa](https://github.com/zovui/zov/commit/92021fa))
* **menu:** menu disabled ([a80752f](https://github.com/zovui/zov/commit/a80752f))
* **modal:** 修复快捷方法打开弹窗时，背景可滚动问题 ([3932fd9](https://github.com/zovui/zov/commit/3932fd9))
* 修复了divider颜色 应用主题色 ([e62bdf4](https://github.com/zovui/zov/commit/e62bdf4))
* 修复了divider颜色 应用主题色 ([bbe97a1](https://github.com/zovui/zov/commit/bbe97a1))


### Features

* **steps:** 新增steps组件 ([bff5e5c](https://github.com/zovui/zov/commit/bff5e5c))
* **tabs:** 完善tab-pane lazy逻辑 ([21d995a](https://github.com/zovui/zov/commit/21d995a))


### Performance Improvements

* **select:** clear 后出发on-change事件 ([8f74888](https://github.com/zovui/zov/commit/8f74888))



## [0.5.1](https://github.com/zovui/zov/compare/v0.5.0...v0.5.1) (2019-05-25)


### Performance Improvements

* **select cascader big-data-list:** no has label ([d3b2a66](https://github.com/zovui/zov/commit/d3b2a66))



# [0.5.0](https://github.com/zovui/zov/compare/v0.4.0...v0.5.0) (2019-05-24)


### Bug Fixes

* **all:** 组件样式内部化 ([7f8c23e](https://github.com/zovui/zov/commit/7f8c23e))
* **menu:** join split ([0aed39c](https://github.com/zovui/zov/commit/0aed39c))


### Features

* **modal:** 新增modal组件 ([f38056d](https://github.com/zovui/zov/commit/f38056d))
* **module:** hebing ([ec4bcf5](https://github.com/zovui/zov/commit/ec4bcf5))


### Performance Improvements

* **input:** 增加slot ([f72aec0](https://github.com/zovui/zov/commit/f72aec0))



# [0.4.0](https://github.com/zovui/zov/compare/v0.3.0...v0.4.0) (2019-05-21)


### Bug Fixes

* 优化backtop组件，修复anchor-link组件名称 ([c3af6e5](https://github.com/zovui/zov/commit/c3af6e5))


### Features

* **tabs:** tab-pane新增closable选项 ([49f3420](https://github.com/zovui/zov/commit/49f3420))
* **tabs:** tab-pane新增disabled，可以禁用某tab ([c7258f8](https://github.com/zovui/zov/commit/c7258f8))
* **tabs:** tab-pane新增lazy模式 ([5d47b99](https://github.com/zovui/zov/commit/5d47b99))
* **tabs:** tab-pane新增order选项，可对tabs进行排序 ([c24db05](https://github.com/zovui/zov/commit/c24db05))
* **tabs:** 修改demo表头颜色 ([eff37c4](https://github.com/zovui/zov/commit/eff37c4))
* **tabs:** 垂直方向展示时，tab文字变为居中 ([315c2f5](https://github.com/zovui/zov/commit/315c2f5))
* **tabs:** 完善nav滚动边界计算逻辑 ([86a3e6b](https://github.com/zovui/zov/commit/86a3e6b))
* **tabs:** 完善可滚动tab时，滚动激活tab进入可视范围的算法 ([4b238ce](https://github.com/zovui/zov/commit/4b238ce))
* **tabs:** 新增action disabled状态 ([a9b048a](https://github.com/zovui/zov/commit/a9b048a))
* **tabs:** 新增add、remove事件回调 ([26fcb7d](https://github.com/zovui/zov/commit/26fcb7d))
* **tabs:** 新增beforeChange钩子 ([e3e053f](https://github.com/zovui/zov/commit/e3e053f))
* **tabs:** 新增beforeClose钩子 ([62e170c](https://github.com/zovui/zov/commit/62e170c))
* **tabs:** 新增extra slots 可自定义内容 ([fde62f2](https://github.com/zovui/zov/commit/fde62f2))
* **tabs:** 新增next、prev按钮的事件回调 ([cd507b9](https://github.com/zovui/zov/commit/cd507b9))
* **tabs:** 新增preventDefaultRemove，用于阻止默认的删除行为 ([39b9d0c](https://github.com/zovui/zov/commit/39b9d0c))
* **tabs:** 新增ResizeObserver和debounce处理tabs宽度高度变化时的TabNav状态变化 ([02b7187](https://github.com/zovui/zov/commit/02b7187))
* **tabs:** 新增tabPosition配置，可以配置tabs导航位置 ([d497df2](https://github.com/zovui/zov/commit/d497df2))
* **tabs:** 新增tabs-nav-action组件，简化tabs-nav状态 ([f82f234](https://github.com/zovui/zov/commit/f82f234))
* **tabs:** 新增tabs-nav-viewport，简化tabs-nav逻辑 ([82958c1](https://github.com/zovui/zov/commit/82958c1))
* **tabs:** 新增tabs、tab-pane组件 ([3e0bc2d](https://github.com/zovui/zov/commit/3e0bc2d))
* **tabs:** 新增type = card且nav溢出时的demo ([b4eae5a](https://github.com/zovui/zov/commit/b4eae5a))
* **tabs:** 新增type: card ([38f813b](https://github.com/zovui/zov/commit/38f813b))
* **tabs:** 新增type属性，用于指定tabs渲染类型 ([64a73b5](https://github.com/zovui/zov/commit/64a73b5))
* **tabs:** 新增文档 ([60515e3](https://github.com/zovui/zov/commit/60515e3))
* **tabs:** 新增滚动处理逻辑 ([fca8081](https://github.com/zovui/zov/commit/fca8081))
* **tabs:** 更新demo，并且新增未传activeId时的默认逻辑 ([4350727](https://github.com/zovui/zov/commit/4350727))
* **tabs:** 更新demo中的原生radio为Radio组件 ([7b11e8c](https://github.com/zovui/zov/commit/7b11e8c))
* **tabs:** 更新文档，变更tab disabled切换判断的位置 ([07fb016](https://github.com/zovui/zov/commit/07fb016))
* **tabs:** 订正type = card, tab disabled时，beforeClose、beforeChange的行为 ([ba38eed](https://github.com/zovui/zov/commit/ba38eed))



# [0.3.0](https://github.com/zovui/zov/compare/v0.2.0...v0.3.0) (2019-05-17)


### Bug Fixes

* **checkbox grid:** 修改scss书写不规范 ([e8756e0](https://github.com/zovui/zov/commit/e8756e0))
* 规范组件命名，优化back-top组件样式 ([b037383](https://github.com/zovui/zov/commit/b037383))
* **vue.config:** 环境判断 ([ec5e30b](https://github.com/zovui/zov/commit/ec5e30b))


### Features

* 新增组件back-top ([1c62e93](https://github.com/zovui/zov/commit/1c62e93))
* **breadcrumb:** 新增breadcrumb ([f21fab9](https://github.com/zovui/zov/commit/f21fab9))



# [0.2.0](https://github.com/zovui/zov/compare/v0.1.5...v0.2.0) (2019-05-10)


### Bug Fixes

* **form-doms.scss:** 修改设置尺寸的样式文件 ([b76bbb4](https://github.com/zovui/zov/commit/b76bbb4))
* **menu:** activeName 展开项目 ([b6048c5](https://github.com/zovui/zov/commit/b6048c5))
* **menu:** 修改menu默认展开 ([15d89ac](https://github.com/zovui/zov/commit/15d89ac))
* 修复anchor指定容器的anchor-link回显功能，affix添加占位功能 ([3396bef](https://github.com/zovui/zov/commit/3396bef))
* 删除多余console.log ([3bdbe70](https://github.com/zovui/zov/commit/3bdbe70))
* **radio:** currentValue set代码逻辑错误 ([9ec58ad](https://github.com/zovui/zov/commit/9ec58ad))


### Features

* **checkbox:** 新增checkbox组件 ([a9a32c0](https://github.com/zovui/zov/commit/a9a32c0))
* **checkbox:** 新增checkbox组件 ([5ffe190](https://github.com/zovui/zov/commit/5ffe190))
* **components:** 新增slider组件 ([308e1ef](https://github.com/zovui/zov/commit/308e1ef))
* **grid组件:** 增加Grid组件 ([4f246bf](https://github.com/zovui/zov/commit/4f246bf))
* **menu layout router:** 开发layout，修改menu、router.js ([eb7e32f](https://github.com/zovui/zov/commit/eb7e32f))
* **radio:** 完善radio功能 ([a48b226](https://github.com/zovui/zov/commit/a48b226))
* **radio:** 完成radio基本功能 ([3ae576b](https://github.com/zovui/zov/commit/3ae576b))
* **slider:** 区分了vertical模式和horizontal模式的键盘事件 ([08f4b22](https://github.com/zovui/zov/commit/08f4b22))
* **slider:** 如果拖拽结束后handle仍处于hover状态，则不隐藏tooltip ([db2e469](https://github.com/zovui/zov/commit/db2e469))
* **slider:** 实现marks和step共存时，拖拽时可以拖拽至marks上 ([6d0c343](https://github.com/zovui/zov/commit/6d0c343))
* **slider:** 实现通过键盘操作slider ([e833c6c](https://github.com/zovui/zov/commit/e833c6c))
* **slider:** 新增defaultValue、reset方法 ([a26f68e](https://github.com/zovui/zov/commit/a26f68e))
* **slider:** 新增disabled模式 ([c161639](https://github.com/zovui/zov/commit/c161639))
* **slider:** 新增marks，打标记 ([391acb6](https://github.com/zovui/zov/commit/391acb6))
* **slider:** 新增onlyMarks模式，标识只能拖拽至marks上 ([1db61c2](https://github.com/zovui/zov/commit/1db61c2))
* **slider:** 新增range模式 ([42ac205](https://github.com/zovui/zov/commit/42ac205))
* **slider:** 新增step支持 ([bcad12a](https://github.com/zovui/zov/commit/bcad12a))
* **slider:** 新增tipFormatter，用于格式化tooltip内容 ([894cab3](https://github.com/zovui/zov/commit/894cab3))
* **slider:** 新增tooltip控制 ([5fd652a](https://github.com/zovui/zov/commit/5fd652a))
* **slider:** 新增vertical垂直模式 ([7441677](https://github.com/zovui/zov/commit/7441677))
* **slider:** 更新颜色 ([86df9ae](https://github.com/zovui/zov/commit/86df9ae))
* **slider:** 清晰花了normalizeValue方法 ([5cb0f9b](https://github.com/zovui/zov/commit/5cb0f9b))
* **slider:** 调整vertical模式下的布局 ([ce98792](https://github.com/zovui/zov/commit/ce98792))


### Performance Improvements

* **badge:** 合并badeg到dev分支 ([2d6defd](https://github.com/zovui/zov/commit/2d6defd))
* **badge menu:** 修改menu update时掉初始化方法 ([6de76b4](https://github.com/zovui/zov/commit/6de76b4))
* **slider:** 优化了marks模式下，marks状态计算以及拖拽时查找marks区间所需要的内存空间 ([5c45381](https://github.com/zovui/zov/commit/5c45381))



## [0.1.5](https://gitee.com/ZOV/zov/compare/v0.1.4...v0.1.5) (2019-04-18)



## 0.1.4 (2019-04-18)
