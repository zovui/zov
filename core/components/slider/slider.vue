<template>
    <div class="zov-slider">
        <SliderBar />
        <SliderTracker
            ref="sliderBar"
            :style="sliderTrackerStyles"
        />
        <SliderHandle
            v-if="range"
            ref="beginHandle"
            :style="beginHandleStyles"
            :tooltip-text="tipFormatter(beginValue)"
            :tooltip-visible="tooltipVisible"
        />
        <SliderHandle
            ref="endHandle"
            :style="endHandleStyles"
            :tooltip-text="tipFormatter(endValue)"
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
        // 值
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
        // 最小值
        min: {
            type: Number,
            default: 0
        },
        // 最大值
        max: {
            type: Number,
            default: 100
        },
        // tooltip展示模式
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
        // tooltip内容格式化
        tipFormatter: {
            type: Function,
            default: value => value.toString()
        },
        // 是否启用范围选择模式
        range: {
            type: Boolean,
            default: false
        },
        // 步长
        step: {
            type: Number,
            default: 1
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
            beginValue: this.min,
            endValue: this.min,
            draggable: null,
            sliderRectData: null
        }
    },
    computed: {
        size () {
            return this.max - this.min
        },
        // 左边控制按钮样式
        beginHandleStyles () {
            let { beginValue, min, size } = this
            return {
                left: Math.round((beginValue - min) / size * 100) + '%'
            }
        },
        // 右边控制按钮样式
        endHandleStyles () {
            let { endValue, min, size } = this
            return {
                left: Math.round((endValue - min) / size * 100) + '%'
            }
        },
        sliderTrackerStyles () {
            let { beginHandleStyles, beginValue, endValue, size } = this
            return {
                left: beginHandleStyles.left,
                width: Math.round((endValue - beginValue) / size * 100) + '%'
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
            this.$refs.endHandle.focus()
        },
        blur () {
            this.$refs.endHandle.blur()
        },
        /**
         * 设置一个值
         * 非range模式时,value为Number类型
         * 当range模式时，value为Number[]
         * @param {Array<Number>|Number} value
         */
        setValue (value) {
            const { min, max } = this
            let oldbeginValue = this.beginValue
            let oldendValue = this.endValue
            let beginValue = min
            let endValue = min
            if (this.range) {
                beginValue = normalizeValue(min, max, value[0])
                endValue = normalizeValue(min, max, value[1])
            } else {
                endValue = normalizeValue(min, max, value)
            }
            if (beginValue === oldbeginValue && endValue === oldendValue) {
                return
            }
            if (this.range) {
                value = [beginValue, endValue]
            } else {
                value = endValue
            }
            this.beginValue = beginValue
            this.endValue = endValue
            this.$emit('on-change', value)
        },
        onDragstart ({ currentX }) {
            let sliderRectData = this.sliderRectData = this.$el.getBoundingClientRect()
            let value = this.percent2Value((currentX - sliderRectData.left) / sliderRectData.width)
            let { beginValue, endValue } = this
            if (this.range) {
                const midValue = (endValue + beginValue) / 2
                if (value <= midValue) {
                    beginValue = value
                    this.$refs.beginHandle.dragstart()
                } else {
                    endValue = value
                    this.$refs.endHandle.dragstart()
                }
                value = [beginValue, endValue]
            } else {
                this.$refs.endHandle.dragstart()
            }
            this.setValue(value)
        },
        onDragging ({ currentX }) {
            let { beginValue, endValue, sliderRectData } = this
            let value = this.percent2Value((currentX - sliderRectData.left) / sliderRectData.width)
            if (this.range) {
                // 如果正在拖拽右边的handle时
                if (this.$refs.beginHandle.isDragging) {
                    // 当拖拽的值大于或等于右边handle所对应的值时
                    // 切换正在拖拽的handle
                    // 否则继续改变左侧区间的值
                    if (value >= endValue) {
                        this.$refs.beginHandle.dragend()
                        this.$refs.endHandle.dragstart()
                        this.setValue([endValue, value])
                    } else {
                        this.setValue([value, endValue])
                    }
                    return
                }
                // 如果正在拖拽右边的handle时
                if (this.$refs.endHandle.isDragging) {
                    // 当拖拽的值大于或等于handle所对应的值时
                    // 切换正在拖拽的handle
                    // 否则继续改变左侧区间的值
                    if (value <= beginValue) {
                        this.$refs.endHandle.dragend()
                        this.$refs.beginHandle.dragstart()
                        this.setValue([value, beginValue])
                    } else {
                        this.setValue([beginValue, value])
                    }
                    return
                }
                return
            }
            this.setValue(value)
        },
        onDragend () {
            if (this.range) {
                this.$refs.beginHandle.dragend()
                this.$refs.endHandle.dragend()
            } else {
                this.$refs.endHandle.dragend()
            }
        }
    }
}
</script>
