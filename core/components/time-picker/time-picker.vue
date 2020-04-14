<template>
	<div class="zov-time-picker">
		<Drop
			:no-arrow="noArrow"
			trigger="focus"
			:never="disabled"
			v-model="dropShow"
		>
			<template #drop-head>
				<SelectHead
					ref="zov-select-head"
					iconname="clock"
					arrowDownNoAnimation
					:disabled="disabled"
					:placeholder="placeholder"
					:size="size"
					:multiple="false"
					:clearable="clearable"
					v-model="currentValue"
					:dropShow="dropShow"
					@on-clear="clearTime"
					@click.native="!disabled && dropShowFocus()"
				/>
			</template>
			<TimeSpinner
				:dropShow="dropShow"
				:steps="steps"
				:clock-column="clockColumn"
				:disabled-times="disabledTimes"
				:hide-disabled-options="hideDisabledOptions"
				:use12-hour-system="use12HourSystem"
				v-model="time"
				@on-select="select"
			/>
		</Drop>
	</div>
</template>
<script>
import Drop from '../drop'
import TimeSpinner from './time-spinner'
import SelectHead from '../select/select-head'
import { UseSelectHeaderMixin } from '../../mixins'
import TimePickerMixin from './time-picker-mixin'
import dayjs from 'dayjs'
import toArray from 'dayjs/plugin/toArray'
dayjs.extend(toArray)
const prefix = 'zov-time-picker'
export default {
	name: prefix,
	mixins: [UseSelectHeaderMixin, TimePickerMixin],
	components: {
		Drop,
		SelectHead,
		TimeSpinner
	},
	props: {
		// 组件组装
		value: {
			type: [Number, String],
			default: ''
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
		format: {
			type: String,
			default() {
				return this.use12HourSystem ? 'hh:mm:ss a' : 'HH:mm:ss'
			}
		},
		valueFormat: {
			type: String,
			default() {
				return this.use12HourSystem ? 'hh:mm:ss a' : 'HH:mm:ss'
			}
		}
	},
	data() {
		return {
			currentValue: '',
			dropShow: false,
			actionExecution: false
		}
	},
	watch: {
		dropShow(val) {
			this.$emit('on-open-change', val)
		},
		value(val) {
			if (this.actionExecution) {
				return
			}
			this.time = this.formatToArr(this.parse(val))
			this.select()
		},
		time(val) {
			this.currentValue = this.arrToFormat(val)
		}
	},
	methods: {
		select() {
			this.actionExecution = true
			this.$emit('input', this.arrToFormat(this.time, this.valueFormat))
			this.$emit(
				'on-change',
				this.arrToFormat(this.time, this.valueFormat)
			)
			this.$nextTick(() => {
				this.actionExecution = false
			})
		},
		parse(val) {
			return dayjs('2000-00-00 ' + val)
		},
		formatToArr(date) {
			return date.toArray().slice(3, 6)
		},
		arrToFormat(arr, format) {
			format = format || this.format
			return arr.length ? this.parse(arr.join(':')).format(format) : ''
		},
		clearTime() {
			this.time = []
		}
	},
	mounted() {
		this.time = this.value ? this.formatToArr(this.parse(this.value)) : []
		this.autofocus ? this.dropShowFocus() : this.dropHideBlur()
	}
}
</script>
