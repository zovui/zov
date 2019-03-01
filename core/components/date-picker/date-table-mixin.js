import Icon from '../icon'
import DatePickerMixin from './date-picker-mixin'
export default {
    mixins: [ DatePickerMixin ],
    components: {
        Icon
    },
    props: {
        date: '',
        today: ''
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
        isThisPanel (type) {
            return this.datePickerComponent.tableShow[0] === type
        }
    }
}
