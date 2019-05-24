<template>
	<ul class="zov-timeline">
		<slot />
	</ul>
</template>

<script>
import { findIndex } from '../../utils'
export default {
	name: 'zov-timeline',
	provide() {
		const proxy = {
			addItem: vm => this.addItem(vm),
			removeItem: vm => this.removeItem(vm),
			isLastItem: vm => this.items[this.items.length - 1] === vm
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
		}
	}
}
</script>
