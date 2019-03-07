<template>
    <div class="zov-date-table">
        <!-- 操作 -->
        <div class="zov-date-picker-header">
            <div class="zov-date-picker-header-btns">
                <span @click="yearIndex--">
                    <Icon iconname="arrow-back"/>
                    <Icon iconname="arrow-back"/>
                </span>
                <Icon
                    iconname="arrow-back"
                    @click="monthIndex--"
                />
            </div>
            <div class="zov-date-picker-header-center">
                <span @click="go(currentDate, 'year')">
                    {{ currentDate.format('YYYY') }}年
                </span>
                <span @click="go(currentDate, 'month')">
                    {{ currentDate.format('MM') }}月
                </span>
            </div>
            <div class="zov-date-picker-header-btns">
                <Icon
                    iconname="arrow-forward"
                    @click="monthIndex++"
                />
                <span @click="yearIndex++">
                    <Icon iconname="arrow-forward"/>
                    <Icon iconname="arrow-forward"/>
                </span>
            </div>
        </div>
        <!-- 展示 -->
        <div class="zov-date-table-header">
            <span v-if="showWeekNumbers"></span>
            <span
                v-for="(item, index) in datesHeader"
                :key="index + ''"
            >
                {{ item }}
            </span>
        </div>
        <div class="zov-date-table-body">
            <template v-for="(item, index) in weeks">
                <div
                    :class="[
                        'zov-date-table-week',
                        {
                            'zov-date-table-week-optional' : datePickerComponent.type === 'week',
                            'zov-date-table-week-optional-selected' : datePickerComponent.type === 'week' && datePickerComponent.isSelected(item[0])
                        }
                    ]"
                    :key="index + ''"
                    @click="datePickerComponent.type === 'week' && active(item[0])"
                >
                    <span v-if="showWeekNumbers" class="zov-date-table-cell-week">
                        {{ item[0].origin.week() }}
                    </span>
                    <span
                        :class="[
                            'zov-date-table-cell',
                            {
                                'zov-date-table-cell-today': innerItem.origin.format('YYYY-MM-DD') === today.format('YYYY-MM-DD'),
                                'zov-date-table-cell-not-in-month': innerItem.notInMonth,
                                'zov-date-table-cell-selected': datePickerComponent.type !== 'week' && isThisPanel('date') && datePickerComponent.isSelected(innerItem)
                            }
                        ]"
                        :disabled="innerItem.disabled"
                        v-for="(innerItem, innerIndex) in item"
                        :key="innerIndex + ''"
                        @click="active(innerItem)"
                    >
                        {{ innerItem.origin.toObject().date }}
                    </span>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import datePickerMixin from '../date-table-mixin'
let prefix = 'zov-date-table'
export default {
    name: prefix,
    mixins: [ datePickerMixin ],
    props: {
        showWeekNumbers: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            // 针对当前月份的差值，供date-picker-header前后切换传值进来
            monthIndex: 0,
            // 针对当前年份的差值，供date-picker-header前后切换传值进来
            yearIndex: 0
        }
    },
    watch: {
        date () {
            this.yearIndex = 0
            this.monthIndex = 0
        }
    },
    computed: {
        datesHeader () {
            return ['日', '一', '二', '三', '四', '五', '六']
        },
        currentDate () {
            // 返回某年某月的今天或者于今天最接近的一天，通过该天获取改天所在月的每一天。
            return this.date.add(this.yearIndex, 'year').add(this.monthIndex, 'month')
        },
        dates () {
            let arr = []
            let date = this.currentDate
            let startDate = date.startOf('month')
            let endDate = date.endOf('month')
            let weekLength = startDate.format('d')
            for (let j = 0; j < weekLength; j++) {
                let date = startDate.subtract(j + 1, 'day')
                arr.unshift({
                    notInMonth: true,
                    origin: date
                })
            }
            for (let i = 0; i < date.daysInMonth(); i++) {
                let date = startDate.add(i, 'day')
                arr.push({
                    origin: date
                })
            }
            let l = 42 - arr.length
            for (let k = 0; k < l; k++) {
                let date = endDate.add(k + 1, 'day')
                arr.push({
                    notInMonth: true,
                    origin: date
                })
            }
            return arr
        },
        weeks () {
            let arr = []
            let num = Math.ceil(this.dates.length / 7)
            for (let i = 0; i < num; i++) {
                arr.push(this.dates.slice(i * 7, i * 7 + 7))
            }
            return arr
        }
    }
}
</script>
