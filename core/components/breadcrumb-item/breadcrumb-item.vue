<template>
	<div :class="classes">
		<span :class="innerClasses" @click="handleClick">
			<span v-if="!href" :class="stylePrefix + '-text'"
				><slot></slot
			></span>
			<a v-else :href="href" :target="target"><slot></slot></a>
		</span>
		<template v-if="showSeparator">
			<span
				:class="separatorClasses"
				v-if="separator"
				v-html="separator"
			></span>
			<span :class="separatorClasses" v-else
				><slot name="separator"></slot
			></span>
		</template>
	</div>
</template>

<script>
const prefix = 'zov-breadcrumb-item'

export default {
	name: prefix,
	props: {
		href: String,
		target: {
			type: String,
			default: '_self'
		}
	},
	data() {
		return {
			stylePrefix: prefix,
			separator: '',
			showSeparator: false
		}
	},
	computed: {
		classes() {
			return [this.stylePrefix]
		},
		innerClasses() {
			return [this.stylePrefix + '-inner']
		},
		separatorClasses() {
			return [this.stylePrefix + '-separator']
		}
	},
	methods: {
		handleClick($event) {
			this.$emit('on-click', $event)
		}
	},
	mounted() {
		this.showSeparator = this.separator || this.$slots.separator
	}
}
</script>
