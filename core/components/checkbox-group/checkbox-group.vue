<template>
	<div :class="groupClasses">
		<slot></slot>
	</div>
</template>

<script>
let prefix = 'zov-checkbox-group'
const now = Date.now()
const random = Math.floor(Math.random() * 10)
const getRandomName = () => `${prefix}_${now}_${random}`

export default {
	name: prefix,
	props: {
		name: {
			type: String,
			default: getRandomName()
		},
		value: {
			type: Array,
			default: () => ({})
		},
		disabled: {
			type: Boolean,
			default: false
		},
		vertical: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			stylePrefix: prefix
		}
	},
	computed: {
		groupClasses() {
			return [
				this.stylePrefix,
				{
					[this.stylePrefix + '-disabled']: !!this.disabled,
					[this.stylePrefix + '-vertical']: !!this.vertical
				}
			]
		}
	}
}
</script>
