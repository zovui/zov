<template>
    <div class="zov-slider-bar">
        <div class="zov-slider-bar-indicator" :style="indicatorStyle"></div>
        <slot name="handles" ></slot>
    </div>
</template>

<script>
import Draggable from '../../utils/draggable'

export default {
    name: 'zov-slider-bar',
    props: {
        width: String,
        left: String
    },
    mounted () {
        const draggable = new Draggable(this.$el)
        let sliderBarMeta = null
        draggable
            .on(Draggable.Events.DRAG_START, ({ currentX }) => {
                sliderBarMeta = this.$el.getBoundingClientRect()
                this.$emit('dragstart', (currentX - sliderBarMeta.left) / sliderBarMeta.width)
            })
            .on(Draggable.Events.DRAGGING, ({ currentX }) => {
                this.$emit('dragging', (currentX - sliderBarMeta.left) / sliderBarMeta.width)
            })
            .on(Draggable.Events.DRAG_END, ({ currentX }) => {
                this.$emit('dragend', (currentX - sliderBarMeta.left) / sliderBarMeta.width)
            })
        this.draggable = draggable
    },
    destroyed () {
        this.draggable.destroyed()
    },
    data () {
        return {
            draggable: null
        }
    },
    computed: {
        indicatorStyle () {
            return {
                width: this.width
            }
        }
    }
}
</script>
