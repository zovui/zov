<template>
	<div class="zov-tabs-nav-tabs-wrap" :style="scrollableStyles">
		<div class="zov-tabs-nav-tabs">
			<slot />
		</div>
		<div class="zov-tabs-nav-slider" :style="sliderStyles"></div>
	</div>
</template>

<script>
import { find } from '../../../utils'
import TabsBorderCardTab from './tabs-border-card-tab'
import { isHorizontal } from '../helper'

export default {
	name: 'zov-tabs-border-card-roller',
	props: {
		activeId: String,
		scrollX: Number,
		scrollY: Number,
		direction: String,
		tabRectList: Array
	},
	components: {
		TabsBorderCardTab
	},
	computed: {
		scrollableStyles() {
			return {
				transform: `translate3d(${this.scrollX}px, ${
					this.scrollY
				}px, 0)`
			}
		},
		sliderStyles() {
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
