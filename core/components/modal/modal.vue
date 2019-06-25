<template>
	<div :class="classes">
		<transition name="zov-fade">
			<div
				v-show="visible"
				v-if="mask"
				:class="maskClasses"
				:style="{ 'z-index': modalIndex }"
				@click="handleMaskClick"
			></div>
		</transition>
		<transition name="zov-scale">
			<div v-show="visible" :class="wrapClasses" :style="wrapStyles">
				<Icon
					v-if="closable"
					:class="stylePrefix + '-close'"
					iconname="close"
					@click="cancel"
				/>
				<div v-if="!headerHide" :class="stylePrefix + '-header'">
					<slot name="header">
						<span
							:class="stylePrefix + '-title'"
							v-html="title"
						></span>
					</slot>
				</div>
				<div :class="stylePrefix + '-content'">
					<Spin v-if="loading" :cover="true"></Spin>
					<div :class="stylePrefix + '-body'">
						<slot></slot>
					</div>
					<div v-if="!footerHide" :class="footerClasses">
						<slot name="footer">
							<Button @click="cancel">{{ cancelText }}</Button>
							<Button
								@click="confirm"
								:loading="buttonLoading"
								looks="primary"
								>{{ confirmText }}</Button
							>
						</slot>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import Icon from '../icon'
import Spin from '../spin'
import Button from '../button'
import { index, addIndex } from './zIndex'
import { scrollLock, scrollUnlock } from '../../utils/set-scroll'

const prefix = 'zov-modal'
export default {
	name: prefix,
	components: {
		Spin,
		Icon,
		Button
	},
	props: {
		closable: {
			// 显示关闭按钮
			type: Boolean,
			default: true
		},
		title: {
			// 标题
			type: String,
			default: '提示'
		},
		value: {
			// 是否展示
			type: Boolean,
			default: false
		},
		width: {
			type: [String, Number],
			default: 520
		},
		centered: {
			// 是否垂直居中
			type: Boolean,
			default: false
		},
		mask: {
			// 是否展示遮罩层
			type: Boolean,
			default: true
		},
		maskClosable: {
			// 是否允许点击遮罩层关闭
			type: Boolean,
			default: true
		},
		confirmText: {
			// 确定按钮文案
			type: String,
			default: '确定'
		},
		cancelText: {
			// 取消按钮文案
			type: String,
			default: '取消'
		},
		headerHide: {
			// 是否隐藏头部
			type: Boolean,
			default: false
		},
		footerHide: {
			// 是否隐藏底部
			type: Boolean,
			default: false
		},
		fullscreen: {
			type: Boolean,
			default: false
		},
		bottomAlign: {
			// 底部对齐方式
			type: String,
			validator: value => {
				return ['left', 'center', 'right'].indexOf(value) !== -1
			},
			default: 'center'
		},
		confirmLoading: {
			// 点击确定按钮的时候是否显示loading状态
			type: Boolean,
			default: false
		},
		contentLoading: {
			// loading整个内容区域
			type: Boolean,
			default: false
		},
		modalStyle: {
			// 弹窗样式
			type: Object,
			default: () => ({})
		},
		zIndex: {
			// 当前弹窗层级
			type: Number
		},
		baseIndex: {
			// 当前弹窗基础层级，每次打开弹窗都会在当前基础层级上加一
			type: Number,
			default: 1000
		},
		transfer: {
			// 转移到body元素中
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			stylePrefix: prefix,
			visible: this.value,
			buttonLoading: false,
			loading: this.contentLoading,
			modalIndex: 0
		}
	},
	watch: {
		value(value) {
			this.visible = value
		},
		visible(visible) {
			this.$emit('input', visible)

			if (visible) {
				scrollLock()
				if (typeof this.zIndex !== 'number') {
					addIndex()
					this.modalIndex = this.baseIndex + index
				}
				this.$emit('on-open')
			} else {
				scrollUnlock()
				this.buttonLoading = false
				this.loading = false
				this.$emit('on-close')
			}

			this.$emit('on-visible-change', visible)
		},
		confirmLoading(loading) {
			if (!loading) {
				this.buttonLoading = false
			}
		},
		contentLoading(loading) {
			this.loading = loading
		}
	},
	computed: {
		classes() {
			return [
				this.stylePrefix,
				{
					[this.stylePrefix + '-vertical-center']: this.centered
				}
			]
		},
		maskClasses() {
			return [this.stylePrefix + '-mask']
		},
		wrapClasses() {
			return [
				this.stylePrefix + '-wrapper',
				{
					[this.stylePrefix + '-wrapper-fullscreen']: this.fullscreen
				}
			]
		},
		footerClasses() {
			return [
				this.stylePrefix + '-footer',
				this.stylePrefix + '-footer-' + this.bottomAlign
			]
		},
		wrapStyles() {
			return Object.assign(
				{
					width:
						typeof this.width === 'number'
							? this.width + 'px'
							: typeof this.width === 'string'
							? this.width
							: 'auto',
					'z-index': this.modalIndex
				},
				this.modalStyle
			)
		}
	},
	methods: {
		cancel() {
			this.close()
			this.$emit('on-cancel')
		},
		close() {
			this.visible = false
		},
		handleMaskClick() {
			if (this.maskClosable) {
				this.cancel()
			}
		},
		confirm() {
			if (this.confirmLoading) {
				this.buttonLoading = true
			} else {
				this.close()
			}
			this.$emit('on-confirm')
		}
	},
	mounted() {
		if (this.transfer) {
			document.body.appendChild(this.$el)
		}

		if (typeof this.zIndex === 'number') {
			this.modalIndex = this.zIndex
		} else {
			this.modalIndex = this.baseIndex
		}
	},
	destroyed() {
		if (this.transfer && this.$el && this.$el.parentNode) {
			this.$el.parentNode.removeChild(this.$el)
		}
	}
}
</script>
