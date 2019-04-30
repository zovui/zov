<template>
	<div
		tabindex="0"
		@click="$el.focus()"
		class="zov-color-picker-main-panel"
		ref="container"
		@mousedown="handleMouseDown"
		@keydown.left="handleLeft"
		@keydown.right="handleRight"
		@keydown.up="handleUp"
		@keydown.down="handleDown"
	>
		<div
			class="zov-color-picker-main-panel-hue"
			:style="bgColorStyle"
		></div>
		<div class="zov-color-picker-main-panel-saturation"></div>
		<div class="zov-color-picker-main-panel-lightness"></div>
		<div
			class="zov-color-picker-main-panel-pointer"
			:style="pointerStyle"
		></div>
	</div>
</template>
<script>
import HSAMixin from './hsa-mixin'
import { clamp, getIncrement } from './utils'
import { changeColor } from './color-utils'
const prefix = 'zov-color-picker-main-panel'
export default {
	name: prefix,
	mixins: [HSAMixin],
	data() {
		const normalStep = 0.01
		return {
			left: -normalStep,
			right: normalStep,
			up: normalStep,
			down: -normalStep,
			multiplier: 10,
			powerKey: 'shiftKey'
		}
	},
	computed: {
		bgColorStyle() {
			return { background: `hsl(${this.value.hsv.h}, 100%, 50%)` }
		},
		pointerStyle() {
			return {
				top: `${-(this.value.hsv.v * 100) + 1 + 100}%`,
				left: `${this.value.hsv.s * 100}%`
			}
		}
	},
	methods: {
		change(h, s, v, a) {
			this.$emit('input', changeColor({ h, s, v, a }))
		},
		handleSlide(e, direction, key) {
			e.preventDefault()
			e.stopPropagation()
			const isPowerKey = e[this.powerKey]
			const increment = isPowerKey
				? direction * this.multiplier
				: direction
			const { h, s, v, a } = this.value.hsv
			const saturation = clamp(
				s + getIncrement(key, ['left', 'right'], increment),
				0,
				1
			)
			const bright = clamp(
				v + getIncrement(key, ['up', 'down'], increment),
				0,
				1
			)
			this.change(h, saturation, bright, a)
		},
		handleChange(e) {
			e.preventDefault()
			e.stopPropagation()
			const { clientWidth, clientHeight } = this.$refs.container
			const left = clamp(this.getLeft(e), 0, clientWidth)
			const top = clamp(this.getTop(e), 0, clientHeight)
			const saturation = left / clientWidth
			const bright = clamp(1 - top / clientHeight, 0, 1)
			this.change(this.value.hsv.h, saturation, bright, this.value.hsv.a)
		},
		handleMouseDown(e) {
			HSAMixin.methods.handleMouseDown.call(this, e)
			window.addEventListener('mouseup', this.handleChange, false)
		},
		unbindEventListeners(e) {
			HSAMixin.methods.unbindEventListeners.call(this, e)
			window.removeEventListener('mouseup', this.handleChange)
		}
	}
}
</script>
