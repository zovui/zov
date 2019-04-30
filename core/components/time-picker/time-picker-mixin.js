import TimePickerSpinnerMixin from './time-picker-spinner-mixin'
import TimeSpinner from './time-spinner'
export default {
	mixins: [TimePickerSpinnerMixin],
	components: {
		TimeSpinner
	},
	data() {
		return {
			time: []
		}
	},
	computed: {
		clockColumn() {
			const HRegExp = /[H|h]{1,2}/
			const mRegExp = /[m]{1,2}/
			const sRegExp = /[s]{1,2}/
			let arr = []
			arr[0] = HRegExp.test(this.format) ? 1 : 0
			arr[1] = mRegExp.test(this.format) ? 1 : 0
			arr[2] = sRegExp.test(this.format) ? 1 : 0
			return arr
		}
	}
}
