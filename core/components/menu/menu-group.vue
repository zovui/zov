<template>
	<li class="zov-menu-group">
		<div
			v-show="!menuComponent.currentThumbnail || parentsMenuSub.length"
			class="zov-menu-group-title"
			:style="paddingStyle"
		>
			<slot name="title">menu group title</slot>
		</div>
		<ul class="zov-menu-group-body">
			<slot>option</slot>
		</ul>
	</li>
</template>
<script>
import MenuMixin from './menu-mixin'
const prefix = 'zov-menu-group'
export default {
	name: prefix,
	mixins: [MenuMixin]
}
</script>
