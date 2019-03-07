<template>
    <div class="zov-month-table">
        <!-- 操作 -->
        <div class="zov-date-picker-header">
            <div class="zov-date-picker-header-btns">
                <span @click="yearIndex--">
                    <Icon iconname="arrow-back"/>
                    <Icon iconname="arrow-back"/>
                </span>
                <Icon iconname="undo" v-if="datePickerComponent.tableShow.length > 1" @click="back"/>
            </div>
            <div class="zov-date-picker-header-center">
                <span @click="go(currentDate, 'year')">
                    {{ currentDate.format('YYYY') }}年
                </span>
            </div>
            <div class="zov-date-picker-header-btns">
                <span @click="yearIndex++">
                    <Icon iconname="arrow-forward"/>
                    <Icon iconname="arrow-forward"/>
                </span>
            </div>
        </div>
        <!-- 展示 -->
        <div class="zov-month-table-body">
            <div
                :class="[
                    'zov-month-table-cell',
                    {
                        'zov-month-table-cell-today': item.origin.format('YYYY-MM') === today.format('YYYY-MM'),
                        'zov-month-table-cell-current': !isThisPanel('month') && item.origin.format('YYYY-MM') === date.format('YYYY-MM'),
                        'zov-month-table-cell-selected': isThisPanel('month') && datePickerComponent.isSelected(item)
                    }
                ]"
                :disabled="item.disabled"
                v-for="(item, index) in months"
                :key="index + ''"
                @click="active(item)"
            >
                <span>
                    {{ item.origin.format('M') }}月
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import datePickerMixin from '../date-table-mixin'
let prefix = 'zov-month-table'
export default {
    name: prefix,
    mixins: [datePickerMixin],
    data () {
        return {
            yearIndex: 0
        }
    },
    watch: {
        date () {
            this.yearIndex = 0
        }
    },
    computed: {
        currentDate () {
            return this.date.add(this.yearIndex, 'year')
        },
        months () {
            let arr = []
            let date = this.currentDate
            let months = date.toObject().months
            for (let i = 0; i < 12; i++) {
                arr.push({
                    origin: date.add(i - months, 'month')
                })
            }
            return arr
        }
    }
}
</script>
