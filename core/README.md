# 说明
## 开发规范
### 命名规则
1、文件，以 `-` 链接

> eg:

```
.
|__文件夹-[附属名]
   |__文件名-[附属名].vue
   |__index.js
```

2、类、vue组件，大驼峰

> eg:

```javascript
import LoadingBar from './input.vue'
export default LoadingBar
```

```vue
<Button looks="info" @click="$Notice.info()">info</Button> 
<!-- 这里的$Notice，是vue组件 -->
```

3、函数、js参数，小驼峰

> eg:

```javascript
export default {
    props: {
        enterDelay: false
    },
    methods: {
        clickHandle () {}
    }
}
```

4、vue组件props参数名，以 `-` 链接，结合vue自动将带`-`参数转化为小驼峰的功能。

> eg:

```vue
<ToolTip
         title="提示"
         text="这是通过click等待1秒后弹出的tooltip"
         trigger="click"
         enter-delay="1000"
         >
    <Button>click 延时1s后呼出</Button>
</ToolTip>
```

5、组件命名，以 `-` 链接

> eg:

```javascript
export default {
    name: 'zov-input'
}
```

6、css命名空间，以 `-` 链接

> eg:

```scss
$prefix: zov-;
.#{$prefix}{
    &-inner{}
}
```

7、组件引用，大驼峰

> eg:

```vue
<ToolTip
         title="提示"
         text="这是通过click等待1秒后弹出的tooltip"
         >
    <Button>click 延时1s后呼出</Button>
</ToolTip>
```

## 锚点
### 待解决

### 已经解决

`#001`
> 主题用 css变量 来实现，对于不支持css变量的浏览器放弃提供主题功能，主题还可以通过类名方案，但是会造成许多多余类名，而且不易维护。
> 并提供默认主题，dark主题则是将light主题色逆序。
```scss
    // 主题色
    --light-color-light-primary                :   #{$color-light-primary};
    --light-color-dark-primary                 :   #{$color-dark-primary};
    // 标题色，正文色，图标色，失效色，边框，分割线，背景色
    --color-title                               :   #{$color-title};
    --color-text                                :   #{$color-text};
    --color-sub                                 :   #{$color-sub};
    --color-placeholder                         :   #{$color-placeholder};
    --color-disabled                            :   #{$color-disabled};
    --color-border                              :   #{$color-border};
    --color-divider                             :   #{$color-divider};
    --color-background                          :   #{$color-background};
```

`#002`
> 在使用<transition-group/>的时候，发现数组插入数据不论push、unshift都会导致列表最后一项执行动画，为了解决这个问题，将循环项的key设置为index +""，而不是index。如：

```vue
<transition-group name="zov-slide" tag="div">
    <li class="zov-notice-case" v-for="item in list" :key="index + ''"><!-- 这里注意 -->
        <div>
            {{ item.title }}
        </div>
    </li>
</transition-group>
```

`#003`

```scss
    //在scss中
    $path: '/'
    @font-face{
        src: url('#{path}iconfont.ttf')
    }
```
> 在这里path必须为绝对路径，否则加载不到

`#004`
> `stroke : currentColor`；这是一个css关键字，用于存储当前选择器所具有的color值，遵循css向上继承。兼容与ie9+，一般应用于同色，或者不支持color直接操作的，如svg的path
```scss
    path{
        cx: 0.5em;
        cy: 0.5em;
        r: 0.4em;
        stroke-width: 2px;
        fill: none;
        transform-origin: center;
        stroke: currentColor; // #004
        animation: #{$prefix-spin-bars-chrome-loading}dasharray-change 1.5s linear infinite;
    }
```

`#005`
> 在对input、select等原生组件进行封装时，经常遇到原生组件被包装到其他元素内部，致使事件、属性不能直接挂在到原生元素上，此时就可以利用，$attr(属性)、$listeners(事件)，将组件
上挂在的的属性、事件通过 v-bind、v-on挂在到原生元素上。见 [vue 官方文档-自定义事件](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model)

`#006`

> 这里为什么要拼接空 `{}`，因为当引用组件上未设置属性时，此时$attrs或者$listeners为空对象，vue会抛出警告。[Vue warn]: Error in render: "TypeError: Cannot add property type, object is not extensible"

```javascript
inputListeners () {
    let _this = this
    // `Object.assign` 将所有的对象合并为一个新对象，「#006」
    return Object.assign({}, _this.$listeners,{
        // 这里确保组件配合 `v-model` 的工作
        input (event) {
            _this.$emit('input', event.target.value)
        }
    })
},
inputAttrs () {
    let _this = this
    let _type = this.$attrs.type
    return Object.assign({}, _this.$attrs, {
    	type: _this.canSee ? 'password' : _type === 'password' ? 'text' : _type
    })
}
```

`#007`

> 在tooltip组件内，根据visible状态切换popper.js对popper实例的更新监听。
>
> 这在页面具有很多popper的时候，对性能有明显提高。

```
Popper.enableEventListeners（）
它将添加调整大小/滚动事件，并在触发时重新计算popper元素的位置。
Popper.disableEventListeners（）
它将删除调整大小/滚动事件，并且在触发时不会重新计算波普尔位置。onUpdate除非您update手动调用方法，否则它也不会再触发回调。
```

`008`

> `display: inline-block;` 代替 `flot:left`，通过设置 `white-space:nowrap;` 防止换行`.zov-cascader-body`宽度塌陷导致的`popper`组件`update`不彻底的问题。
>
> 说明：这里是在写级联插件的收用到的布局，是递归嵌套且同行展示的案例。

```scss
&-body{
    &>.#{$prefix-cascader}-column{
        border-left: none;
}
white-space:nowrap;
}
// 「#008」`display: inline-block;` 代替 `flot:left`，通过设置 `white-space:nowrap;` 防止换行`.zov-cascader-body`宽度塌陷导致的popper组件update不彻底的问题。
&-column{
    display: inline-block;
    height: $drop-down-max-height;
    border-left: 1px solid;
    @include get-color-border();
    white-space:nowrap;
    &-inner{
        white-space: unset;
        display: inline-block;
        height: 100%;
        min-width: 120px;
        padding-top: $gap-base / 2;
        padding-bottom: $gap-base / 2;
        overflow-y: auto;
    }
}
```

