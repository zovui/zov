<template>
    <RenderElTag
        v-on="$listeners"
        v-bind="$attrs"
        :tag="tag"
        :class="classes"
    >
        <!-- 自定义Spin, 默认为 `loading` -->
        <Spin v-if="loading" :spinname="spinname || 'loading'"/>
        <!-- 自定义图标 -->
        <Icon v-if="iconname" :iconname="iconname"/>
        <span v-if="$slots.default">
            <slot></slot>
        </span>
    </RenderElTag>
</template>
<script>
import Spin from '../spin'
import Icon from '../icon'
import RenderElTag from '../../utils/render-el-tag'
let prefix = 'zov-button'
export default {
    name: prefix,
    components: {
        Spin,
        Icon,
        RenderElTag
    },
    props: {
        /*
        *  looks -> shape -> size -> loading
        * */
        // style，default、primary、dashed、text、info、success、warning、error
        looks: {
            type: String,
            validator (value) {
                return ['default', 'primary', 'dashed', 'text', 'info', 'success', 'warning', 'error'].indexOf(value) !== -1
            },
            default: 'default'
        },
        // 形状有2种，default、circle
        shape: {
            type: String,
            validator (value) {
                return ['default', 'circle'].indexOf(value) !== -1
            },
            default: 'default'
        },
        // 尺寸有3中，small、default(middle)、large。说明：尺寸标识着按钮在项目中的不同语义，如：适用于长流程、多嵌套的form编辑中涉及到的多级别操作按钮
        size: {
            type: String,
            validator (value) {
                return ['small', 'default', 'large'].indexOf(value) !== -1
            },
            default () {
                return 'default'
            }
        },
        // loading 样式，见Spin组件
        loading: {
            type: Boolean,
            default: false
        },
        spinname: {
            type: String,
            default: ''
        },
        iconname: {
            type: String,
            default: ''
        },
        tag: {
            type: String,
            default: 'button'
        }
    },
    computed: {
        classes () {
            return [
                {
                    [prefix + '-type-' + this.looks]: this.looks && this.looks !== 'default',
                    [prefix + '-shape-' + this.shape]: this.shape && this.shape !== 'default',
                    [prefix + '-size-' + this.size]: this.size && this.size !== 'default',
                    'zov-button': true
                }
            ]
        }
    }
}
</script>
