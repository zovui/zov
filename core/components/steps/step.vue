<template>
	<div :class="wrapClasses" :style="styles">
		<div :class="[prefix + '-tail']"></div>
		<div :class="[prefix + '-head']">
			<div :class="[prefix + '-head-inner']">
				<span
					v-if="
						!iconname &&
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
		iconname: {
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
		isCenter() {
			const {
				$parent: { alignCenter }
			} = this
			return alignCenter
		},
		isVertical() {
			const {
				$parent: { direction }
			} = this
			return direction === 'vertical'
		},
		space() {
			const {
				$parent: { space }
			} = this
			return space
		},
		wrapClasses() {
			return [
				`${prefix}-item`,
				`${prefix}-status-${this.currentStatus}`,
				this.isCenter && !this.isVertical ? `${prefix}-center` : '',
				{
					[`${prefix}-custom`]: !!this.iconname,
					[`${prefix}-next-error`]: this.nextError
				}
			]
		},
		iconClasses() {
			let icon = ''
			if (this.iconname) {
				icon = this.iconname
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
				width: !this.space
					? `${(1 / this.total) * 100}%`
					: `${parseInt(this.space)}px`
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
	}
}
</script>
