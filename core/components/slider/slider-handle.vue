<template>
	<Tooltip
		ref="tooltip"
		class="zov-slider-handle-wrapper"
		v-model="showTooltip"
		:text="tooltipText"
		:trigger="[]"
		never
		high-color
	>
		<div
			ref="handle"
			tabindex="0"
			class="zov-slider-handle"
			@focus="onFocus"
			@blur="onBlur"
			@mouseenter="onMouseEnter"
			@mouseleave="onMouseleave"
			@keydown="onKeyDown"
		></div>
	</Tooltip>
</template>

<script>
import Tooltip from '../tooltip'

const KeyboardCodeMap = {
	40: 'ArrowDown',
	38: 'ArrowUp',
	37: 'ArrowLeft',
	39: 'ArrowRight'
}

export default {
	name: 'zov-slider-handle',
	components: {
		Tooltip
	},
	props: {
		id: String,
		tooltipText: String,
		tooltipVisible: String,
		vertical: Boolean
	},
	data() {
		return {
			showTooltip: false,
			isDragging: false,
			isHover: false
		}
	},
	watch: {
		tooltipVisible: {
			handler(visible) {
				switch (visible) {
					case 'hidden':
						this.showTooltip = false
						break
					case 'always':
						this.showTooltip = true
						break
				}
			},
			immediate: true
		}
	},
	methods: {
		focus() {
			this.$refs.handle.focus()
		},
		blur() {
			this.$refs.handle.blur()
		},
		onFocus() {
			this.$emit('focus')
		},
		onBlur() {
			this.$emit('blur')
		},
		onMouseEnter() {
			this.isHover = true
			if (this.tooltipVisible !== 'default') {
				return
			}
			this.showTooltip = true
		},
		onMouseleave() {
			this.isHover = false
			// 如果拖拽过程中鼠标离开handle，则不作处理
			if (this.isDragging) {
				return
			}
			switch (this.tooltipVisible) {
				case 'hidden':
				case 'default':
					this.showTooltip = false
					break
				case 'always':
					this.showTooltip = true
					break
			}
		},
		dragstart() {
			this.isDragging = true
			this.focus()
			if (this.tooltipVisible === 'default') {
				this.showTooltip = true
			}
		},
		dragend() {
			this.isDragging = false
			if (this.tooltipVisible === 'default') {
				// 如果拖拽结束后handle仍处于hover状态，则不隐藏tooltip
				if (this.isHover) {
					return
				}
				this.showTooltip = false
			}
		},
		onKeyDown(e) {
			const action = KeyboardCodeMap[e.keyCode]
			if (!action) {
				return
			}
			e.preventDefault()
			const reduceKey = this.vertical ? 'ArrowDown' : 'ArrowLeft'
			const increaseKey = this.vertical ? 'ArrowUp' : 'ArrowRight'
			switch (action) {
				case reduceKey:
					this.$emit('reduce', this.id)
					break
				case increaseKey:
					this.$emit('increase', this.id)
					break
			}
		}
	}
}
</script>
