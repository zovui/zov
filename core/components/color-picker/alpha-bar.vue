<template>
	<div
		tabindex="0"
		@click="$el.focus()"
		class="zov-color-picker-alpha-bar"
		ref="container"
		@mousedown="handleMouseDown"
		@touchmove="handleChange"
		@touchstart="handleChange"
		@keydown.left="handleLeft"
		@keydown.right="handleRight"
		@keydown.up="handleUp"
		@keydown.down="handleDown"
	>
		<div class="zov-color-picker-alpha-bar-gradient" :style="gradientStyle">
			<div
				class="zov-color-picker-alpha-bar-gradient-pointer"
				:style="{ top: 0, left: `${value.hsl.a * 100}%` }"
			></div>
		</div>
	</div>
</template>
<script>
import HSAMixin from './hsa-mixin'
import { clamp } from './utils'
import { changeColor, toRGBAString } from './color-utils'
const prefix = 'zov-color-picker-alpha-bar'
export default {
	name: prefix,
	mixins: [HSAMixin],
	data() {
		const normalStep = 1
		const jumpStep = 10
		return {
			left: -normalStep,
			right: normalStep,
			up: jumpStep,
			down: -jumpStep,
			powerKey: 'shiftKey'
		}
	},
	computed: {
		gradientStyle() {
			const { r, g, b } = this.value.rgb
			const start = toRGBAString({ r, g, b, a: 0 })
			const finish = toRGBAString({ r, g, b, a: 1 })
			return {
				background: `linear-gradient(to right, ${start} 0%, ${finish} 100%)`
			}
		}
	},
	methods: {
		change(newAlpha) {
			const { h, s, l } = this.value.hsl
			const { a } = this.value
			if (a !== newAlpha) {
				this.$emit('input', changeColor({ h, s, l, a: newAlpha }))
			}
		},
		handleSlide(e, direction) {
			e.preventDefault()
			e.stopPropagation()
			this.change(
				clamp(
					e[this.powerKey]
						? direction
						: Math.round(this.value.hsl.a * 100 + direction) / 100,
					0,
					1
				)
			)
		},
		handleChange(e) {
			e.preventDefault()
			e.stopPropagation()
			const left = this.getLeft(e)
			if (left < 0) {
				this.change(0)
				return
			}
			const { clientWidth } = this.$refs.container
			if (left > clientWidth) {
				this.change(1)
				return
			}
			this.change(Math.round((left * 100) / clientWidth) / 100)
		}
	}
}
</script>
