import Icon from '../icon'
export default {
    components: {
        Icon
    },
    props: {
        date: '',
        today: ''
    },
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
        updateDate (date) {
            /* 更新currentDate */
            let _that = this.datePickerComponent
            _that.date = date
        },
        go (date, type) {
            let _that = this.datePickerComponent
            this.updateDate(date)
            _that.tableShow.push(type)
            _that.dropShowFocus()
        },
        back () {
            let _that = this.datePickerComponent
            _that.tableShow.pop()
            _that.dropShowFocus()
        },
        active (val) {
            let _that = this.datePickerComponent
            this.updateDate(val.origin)
            _that.tableShow.length > 1 ? this.back() : _that.select(val)
        },
        isThisPanel (type) {
            return this.datePickerComponent.tableShow[0] === type
        }
    }
}
