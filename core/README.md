# 说明
## 锚点
### 待解决

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

### 已经解决

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
```css
    //在scss中
    $path: '/'
    @font-face{
        src: url('#{path}iconfont.ttf')
    }
```
> 在这里path必须为绝对路径，否则加载不到
