<template>
	<div :class="classes">
		<slot></slot>
	</div>
</template>

<script>
const prefix = 'zov-breadcrumb'
export default {
	name: prefix,
	props: {
		separator: {
			type: String,
			default: '/'
		}
	},
	data() {
		return {
			stylePrefix: prefix
		}
	},
	computed: {
		classes() {
			return [this.stylePrefix]
		}
	},
	methods: {
		updated() {
			let $children = this.$children
			let childrenLen = $children.length

			if (childrenLen) {
				$children.forEach((child, index) => {
					child.separator = this.separator
					child.showSeparator = childrenLen !== index + 1
				})
			}
		}
	},
	mounted() {
		this.updated()
	},
	updated() {
		this.updated()
	}
}
</script>
