<template>
    <div class="zov-slider">
        <SliderBar
            :left="sliderBarData.left"
            :width="sliderBarData.width"
            @dragstart="onDragstart"
            @dragging="onDragging"
            @dragend="onDragend"
        >
            <template #handles>
                <Tooltip
                    ref="tooltip"
                    v-model="showTooltip"
                    :style="{
                        left: handleData.left
                    }"
                    class="zov-slider-handle-wrapper"
                    :text="tipFormatter(currentValue)"
                    :trigger="[]"
                    never
                    high-color
                >
                    <SliderHandle
                        ref="handle"
                        @mouseenter.native="onHandleMouseEnter"
                        @mouseleave.native="onHandleMouseleave"
                    />
                </Tooltip>
            </template>
        </SliderBar>
    </div>
</template>

<script>
import SliderBar from './slider-bar'
import SliderHandle from './slider-handle'
import Tooltip from '../tooltip'

export default {
    name: 'zov-slider',
    components: {
        Tooltip,
        SliderBar,
        SliderHandle
    },
    model: {
        prop: 'value',
        event: 'on-change'
    },
    props: {
        value: {
            type: Number,
            default: 0
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        },
        tooltipVisible: {
            type: String,
            default: 'default',
            validator (state) {
                return (
                    // 组件默认行为: handle hover、拖拽时展示
                    state === 'default' ||
                    // 总是隐藏
                    state === 'hidden' ||
                    // 总是显示
                    state === 'always'
                )
            }
        },
        tipFormatter: {
            type: Function,
            default: value => value.toString()
        }
    },
    data () {
        return {
            currentValue: this.value,
            showTooltip: false,
            isDragging: false
        }
    },
    computed: {
        size () {
            return this.max - this.min
        },
        completePercent () {
            let { currentValue, min, max, size } = this
            if (currentValue < min) {
                currentValue = min
            } else if (currentValue > max) {
                currentValue = max
            }
            return Math.round((currentValue - min) / size * 100) + '%'
        },
        sliderBarData () {
            return {
                left: '0',
                width: this.completePercent
            }
        },
        handleData () {
            return {
                left: this.completePercent
            }
        }
    },
    watch: {
        currentValue (value) {
            this.$emit('on-change', value)
        },
        tooltipVisible: {
            handler (visible) {
                switch (visible) {
                case 'hidden':
                    this.showTooltip = false
                    break
                case 'always':
                    this.showTooltip = true
                    break
                }
            },
            immediate: true
        }
    },
    methods: {
        percent2Value (percent) {
            let { min, max, size } = this
            let value = min + Math.round(percent * size)
            if (value < min) {
                value = min
            } else if (value > max) {
                value = max
            }
            return value
        },
        focus () {
            this.$refs.handle.focus()
        },
        blur () {
            this.$refs.handle.blur()
        },
        onDragstart (percent) {
            this.currentValue = this.percent2Value(percent)
            this.isDragging = true

            if (this.tooltipVisible === 'default') {
                this.showTooltip = true
            }

            this.$refs.tooltip.updatePopper()
        },
        onDragging (percent) {
            this.currentValue = this.percent2Value(percent)
            this.$refs.tooltip.updatePopper()
        },
        onDragend () {
            this.isDragging = false
            if (this.tooltipVisible === 'default') {
                this.showTooltip = false
            }
        },
        onHandleMouseEnter () {
            if (this.tooltipVisible !== 'default') {
                return
            }
            this.showTooltip = true
        },
        onHandleMouseleave () {
            // 如果拖拽过程中鼠标离开handle，则不作处理
            if (this.isDragging) {
                return
            }
            this.$nextTick(() => {
                switch (this.tooltipVisible) {
                case 'hidden':
                case 'default':
                    this.showTooltip = false
                    break
                case 'always':
                    this.showTooltip = true
                    break
                }
            })
        }
    }
}
</script>
