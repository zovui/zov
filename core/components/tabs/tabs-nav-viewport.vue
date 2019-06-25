<template>
	<div class="zov-tabs-nav-viewport" ref="viewport">
		<div class="zov-tabs-nav-roller" :style="styles" ref="roller">
			<slot />
		</div>
	</div>
</template>

<script>
import ResizeObserver from 'resize-observer-polyfill'
import debounce from 'lodash.debounce'
export default {
	name: 'zov-tabs-nav-viewport',
	props: {
		scrollX: Number,
		scrollY: Number
	},
	mounted() {
		// 设置resize观察者
		this.resizeObserver = new ResizeObserver(
			debounce(this.onResize.bind(this), 300)
		)
		// 观察viewport变化
		this.resizeObserver.observe(this.$refs.viewport)
		this.resizeObserver.observe(this.$refs.roller)
	},
	beforeDestroy() {
		this.resizeObserver.disconnect()
	},
	data() {
		return {
			resizeObserver: null
		}
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
		onResize() {
			this.$emit('resize')
		},
		getRollerRect() {
			return this.$refs.roller.getBoundingClientRect()
		},
		getViewportRect() {
			return this.$refs.viewport.getBoundingClientRect()
		}
	}
}
</script>
