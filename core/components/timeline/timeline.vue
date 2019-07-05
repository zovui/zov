<template>
	<ul class="zov-timeline" :class="classList">
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
import { findIndex, includes } from '../../utils'
import TimelineGhostItem from './timeline-ghost-item'
export default {
	name: 'zov-timeline',
	components: {
		TimelineGhostItem
	},
	props: {
		pending: Boolean,
		mode: {
			type: String,
			default: 'left',
			validator(mode) {
				return includes(
					['left', 'right', 'alternate-left', 'alternate-right'],
					mode
				)
			}
		},
		reverse: Boolean
	},
	provide() {
		const proxy = {
			addItem: vm => this.addItem(vm),
			removeItem: vm => this.removeItem(vm),
			nextIsGhost: vm => this.nextIsGhost(vm),
			isLast: vm => this.isLast(vm)
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
	computed: {
		classList() {
			const classList = []
			classList.push(`zov-timeline--${this.mode}`)
			if (this.reverse) {
				classList.push(`zov-timeline--reverse`)
			}
			return classList
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
			// 倒序展示时，标记ghost节点本身下一个就是ghost
			if (this.reverse) {
				return (
					this.items[index].$options.name === TimelineGhostItem.name
				)
			}
			if (index === this.items.length - 1) {
				return false
			}
			return (
				this.items[index + 1].$options.name === TimelineGhostItem.name
			)
		},
		isLast(vm) {
			// 倒序展示时，原第一项元素变成最后一项
			if (this.reverse) {
				return vm === this.items[0]
			}
			return vm === this.items[this.items.length - 1]
		}
	}
}
</script>
