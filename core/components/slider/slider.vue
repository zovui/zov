<template>
    <div class="zov-slider">
        <div class="zov-slider-bar"></div>
        <div class="zov-slider-tracker" :style="sliderTrackerStyles"></div>
        <div class="zov-slider-marks" v-if="formattedMarks.length">
            <SliderDot
                v-for="mark of formattedMarks"
                :key="'sliderDot-' + mark.value"
                :value="mark.value"
                :label="mark.label"
                :style="mark.style"
                :position="mark.position"
                :is-active="mark.isActive"
            />
        </div>
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
import SliderHandle from './slider-handle'
import Draggable from '../../utils/draggable'
import { isNumber, isString, isDef, isObject } from '../../utils'
import SliderDot from './slider-dot'

/**
 * 获取小数部分长度
 * @param value
 */
function getDecimalLength (value) {
    value = value.toString().split('.')
    return value[1] ? value[1].length : 0
}

export default {
    name: 'zov-slider',
    components: {
        SliderHandle,
        SliderDot
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
        },
        marks: {
            type: Object,
            validator (marks) {
                return Object.keys(marks).every(value => {
                    const config = marks[value]
                    if (isString(config)) {
                        return true
                    }
                    if (isObject(config)) {
                        let result = true
                        if (isDef(config.style)) {
                            result = result && isObject(config.style)
                        }
                        if (isDef(config.label)) {
                            result = result && isString(config.label)
                        }
                        return result
                    }
                    return false
                })
            }
        },
        // 是否只能拖拽到marks上
        onlyMarks: {
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
            beginValue: this.min,
            endValue: this.min,
            draggable: null,
            sliderRectData: null,
            defaultValue: this.value
        }
    },
    computed: {
        // 值的精度
        precision () {
            return getDecimalLength(this.step)
        },
        size () {
            return this.max - this.min
        },
        // 左边控制按钮样式
        beginHandleStyles () {
            return {
                left: this.translateValueToPosition(this.beginValue)
            }
        },
        // 右边控制按钮样式
        endHandleStyles () {
            return {
                left: this.translateValueToPosition(this.endValue)
            }
        },
        sliderTrackerStyles () {
            let { beginHandleStyles, beginValue, endValue, size } = this
            return {
                left: beginHandleStyles.left,
                width: ((endValue - beginValue) / size * 100).toFixed(this.precision) + '%'
            }
        },
        // TODO 性能优化
        formattedMarks () {
            let { min, max, range, beginValue, endValue } = this
            let marks = []
            if (isDef(this.marks)) {
                Object.keys(this.marks).forEach(value => {
                    value = Number(value)
                    if (
                        isNaN(value) ||
                        value < min ||
                        value > max
                    ) {
                        return
                    }
                    let originalConfig = this.marks[value]
                    let config = {
                        value,
                        style: null,
                        position: {
                            left: 0
                        },
                        label: value,
                        isActive: false
                    }
                    config.style = originalConfig.style
                    config.position.left = this.translateValueToPosition(value)
                    config.label = isString(originalConfig) ? originalConfig : (originalConfig.label || value)
                    if (range) {
                        config.isActive = beginValue <= value && value <= endValue
                    } else {
                        config.isActive = value <= endValue
                    }
                    marks.push(config)
                })
            }
            marks.sort((mark1, mark2) => {
                return mark1.value < mark2.value ? -1 : 1
            })
            return marks
        }
    },
    watch: {
        value: {
            handler (value) {
                this.setValue(value)
            },
            immediate: true
        },
        step () {
            this.refresh()
        }
    },
    methods: {
        // 使值正常化
        normalizeValue (value) {
            let { min, max, step, precision, onlyMarks, marks } = this
            if (!isNumber(value)) {
                return min
            }
            // 根据step去计算数值
            let nextValue = Math.round(value / step) * step
            // 如果使用了marks
            if (isDef(marks)) {
                // 获取新值对应的邻居marks值
                const neighborMarkValue = this.translateValueToMarkValue(value)
                // 如果只能拖拽到marks上，则只取markValue
                if (onlyMarks) {
                    nextValue = neighborMarkValue
                } else {
                    const distanceMarkValue = Math.abs(value - neighborMarkValue)
                    const distanceNextValue = Math.abs(value - nextValue)
                    // 如果与最近的markValue距离小于step算出的值，则吸附至markValue
                    if (distanceMarkValue <= distanceNextValue) {
                        nextValue = neighborMarkValue
                    }
                }
            }
            nextValue = Number(nextValue.toFixed(precision))
            if (nextValue < min) {
                nextValue = min
            } else if (value > max) {
                nextValue = max
            }
            return nextValue
        },
        updateSliderRectData () {
            this.sliderRectData = this.$el.getBoundingClientRect()
        },
        // 将位置信息转换成值
        translatePositionToValue ({ currentX }) {
            let { min, size, sliderRectData } = this
            let percent = (currentX - sliderRectData.left) / sliderRectData.width
            return min + percent * size
        },
        // 将值转换为位置信息
        translateValueToPosition (value) {
            let { min, size, precision } = this
            return ((value - min) / size * 100).toFixed(precision) + '%'
        },
        // 将值转换成mark上的值
        // TODO 性能优化，因为dragging时可能一直在某个区间内，所以不需要每次都查找，只需要到边界值时再查找
        translateValueToMarkValue (value) {
            // 如果marks为空，则不作处理
            if (this.formattedMarks.length === 0) {
                return value
            }
            const markValues = this.formattedMarks.map(mark => mark.value)
            let beginIndex = 0
            let endIndex = markValues.length - 1
            // 如果查找的值小于区间最小值，则返回区间最小值
            if (value <= markValues[beginIndex]) {
                return markValues[beginIndex]
            }
            // 如果查找的值大于区间最大值，则返回区间最大值
            if (value >= markValues[endIndex]) {
                return markValues[endIndex]
            }
            // 区间中间的索引值
            let midIndex
            // 区间中间的mark值
            let midValue
            // 运用二分查找，查找指定mark区间
            // 查找区间，当查找到区间大小为1时，循环停止，找到value对应的mark区间
            while ((endIndex - beginIndex) > 1) {
                midIndex = Math.floor((beginIndex + endIndex) / 2)
                midValue = markValues[midIndex]
                // 如果value为mark上的值，则返回
                if (value === midValue) {
                    return value
                }
                // 继续查找
                // 如果value大于中间值，则向右找，否则向左
                if (value > midValue) {
                    beginIndex = midIndex
                } else {
                    endIndex = midIndex
                }
            }
            midValue = (markValues[beginIndex] + markValues[endIndex]) / 2
            if (value >= midValue) {
                return markValues[endIndex]
            } else {
                return markValues[beginIndex]
            }
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
            const { min } = this
            let oldBeginValue = this.beginValue
            let oldEndValue = this.endValue
            let beginValue = min
            let endValue = min
            if (this.range) {
                beginValue = this.normalizeValue(value[0])
                endValue = this.normalizeValue(value[1])
            } else {
                endValue = this.normalizeValue(value)
            }
            if (beginValue === oldBeginValue && endValue === oldEndValue) {
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
        onDragstart (position) {
            this.updateSliderRectData()
            let value = this.translatePositionToValue(position)
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
        onDragging (position) {
            let { beginValue, endValue } = this
            let value = this.translatePositionToValue(position)
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
        },
        refresh () {
            let { beginValue, endValue } = this
            if (this.range) {
                this.setValue([beginValue, endValue])
            } else {
                this.setValue(endValue)
            }
        },
        reset () {
            this.setValue(this.defaultValue)
        }
    }
}
</script>
