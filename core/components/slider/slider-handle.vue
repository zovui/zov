<template>
    <Tooltip
        ref="tooltip"
        class="zov-slider-handle-wrapper"
        v-model="showTooltip"
        :text="tooltipText"
        :trigger="[]"
        never
        high-color
    >
        <div
            ref="handle"
            tabindex="0"
            class="zov-slider-handle"
            @focus="onFocus"
            @blur="onBlur"
            @mouseenter="onMouseEnter"
            @mouseleave="onMouseleave"
        ></div>
    </Tooltip>
</template>

<script>
import Tooltip from '../tooltip'

export default {
    name: 'zov-slider-handle',
    components: {
        Tooltip
    },
    props: {
        tooltipText: String,
        tooltipVisible: String
    },
    data () {
        return {
            showTooltip: false,
            isDragging: false,
            isHover: false
        }
    },
    watch: {
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
        focus () {
            this.$el.focus()
        },
        blur () {
            this.$el.blur()
        },
        onFocus () {
            this.$emit('focus')
        },
        onBlur () {
            this.$emit('blur')
        },
        onMouseEnter () {
            this.isHover = true
            if (this.tooltipVisible !== 'default') {
                return
            }
            this.showTooltip = true
        },
        onMouseleave () {
            this.isHover = false
            // 如果拖拽过程中鼠标离开handle，则不作处理
            if (this.isDragging) {
                return
            }
            switch (this.tooltipVisible) {
            case 'hidden':
            case 'default':
                this.showTooltip = false
                break
            case 'always':
                this.showTooltip = true
                break
            }
        },
        dragstart () {
            this.isDragging = true
            if (this.tooltipVisible === 'default') {
                this.showTooltip = true
            }
        },
        dragend () {
            this.isDragging = false
            if (this.tooltipVisible === 'default') {
                // 如果拖拽结束后handle仍处于hover状态，则不隐藏tooltip
                if (this.isHover) {
                    return
                }
                this.showTooltip = false
            }
        }
    }
}
</script>
