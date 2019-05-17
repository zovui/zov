<template>
	<div class="zov-tabs-border-card-roller">
		<div class="zov-tabs-border-card-wrap">
			<slot />
		</div>
		<TabsBorderCardSlider
			:active-id="activeId"
			:direction="direction"
			:tab-rect-list="tabRectList"
		/>
	</div>
</template>

<script>
import TabsBorderCardSlider from './tabs-border-card-slider'
export default {
	name: 'zov-tabs-border-card-roller',
	props: {
		activeId: String,
		direction: String,
		tabRectList: Array
	},
	components: {
		TabsBorderCardSlider
	}
}
</script>
