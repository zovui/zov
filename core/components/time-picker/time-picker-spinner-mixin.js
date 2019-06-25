export default {
	props: {
		use12HourSystem: {
			type: Boolean,
			default: false
		},
		steps: {
			type: Array,
			default: () => []
		},
		disabledTimes: {
			type: Object,
			validator(val) {
				return (
					(val.h && val.h instanceof Array) ||
					(val.m && val.m instanceof Array) ||
					(val.s && val.s instanceof Array)
				)
			},
			default() {
				return {
					h: [],
					m: [],
					s: []
				}
			}
		},
		hideDisabledOptions: {
			type: Boolean,
			default: false
		}
	}
}
