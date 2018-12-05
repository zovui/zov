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
            v-bind="inputAttrs"
            v-on="inputListeners"
            >
        <div class="zov-input-suffix" v-if="clearable || suffix">
            <!-- 自定义后缀icon -->
            <Icon v-if="suffix" :iconname="suffix"/>
            <!-- 功能性后缀icon -->
            <Icon class="zov-input-suffix-tool" v-if="eye && value" :iconname="canSee ? 'eye-off' : 'eye'" @click="see"/>
            <Icon class="zov-input-suffix-tool" v-if="clearable && value" iconname="close-circle" @click="clear"/>
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
            type: [String, Number],
            default: ''
        },
        // 扩展属性
        clearable: {
            type: Boolean,
            default: false
        },
        eye: {
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
    data () {
        return {
            canSee: this.eye
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
                prefix + '-prefix-' + this.transCount([this.prefix]),
                // 计算后缀个数，决定input padding值。
                prefix + '-suffix-' + this.transCount([this.clearable && this.value, this.suffix])
            ]
        },
        inputListeners () {
            let _this = this
            // `Object.assign` 将所有的对象合并为一个新对象，「#006」
            return Object.assign({}, _this.$listeners,
                {
                    // 这里确保组件配合 `v-model` 的工作
                    input (event) {
                        _this.$emit('input', event.target.value)
                    }
                }
            )
        },
        inputAttrs () {
            let _this = this
            let _type = this.$attrs.type
            return Object.assign({}, _this.$attrs, {
                type: _this.canSee ? 'password' : _type === 'password' ? 'text' : _type
            })
        }
    },
    methods: {
        transCount (arr) {
            let num = 0
            arr.forEach((item) => {
                num += Number(Boolean(item))
            })
            return num
        },
        clear () {
            this.$el.getElementsByTagName('input')[0].focus()
            this.$emit('input', '')
        },
        see () {
            this.$el.getElementsByTagName('input')[0].focus()
            this.canSee = !this.canSee
        }
    }
}
</script>
