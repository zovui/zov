<template>
    <div
        :class="wrapClasses"
        :style="wrapStyles">
        <div :class="childClasses">
            <slot></slot>
        </div>
        <slot name="trigger">
            <div v-show="showBottomTrigger" :class="triggerClasses" @click="toggleCollapse" :style="{width: siderWidth + 'px'}">
                <Icon iconname="arrow-forward"/>
            </div>
        </slot>
    </div>
</template>
<script>
import Icon from '../icon'
import { on, off } from '../../utils/dom'
import { dimensionMap, setMatchMedia } from '../../utils'
const prefix = 'zov-layout-sider'
setMatchMedia() // 设置媒体查询的方法
export default {
    name: prefix,
    components: {
        Icon
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        width: {
            type: [Number, String],
            default: 240
        },
        collapsedWidth: {
            type: [Number, String],
            default: 64
        },
        hideTrigger: {
            type: Boolean,
            default: false
        },
        breakpoint: {
            type: String,
            validator (val) {
                return ['xs', 'sm', 'md', 'lg', 'xl'].indexOf(val) !== -1
            }
        },
        collapsible: {
            type: Boolean,
            default: true
        },
        defaultCollapsed: {
            type: Boolean,
            default: false
        },
        reverseArrow: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            prefix: prefix,
            mediaMatched: false
        }
    },
    computed: {
        wrapClasses () {
            return [
                `${prefix}`,
                this.value ? `${prefix}-collapsed` : ''
            ]
        },
        wrapStyles () {
            return {
                width: `${this.siderWidth}px`,
                minWidth: `${this.siderWidth}px`,
                maxWidth: `${this.siderWidth}px`,
                flex: `0 0 ${this.siderWidth}px`
            }
        },
        triggerClasses () {
            return [
                `${prefix}-trigger`,
                this.value ? `${prefix}-trigger-collapsed` : ''
            ]
        },
        childClasses () {
            return `${this.prefix}-children`
        },
        siderWidth () {
            return this.collapsible || !this.mediaMatched
                ? this.value
                    ? parseInt(this.collapsedWidth)
                    : parseInt(this.width)
                : this.width
        },
        showBottomTrigger () {
            return this.collapsible ? !this.hideTrigger : false
        }
    },
    methods: {
        toggleCollapse () {
            let value = this.collapsible ? !this.value : false
            this.$emit('input', value)
        },
        matchMedia () {
            let matchMedia
            if (window.matchMedia) {
                matchMedia = window.matchMedia
            }
            let mediaMatched = this.mediaMatched
            this.mediaMatched = matchMedia(`(max-width: ${dimensionMap[this.breakpoint]})`).matches
            if (this.mediaMatched !== mediaMatched) {
                this.$emit('input', this.mediaMatched)
            }
        },
        onWindowResize () {
            this.matchMedia()
        }
    },
    watch: {
        value (stat) {
            this.$emit('on-collapse', stat)
        }
    },
    mounted () {
        if (this.defaultCollapsed) {
            this.$emit('input', this.defaultCollapsed)
        }
        if (this.breakpoint !== undefined) {
            on(window, 'resize', this.onWindowResize)
            this.matchMedia()
        }
    },
    beforeDestroy () {
        if (this.breakpoint !== undefined) {
            off(window, 'resize', this.onWindowResize)
        }
    }
}
</script>
