<template>
    <div class="box">
        <div v-for="item in ['left', 'right', 'top', 'bottom', 'left-top', 'right-top', 'left-bottom', 'right-bottom']" :key="item" :class="['drop', 'drop-'+item]">
            {{item}}
            <Popper>
                <div style="width:256px;padding:8px 12px">
                    <h3>标题</h3>
                    文本文本文本文本文本文本文本文本
                </div>
            </Popper>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .box{
        position: relative;
        height: 1000px;
        border: 3px dashed;
    }
    .drop{
        position: absolute;
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
