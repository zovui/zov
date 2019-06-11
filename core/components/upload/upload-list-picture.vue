<template>
	<div :class="stylePrefix" @click="handlePreview">
		<img
			ref="img"
			:class="stylePrefix + '-image'"
			:src="file.url || ''"
			alt=""
		/>
		<div :class="stylePrefix + '-right'">
			<a v-if="file.url" :class="stylePrefix + '-name'">{{
				file.name || ''
			}}</a>
			<span v-else :class="stylePrefix + '-name'">{{
				file.name || ''
			}}</span>
			<transition name="zov-drop">
				<Progress
					v-if="file.status === 'loading'"
					:class="stylePrefix + '-progress'"
					:showInfo="false"
					:percent="file.percent"
					:status="'active'"
					:strokeWidth="2"
				></Progress>
			</transition>
			<Icon
				v-if="file.status === 'finished'"
				iconname="close"
				:class="stylePrefix + '-close'"
				@click.stop="handleDelete"
			></Icon>
		</div>
	</div>
</template>

<script>
import uploadListMixin from './upload-list-mixin.js'

const prefix = 'zov-upload-list-picture'
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
