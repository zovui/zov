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
