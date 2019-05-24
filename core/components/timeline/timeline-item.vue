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
		nextIsGhost() {
			if (this.Timeline) {
				return this.Timeline.nextIsGhost(this)
			}
			return false
		},
		classList() {
			const classList = []
			if (this.nextIsGhost) {
				classList.push('zov-timeline-item--next-ghost')
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
