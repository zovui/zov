<template>
	<div :class="classes" @click.stop="toggle" :disabled="disabled">
		<span
			:class="[
				'zov-switch-slot',
				currentValue ? 'zov-switch-slot-open' : 'zov-switch-slot-close'
			]"
		>
			<slot name="open" v-if="currentValue"></slot>
			<slot name="close" v-if="!currentValue"></slot>
		</span>
		<div class="zov-switch-inner"></div>
	</div>
</template>
<script>
const prefix = 'zov-switch'
export default {
	name: prefix,
	props: {
		value: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		size: {
			type: String,
			validator(value) {
				return ['small', 'default', 'large'].indexOf(value) !== -1
			},
			default() {
				return 'default'
			}
		}
	},
	data() {
		return {
			currentValue: this.value
		}
	},
	watch: {
		value(val) {
			this.currentValue = val
		},
		currentValue(val) {
			this.$emit('on-change', val)
		}
	},
	computed: {
		classes() {
			return [
				prefix,
				{
					[prefix + '-open']: this.value,
					[prefix + '-size-' + this.size]:
						this.size && this.size !== 'default'
				}
			]
		}
	},
	methods: {
		toggle() {
			if (this.disabled) {
				return
			}
			this.currentValue = !this.currentValue
			this.$emit('input', this.currentValue)
		}
	}
}
</script>
