<template>
	<div :class="classes">
		<span :class="txtClass" v-if="hasTxt">
			<slot></slot>
		</span>
	</div>
</template>
<script>
const prefix = 'zov-divider'
export default {
	name: prefix,
	data() {
		return {
			stylePrefix: prefix,
			txtClass: `${prefix}-inner-text`
		}
	},
	props: {
		dashed: {
			//是否虚线
			type: Boolean,
			default: false
		},
		dotted: {
			//是否点状线
			type: Boolean,
			default: false
		},
		//分割线标题位置，分为三种：center、left、right
		orientation: {
			type: String,
			default: 'center',
			validator(value) {
				if (['center', 'left', 'right'].indexOf(value) !== -1) {
					return value
				}
				return 'center'
			}
		},
		type: {
			type: String,
			default: 'horizontal',
			validator(value) {
				if (['horizontal', 'vertical'].indexOf(value) !== -1) {
					return value
				}
				return 'horizontal'
			}
		}
	},
	computed: {
		hasTxt() {
			return !!this.$slots.default
		},
		classes() {
			return [
				this.stylePrefix,
				this.stylePrefix + '-' + this.type,
				this.dashed ? this.stylePrefix + '-dashed' : '',
				this.dotted ? this.stylePrefix + '-dotted' : '',
				this.hasTxt
					? this.stylePrefix + '-with-text-' + this.orientation
					: ''
			]
		}
	}
}
</script>
