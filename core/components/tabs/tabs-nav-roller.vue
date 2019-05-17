<template>
	<div class="zov-tabs-nav-viewport" ref="viewport">
		<div class="zov-tabs-nav-roller" :style="styles" ref="roller">
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	name: 'zov-tabs-nav-roller',
	props: {
		scrollX: 0,
		scrollY: 0,
		tabRectList: Array
	},
	computed: {
		styles() {
			return {
				transform: `translate3d(${this.scrollX}px, ${
					this.scrollY
				}px, 0)`
			}
		}
	},
	methods: {
		getRollerRect() {
			return this.$refs.roller.getBoundingClientRect()
		},
		getViewportRect() {
			return this.$refs.viewport.getBoundingClientRect()
		}
	}
}
</script>
