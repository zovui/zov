<template>
	<label :class="classes">
		<span :class="radioClasses">
			<span :class="innerClasses"></span>
			<input
				type="radio"
				:class="inputClasses"
				:disabled="isDisabled"
				:name="groupName"
				v-model="currentValue"
				:value="label"
			/>
		</span>
		<span :class="labelClasses">
			<slot>{{ label }}</slot>
		</span>
	</label>
</template>

<script>
import { findComponentUpward } from '../../utils'

const prefix = 'zov-radio'
const parentName = prefix + '-group'

export default {
	name: prefix,
	props: {
		name: String,
		value: {
			// 选中的值
			type: [String, Number, Boolean, Object]
		},
		label: {
			// 当前项的值
			type: [String, Number, Boolean, Object]
		},
		disabled: {
			// 是否禁用
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			stylePrefix: prefix,
			parent: findComponentUpward(this, parentName),
			groupName: this.name,
			border: false,
			connected: false,
			buttonStyle: '',
			isDisabled: this.disabled,
			size: 'default'
		}
	},
	computed: {
		classes() {
			return [
				this.stylePrefix + '-wrapper',
				{
					[this.stylePrefix + '-size-' + this.size]:
						this.size !== 'default' &&
						(this.border || this.connected),
					[this.stylePrefix + '-button']:
						this.border || this.connected,
					[this.stylePrefix + '-button-' + this.buttonStyle]:
						this.buttonStyle && (this.border || this.connected),
					[this.stylePrefix + '-disabled']: this.isDisabled,
					[this.stylePrefix + '-checked']:
						this.currentValue === this.label
				}
			]
		},
		radioClasses() {
			return [this.stylePrefix]
		},
		innerClasses() {
			return [this.stylePrefix + '-inner']
		},
		inputClasses() {
			return [this.stylePrefix + '-input']
		},
		labelClasses() {
			return [this.stylePrefix + '-label']
		},
		currentValue: {
			get() {
				return this.parent ? this.parent.value : this.value
			},
			set(val) {
				if (this.parent) {
					this.parent.$emit('input', val)
					this.parent.$emit('on-change', val)
				} else {
					this.$emit('input', val)
					this.$emit('on-change', val)
				}
			}
		}
	},
	mounted() {
		if (this.parent) {
			let parent = this.parent
			this.groupName = parent.name
			this.border = parent.border
			this.connected = parent.connected
			this.buttonStyle = parent.buttonStyle
			this.isDisabled = parent.disabled || this.disabled
			this.size = parent.size
		}
	}
}
</script>
