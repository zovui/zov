<template>
    <div
        :class="classes"
        :disabled="disabled"
        @keydown.delete="deleteTag"
        @mouseenter="mouseStatus = 'enter'"
        @mouseleave="mouseStatus = 'leave'"
    >
        <template v-if="multiple">
            <!-- 多选 -->
            <div class="zov-select-head-multiple-tags">
                <transition-group
                    name="zov-scale"
                    @after-leave="removeTagEnd"
                >
                    <Tag
                        size="small"
                        v-if="data.length"
                        v-for="(item) in data"
                        :key="item[labelName]"
                        @on-close="$emit('on-remove-tag', item)"
                    >
                        {{item[labelName]}}
                    </Tag>
                </transition-group>
                <Input
                    v-if="filterable"
                    v-model="currentValue"
                    :style="styles"
                    ref="zov-select-head-input"
                />
            </div>
            <transition name="zov-fade">
                <span
                    class="zov-select-head-placeholder"
                    v-if="!data.length && !value"
                >
                {{placeholder}}
            </span>
            </transition>
        </template>
        <template v-else>
            <!-- 单选 -->
            <Input
                :placeholder="placeholder"
                v-model="currentValue"
                ref="zov-select-head-input"
            />
        </template>
        <Icon
            :class="arrowDownClasses"
            :iconname="clearStatus ? 'close-circle' : iconname"
            @click.self="clearHandle"
        />
    </div>
</template>
<script>
import Tag from '../tag'
import Icon from '../icon'
import Input from '../input'
let prefix = 'zov-select-head'
export default {
    name: prefix,
    components: {
        Tag,
        Icon,
        Input
    },
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        data: {
            type: Array,
            default () {
                return []
            }
        },
        multiple: {
            type: Boolean,
            default: false
        },
        clearable: {
            type: Boolean,
            default: true
        },
        filterable: {
            type: Boolean,
            default: false
        },
        labelName: {
            type: String,
            default: 'label'
        },
        placeholder: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        dropShow: {
            type: Boolean,
            default: false
        },
        iconname: {
            type: String,
            default: 'arrow-down'
        },
        arrowDownNoAnimation: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            currentValue: this.value,
            currentWidth: null,
            mouseStatus: 'leave'
        }
    },
    watch: {
        value (val) {
            this.currentValue = val
        },
        currentValue (val) {
            this.$emit('input', val)
        }
    },
    computed: {
        classes () {
            return [
                prefix,
                {
                    [prefix + '-no-filterable']: !this.filterable && !this.multiple,
                    [prefix + '-multiple']: this.multiple
                }
            ]
        },
        styles () {
            let w = this.currentValue.length * 14 + 3
            return {
                width: (w > this.currentWidth ? this.currentWidth : w) + 'px'
            }
        },
        arrowDownClasses () {
            return [
                prefix + '-arrow-down', {
                    [prefix + '-arrow-up']: this.dropShow && !this.arrowDownNoAnimation,
                    [prefix + '-clear-hover']: this.clearStatus
                }
            ]
        },
        clearStatus () {
            return this.clearable && (this.currentValue || this.data.length) && this.mouseStatus === 'enter'
        }
    },
    methods: {
        headFocus () {
            if (!this.filterable) return
            this.$refs['zov-select-head-input'].$el.getElementsByTagName('input')[0].focus()
        },
        headBlur () {
            if (!this.filterable) return
            this.$refs['zov-select-head-input'].$el.getElementsByTagName('input')[0].blur()
        },
        deleteTag () {
            !this.currentValue && this.multiple && this.data.length && this.$emit('on-remove-tag', this.data[this.data.length - 1])
        },
        clearHandle () {
            this.clearStatus && this.$emit('on-clear')
        },
        removeTagEnd () {
            // 解决删除tags动画完成后的高度变化导致popper不更新问题
            this.$parent.$children[1] && this.$parent.$children[1].popper.update()
        }
    },
    mounted () {
        this.currentWidth = this.$el.offsetWidth
    }
}
</script>
