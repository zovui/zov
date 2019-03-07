<template>
    <div class="zov-date-picker">
        <Drop
            :no-arrow="noArrow"
            trigger="focus"
            :never="disabled"
            v-model="dropShow"
        >
            <SelectHead
                ref="zov-select-head"
                slot="drop-head"
                iconname="calendar"
                :data="currentItemArr"
                :disabled="disabled"
                :placeholder="placeholder"
                :filterable="true"
                :multiple="multiple"
                v-model="query"
                :dropShow="dropShow"
                @click.native="!disabled && dropShowFocus()"
                @on-remove-tag="select"
            />
            <DateTable
                v-if="tableShow[tableShow.length - 1] === 'date'"
                :date="date"
                :today="today"
                :showWeekNumbers="showWeekNumbers"
            />
            <MonthTable
                v-if="tableShow[tableShow.length - 1] === 'month'"
                :date="date"
                :today="today"
            />
            <YearTable
                v-if="tableShow[tableShow.length - 1] === 'year'"
                :date="date"
                :today="today"
            />
        </Drop>
    </div>
</template>
<script>
import Drop from '../drop'
import SelectHead from '../select/select-head'
import DateTable from './date-table/date-table'
import MonthTable from './date-table/month-table'
import YearTable from './date-table/year-table'
import DatePickerMixin from './date-picker-mixin'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
dayjs.extend(weekOfYear)
let today = dayjs()
let prefix = 'zov-date-picker'
export default {
    name: prefix,
    mixins: [ DatePickerMixin ],
    components: {
        Drop,
        SelectHead,
        DateTable,
        MonthTable,
        YearTable
    },
    props: {
        // 组件组装
        value: {
            type: [String, Array]
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
        // date-picker 特性属性
        type: {
            type: String,
            validator (value) {
                return ['date', 'daterange', 'datetime', 'datetimerange', 'year', 'month', 'week'].indexOf(value) !== -1
            },
            default: 'date'
        },
        format: {
            type: String,
            default () {
                let f = ''
                switch (this.type) {
                case 'year':
                    f = 'YYYY'
                    break
                case 'month':
                    f = 'YYYY-MM'
                    break
                case 'week':
                    f = 'YYYY-WW'
                    break
                default:
                    f = 'YYYY-MM-DD'
                    break
                }
                return f
            }
        },
        showWeekNumbers: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            currentItemArr: [],
            currentValueArr: [],
            query: '',
            dropShow: false,
            tableShow: (() => {
                let f = []
                if (this.type === 'daterange' || this.type === 'datetime' || this.type === 'datetimerange' || this.type === 'week') {
                    f.push('date')
                } else {
                    f.push(this.type)
                }
                return f
            })(),
            date: today,
            today: today
        }
    },
    watch: {
        dropShow (val) {
            this.$emit('on-open-change', val)
        }
    },
    methods: {
        dropShowFocus () {
            this.$refs['zov-select-head'].headFocus()
            this.dropShow = true
        },
        dropHideBlur () {
            this.$refs['zov-select-head'].headBlur()
            this.dropShow = false
        },
        dateFormatValue (date) {
            if (this.type === 'week') {
                const weekRegExp = /[W|w]{1,2}/
                const twoWeekRegExp = /[W|w]{2,}/
                const yearRegExp = /[Y|y]{1,}/
                let dateValue = this.format.replace(yearRegExp, date.format(this.format.match(yearRegExp)[0]))
                if (twoWeekRegExp.test(this.format)) {
                    return dateValue.replace(twoWeekRegExp, date.week() < 10 ? '0' + date.week() : date.week())
                } else if (weekRegExp.test(this.format)) {
                    return dateValue.replace(weekRegExp, date.week())
                }
            } else {
                return date.format(this.format)
            }
        },
        isSelected (val) {
            let date = val.origin
            return this.currentValueArr.indexOf(this.dateFormatValue(date)) !== -1
        },
        select (val, isDefault) {
            if (val.disabled) return
            this.multiple ? this.check(val, isDefault) : this.single(val, isDefault)
        },
        single (val, isDefault) {
            let date = val.origin
            // 清洗已选
            this.currentItemArr = []
            this.currentValueArr = []
            // 记录已选
            this.currentItemArr.push({
                label: this.dateFormatValue(date),
                origin: date
            })
            this.currentValueArr.push(this.dateFormatValue(date))
            // 暴露数据
            this.$emit('input', this.currentValueArr[0])
            this.$emit('on-change', date)
            // 单选query值设置
            this.query = this.currentValueArr[0]
            // 收起下拉
            !isDefault && this.dropHideBlur()
        },
        check (val, isDefault) {
            let date = val.origin
            function _addV () {
                this.currentItemArr.push({
                    label: this.dateFormatValue(date),
                    origin: date
                })
                this.currentValueArr.push(this.dateFormatValue(date))
            }
            if (isDefault) {
                _addV.call(this)
            } else {
                if (this.isSelected(val)) {
                    let index = this.currentValueArr.indexOf(this.dateFormatValue(date))
                    this.$delete(this.currentItemArr, index)
                    this.$delete(this.currentValueArr, index)
                } else {
                    _addV.call(this)
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
        let _this = this
        function _parseDate (val) {
            // 根据type解析日期
            if (_this.type === 'week') {
                let parseArr = val.replace(/[^0-9]+/g, ' ').trim().split(' ')
                return dayjs(parseArr[0]).week(parseArr[1])
            }
            return val
        }
        if (!(this.value === null || this.value === undefined || !this.value.toString())) {
            if (this.value instanceof Array) {
                this.value.forEach((item) => {
                    this.select({ origin: dayjs(_parseDate(item)) }, 'default')
                })
            } else if (typeof this.value === 'string') {
                this.select({ origin: dayjs(_parseDate(this.value)) }, 'default')
            }
        }
        this.autofocus ? this.dropShowFocus() : this.dropHideBlur()
        console.log(dayjs('2019-45').week(5).format('YYYY-MM-DD'))
    }
}
</script>
