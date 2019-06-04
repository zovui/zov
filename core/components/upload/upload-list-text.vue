<template>
	<div :class="stylePrefix" @click="handlePreview">
		<a v-if="file.url" :class="stylePrefix + '-name'">
			<Icon iconname="document" :class="stylePrefix + '-icon'"></Icon>
			{{ file.name || '' }}
		</a>
		<span v-else :class="stylePrefix + '-name'">
			<Icon iconname="document" :class="stylePrefix + '-icon'"></Icon>
			{{ file.name || '' }}
		</span>
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
</template>

<script>
import uploadListMixin from './upload-list-mixin.js'

const prefix = 'zov-upload-list-text'
export default {
	mixins: [uploadListMixin],
	name: prefix,
	data() {
		return {
			stylePrefix: prefix
		}
	}
}
</script>
