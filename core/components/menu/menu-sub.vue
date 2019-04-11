<template>
    <li class="zov-menu-sub">
        <template v-if="menuComponent.mode === 'vertical'">
            <div
                :class="classes"
                :style="paddingStyle"
                @click="clickHandle"
            >
                <slot name="title">
                    menu sub title
                </slot>
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
                        menu item
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
            :placement="parentsMenuSub.length ? 'right-start' : 'bottom'"
            :fix="false"
        >
            <template #drop-head>
                <div
                    :class="classes"
                    :style="paddingStyle"
                >
                    <slot name="title">
                        menu sub title
                    </slot>
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
                    menu item
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
let prefix = 'zov-menu-sub'
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
        }
    },
    mounted () {
        this.tooltipUpward
            ? this.tooltipUpward.$on('after-enter', () => {
                this.upDateOpened()
                this.tooltipUpward.$off('after-enter')
            })
            : this.upDateOpened()
    }
}
</script>
