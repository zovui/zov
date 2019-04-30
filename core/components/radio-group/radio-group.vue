<template>
	<div :class="groupClasses">
		<slot></slot>
	</div>
</template>

<script>
import FormDomSizeMixin from '../../mixins/form-dom-size-mixin'
let prefix = 'zov-radio-group'
const now = Date.now()
const random = Math.floor(Math.random() * 10)
const getRandomName = () => `${prefix}_${now}_${random}`

export default {
	name: prefix,
	mixins: [FormDomSizeMixin],
	props: {
		name: {
			type: String,
			default: getRandomName()
		},
		value: {},
		disabled: {
			type: Boolean,
			default: false
		},
		border: {
			// 是否显示边框
			type: Boolean,
			default: false
		},
		connected: {
			// 是否组合
			type: Boolean,
			default: false
		},
		buttonStyle: {
			// 按钮样式，在border为true或group为true时生效
			type: String,
			validator(value) {
				return ['outline', 'solid'].indexOf(value) !== -1
			},
			default: 'outline'
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
					[this.sizeClasses]:
						this.size !== 'default' &&
						(this.border || this.connected),
					[this.stylePrefix + '-connected']: !!this.connected,
					[this.stylePrefix + '-disabled']: !!this.disabled,
					[this.stylePrefix + '-vertical']: !!this.vertical
				}
			]
		}
	}
}
</script>
