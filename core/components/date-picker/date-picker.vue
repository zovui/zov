<template>
	<div class="zov-date-picker">
		<Drop
			:no-arrow="noArrow"
			trigger="focus"
			:never="disabled"
			v-model="dropShow"
		>
			<template #drop-head>
				<SelectHead
					ref="zov-select-head"
					iconname="calendar"
					arrow-down-no-animation
					:data="currentItemArr"
					:disabled="disabled"
					:placeholder="placeholder"
					:size="size"
					:filterable="true"
					:clearable="clearable"
					:multiple="multipleOfCorrect"
					v-model="query"
					:dropShow="dropShow"
					@on-remove-tag="select"
					@on-clear="clearDate"
					@click.native="!disabled && dropShowFocus()"
				/>
			</template>
			<div class="zov-date-picker-body">
				<DateTable
					v-if="tableShow[tableShow.length - 1] === 'date'"
					:drop-show="dropShow"
					:date="date"
					:today="today"
					:show-week-numbers="showWeekNumbers"
					:disabled-date="disabledDate"
				/>
				<MonthTable
					v-if="tableShow[tableShow.length - 1] === 'month'"
					:drop-show="dropShow"
					:date="date"
					:today="today"
					:disabled-date="disabledDate"
				/>
				<YearTable
					v-if="tableShow[tableShow.length - 1] === 'year'"
					:drop-show="dropShow"
					:date="date"
					:today="today"
					:disabled-date="disabledDate"
				/>
				<TimeSpinner
					v-if="type === 'datetime'"
					v-show="timeSpinnerShow"
					:dropShow="dropShow && timeSpinnerShow"
					:format="format"
					:steps="steps"
					:clock-column="clockColumn"
					:disabled-times="disabledTimes"
					:hide-disabled-options="hideDisabledOptions"
					:use12-hour-system="use12HourSystem"
					v-model="time"
				/>
			</div>
			<div v-if="type === 'datetime'" class="zov-date-picker-footer">
				<Button
					looks="text"
					@click="timeSpinnerShow = !timeSpinnerShow"
				>
					{{ timeSpinnerShow ? '选择日期' : '选择时间' }}
				</Button>
			</div>
		</Drop>
	</div>
</template>
<script>
import Drop from '../drop'
import SelectHead from '../select/select-head'
import DateTable from './table/date-table'
import MonthTable from './table/month-table'
import YearTable from './table/year-table'
import { UseSelectHeaderMixin } from '../../mixins'
import TimePickerMixin from '../time-picker/time-picker-mixin'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import toArray from 'dayjs/plugin/toArray'
import toObject from 'dayjs/plugin/toObject'
dayjs.extend(toArray)
dayjs.extend(toObject)
dayjs.extend(weekOfYear)
let today = dayjs()
const prefix = 'zov-date-picker'
export default {
	name: prefix,
	mixins: [UseSelectHeaderMixin, TimePickerMixin],
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
			type: [Number, String, Array],
			default: ''
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
		size: {
			type: String,
			validator(value) {
				return ['small', 'default', 'large'].indexOf(value) !== -1
			},
			default() {
				return 'default'
			}
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
			validator(value) {
				return (
					['date', 'datetime', 'year', 'month', 'week'].indexOf(
						value
					) !== -1
				)
			},
			default: 'date'
		},
		format: {
			type: String,
			default() {
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
					case 'date':
						f = 'YYYY-MM-DD'
						break
					case 'datetime':
						f = this.use12HourSystem
							? 'YYYY-MM-DD hh:mm:ss a'
							: 'YYYY-MM-DD HH:mm:ss'
						break
				}
				return f
			}
		},
		showWeekNumbers: {
			type: Boolean,
			default: true
		},
		disabledDate: {
			type: Function,
			default: () => false
		}
	},
	data() {
		return {
			currentItemArr: [],
			currentValueArr: [],
			query: '',
			dropShow: false,
			timeSpinnerShow: false,
			tableShow: (() => {
				let f = []
				if (this.type === 'datetime' || this.type === 'week') {
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
	computed: {
		multipleOfCorrect() {
			return this.type === 'datetime' ? false : this.multiple
		}
	},
	watch: {
		dropShow(val) {
			this.$emit('on-open-change', val)
			!this.multipleOfCorrect && (this.query = this.currentValueArr[0])
		},
		query(val) {
			if (!val) {
				this.date = today
				return
			}
			let date = dayjs(this.parseDate(val))
			date.isValid() && (this.date = date)
		},
		time() {
			let len = this.currentItemArr.length
			if (!(len && this.type === 'datetime')) return
			let date = this.setTimeToDate(this.currentItemArr[len - 1].origin)
			this.currentItemArr[len - 1].origin = date
			this.currentItemArr[len - 1].label = date.format(this.format)
			this.currentValueArr[len - 1] = date.format(this.format)
			this.query = this.currentValueArr[0]
			this.$emit('input', this.currentValueArr[0])
			this.$emit('on-change', this.currentItemArr[0])
		}
	},
	methods: {
		clearDate() {
			this.clear()
			this.time = [0, 0, 0]
		},
		setTimeToDate(date) {
			return date
				.set('hour', this.time[0])
				.set('minute', this.time[1])
				.set('second', this.time[2])
		},
		dateFormatValue(date) {
			if (this.type === 'week') {
				const weekRegExp = /[W|w]{1,2}/
				const twoWeekRegExp = /[W|w]{2,}/
				const yearRegExp = /[Y|y]{1,}/
				let dateValue = this.format.replace(
					yearRegExp,
					date.format(this.format.match(yearRegExp)[0])
				)
				if (twoWeekRegExp.test(this.format)) {
					return dateValue.replace(
						twoWeekRegExp,
						date.week() < 10 ? '0' + date.week() : date.week()
					)
				} else if (weekRegExp.test(this.format)) {
					return dateValue.replace(weekRegExp, date.week())
				}
			} else if (this.type === 'datetime') {
				return this.setTimeToDate(date).format(this.format)
			} else {
				return date.format(this.format)
			}
		},
		isSelected(val) {
			let date = val.origin
			return (
				this.currentValueArr.indexOf(this.dateFormatValue(date)) !== -1
			)
		},
		select(val, isDefault) {
			if (val.disabled) return
			this.multipleOfCorrect
				? this.check(val, isDefault)
				: this.single(val, isDefault)
		},
		single(val, isDefault) {
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
			this.$emit('on-change', val)
			// 单选query值设置
			this.query = this.currentValueArr[0]
			// 收起下拉
			!isDefault && !(this.type === 'datetime') && this.dropHideBlur()
		},
		check(val, isDefault) {
			let date = val.origin
			function _addV() {
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
					let index = this.currentValueArr.indexOf(
						this.dateFormatValue(date)
					)
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
		},
		parseDate(val) {
			// 根据type解析日期
			if (this.type === 'week') {
				let parseArr = val
					.replace(/[^0-9]+/g, ' ')
					.trim()
					.split(' ')
				return dayjs(parseArr[0]).week(parseArr[1])
			}
			if (this.type === 'datetime') {
				this.time = dayjs(val)
					.toArray()
					.slice(3, 6)
			}
			return val
		},
		defaultSelected() {
			if (
				!(
					this.value === null ||
					this.value === undefined ||
					!this.value.toString()
				)
			) {
				if (this.value instanceof Array) {
					this.value.forEach(item => {
						this.select(
							{ origin: dayjs(this.parseDate(item)) },
							'default'
						)
					})
				} else if (typeof this.value === 'string') {
					this.select(
						{ origin: dayjs(this.parseDate(this.value)) },
						'default'
					)
				}
			}
		}
	},
	mounted() {
		this.defaultSelected()
		this.autofocus ? this.dropShowFocus() : this.dropHideBlur()
	}
}
</script>
