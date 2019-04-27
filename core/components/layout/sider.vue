<template>
    <div
        :class="wrapClasses"
        :style="wrapStyles">
        <div :class="childClasses">
            <slot>Sider</slot>
        </div>
        <slot name="trigger">
            <div v-show="collapsedTrigger" :class="triggerClasses" @click="toggleCollapse" :style="{width: siderWidth + 'px'}">
                <Icon iconname="arrow-back"/>
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
        collapsedTrigger: {
            type: Boolean,
            default: false
        },
        breakpoint: {
            type: String,
            validator (val) {
                return ['xs', 'sm', 'md', 'lg', 'xl'].indexOf(val) !== -1
            }
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
                this.collapsedTrigger && `${prefix}-has-trigger`,
                this.value && `${prefix}-collapsed`
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
            return this.value ? parseInt(this.collapsedWidth) : parseInt(this.width)
        }
    },
    methods: {
        toggleCollapse () {
            let value = !this.value
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
