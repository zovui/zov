<template>
	<RenderElTag v-on="$listeners" v-bind="$attrs" :tag="tag" :class="classes">
		<!-- 自定义Spin, 默认为 `loading` -->
		<Spin
			zov-internal-reference-button
			v-if="loading"
			:spinname="spinname || 'loading'"
		/>
		<!-- 自定义图标 -->
		<Icon v-if="iconname" :iconname="iconname" />
		<slot></slot>
	</RenderElTag>
</template>
<script>
import Spin from '../spin'
import Icon from '../icon'
import RenderElTag from '../base/render-el-tag'
import FormDomSizeMixin from '../../mixins/form-dom-size-mixin'
const prefix = 'zov-button'
export default {
	name: prefix,
	mixins: [FormDomSizeMixin],
	components: {
		Spin,
		Icon,
		RenderElTag
	},
	data() {
		return {
			stylePrefix: prefix
		}
	},
	props: {
		/*
		 *  looks -> shape -> size -> loading
		 * */
		// style，default、primary、dashed、text、info、success、warning、error
		looks: {
			type: String,
			validator(value) {
				return (
					[
						'default',
						'primary',
						'dashed',
						'text',
						'info',
						'success',
						'warning',
						'error'
					].indexOf(value) !== -1
				)
			},
			default: 'default'
		},
		// 形状有2种，default、circle
		shape: {
			type: String,
			validator(value) {
				return ['default', 'circle'].indexOf(value) !== -1
			},
			default: 'default'
		},
		// loading 样式，见Spin组件
		loading: {
			type: Boolean,
			default: false
		},
		spinname: {
			type: String,
			default: ''
		},
		iconname: {
			type: String,
			default: ''
		},
		tag: {
			type: String,
			default: 'button'
		},
		circle: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		classes() {
			return [
				this.stylePrefix,
				this.sizeClasses,
				{
					[this.stylePrefix + '-type-' + this.looks]:
						this.looks && this.looks !== 'default',
					[this.stylePrefix + '-shape-' + this.shape]:
						this.shape && this.shape !== 'default',
					[this.stylePrefix + '-circle']: this.circle
				}
			]
		}
	}
}
</script>
