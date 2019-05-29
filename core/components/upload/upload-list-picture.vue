<template>
	<div :class="stylePrefix">
		<img :class="stylePrefix + '-image'" :src="file.url || ''" alt="" />
		<a
			:class="stylePrefix + '-name'"
			:href="file.url || 'javascript:void(0)'"
			target="_blank"
			>{{ file.name || '' }}</a
		>
		<Icon iconname="close" :class="stylePrefix + '-close'"></Icon>
	</div>
</template>

<script>
const prefix = 'zov-upload-list-picture'
export default {
	name: prefix,
	props: {
		file: Object
	},
	data() {
		return {
			stylePrefix: prefix
		}
	}
}
</script>
