<template>
	<div class="zov-tabs-tab" :class="classList" @click="handleClick">
		<slot />
	</div>
</template>

<script>
export default {
	name: 'zov-tabs-tab',
	props: {
		id: String,
		index: Number,
		isActive: Boolean
	},
	inject: {
		Tabs: {
			default: null
		}
	},
	computed: {
		classList() {
			const classList = []
			if (this.isActive) {
				classList.push('zov-tabs-tab--active')
			}
			return classList
		}
	},
	methods: {
		handleClick() {
			this.Tabs.changeTo(this.id)
		}
	}
}
</script>
