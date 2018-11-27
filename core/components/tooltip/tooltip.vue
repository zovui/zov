<template>
    <div
        class="zov-tooltip"
        @mouseenter="hoverHandle('enter')"
        @mouseleave="hoverHandle('leave')"
        @click="toggleHandle"
        @focus.capture="focusHandle('enter')"
        @blur.capture="focusHandle('leave')"
        v-click-outside="outCloseHandle"
    >
        <slot></slot>
        <transition name="zov-fade">
            <Popper :placement="placement"
                    :high-color="highColor"
                    :class="{'zov-tooltip-high-color': highColor}"
                    v-show="visible"
            >
                <div class="zov-tooltip-body">
                    <p v-if="title" class="zov-tooltip-title">
                        {{ title }}
                    </p>
                    <p v-if="text" class="zov-tooltip-description">
                        {{ text }}
                    </p>
                    <Icon
                        iconname="close"
                        v-if="closable"
                        class="zov-tooltip-close"
                        @click.stop="closeHandle"
                    />
                </div>
            </Popper>
        </transition>
    </div>
</template>
<script>
import { directive as clickOutside } from 'v-click-outside-x';
let prefix = 'zov-tooltip'
export default {
    name: prefix,
    directives: {
        clickOutside
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        text: {
            type: String,
            default: ''
        },
        // 默认弹出方向
        placement: {
            type: String,
            validator (value) {
                return ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'].indexOf(value) !== -1
            },
            default: 'top'
        },
        trigger: {
            type: String,
            validator (value) {
                return ['hover', 'click', 'focus', 'init'].indexOf(value) !== -1
            },
            default: 'hover'
        },
        enterDelay: {
            type: [String, Number],
            default: 0
        },
        leaveDelay: {
            type: [String, Number],
            default: 0
        },
        closable: {
            type: Boolean,
            default: false
        },
        highColor: {
            type: Boolean,
            default: false
        },
        never: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            visible: this.trigger === 'init',
            timer: null,
            mouseStatus: 'leave'
        }
    },
    watch: {
        value (val) {
            this.visible = val
        }
    },
    methods: {
        clearTimer () {
            clearTimeout(this.timer)
            this.timer = null
        },
        setVisible () {
            this.clearTimer()
            this.timer = setTimeout(() => {
                this.visible = this.mouseStatus === 'enter'
                this.$emit('input', this.visible)
                this.clearTimer()
            }, Number(this[this.mouseStatus + 'Delay']))
        },
        hoverHandle (type) {
            if (this.trigger !== 'hover') return
            this.mouseStatus = type
            this.setVisible()
        },
        toggleHandle () {
            if (this.trigger !== 'click') return
            this.mouseStatus = this.mouseStatus === 'leave' ? 'enter' : 'leave'
            this.setVisible()
        },
        focusHandle (type) {
            if (this.trigger !== 'focus') return
            this.mouseStatus = type
            this.setVisible()
        },
        closeHandle () {
            this.mouseStatus = 'leave'
            this.setVisible()
        },
        outCloseHandle () {
            if (this.never) return
            this.closeHandle()
        }
    }
}
</script>
