<template>
    <div class="zov-month-table">
        <!-- 操作 -->
        <div class="zov-date-picker-header">
            <div class="zov-date-picker-header-btns">
                <span @click="yearsIndex--">
                    <Icon iconname="arrow-back"/>
                    <Icon iconname="arrow-back"/>
                </span>
                <Icon iconname="undo" v-if="datePickerComponent.tableShow.length > 1" @click="back"/>
            </div>
            <div class="zov-date-picker-header-center">
                <div>
                    {{ years[0].origin.format('YYYY')+ "-" +years[years.length - 1].origin.format('YYYY')  }}年
                </div>
            </div>
            <div class="zov-date-picker-header-btns">
                <span @click="yearsIndex++">
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
                        'zov-month-table-cell-today': item.origin.format('YYYY') === today.format('YYYY'),
                        'zov-month-table-cell-current': !isThisPanel('year') && item.origin.format('YYYY') === date.format('YYYY'),
                        'zov-month-table-cell-selected': isThisPanel('year') && datePickerComponent.isSelected(item)
                    }
                ]"
                :disabled="item.disabled"
                v-for="(item, index) in years"
                :key="index + ''"
                @click="active(item)"
            >
                <span>
                    {{ item.origin.format('YYYY') }}年
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import datePickerMixin from '../date-table-mixin'
let prefix = 'zov-year-table'
export default {
    name: prefix,
    mixins: [ datePickerMixin ],
    data () {
        return {
            yearsIndex: 0
        }
    },
    watch: {
        date () {
            this.yearsIndex = 0
        },
        dropShow () {
            this.yearsIndex = 0
        }
    },
    computed: {
        currentDate () {
            return this.date.add(this.yearsIndex * 12, 'year')
        },
        years () {
            let arr = []
            let date = this.currentDate
            for (let i = 0; i < 12; i++) {
                let d = date.add(i - 1, 'year')
                arr.push({
                    origin: d,
                    disabled: this.disabledDate(d)
                })
            }
            return arr
        }
    }
}
</script>
