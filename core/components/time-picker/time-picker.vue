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
					@on-remove-tag="
						'select'


					"
					@on-clear="clearTime"
					@click.native="!disabled && dropShowFocus()"
				/>
			</template>
			<TimeSpinner
				:dropShow="dropShow"
				:format="format"
				:steps="steps"
				:clock-column="clockColumn"
				:disabled-times="disabledTimes"
				:hide-disabled-options="hideDisabledOptions"
				:use12-hour-system="use12HourSystem"
				v-model="time"
			/>
		</Drop>
	</div>
</template>
<script>
import Drop from '../drop'
import SelectHead from '../select/select-head'
import { UseSelectHeaderMixin } from '../../mixins'
import TimePickerMixin from './time-picker-mixin'
import dayjs from 'dayjs'
import toArray from 'dayjs/plugin/toArray'
dayjs.extend(toArray)
let now = dayjs()
const prefix = 'zov-time-picker'
export default {
	name: prefix,
	mixins: [UseSelectHeaderMixin, TimePickerMixin],
	components: {
		Drop,
		SelectHead
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
		}
	},
	data() {
		return {
			currentValue: '',
			dropShow: false
		}
	},
	watch: {
		dropShow(val) {
			this.$emit('on-open-change', val)
		},
		time(val) {
			this.currentValue = val.length ? this.arrToFormat(val) : ''
			this.$emit('input', this.currentValue)
			this.$emit('on-change', this.currentValue)
		}
	},
	methods: {
		parse(val) {
			return dayjs('1990-05-04 ' + val)
		},
		formatToArr(date) {
			return date.toArray().slice(3, 6)
		},
		arrToFormat(arr) {
			return this.parse(arr.join(':')).format(this.format)
		},
		clearTime() {
			this.time = []
		}
	},
	mounted() {
		if (
			!(
				this.value === null ||
				this.value === undefined ||
				!this.value.toString()
			)
		) {
			this.time = this.value
				? this.formatToArr(this.parse(this.value))
				: this.formatToArr(now)
		}
		this.autofocus ? this.dropShowFocus() : this.dropHideBlur()
	}
}
</script>
