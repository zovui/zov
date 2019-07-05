<template>
	<li class="zov-timeline-item" :class="classList">
		<div class="zov-timeline-indicator">
			<div class="zov-timeline-dot-wrap">
				<slot name="dot">
					<i class="zov-timeline-dot" :style="dotStyles"></i>
				</slot>
			</div>
			<div class="zov-timeline-line"></div>
		</div>
		<div class="zov-timeline-item-content"><slot /></div>
	</li>
</template>

<script>
import { includes } from '../../utils'
const PresetColors = ['primary', 'info', 'success', 'warning', 'error']

export default {
	name: 'zov-timeline-item',
	props: {
		color: {
			type: String,
			default: 'primary'
		}
	},
	inject: {
		Timeline: {
			default: null
		}
	},
	computed: {
		nextIsGhost() {
			if (this.Timeline) {
				return this.Timeline.nextIsGhost(this)
			}
			return false
		},
		isLast() {
			if (this.Timeline) {
				return this.Timeline.isLast(this)
			}
			return false
		},
		isPresetColor() {
			return includes(PresetColors, this.color)
		},
		classList() {
			const classList = []
			if (this.nextIsGhost) {
				classList.push('zov-timeline-item--next-ghost')
			}
			if (this.isLast) {
				classList.push('zov-timeline-item--last')
			}
			if (this.isPresetColor) {
				classList.push(`zov-timeline-item--${this.color}`)
			}
			return classList
		},
		dotStyles() {
			if (!this.isPresetColor) {
				return {
					borderColor: this.color
				}
			}
		}
	},
	created() {
		if (this.Timeline) {
			this.Timeline.addItem(this)
		}
	},
	beforeDestroy() {
		if (this.Timeline) {
			this.Timeline.removeItem(this)
		}
	}
}
</script>
