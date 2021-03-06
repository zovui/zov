<template>
	<div
		:class="classes"
		:disabled="disabled"
		@keydown.delete="deleteTag"
		@mouseenter="mouseStatus = 'enter'"
		@mouseleave="mouseStatus = 'leave'"
	>
		<template v-if="multiple">
			<!-- 多选 -->
			<div class="zov-select-head-multiple-tags">
				<transition-group name="zov-scale" @after-leave="removeTagEnd">
					<Tag
						:size="size"
						v-if="data.length"
						v-for="item in data"
						:key="(item[labelName] || item[valueName]) + 'key'"
						@on-close="$emit('on-remove-tag', item)"
					>
						{{ item[labelName] || item[valueName] }}
					</Tag>
				</transition-group>
				<Input
					:size="size"
					v-if="filterable"
					v-model="currentValue"
					:style="inputSize"
					ref="zov-select-head-input"
				/>
			</div>
			<transition name="zov-fade">
				<span
					class="zov-select-head-placeholder"
					v-if="!data.length && !value"
				>
					{{ placeholder }}
				</span>
			</transition>
			<div
				class="zov-select-head-multiple-input-size-box"
				ref="zov-select-head-input-size-box"
			>
				{{ this.currentValue }}
			</div>
		</template>
		<template v-else>
			<!-- 单选 -->
			<Input
				:size="size"
				:placeholder="placeholder"
				v-model="currentValue"
				ref="zov-select-head-input"
			/>
		</template>
		<Icon
			:class="arrowDownClasses"
			:iconname="clearStatus ? 'close-circle' : iconname"
			@click.self="clearHandle"
		/>
	</div>
</template>
<script>
import Tag from '../tag'
import Icon from '../icon'
import Input from '../input'
import FormDomSizeMixin from '../../mixins/form-dom-size-mixin'
import { findComponentDownward } from '../../utils'
const prefix = 'zov-select-head'
export default {
	name: prefix,
	mixins: [FormDomSizeMixin],
	components: {
		Tag,
		Icon,
		Input
	},
	props: {
		value: {
			type: [String, Number],
			default: ''
		},
		data: {
			type: Array,
			default() {
				return []
			}
		},
		multiple: {
			type: Boolean,
			default: false
		},
		clearable: {
			type: Boolean,
			default: true
		},
		filterable: {
			type: Boolean,
			default: false
		},
		labelName: {
			type: String,
			default: 'label'
		},
		valueName: {
			type: String,
			default: 'value'
		},
		placeholder: {
			type: String,
			default: ''
		},
		disabled: {
			type: Boolean,
			default: false
		},
		dropShow: {
			type: Boolean,
			default: false
		},
		iconname: {
			type: String,
			default: 'arrow-down'
		},
		arrowDownNoAnimation: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			stylePrefix: prefix,
			currentValue: this.value,
			mouseStatus: 'leave',
			inputSize: { width: '3px' }
		}
	},
	watch: {
		value(val) {
			this.currentValue = val
		},
		currentValue(val) {
			this.updateInputSize()
			this.$emit('input', val)
		}
	},
	computed: {
		classes() {
			return [
				this.stylePrefix,
				this.sizeClasses,
				{
					[this.stylePrefix + '-no-filterable']:
						!this.filterable && !this.multiple,
					[this.stylePrefix + '-multiple']: this.multiple,
					[this.stylePrefix + '-multiple-no-filterable']:
						!this.filterable && this.multiple
				}
			]
		},
		arrowDownClasses() {
			return [
				this.stylePrefix + '-arrow-down',
				{
					[this.stylePrefix + '-arrow-up']:
						this.dropShow && !this.arrowDownNoAnimation,
					[this.stylePrefix + '-clear-hover']: this.clearStatus
				}
			]
		},
		clearStatus() {
			return (
				this.clearable &&
				!this.disabled &&
				(this.currentValue || this.data.length) &&
				this.mouseStatus === 'enter'
			)
		}
	},
	methods: {
		headFocus() {
			if (!this.filterable) return
			this.$refs['zov-select-head-input'].$el
				.getElementsByTagName('input')[0]
				.focus()
		},
		headBlur() {
			if (!this.filterable) return
			this.$refs['zov-select-head-input'].$el
				.getElementsByTagName('input')[0]
				.blur()
		},
		deleteTag() {
			!this.currentValue &&
				this.multiple &&
				this.data.length &&
				this.$emit('on-remove-tag', this.data[this.data.length - 1])
		},
		clearHandle() {
			this.clearStatus && this.$emit('on-clear')
		},
		removeTagEnd() {
			// 解决删除tags动画完成后的高度变化导致popper不更新问题
			findComponentDownward(this.$parent, 'zov-popper').popper.update()
		},
		updateInputSize() {
			let sizeBox = this.$refs['zov-select-head-input-size-box']
			sizeBox &&
				this.$nextTick(() => {
					let w = sizeBox.scrollWidth ? sizeBox.scrollWidth : 3
					let W = this.$el.offsetWidth - 37
					this.inputSize = {
						width: (w > W ? W : w) + 'px'
					}
				})
		}
	}
}
</script>
