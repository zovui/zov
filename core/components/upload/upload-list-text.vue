<template>
	<div :class="stylePrefix">
		<a
			:href="file.url || 'javascript:void(0)'"
			target="_blank"
			:class="stylePrefix + '-name'"
		>
			<Icon iconname="document" :class="stylePrefix + '-icon'"></Icon>
			{{ file.name || '' }}</a
		>
		<Icon iconname="close" :class="stylePrefix + '-close'"></Icon>
	</div>
</template>

<script>
const prefix = 'zov-upload-list-text'
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
