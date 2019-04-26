<template>
    <li class="zov-menu-sub" :disabled="disabled">
        <template v-if="isVerticalMode && !menuComponent.currentThumbnail">
            <div
                :class="classes"
                :style="paddingStyle"
                @click="clickHandle"
            >
                <span><slot name="title">menu sub title</slot></span>
                <Icon
                    class="zov-menu-sub-title-arrow"
                    iconname="arrow-down"
                    :style="iconStyles"
                />
            </div>
            <collapse-transition>
                <ul
                    ref="menu-sub-body"
                    class="zov-menu-sub-body"
                    v-show="opened"
                >
                    <slot>
                        menu option
                    </slot>
                </ul>
            </collapse-transition>
        </template>
        <Drop
            v-else
            v-model="opened"
            :no-arrow="menuComponent.noArrow"
            :trigger="menuComponent.trigger"
            :high-color="menuComponent.highColor"
            :placement="placement"
            :fix="false"
        >
            <template #drop-head>
                <div
                    :class="classes"
                    :style="paddingStyle"
                >
                    <Icon v-if="hasDefaultThumbnailIcon" :iconname="thumbnailIcon" thumbnail-icon/>
                    <span ref="title"><slot name="title">menu sub title</slot></span>
                    <Icon
                        class="zov-menu-sub-title-arrow"
                        iconname="arrow-down"
                        :style="iconStyles"
                    />
                </div>
            </template>
            <ul
                ref="menu-sub-body"
                class="zov-menu-sub-body"
                @click.stop="opened = true"
            >
                <slot>
                    menu option
                </slot>
            </ul>
        </Drop>
    </li>
</template>
<script>
import Drop from '../drop'
import Icon from '../icon'
import MenuMixin from './menu-mixin'
import CollapseTransition from '../base/collapse-transition'
import { findComponentUpward } from '../../utils'
const prefix = 'zov-menu-sub'
export default {
    name: prefix,
    mixins: [MenuMixin],
    components: {
        Drop,
        Icon,
        CollapseTransition
    },
    props: {
        name: {
            type: [String, Number],
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        thumbnailIcon: {
            type: String,
            default: 'options'
        }
    },
    data () {
        return {
            opened: false,
            active: false
        }
    },
    computed: {
        iconStyles () {
            return {
                transform: this.opened
                    ? this.parentsMenuSub.length ? 'rotate(-90deg)' : 'rotate(-180deg)'
                    : 'rotate(0deg)'
            }
        },
        classes () {
            return [
                prefix + '-title',
                this.active && prefix + '-title-active'
            ]
        },
        tooltipUpward () {
            return findComponentUpward(this, 'zov-tooltip')
        },
        placement () {
            return this.menuComponent.currentThumbnail || this.parentsMenuSub.length ? 'right-start' : 'bottom'
        },
        hasDefaultThumbnailIcon () {
            return !this.parentsMenuSub.length && this.menuComponent.currentThumbnail && !this.hasThumbnailIcon
        }
    },
    watch: {
        opened (val) {
            let name = this.name + ''
            let menu = this.menuComponent
            val
                ? menu.currentOpenNames.indexOf(name) === -1 && menu.currentOpenNames.push(name)
                : menu.$delete(menu.currentOpenNames, menu.currentOpenNames.indexOf(name))
            menu.$emit('on-open-change', {
                current: name,
                openNames: menu.currentOpenNames
            })
        },
        'menuComponent.currentOpenNames' (val) {
            this.initFn()
        }
    },
    methods: {
        clickHandle () {
            if (this.disabled) return
            const opened = this.opened
            this.menuComponent.accordion && this.$parent.$children.forEach(item => {
                if (item.$options.name === prefix) item.opened = false
            })
            this.opened = !opened
        },
        upDateOpened () {
            this.opened = this.menuComponent.currentOpenNames.join(',').split(',').indexOf(String(this.name)) !== -1
        },
        initFn () {
            this.tooltipUpward
                ? this.tooltipUpward.$on('after-enter', () => {
                    this.upDateOpened()
                    this.tooltipUpward.$off('after-enter')
                })
                : this.upDateOpened()
        }
    },
    mounted () {
        this.initFn()
    }
}
</script>
