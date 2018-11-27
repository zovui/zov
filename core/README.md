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
> 主题准备用 css变量 来实现，对于不支持css变量的浏览器放弃提供主题功能，主题还可以通过类名方案，但是会造成许多多余类名，而且不易维护。
> 并提供默认主题，dark主题则是将light主题色逆序。
```scss
    // 主题色
    --light-color-light-primary                :   #{$color-light-primary};
    --light-color-dark-primary                 :   #{$color-dark-primary};
    // 标题色，正文色，图标色，失效色，边框，分割线，背景色
    --light-color-title                        :   #{$color-black-1};
    --light-color-text                         :   #{$color-black-2};
    --light-color-sub                          :   #{$color-black-3};
    --light-color-disabled                     :   #{$color-black-4};
    --light-color-border                       :   #{$color-black-5};
    --light-color-divider                      :   #{$color-black-6};
    --light-color-background                   :   #{$color-black-7};
```

`#002`
> 在使用<transition-group/>的时候，发现数组插入数据不论push、unshift都会导致列表最后一项执行动画，为了解决这个问题，将循环项的key设置为item，而不是index。如：

```vue
<transition-group name="zov-slide" tag="div">
    <li class="zov-notice-case" v-for="item in list" :key="item || item.title"><!-- 这里注意 -->
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

