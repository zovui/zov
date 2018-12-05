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
            default: true
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
    methods: {
        // 为了配合css变形动画，所以在popper更新后重设origin
        resetTransfromOrigin (origin) {
            let transObj = {
                'right': 'left',
                'left': 'right',
                'bottom': 'top',
                'top': 'bottom'
            }
            this.popper.popper.style.transformOrigin = transObj[origin]
        }
    },
    mounted () {
        let _this = this
        _this.popper = new Popper(
            _this.$el.parentNode,
            _this.$el,
            {
                placement: _this.placement, // 默认位置，默认【'bottom'】
                positionFixed: _this.fix, // 定位是否为position: fixed，默认【false】
                // eventsEnabled: true, // 是否启用事件，默认【true】
                // removeOnDestroy: false, // 在销毁（调用destroy）时，是否移除popper节点，默认【false】
                onCreate: (data) => {
                    this.resetTransfromOrigin(data.placement)
                },
                onUpdate: (data) => {
                    this.resetTransfromOrigin(data.placement)
                },
                // 自定义修饰
                modifiers: {
                    arrow: {
                        element: '.zov-popper-arrow'
                    },
                    computeStyle: {
                        gpuAcceleration: false // 使用CSS 3D转换来定位popper
                    },
                    flip: {
                        // behavior: 'clockwise' // 转换方式，默认【'flip'】
                    },
                    preventOverflow: {
                        boundariesElement: 'window' // 边界元素， 'window'、 'viewport' 默认【scrollParent】
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
