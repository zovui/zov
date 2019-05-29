<template>
	<div :class="stylePrefix">
		<template v-if="listType === 'text'">
			<UploadListText v-for="file in files" :file="file"></UploadListText>
		</template>
		<template v-if="listType === 'picture'">
			<UploadListPicture
				v-for="file in files"
				:file="file"
			></UploadListPicture>
		</template>
		<template v-if="listType === 'picture-card'">
			<UploadListPictureCard
				v-for="file in files"
				:file="file"
			></UploadListPictureCard>
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
	}
}
</script>

<style scoped></style>
