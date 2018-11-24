<template>
    <div style="position: fixed;left:0;top:0;width: 100%;height: 100%;background: #ccc;z-index: 2000">
        <div v-for="item in ['left', 'right', 'top', 'bottom', 'left-top', 'right-top', 'left-bottom', 'right-bottom']" :key="item" :class="['drop', 'drop-'+item]">
            {{item}}
            <DropDown>
                <h3>标题</h3>
                文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本
            </DropDown>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .drop{
        position: fixed;
        z-index: 2000;
        box-shadow: 0 0 25px rgba(0,0,0,0.35);
        padding: 7px;
        @each $x in left right{
            &-#{$x}{
                #{$x}: 15px;
                top: 50%;
            }
            @each $y in top bottom{
                &-#{$x}-#{$y}{
                    #{$x}: 15px;
                    #{$y}: 15px;
                }
            }
        }
        @each $y in top bottom{
            &-#{$y}{
                #{$y}: 15px;
                left: 50%
            }
        }
    }
</style>
