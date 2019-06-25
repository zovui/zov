<div align="center">
    <img src="http://zov.thephenix.cn/img/logo.5114b4c6.png">
</div>

# ZOV
一个基于vue的后台系统组件库。[官网](http://zov.thephenix.cn)

## 用法

### node

```bash
yarn add zov
npm install zov
```

```js
import Zov from '../core'
Vue.use(Zov)
// or
import { ColorPicker } from '../core'
Vue.component('ColorPicker', ColorPicker)
```

### browser

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
<script src="https://unpkg.com/zov@0.6.0/lib/zov.min.js"></script>
<script src="https://unpkg.com/zov@0.6.0/lib/zov.min.css"></script>
```

> 推荐链接到一个明确的版本号和构建文件，以避免新版本造成的不可预期的破坏

```html
<div id=app>
    <z-input v-model="input" autofocus placeholder="这是一个自定获取焦点的input"></z-input>
    <z-select
        :data="[{
                value: 1,
                label: 'item#1',
                disabled: true
            }, {
                value: 2,
                label: 'item#2'
            }]"
        placeholder="单选，某项disabled"
    >
        <div slot-scope="{props}">
            {{ props.item.label }}
        </div>
    </z-select>
    <z-time-picker
        format="H时m分"
        :steps="[2, 10, 15]"
    ></z-time-picker>
</div>
```

