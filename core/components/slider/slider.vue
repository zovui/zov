<template>
    <div class="zov-slider" :class="classList">
        <div class="zov-slider-bar"></div>
        <div class="zov-slider-tracker" :style="sliderTrackerStyles"></div>
        <div class="zov-slider-marks" v-if="formattedMarks.length">
            <SliderDot
                v-for="mark of formattedMarks"
                :key="'sliderDot-' + mark.value"
                :value="mark.value"
                :label="mark.label"
                :style="mark.style"
                :position="translateValueToPosition(mark.value)"
                :is-active="isActiveMark(mark.value)"
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

const COMPONENT_NAME = 'zov-slider'

/**
 * 获取离value最近的值
 * @param value
 * @param compareValue1
 * @param compareValue2
 * @return {*}
 */
function getClosetValue (value, compareValue1, compareValue2) {
    // value1的距离
    const distanceValue1 = Math.abs(value - compareValue1)
    // value2的距离
    const distanceValue2 = Math.abs(value - compareValue2)
    // 如果value1的距离小于value2的距离，则返回value1，否则返回value2
    return distanceValue1 < distanceValue2 ? compareValue1 : compareValue2
}

export default {
    name: COMPONENT_NAME,
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
        },
        // 垂直模式
        vertical: {
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
            // 区间左侧值
            beginValue: this.min,
            // 区间右侧值
            endValue: this.min,
            // 拖拽管理器
            draggable: null,
            // slider盒子模型数据
            sliderRectData: null,
            // 默认值, reset用
            defaultValue: this.value
        }
    },
    computed: {
        // 值的精度
        precision () {
            let value = this.step
            value = value.toString().split('.')
            return value[1] ? value[1].length : 0
        },
        // 区间大小
        size () {
            return this.max - this.min
        },
        // 左边控制按钮样式
        beginHandleStyles () {
            return this.translateValueToPosition(this.beginValue)
        },
        // 右边控制按钮样式
        endHandleStyles () {
            return this.translateValueToPosition(this.endValue)
        },
        // 区间追踪器的样式
        sliderTrackerStyles () {
            let { beginHandleStyles, beginValue, endValue, size, vertical } = this
            if (vertical) {
                return {
                    top: beginHandleStyles.top,
                    height: ((endValue - beginValue) / size * 100).toFixed(this.precision) + '%'
                }
            }
            return {
                left: beginHandleStyles.left,
                width: ((endValue - beginValue) / size * 100).toFixed(this.precision) + '%'
            }
        },
        formattedMarks () {
            let { min, max, marks } = this
            let formattedMarks = []
            if (isDef(marks)) {
                Object.keys(marks).forEach(value => {
                    value = Number(value)
                    if (
                        isNaN(value) ||
                        value < min ||
                        value > max
                    ) {
                        return
                    }
                    let config = this.marks[value]
                    formattedMarks.push({
                        value,
                        style: config.style,
                        label: isString(config) ? config : (config.label || value)
                    })
                })
            }
            formattedMarks.sort((mark1, mark2) => {
                return mark1.value < mark2.value ? -1 : 1
            })
            return formattedMarks
        },
        classList () {
            const classList = []
            if (this.vertical) {
                classList.push(`${COMPONENT_NAME}--vertical`)
            } else {
                classList.push(`${COMPONENT_NAME}--horizontal`)
            }
            return classList
        }
    },
    watch: {
        value: {
            handler (value) {
                this.setValue(value)
            },
            immediate: true
        },
        // 当step突变时，刷新组件状态
        step () {
            this.refresh()
        },
        // 当marks变化时，刷新组件状态
        marks () {
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
                const closestMarkValue = this.findClosestMarkValue(value)
                // 如果只能拖拽到marks上，则只取markValue
                if (onlyMarks) {
                    nextValue = closestMarkValue
                } else {
                    nextValue = getClosetValue(value, nextValue, closestMarkValue)
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
        // 更新slider盒子模型数据
        updateSliderRectData () {
            this.sliderRectData = this.$el.getBoundingClientRect()
        },
        // 将位置信息转换成值
        translatePositionToValue ({ currentX, currentY }) {
            let { min, size, sliderRectData, vertical } = this
            let percent = 0
            if (vertical) {
                percent = (currentY - sliderRectData.top) / sliderRectData.height
            } else {
                percent = (currentX - sliderRectData.left) / sliderRectData.width
            }
            return min + percent * size
        },
        // 将值转换为位置信息
        translateValueToPosition (value) {
            let { min, size, precision, vertical } = this
            const percent = ((value - min) / size * 100).toFixed(precision) + '%'
            if (vertical) {
                return {
                    top: percent
                }
            } else {
                return {
                    left: percent
                }
            }
        },
        // 查找对应值最近的markValue
        // TODO 性能优化，因为dragging时可能一直在某个区间内，所以不需要每次都查找，只需要到边界值时再查找
        findClosestMarkValue (value) {
            const marks = this.formattedMarks
            // 如果marks为空，则不作处理
            if (marks.length === 0) {
                return value
            }
            // 区间左侧索引值
            let beginIndex = 0
            // 区间右侧索引值
            let endIndex = marks.length - 1
            // 如果查找的值小于区间最小值，则返回区间最小值
            if (value <= marks[beginIndex].value) {
                return marks[beginIndex].value
            }
            // 如果查找的值大于区间最大值，则返回区间最大值
            if (value >= marks[endIndex].value) {
                return marks[endIndex].value
            }
            // 区间中间的索引值
            let midIndex
            // 区间中间的mark值
            let midValue
            // 运用二分查找，查找指定mark区间
            // 查找区间，当查找到区间大小为1时，循环停止，找到value对应的mark区间
            while ((endIndex - beginIndex) > 1) {
                midIndex = Math.floor((beginIndex + endIndex) / 2)
                midValue = marks[midIndex].value
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
            return getClosetValue(value, marks[beginIndex].value, marks[endIndex].value)
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
        },
        isActiveMark (value) {
            const { range, beginValue, endValue } = this
            if (range) {
                return beginValue <= value && value <= endValue
            } else {
                return value <= endValue
            }
        }
    }
}
</script>
