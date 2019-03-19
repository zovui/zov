# zov 样式，scss语法
## 变量覆盖
> 大量运用变量（!default），以确保变量可被修改。在业务代码中这样写即可以自定义zov主题
```scss
    // 主题色
    $color-primary              :   green;
    // 辅助色
    $color-info                 :   #2db7f5;
    $color-success              :   #19be6b;
    $color-warning              :   #ff9900;
    $color-error                :   #ed4014;
    // 引入zov样式表
    @import "zov.css";
```
> 将 `@import "zov.css"` 放在自定义变量后面，原理是zov中变量定义均为 `$color-primary : green !default;` 防止覆盖业务代码中的变量。

## color

zov支持配置主题色，通过scss颜色函数进行了一些颜色校准。一下为颜色相关配置及说明：

凡是带有 !default 都是可以自定义的，

```scss
// 【scss】配置，静态变量，项目构建依赖
// 主题色
$color-primary                      :   #2d8cf0 !default;
$toning-ratio                       :   5.5% !default;
$color-light-primary                :   lighten($color-primary, $toning-ratio) !default;
$color-dark-primary                 :   darken($color-primary, $toning-ratio) !default;
// 辅助色
$color-info                         :   #2db7f5 !default;
$color-success                      :   #19be6b !default;
$color-warning                      :   #ff9900 !default;
$color-error                        :   #ed4014 !default;
// 中性色
$color-default-title                :   #262626 !default;
$color-default-text                 :   #404040 !default;
$color-default-sub                  :   #777777 !default;
$color-default-placeholder          :   #7f7f7f !default;
$color-default-disabled             :   #cbcbcb !default;
$color-default-border               :   #e4e4e4 !default;
$color-default-divider              :   #eaeaea !default;
$color-default-background           :   #fcfcfc !default;

// 中性色基准色，默认为主题色
$color-neutral                      :   $color-primary !default;
// 获取主题色相
$color-primary-hue                  :   hue($color-neutral);
// 中性色饱和度， 当值为0%时则饱和度为0，色阶为黑白灰。当值向大调时中性色将混入一定饱和度的主题色
$color-neutral-saturate             :   0% !default;
/*
* 构建中性色
*
*/
// 标题色(title)，正文色(text)，辅助色/图标色(sub)，占位符(placeholder)，失效色(disabled)，边框(border)，分割线(dirvider)，背景色(background)，阴影(shadow)
$color-title                        :   adjust-hue(saturate($color-default-title,$color-neutral-saturate),$color-primary-hue) !default;
$color-text                         :   adjust-hue(saturate($color-default-text,$color-neutral-saturate),$color-primary-hue) !default;
$color-sub                          :   adjust-hue(saturate($color-default-sub,$color-neutral-saturate),$color-primary-hue) !default;
$color-placeholder                  :   adjust-hue(saturate($color-default-placeholder,$color-neutral-saturate),$color-primary-hue) !default;
$color-disabled                     :   adjust-hue(saturate($color-default-disabled,$color-neutral-saturate),$color-primary-hue) !default;
$color-border                       :   adjust-hue(saturate($color-default-border,$color-neutral-saturate),$color-primary-hue) !default;
$color-divider                      :   adjust-hue(saturate($color-default-divider,$color-neutral-saturate),$color-primary-hue) !default;
$color-background                   :   adjust-hue(saturate($color-default-background,$color-neutral-saturate),$color-primary-hue) !default;
$color-shadow                       :   rgba(0,0,0,0.25) !default;

```

