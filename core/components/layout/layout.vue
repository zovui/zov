<template>
	<section :class="classes"><slot></slot></section>
</template>
<script>
const prefix = 'zov-layout'
export default {
	name: prefix,
	data() {
		return {
			hasSider: false
		}
	},
	computed: {
		classes() {
			return [
				`${prefix}`,
				{
					[`${prefix}-has-sider`]: this.hasSider
				}
			]
		}
	},
	methods: {
		findSider() {
			return this.$children.some(child => {
				return child.$options.name === 'zov-layout-sider'
			})
		}
	},
	mounted() {
		this.hasSider = this.findSider()
	}
}
</script>
