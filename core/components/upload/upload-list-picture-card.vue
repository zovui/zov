<template>
	<div :class="stylePrefix">
		<div :class="stylePrefix + '-container'">
			<img :class="stylePrefix + '-image'" :src="file.url || ''" />
		</div>
		<div :class="stylePrefix + '-mask'">
			<a
				:href="file.url || 'javascript:void(0)'"
				target="_blank"
				title="预览"
			>
				<Icon :class="stylePrefix + '-icon'" iconname="eye"></Icon>
			</a>
			<Icon
				:class="stylePrefix + '-icon'"
				iconname="trash"
				title="删除"
			></Icon>
		</div>
	</div>
</template>

<script>
const prefix = 'zov-upload-list-picture-card'
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
