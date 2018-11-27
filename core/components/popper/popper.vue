<template>
    <div class="zov-popper">
        <slot></slot>
        <span v-if="!this.noArrow" class="zov-popper-arrow"></span>
    </div>
</template>
<script>
import Popper from 'popper.js'
let prefix = 'zov-popper'
export default {
    name: prefix,
    props: {
        placement: {
            type: String,
            default: 'bottom'
        },
        fix: {
            type: Boolean,
            default: false
        },
        noArrow: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            popper: null
        }
    },
    mounted () {
        let vm = this
        vm.popper = new Popper(
            vm.$el.parentNode,
            vm.$el,
            {
                placement: vm.placement, // 默认位置，默认【'bottom'】
                positionFixed: vm.fix, // 定位是否为position: fixed，默认【false】
                // eventsEnabled: true, // 是否启用事件，默认【true】
                // removeOnDestroy: false, // 在销毁（调用destroy）时，是否移除popper节点，默认【false】
                // onCreate: (data) => {
                //     console.log(data)
                //     console.log('popper 创建了')
                // },
                // onUpdate: (data) => {
                //     console.log('popper 更新了')
                // },
                // 自定义修饰
                modifiers: {
                    arrow: {
                        element: '.zov-popper-arrow'
                    },
                    computeStyle: {
                        gpuAcceleration: true // 使用CSS 3D转换来定位popper
                    },
                    flip: {
                        // behavior: 'clockwise' // 转换方式，默认【'flip'】
                    },
                    preventOverflow: {
                        boundariesElement: document.body // 边界元素， 'window'、 'viewport' 默认【scrollParent】
                    }
                }
            }
        )
    },
    destroyed () {
        this.popper.destroy()
    },
    updated () {
        this.popper.update()
    }
}
</script>
