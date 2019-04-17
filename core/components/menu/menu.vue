<template>
    <ul :class="classes" :style="styles">
        <slot>menu body</slot>
    </ul>
</template>
<script>
import { findComponentsDownward, findComponentUpward } from '../../utils'
const prefix = 'zov-menu'
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
            type: String,
            default: '240px'
        },
        indent: {
            type: [String, Number],
            default: 15
        },
        noArrow: {
            type: Boolean,
            default: false
        },
        thumbnail: {
            type: Boolean,
            default: false
        },
        thumbnailWidth: {
            type: String,
            default: '56px'
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
        currentThumbnail () {
            return this.mode === 'vertical' && this.thumbnail
        },
        classes () {
            return [
                prefix,
                prefix + '-' + this.mode,
                this.highColor && prefix + '-high',
                this.currentThumbnail && prefix + '-thumbnail'
            ]
        },
        styles () {
            return {
                padding: this.mode === 'vertical' ? '0' : '0 ' + this.indent + 'px',
                width: this.mode === 'vertical'
                    ? this.thumbnail
                        ? this.siderUpward ? '100%' : this.thumbnailWidth
                        : this.siderUpward ? '100%' : this.width
                    : '100%'
            }
        },
        siderUpward () {
            return findComponentUpward(this, 'zov-layout-sider')
        }
    },
    watch: {
        currentActiveName (val) {
            this.updateMenuSubActive()
            this.$emit('on-change', val)
        },
        currentThumbnail (val) {
            val && setInterval(() => {
                this.currentThumbnail && findComponentsDownward(this, 'zov-popper').forEach(component => {
                    component.popper.update()
                })
            }, 15)
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
