<template>
    <div class="zov-slider">
        <SliderBar />
        <SliderTracker
            ref="sliderBar"
            :style="sliderTrackerStyles"
        />
        <SliderHandle
            v-if="range"
            ref="leftHandle"
            :style="leftHandleStyles"
            :tooltip-text="tipFormatter(leftValue)"
            :tooltip-visible="tooltipVisible"
        />
        <SliderHandle
            ref="rightHandle"
            :style="rightHandleStyles"
            :tooltip-text="tipFormatter(rightValue)"
            :tooltip-visible="tooltipVisible"
        />
    </div>
</template>

<script>
import SliderBar from './slider-bar'
import SliderTracker from './slider-tracker'
import SliderHandle from './slider-handle'
import Draggable from '../../utils/draggable'

function isNumber (value) {
    return typeof value === 'number' && !isNaN(value)
}

function normalizeValue (min, max, value) {
    if (!isNumber(value)) {
        value = min
        return value
    }
    if (value < min) {
        value = min
    } else if (value > max) {
        value = max
    }
    return value
}

export default {
    name: 'zov-slider',
    components: {
        SliderBar,
        SliderTracker,
        SliderHandle
    },
    model: {
        prop: 'value',
        event: 'on-change'
    },
    props: {
        value: {
            type: [Number, Array],
            default: 0,
            validator (value) {
                if (Array.isArray(value)) {
                    return value.every(v => typeof v === 'number')
                }
                return true
            }
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
        },
        range: {
            type: Boolean,
            default: false
        }
    },
    mounted () {
        this.draggable = new Draggable(this.$el)
            .on(Draggable.Events.DRAG_START, this.onDragstart.bind(this))
            .on(Draggable.Events.DRAGGING, this.onDragging.bind(this))
            .on(Draggable.Events.DRAG_END, this.onDragend.bind(this))
    },
    destroyed () {
        this.draggable.destroyed()
    },
    data () {
        return {
            leftValue: this.min,
            rightValue: this.min,
            draggable: null,
            sliderRectData: null
        }
    },
    computed: {
        size () {
            return this.max - this.min
        },
        // 左边控制按钮样式
        leftHandleStyles () {
            let { leftValue, min, size } = this
            return {
                left: Math.round((leftValue - min) / size * 100) + '%'
            }
        },
        // 右边控制按钮样式
        rightHandleStyles () {
            let { rightValue, min, size } = this
            return {
                left: Math.round((rightValue - min) / size * 100) + '%'
            }
        },
        sliderTrackerStyles () {
            let { leftHandleStyles, leftValue, rightValue, size } = this
            return {
                left: leftHandleStyles.left,
                width: Math.round((rightValue - leftValue) / size * 100) + '%'
            }
        }
    },
    watch: {
        value: {
            handler (value) {
                this.setValue(value)
            },
            immediate: true
        }
    },
    methods: {
        percent2Value (percent) {
            let { min, max, size } = this
            let value = min + Math.round(percent * size)
            return normalizeValue(min, max, value)
        },
        focus () {
            this.$refs.rightHandle.focus()
        },
        blur () {
            this.$refs.rightHandle.blur()
        },
        setValue (value) {
            const { min, max } = this
            let oldLeftValue = this.leftValue
            let oldRightValue = this.rightValue
            let leftValue = min
            let rightValue = min
            if (this.range) {
                leftValue = normalizeValue(min, max, value[0])
                rightValue = normalizeValue(min, max, value[1])
            } else {
                rightValue = normalizeValue(min, max, value)
            }
            if (leftValue === oldLeftValue && rightValue === oldRightValue) {
                return
            }
            if (this.range) {
                value = [leftValue, rightValue]
            } else {
                value = rightValue
            }
            this.leftValue = leftValue
            this.rightValue = rightValue
            this.$emit('on-change', value)
        },
        onDragstart ({ currentX }) {
            let sliderRectData = this.sliderRectData = this.$el.getBoundingClientRect()
            let { leftValue, rightValue } = this
            let value = this.percent2Value((currentX - sliderRectData.left) / sliderRectData.width)
            if (this.range) {
                const midValue = (rightValue + leftValue) / 2
                if (value <= midValue) {
                    leftValue = value
                    this.$refs.leftHandle.dragstart()
                } else {
                    rightValue = value
                    this.$refs.rightHandle.dragstart()
                }
                value = [leftValue, rightValue]
            } else {
                this.$refs.rightHandle.dragstart()
            }
            this.setValue(value)
        },
        onDragging ({ currentX }) {
            let { leftValue, rightValue, sliderRectData } = this
            let value = this.percent2Value((currentX - sliderRectData.left) / sliderRectData.width)
            if (this.range) {
                // 如果正在拖拽右边的handle时
                if (this.$refs.leftHandle.isDragging) {
                    // 当拖拽的值大于或等于右边handle所对应的值时
                    // 切换正在拖拽的handle
                    // 否则继续改变左侧区间的值
                    if (value >= rightValue) {
                        this.$refs.leftHandle.dragend()
                        this.$refs.rightHandle.dragstart()
                        this.setValue([rightValue, value])
                    } else {
                        this.setValue([value, rightValue])
                    }
                    return
                }
                // 如果正在拖拽右边的handle时
                if (this.$refs.rightHandle.isDragging) {
                    // 当拖拽的值大于或等于handle所对应的值时
                    // 切换正在拖拽的handle
                    // 否则继续改变左侧区间的值
                    if (value <= leftValue) {
                        this.$refs.rightHandle.dragend()
                        this.$refs.leftHandle.dragstart()
                        this.setValue([value, leftValue])
                    } else {
                        this.setValue([leftValue, value])
                    }
                    return
                }
                return
            }
            this.setValue(value)
        },
        onDragend () {
            if (this.range) {
                this.$refs.leftHandle.dragend()
                this.$refs.rightHandle.dragend()
            } else {
                this.$refs.rightHandle.dragend()
            }
        }
    }
}
</script>
