<template>
	<label :class="classes">
		<span :class="checkboxClasses">
			<span :class="innerClasses"></span>
			<input
				type="checkbox"
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
const prefix = 'zov-checkbox'
const parentName = prefix + '-group'

import { findComponentUpward } from '../../utils'

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
		},
		indeterminate: {
			// 是否半选中
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			stylePrefix: prefix,
			parent: findComponentUpward(this, parentName),
			groupName: this.name,
			isDisabled: this.disabled
		}
	},
	computed: {
		classes() {
			return [
				this.stylePrefix + '-wrapper',
				{
					[this.stylePrefix + '-disabled']: this.isDisabled
				},
				this.parent
					? this.currentValue.length &&
					  ~this.currentValue.indexOf(this.label)
						? this.stylePrefix + '-checked'
						: this.indeterminate
						? this.stylePrefix + '-indeterminate'
						: ''
					: this.currentValue
					? this.stylePrefix + '-checked'
					: this.indeterminate
					? this.stylePrefix + '-indeterminate'
					: ''
			]
		},
		checkboxClasses() {
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
			this.isDisabled = parent.disabled || this.disabled
		}
	}
}
</script>
