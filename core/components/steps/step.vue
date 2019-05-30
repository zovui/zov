<template>
	<div :class="wrapClasses" :style="styles">
		<div :class="[prefix + '-tail']"><i></i></div>
		<div :class="[prefix + '-head']">
			<div :class="[prefix + '-head-inner']">
				<span
					v-if="
						!icon &&
							currentStatus != 'finish' &&
							currentStatus != 'error'
					"
					>{{ stepNumber }}</span
				>
				<span v-else :class="iconClasses"></span>
			</div>
		</div>
		<div :class="[prefix + '-main']">
			<div :class="[prefix + '-title']">{{ title }}</div>
			<slot>
				<div v-if="content" :class="[prefix + '-content']">
					{{ content }}
				</div>
			</slot>
		</div>
	</div>
</template>
<script>
import Emitter from '../../mixins/emitter'
import { oneOf } from '../../utils'

const prefix = 'zov-steps'
const iconprefix = 'zov-iconfont'

export default {
	name: prefix,
	mixins: [Emitter],
	props: {
		status: {
			validator(value) {
				return oneOf(value, ['wait', 'process', 'finish', 'error'])
			}
		},
		title: {
			type: String,
			default: ''
		},
		content: {
			type: String
		},
		icon: {
			type: String
		}
	},
	data() {
		return {
			prefix: prefix,
			stepNumber: '',
			nextError: false,
			total: 1,
			currentStatus: ''
		}
	},
	computed: {
		wrapClasses() {
			return [
				`${prefix}-item`,
				`${prefix}-status-${this.currentStatus}`,
				{
					[`${prefix}-custom`]: !!this.icon,
					[`${prefix}-next-error`]: this.nextError
				}
			]
		},
		iconClasses() {
			let icon = ''

			if (this.icon) {
				icon = this.icon
			} else {
				if (this.currentStatus == 'finish') {
					icon = 'checkmark'
				} else if (this.currentStatus == 'error') {
					icon = 'close'
				}
			}

			return [
				`${prefix}-icon`,
				`${iconprefix}`,
				{
					[`zi-${icon}`]: icon != ''
				}
			]
		},
		styles() {
			return {
				width: `${(1 / this.total) * 100}%`
			}
		}
	},
	watch: {
		status(val) {
			this.currentStatus = val
			if (this.currentStatus == 'error') {
				this.$parent.setNextError()
			}
		}
	},
	created() {
		this.currentStatus = this.status
	},
	mounted() {
		// this.dispatch('Steps', 'append');
	},
	beforeDestroy() {
		// this.dispatch('Steps', 'remove');
	}
}
</script>
