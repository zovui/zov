<template>
	<div :class="stylePrefix">
		<template v-if="listType === 'text'">
			<transition-group name="zov-drop" tag="div">
				<UploadListText
					v-for="file in files"
					:file="file"
					:key="file.id"
					@on-delete="handleDelete"
					@on-preview="handlePreview"
				></UploadListText>
			</transition-group>
		</template>
		<template v-if="listType === 'picture'">
			<transition-group name="zov-drop" tag="div">
				<UploadListPicture
					v-for="file in files"
					:file="file"
					:key="file.id"
					@on-delete="handleDelete"
					@on-preview="handlePreview"
				></UploadListPicture>
			</transition-group>
		</template>
		<template v-if="listType === 'picture-card'">
			<transition-group name="zov-scale" tag="div">
				<UploadListPictureCard
					v-for="file in files"
					:file="file"
					:key="file.id"
					@on-delete="handleDelete"
					@on-preview="handlePreview"
				></UploadListPictureCard>
			</transition-group>
		</template>
	</div>
</template>

<script>
import UploadListText from './upload-list-text.vue'
import UploadListPicture from './upload-list-picture.vue'
import UploadListPictureCard from './upload-list-picture-card.vue'

const prefix = 'zov-upload-list'
export default {
	name: prefix,
	props: {
		listType: {
			// 上传列表的样式
			type: String,
			default: 'text',
			validator: value => {
				return ~['text', 'picture', 'picture-card'].indexOf(value)
			}
		},
		files: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			stylePrefix: prefix
		}
	},
	components: {
		UploadListText,
		UploadListPicture,
		UploadListPictureCard
	},
	methods: {
		handleDelete(file) {
			this.$emit('on-delete', file)
		},
		handlePreview(file) {
			this.$emit('on-preview', file)
		}
	}
}
</script>
