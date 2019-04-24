/**
* 说明：凡是用到select-header组件的都需要这两个方法来控制输入框焦点，如组件：date-picker、select、time-picker、cascader、big-data-list
**/
export default {
    props: {
        clearable: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        dropShowFocus () {
            this.$refs['zov-select-head'] && this.$refs['zov-select-head'].headFocus()
            this.dropShow = true
        },
        dropHideBlur () {
            this.$refs['zov-select-head'] && this.$refs['zov-select-head'].headBlur()
            this.dropShow = false
        },
        clear () {
            this.query = ''
            this.currentItemArr = []
            this.currentValueArr = []
            this.$emit('input', '')
        }
    }
}
