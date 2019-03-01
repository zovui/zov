<template>
    <div class="zov-date-picker">
        <Drop
            :no-arrow="noArrow"
            trigger="focus"
            :never="disabled"
            v-model="dropShow"
        >
            <!--<SelectHead-->
                <!--ref="zov-select-head"-->
                <!--slot="drop-head"-->
                <!--iconname="calendar"-->
                <!--:data="currentItemArr"-->
                <!--:disabled="disabled"-->
                <!--:placeholder="placeholder"-->
                <!--:filterable="true"-->
                <!--:multiple="multiple"-->
                <!--v-model="query"-->
                <!--:dropShow="dropShow"-->
                <!--@on-remove-tag="select"-->
                <!--@click.native="!disabled && dropShowFocus()"-->
                <!--@remove-tag-end="dropUpdate"-->
            <!--/>-->
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
            <!--<DatePickerHeader/>-->
            <DateTable
                v-show="tableShow[tableShow.length - 1] === 'date'"
                :date="date"
                :today="today"
            />
            <MonthTable
                v-show="tableShow[tableShow.length - 1] === 'month'"
                :date="date"
                :today="today"
            />
            <YearTable
                v-show="tableShow[tableShow.length - 1] === 'year'"
                :date="date"
                :today="today"
            />
        </Drop>
    </div>
</template>
<script>
import Drop from '../drop'
import SelectHead from '../select/select-head'
import DatePickerHeader from './date-picker-header'
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
        DatePickerHeader,
        DateTable,
        MonthTable,
        YearTable
    },
    props: {
        // 组件组装
        value: {
            type: [Number, String, Array]
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
            default: 'YYYY-MM-DD'
        }
    },
    data () {
        return {
            currentItemArr: [],
            currentValueArr: [],
            query: '',
            dropShow: false,
            tableShow: [this.type],
            currentDate: '',
            date: today,
            today: today
        }
    }
}
</script>
