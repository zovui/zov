import Icon from '../icon'
import { findComponentUpward } from '../../utils'
export default {
    components: {
        Icon
    },
    props: {
        date: '',
        today: '',
        disabledDate: {
            type: Function,
            default: () => false
        },
        dropShow: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        datePickerComponent () {
            return findComponentUpward(this, 'zov-date-picker')
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
            if (val.disabled) return
            let _that = this.datePickerComponent
            this.updateDate(val.origin)
            _that.tableShow.length > 1 ? this.back() : _that.select(val)
        },
        isThisPanel (type) {
            return this.datePickerComponent.tableShow[0] === type
        }
    }
}
