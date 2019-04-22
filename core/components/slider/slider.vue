<template>
    <div class="zov-slider">
        <SliderBar
            :left="sliderBarData.left"
            :width="sliderBarData.width"
            @dragstart="onDragstart"
            @dragging="onDragging"
        >
            <template #handles>
                <SliderHandle
                    ref="handle"
                    :left="handleData.left"
                />
            </template>
        </SliderBar>
    </div>
</template>

<script>
import SliderBar from './slider-bar'
import SliderHandle from './slider-handle'

export default {
    name: 'zov-slider',
    components: {
        SliderBar,
        SliderHandle
    },
    model: {
        prop: 'event',
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
        }
    },
    data () {
        return {
            currentValue: this.value,
            sliderBarMeta: null
        }
    },
    computed: {
        size () {
            return this.max - this.min
        },
        sliderBarData () {
            return {
                left: '0',
                width: Math.floor((this.currentValue - this.min) / this.size * 100) + '%'
            }
        },
        handleData () {
            return {
                left: Math.floor((this.currentValue - this.min) / this.size * 100) + '%'
            }
        }
    },
    watch: {
        currentValue (value) {
            this.$emit('on-change', value)
        }
    },
    methods: {
        focus () {
            this.$refs.handle.focus()
        },
        blur () {
            this.$refs.handle.blur()
        },
        percent2Value (percent) {
            let value = Math.floor(percent * this.size)
            if (value < this.min) {
                value = this.min
            } else if (value > this.max) {
                value = this.max
            }
            return value
        },
        onDragstart (percent) {
            this.currentValue = this.percent2Value(percent)
        },
        onDragging (percent) {
            this.currentValue = this.percent2Value(percent)
        }
    }
}
</script>
