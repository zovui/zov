<template>
	<span class="zov-tabs-nav-action" :class="classList" @click="handleClick">
		<Icon class="zov-tabs-nav-action-icon" :iconname="icon" />
	</span>
</template>
<script>
import Icon from '../icon'
import { isHorizontal } from './helper'

export default {
	name: 'zov-tabs-nav-action',
	props: {
		isPrev: Boolean,
		isNext: Boolean,
		direction: String,
		disabled: Boolean
	},
	components: {
		Icon
	},
	computed: {
		icon() {
			if (this.isPrev) {
				return isHorizontal(this.direction) ? 'arrow-back' : 'arrow-up'
			}
			if (this.isNext) {
				return isHorizontal(this.direction)
					? 'arrow-forward'
					: 'arrow-down'
			}
		},
		classList() {
			const classList = []
			if (this.isPrev) {
				classList.push('zov-tabs-nav-action-prev')
			}
			if (this.isNext) {
				classList.push('zov-tabs-nav-action-next')
			}
			if (this.disabled) {
				classList.push(`zov-tabs-nav-action--disabled`)
			}
			return classList
		}
	},
	methods: {
		handleClick() {
			this.$emit('click')
		}
	}
}
</script>
