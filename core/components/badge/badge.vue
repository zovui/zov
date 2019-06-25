<template>
	<span v-if="dot" :class="classes" ref="badge">
		<slot></slot>
		<sup :class="dotClasses" :style="styles" v-show="badge"></sup>
	</span>
	<span
		v-else-if="badgeType"
		:class="classes"
		class="zov-badge-status"
		ref="badge"
	>
		<span :class="statusClasses"></span>
		<span class="zov-badge-status-text">{{ text }}</span>
	</span>
	<span v-else :class="classes" ref="badge">
		<slot></slot>
		<sup
			v-if="hasCount"
			:style="styles"
			:class="countClasses"
			v-show="badge"
			>{{ finalCount }}</sup
		>
	</span>
</template>
<script>
let prefix = 'zov-badge'
export default {
	name: prefix,
	props: {
		count: Number,
		dot: {
			type: Boolean,
			default: false
		},
		overflowCount: {
			type: [Number, String],
			default: 99
		},
		className: String,
		showZero: {
			type: Boolean,
			default: false
		},
		text: {
			type: String,
			default: ''
		},
		status: String,
		type: String,
		offset: {
			type: Array
		}
	},
	computed: {
		badgeType() {
			return this.oneOf(this.status, [
				'success',
				'processing',
				'default',
				'error',
				'warning'
			])
		},
		classes() {
			return `${prefix}`
		},
		dotClasses() {
			return `${prefix}-dot`
		},
		countClasses() {
			return [
				`${prefix}-count`,
				{
					[`${this.className}`]: !!this.className,
					[`${prefix}-count-alone`]: this.alone,
					[`${prefix}-count-${this.type}`]: !!this.type
				}
			]
		},
		statusClasses() {
			return [
				`${prefix}-status-dot`,
				{
					[`${prefix}-status-${this.status}`]: !!this.status
				}
			]
		},
		styles() {
			const style = {}
			if (this.offset && this.offset.length === 2) {
				style['margin-top'] = `${this.offset[0]}px`
				style['margin-right'] = `${this.offset[1]}px`
			}
			return style
		},
		finalCount() {
			if (this.text !== '') return this.text
			return parseInt(this.count) >= parseInt(this.overflowCount)
				? `${this.overflowCount}+`
				: this.count
		},
		badge() {
			let status = false
			if (this.count) {
				status = !(parseInt(this.count) === 0)
			}
			if (this.dot) {
				status = true
				if (this.count !== null) {
					if (parseInt(this.count) === 0) {
						status = false
					}
				}
			}
			if (this.text !== '') status = true
			return status || this.showZero
		},
		hasCount() {
			if (this.count || this.text !== '') return true
			if (this.showZero && parseInt(this.count) === 0) return true
			else return false
		},
		alone() {
			return this.$slots.default === undefined
		}
	},
	methods: {
		// 判断参数是否是其中之一
		oneOf(value, validList) {
			for (let i = 0; i < validList.length; i++) {
				if (value === validList[i]) {
					return true
				}
			}
			return false
		}
	}
}
</script>
