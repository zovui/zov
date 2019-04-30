<template>
	<div class="zov-time-spinner">
		<div
			class="zov-time-spinner-list"
			v-for="(clockScale, clockScaleIndex) in clockScales"
			:key="clockScaleIndex + ''"
			:ref="clockScaleIndex + ''"
			v-show="!!clockColumn[clockScaleIndex]"
		>
			<ul class="zov-time-spinner-list-box">
				<li
					v-for="item in clockScale"
					:key="item.text"
					:disabled="item.disabled"
					v-show="!item.hide"
					:class="[
						'zov-time-spinner-list-cell',
						{
							'zov-time-spinner-list-cell-selected':
								item.text === currentTime[clockScaleIndex]
						}
					]"
					@click="active($event, clockScaleIndex, item)"
				>
					{{ item.label || item.text }}
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import TimePickerMixin from './time-picker-spinner-mixin'
import { scrollTop } from '../../utils'
const prefix = 'zov-time-spinner'
export default {
	name: prefix,
	mixins: [TimePickerMixin],
	props: {
		value: {
			type: Array,
			default: () => []
		},
		dropShow: {
			type: Boolean,
			default: false
		},
		clockColumn: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			spinnerSteps: [1, 1, 1].map(
				(one, i) => Math.abs(this.steps[i]) || one
			),
			currentTime: []
		}
	},
	computed: {
		clockScales() {
			return [this.hoursList, this.minutesList, this.secondsList]
		},
		hoursList() {
			let hours = []
			const step = this.spinnerSteps[0]
			for (let i = 0; i < 24; i += step) {
				const hour = {
					text: 0,
					disabled: false,
					hide: false
				}
				hour.text = i
				if (this.use12HourSystem) {
					hour.label = i === 0 ? 12 : i - 12 > 0 ? i - 12 : i
				}
				if (
					this.disabledTimes.h.length &&
					this.disabledTimes.h.indexOf(i) > -1
				) {
					hour.disabled = true
					if (this.hideDisabledOptions) hour.hide = true
				}
				if (this.hours === i) hour.selected = true
				hours.push(hour)
			}

			return hours
		},
		minutesList() {
			let minutes = []
			const step = this.spinnerSteps[1]
			for (let i = 0; i < 60; i += step) {
				const minute = {
					text: 0,
					disabled: false,
					hide: false
				}
				minute.text = i
				if (
					this.disabledTimes.m.length &&
					this.disabledTimes.m.indexOf(i) > -1
				) {
					minute.disabled = true
					if (this.hideDisabledOptions) minute.hide = true
				}
				if (this.minutes === i) minute.selected = true
				minutes.push(minute)
			}
			return minutes
		},
		secondsList() {
			let seconds = []
			const step = this.spinnerSteps[2]
			for (let i = 0; i < 60; i += step) {
				const second = {
					text: 0,
					disabled: false,
					hide: false
				}
				second.text = i
				if (
					this.disabledTimes.s.length &&
					this.disabledTimes.s.indexOf(i) > -1
				) {
					second.disabled = true
					if (this.hideDisabledOptions) second.hide = true
				}
				if (this.seconds === i) second.selected = true
				seconds.push(second)
			}

			return seconds
		}
	},
	watch: {
		value(val) {
			if (val.toString() !== this.currentTime.toString()) {
				this.currentTime = this.value.map((item, index) => {
					let y = item % this.spinnerSteps[index]
					return y > this.spinnerSteps[index] / 2
						? item - y + this.spinnerSteps[index]
						: item - y
				})
			}
		},
		currentTime(val) {
			this.scroll(val)
			this.$emit('input', val)
		},
		dropShow() {
			this.scroll(this.currentTime)
		}
	},
	methods: {
		scroll(val) {
			val = val.length ? val : [0, 0, 0]
			val.forEach((item, index) => {
				// 「#010」
				// e.target.scrollIntoView({ behavior: 'smooth', block: 'start' })
				let scrollBox = this.$refs[index + ''][0]
				let data = this.clockScales[index]
				let j = 0
				for (let i = 0; i < data.length; i++) {
					let x = data[i]
					if (x.text === item) {
						j = i
						break
					}
				}
				let H = scrollBox.children[0].children[j].offsetTop
				scrollTop(scrollBox, scrollBox.scrollTop, H, 500)
			})
		},
		active(e, index, item) {
			if (item.disabled) return
			if (!this.currentTime.length) {
				for (let i = 0; i < 3; i++) {
					this.$set(this.currentTime, i, 0)
				}
			}
			this.$set(this.currentTime, index, item.text)
		}
	}
}
</script>
