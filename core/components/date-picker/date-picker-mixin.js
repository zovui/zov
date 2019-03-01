export default {
    computed: {
        datePickerComponent () {
            let component = null
            function f (c) {
                if (!c && c.$options) return
                if (c.$options.name === 'zov-date-picker') {
                    component = c
                    return
                }
                f(c.$parent)
            }
            f(this)
            return component
        }
    },
    methods: {
        dropShowFocus () {
            this.datePickerComponent.$refs['zov-select-head'].headFocus()
            this.datePickerComponent.dropShow = true
        },
        active (val) {
            this.updateDate(val.origin)
            this.datePickerComponent.tableShow.length > 1 ? this.back() : this.select(val)
        },
        select (val) {
            let _that = this.datePickerComponent
            let date = val.origin
            if (this.isSelected(val)) {
                let index = _that.currentValueArr.indexOf(date.format(_that.format))
                this.$delete(_that.currentItemArr, index)
                this.$delete(_that.currentValueArr, index)
            } else {
                _that.currentItemArr.push({
                    label: date.format(_that.format),
                    origin: date
                })
                _that.currentValueArr.push(date.format(_that.format))
            }
            _that.dropShowFocus()
        },
        isSelected (val) {
            let _that = this.datePickerComponent
            let date = val.origin
            return _that.currentValueArr.indexOf(date.format(_that.format)) !== -1
        }
    }
}
