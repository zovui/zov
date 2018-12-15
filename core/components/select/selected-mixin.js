export default {
    props: {
        // 组件组装
        value: {
            type: [Number, String, Array]
        },
        data: {
            type: Array,
            required: true,
            default () {
                return []
            }
        },
        // value 字段的映射字段
        valueName: {
            type: String,
            default: 'value'
        },
        // label 字段的映射字段
        labelName: {
            type: String,
            default: 'label'
        },
        // 按哪个字段搜索
        queryName: {
            type: String,
            default: ''
        },
        // 多选
        multiple: {
            type: Boolean,
            default: false
        },
        // drop 属性
        noArrow: {
            type: Boolean,
            default: true
        },
        // select-head 属性
        placeholder: {
            type: String,
            default: ''
        },
        autofocus: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        noDataText: {
            type: String,
            default: '无数据...'
        }
    },
    data () {
        return {
            dropShow: this.autofocus && !this.filterable && !this.disabled,
            dropWidth: 220,
            currentItemArr: [],
            currentValueArr: [],
            query: '',
            queryResult: [],
            currentQueryName: this.queryName || this.labelName,
            timer: null,
            loading: true,
            queryLoading: true
        }
    },
    watch: {
        dropShow (val) {
            this.$emit('on-open-change', val)
        }
    },
    methods: {
        removeTagEnd () {
            // 解决删除tags动画完成后的高度变化导致popper不更新问题
            this.$children[0].$children[0].$children[1] && this.$children[0].$children[0].$children[1].popper.update()
        },
        dropShowFocus () {
            this.$refs['zov-select-head'].headFocus()
            this.dropShow = true
        },
        dropHideBlur () {
            this.$refs['zov-select-head'].headBlur()
            this.dropShow = false
        },
        throttleFn (callback, timeInterval) {
            clearTimeout(this.timer)
            this.timer = null
            this.timer = setTimeout(callback, timeInterval || 300)
        }
    },
    mounted () {
        this.dropWidth = this.$el.offsetWidth
        this.defaultSelected(() => {
            if (this.autofocus) {
                this.dropShowFocus()
            } else {
                this.dropHideBlur()
            }
        })
    },
    updated () {
        if (this.dropWidth !== this.$el.offsetWidth) {
            this.dropWidth = this.$el.offsetWidth
            return
        }
    }
}
