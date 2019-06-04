<template>
	<div :class="stylePrefix">
		<div :class="stylePrefix + '-container'">
			<img
				ref="img"
				:class="stylePrefix + '-image'"
				:src="file.url || ''"
			/>
		</div>
		<div v-if="file.status === 'finished'" :class="stylePrefix + '-mask'">
			<Icon
				:class="stylePrefix + '-icon'"
				title="预览"
				iconname="eye"
				@click="handlePreview"
			></Icon>
			<Icon
				:class="stylePrefix + '-icon'"
				iconname="trash"
				title="删除"
				@click="handleDelete"
			></Icon>
		</div>
		<Spin v-if="file.status === 'loading'" cover></Spin>
	</div>
</template>

<script>
import uploadListMixin from './upload-list-mixin.js'

const prefix = 'zov-upload-list-picture-card'
export default {
	mixins: [uploadListMixin],
	name: prefix,
	data() {
		return {
			stylePrefix: prefix
		}
	},
	watch: {
		file: {
			immediate: true,
			handler(file) {
				if (file.file) {
					this.showImage(file.file)
				}
			}
		}
	}
}
</script>
