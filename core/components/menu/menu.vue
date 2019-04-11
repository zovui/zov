<template>
    <ul :class="classes" :style="styles">
        <slot>menu body</slot>
    </ul>
</template>
<script>
import { findComponentsDownward } from '../../utils'
let prefix = 'zov-menu'
export default {
    name: prefix,
    props: {
        mode: {
            validator (value) {
                return ['horizontal', 'vertical'].indexOf(value) !== -1
            },
            default: 'vertical'
        },
        highColor: {
            type: Boolean,
            default: false
        },
        activeName: {
            type: [String, Number],
            default: undefined
        },
        openNames: {
            type: Array,
            default () {
                return []
            }
        },
        trigger: {
            type: String,
            default: 'hover'
        },
        accordion: {
            type: Boolean,
            default: false
        },
        width: {
            type: [String, Number],
            default: 240
        },
        indent: {
            type: [String, Number],
            default: 15
        },
        noArrow: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            currentActiveName: this.activeName + '',
            currentOpenNames: this.openNames.join(',').split(','),
            activeFullPath: []
        }
    },
    computed: {
        classes () {
            return [
                prefix,
                prefix + '-' + this.mode,
                this.highColor && prefix + '-high'
            ]
        },
        styles () {
            return {
                padding: this.mode === 'vertical' ? '0' : '0 ' + this.indent + 'px',
                width: this.mode === 'vertical' ? this.width + 'px' : '100%'
            }
        }
    },
    watch: {
        currentActiveName () {
            this.updateMenuSubActive()
        }
    },
    methods: {
        updateMenuSubActive () {
            findComponentsDownward(this, 'zov-menu-sub').forEach(component => {
                this.activeFullPath.indexOf(component.name + '') === -1 && (component.active = false)
            })
        }
    }
}
</script>
