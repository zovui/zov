<template>
	<li class="zov-timeline-item" :class="classList">
		<div class="zov-timeline-indicator">
			<div class="zov-timeline-dot-wrap">
				<slot name="dot">
					<i class="zov-timeline-dot"></i>
				</slot>
			</div>
			<div class="zov-timeline-line"></div>
		</div>
		<div class="zov-timeline-item-content"><slot /></div>
	</li>
</template>

<script>
export default {
	name: 'zov-timeline-item',
	inject: {
		Timeline: {
			default: null
		}
	},
	computed: {
		isLast() {
			if (this.Timeline) {
				return this.Timeline.isLastItem(this)
			}
			return false
		},
		classList() {
			const classList = []
			if (this.isLast) {
				classList.push('zov-timeline-item--last')
			}
			return classList
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
