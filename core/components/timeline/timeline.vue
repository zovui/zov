<template>
	<ul class="zov-timeline">
		<slot />
		<TimelineGhostItem v-if="pending">
			<template #dot>
				<slot name="ghost-dot" />
			</template>
			<slot name="ghost-content" />
		</TimelineGhostItem>
	</ul>
</template>

<script>
import { findIndex } from '../../utils'
import TimelineGhostItem from './timeline-ghost-item'
export default {
	name: 'zov-timeline',
	components: {
		TimelineGhostItem
	},
	props: {
		pending: Boolean
	},
	provide() {
		const proxy = {
			addItem: vm => this.addItem(vm),
			removeItem: vm => this.removeItem(vm),
			nextIsGhost: vm => this.nextIsGhost(vm)
		}
		return {
			Timeline: proxy
		}
	},
	data() {
		return {
			items: []
		}
	},
	methods: {
		addItem(vm) {
			this.items.push(vm)
		},
		removeItem(vm) {
			const index = findIndex(this.items, v => v === vm)
			if (index !== -1) {
				this.items.splice(index, 1)
			}
		},
		nextIsGhost(vm) {
			const index = findIndex(this.items, item => item === vm)
			if (index === -1) {
				return false
			}
			if (index === this.items.length - 1) {
				return false
			}
			return (
				this.items[index + 1].$options.name === TimelineGhostItem.name
			)
		}
	}
}
</script>
