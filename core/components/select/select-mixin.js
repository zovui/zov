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
            default: false
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
            currentData: this.data,
            dropShow: this.autofocus && !this.filterable && !this.disabled,
            width: 220,
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
        isThisComponent (component) {
            return this.$options.name === component
        },
        dropUpdate () {
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
        },
        select (item, isDefault) {
            console.log(item)
            if (item.disabled) return
            this.multiple ? this.check(item, isDefault) : this.single(item, isDefault)
        },
        single (item, isDefault) {
            let isCascaderC = this.isThisComponent('zov-cascader')
            let value = item[(isCascaderC ? '__' : '') + this.valueName]
            // 清洗已选
            this.currentItemArr = []
            this.currentValueArr = []
            // 记录已选
            this.currentItemArr.push(item)
            this.currentValueArr.push(value)
            // 暴露数据
            this.$emit('input', value)
            this.$emit('on-change', item)
            // 单选query值设置
            this.query = item[(isCascaderC && !this.filterable ? '__' : '') + this.currentQueryName]
            // 收起下拉
            !isDefault && (isCascaderC
                ? !this.everyoneOptional && !this.whichColumnOptional.toString() && this.dropHideBlur()
                : this.dropHideBlur())
        },
        check (item, isDefault) {
            let isCascaderC = this.isThisComponent('zov-cascader')
            let value = item[(isCascaderC ? '__' : '') + this.valueName]
            if (isDefault) {
                this.currentItemArr.push(item)
            } else {
                if (this.currentValueArr.indexOf(value) !== -1) {
                    // 清洗已选
                    this.$delete(this.currentItemArr, this.currentItemArr.indexOf(item))
                    this.$delete(this.currentValueArr, this.currentValueArr.indexOf(value))
                } else {
                    // 记录已选
                    this.currentItemArr.push(item)
                    this.currentValueArr.push(value)
                }
            }
            // 暴露数据
            this.$emit('input', this.currentValueArr)
            this.$emit('on-change', this.currentItemArr)
            // 获取焦点
            !isDefault && this.dropShowFocus()
        }
    },
    mounted () {
        this.width = this.$el.offsetWidth
        this.defaultSelected && this.defaultSelected(() => {
            if (this.autofocus) {
                this.dropShowFocus()
            } else {
                this.dropHideBlur()
            }
        })
    },
    updated () {
        if (this.width !== this.$el.offsetWidth) {
            this.width = this.$el.offsetWidth
            return
        }
    }
}
