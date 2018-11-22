<template>
    <!-- #005 -->
    <div :class="classes">
        <!-- 自定义前缀icon -->
        <div class="zov-input-prefix" v-if="prefix">
            <Icon :iconname="prefix"/>
        </div>
        <!-- input 主体 -->
        <input
            :value="value"
            :class="innerClasses"
            v-bind="$attrs"
            v-on="inputListeners"
            >
        <div class="zov-input-suffix" v-if="clearable || suffix">
            <!-- 自定义后缀icon -->
            <Icon v-if="suffix" :iconname="suffix"/>
            <!-- 功能性后缀icon -->
            <Icon v-if="clearable && value" iconname="zov-icon-close-circle-fill"/>
        </div>
    </div>
</template>
<script>
let prefix = 'zov-input'
export default {
    name: prefix,
    props: {
        // 值
        value: {
            type: String,
            default: ''
        },
        // 基本属性
        type: {
            validator (value) {
                return ['text', 'textarea', 'password', 'url', 'email', 'date'].indexOf(value) !== -1
            },
            default: 'text'
        },
        // 扩展属性
        clearable: {
            type: Boolean,
            default: false
        },
        prefix: {
            type: String,
            default: ''
        },
        suffix: {
            type: String,
            default: ''
        }
    },
    computed: {
        classes () {
            return [
                prefix,
                {}
            ]
        },
        innerClasses () {
            return [
                // 计算后缀个数，决定input padding值。
                prefix + '-prefix-' + this._transCount([this.prefix]),
                // 计算后缀个数，决定input padding值。
                prefix + '-suffix-' + this._transCount([this.clearable && this.value, this.suffix])
            ]
        },
        inputListeners: function () {
            let vm = this
            // `Object.assign` 将所有的对象合并为一个新对象
            return Object.assign({},
                // 我们从父级添加所有的监听器
                vm.$listeners,
                {
                    // 这里确保组件配合 `v-model` 的工作
                    input (event) {
                        vm.$emit('input', event.target.value)
                    }
                }
            )
        }
    },
    methods: {
        _transCount (arr) {
            let num = 0
            arr.forEach((item) => {
                num += Number(Boolean(item))
            })
            return num
        }
    }
}
</script>
