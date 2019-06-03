<template>
	<div :class="classes">
		<slot></slot>
	</div>
</template>
<script>
import { oneOf } from '../../utils'

const prefix = 'zov-steps'

export default {
	name: prefix,
	props: {
		current: {
			type: Number,
			default: 0
		},
		status: {
			validator(value) {
				return oneOf(value, ['wait', 'process', 'finish', 'error'])
			},
			default: 'process'
		},
		size: {
			validator(value) {
				return oneOf(value, ['small'])
			}
		},
		direction: {
			validator(value) {
				return oneOf(value, ['horizontal', 'vertical'])
			},
			default: 'horizontal'
		},
		space: [Number, String],
		alignCenter: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		classes() {
			return [
				`${prefix}`,
				`${prefix}-${this.direction}`,
				{
					[`${prefix}-${this.size}`]: !!this.size
				}
			]
		}
	},
	methods: {
		updateChildProps(isInit) {
			const total = this.$children.length
			this.$children.forEach((child, index) => {
				child.stepNumber = index + 1

				if (this.direction === 'horizontal') {
					child.total = total
				}
				if (!(isInit && child.currentStatus)) {
					// 已存在status,且在初始化时,则略过， error,则需要处理
					if (index == this.current) {
						if (this.status != 'error') {
							child.currentStatus = 'process'
						}
					} else if (index < this.current) {
						child.currentStatus = 'finish'
					} else {
						child.currentStatus = 'wait'
					}
				}

				if (child.currentStatus != 'error' && index != 0) {
					this.$children[index - 1].nextError = false
				}
			})
		},
		setNextError() {
			this.$children.forEach((child, index) => {
				if (child.currentStatus == 'error' && index != 0) {
					this.$children[index - 1].nextError = true
				}
			})
		},
		updateCurrent(isInit) {
			if (this.current < 0 || this.current >= this.$children.length) {
				return
			}
			if (isInit) {
				const current_status = this.$children[this.current]
					.currentStatus
				if (!current_status) {
					this.$children[this.current].currentStatus = this.status
				}
			} else {
				this.$children[this.current].currentStatus = this.status
			}
		},
		updateSteps() {
			this.updateChildProps(true)
			this.setNextError()
			this.updateCurrent(true)
		}
	},
	mounted() {
		this.updateSteps()
	},
	watch: {
		current() {
			this.updateChildProps()
		},
		status() {
			this.updateCurrent()
		}
	}
}
</script>
