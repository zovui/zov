<template>
	<li class="zov-timeline-item" :class="classList">
		<div class="zov-timeline-indicator">
			<div class="zov-timeline-dot-wrap">
				<slot name="dot">
					<Spin class="zov-timeline-spin" />
				</slot>
			</div>
			<div class="zov-timeline-line"></div>
		</div>
		<div class="zov-timeline-item-content"><slot /></div>
	</li>
</template>

<script>
import TimelineItem from './timeline-item'
import Spin from '../spin'
export default {
	name: 'zov-timeline-ghost-item',
	mixins: [TimelineItem],
	components: {
		Spin
	}
}
</script>
