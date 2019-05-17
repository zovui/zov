<template>
	<div class="zov-tabs-border-card-slider" :style="style"></div>
</template>

<script>
import { find } from '../../../utils'
import { isHorizontal } from '../helper'
export default {
	name: 'tabs-border-card-slider',
	props: {
		activeId: String,
		direction: String,
		tabRectList: Array
	},
	computed: {
		style() {
			const rect = find(
				this.tabRectList,
				rect => rect.id === this.activeId
			)
			if (rect) {
				if (isHorizontal(this.direction)) {
					return {
						left: rect.offsetLeft + 'px',
						width: rect.scrollWidth + 'px'
					}
				} else {
					return {
						top: rect.offsetTop + 'px',
						height: rect.scrollHeight + 'px'
					}
				}
			}
			return null
		}
	}
}
</script>
