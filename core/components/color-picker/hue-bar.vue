<template>
	<div
		tabindex="0"
		@click="$el.focus()"
		class="zov-color-picker-hue-bar"
		ref="container"
		@mousedown="handleMouseDown"
		@touchmove="handleChange"
		@touchstart="handleChange"
		@keydown.left="handleLeft"
		@keydown.right="handleRight"
		@keydown.up="handleUp"
		@keydown.down="handleDown"
	>
		<div
			class="zov-color-picker-hue-bar-pointer"
			:style="{ top: 0, left: `${percent}%` }"
		></div>
	</div>
</template>
<script>
import HASMixin from './hsa-mixin'
import { clamp } from './utils'
import { changeColor } from './color-utils'
const prefix = 'zov-color-picker-hue-bar'
export default {
	name: prefix,
	mixins: [HASMixin],
	data() {
		const normalStep = (1 / 360) * 25
		const jumpStep = 20 * normalStep
		return {
			left: -normalStep,
			right: normalStep,
			up: jumpStep,
			down: -jumpStep,
			powerKey: 'shiftKey',
			percent: clamp((this.value.hsl.h * 100) / 360, 0, 100)
		}
	},

	watch: {
		value(val) {
			!this.colorPickerComponent.dragging &&
				(this.percent = clamp((val.hsl.h * 100) / 360, 0, 100))
		}
	},

	methods: {
		change(percent) {
			this.percent = clamp(percent, 0, 100)
			const { h, s, l, a } = this.value.hsl
			const newHue = clamp((percent / 100) * 360, 0, 360)
			if (h !== newHue) {
				this.$emit('input', changeColor({ h: newHue, s, l, a }))
			}
		},
		handleSlide(e, direction) {
			e.preventDefault()
			e.stopPropagation()
			if (e[this.powerKey]) {
				this.change(direction < 0 ? 0 : 100)
				return
			}
			this.change(this.percent + direction)
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
				this.change(100)
				return
			}
			this.change((left * 100) / clientWidth)
		}
	}
}
</script>
