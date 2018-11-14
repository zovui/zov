<template>
    <button
        @click="clickHandle"
        :type="htmlType"
        :class="classes"
    >
        <span>
            <slot></slot>
        </span>
    </button>
</template>
<script>
let prefix = 'zov-button-'
export default {
    name: 'zov-button',
    props: {
        /*
        *  type -> shape -> size -> loading
        * */
        // type有4种，default、primary、dashed、text
        type: {
            type: String,
            default () {
                return ''
            }
        },
        // 按钮颜色4种，info、success、warning、error
        color: {
            type: String,
            default () {
                return ''
            }
        },
        // 形状有2种，default、circle
        shape: {
            type: String,
            default () {
                return ''
            }
        },
        // 尺寸有3中，small、default(middle)、large。说明：尺寸标识着按钮在项目中的不同语义，如：适用于长流程、多嵌套的form编辑中涉及到的多级别操作按钮
        size: {
            type: String,
            default () {
                return 'middle'
            }
        },
        // 是否开启loading状态
        loading: {
            type: Boolean,
            default () {
                return false
            }
        },
        // loading 样式，见Spin组件
        spin: {
            type: String,
            default () {
                return 'lo'
            }
        },
        // 按钮为块级元素
        block: {
            type: Boolean,
            default () {
                return false
            }
        },
        // 原生buttom类型，submit、reset ...
        htmlType: {
            type: String,
            default () {
                return ''
            }
        }
    },
    computed: {
        classes () {
            return [
                'zov-button',
                {
                    [prefix + this.type]: this.type,
                    [prefix + this.color]: this.color,
                    [prefix + this.shape]: this.shape
                }
            ]
        }
    },
    methods: {
        clickHandle (event) {
            this.$emit('click', event)
        }
    }
}
</script>
