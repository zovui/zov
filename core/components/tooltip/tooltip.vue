<template>
	<div
		class="zov-tooltip"
		@mouseenter="hoverHandle('enter')"
		@mouseleave="hoverHandle('leave')"
		@click="toggleHandle"
		@focus.capture="focusHandle('enter')"
		v-click-outside.capture="outCloseHandle"
	>
		<slot></slot>
		<transition
			:name="animationName"
			@before-enter="$emit('before-enter')"
			@enter="$emit('enter')"
			@after-enter="$emit('after-enter')"
			@before-leave="$emit('before-leave')"
			@leave="$emit('leave')"
			@after-leave="$emit('after-leave')"
		>
			<Popper
				ref="zov-popper"
				:placement="placement"
				:no-arrow="noArrow"
				:class="{ 'zov-tooltip-high-color': highColor }"
				v-show="visible"
				:size="currentH + '-' + currentW"
				:fix="fix"
			>
				<div class="zov-tooltip-body">
					<p v-if="title" class="zov-tooltip-title">
						{{ title }}
					</p>
					<p v-if="text" class="zov-tooltip-description">
						{{ text }}
					</p>
					<Icon
						iconname="close"
						v-if="closable"
						class="zov-tooltip-close"
						@click.stop="closeHandle"
					/>
					<slot name="tooltip"></slot>
				</div>
			</Popper>
		</transition>
	</div>
</template>
<script>
import Popper from '../popper'
import Icon from '../icon'
import { directive as clickOutside } from 'v-click-outside-x'
const prefix = 'zov-tooltip'
export default {
	name: prefix,
	components: {
		Popper,
		Icon
	},
	directives: {
		clickOutside
	},
	props: {
		value: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: ''
		},
		text: {
			type: String,
			default: ''
		},
		// 默认弹出方向
		placement: {
			type: String,
			validator(value) {
				return (
					[
						'top',
						'top-start',
						'top-end',
						'bottom',
						'bottom-start',
						'bottom-end',
						'left',
						'left-start',
						'left-end',
						'right',
						'right-start',
						'right-end'
					].indexOf(value) !== -1
				)
			},
			default: 'top'
		},
		trigger: {
			type: [String, Array],
			validator(value) {
				let triggers = ['hover', 'click', 'focus']
				if (typeof value === 'string') {
					return triggers.indexOf(value) !== -1
				} else if (value instanceof Array) {
					if (value.length > triggers.length) return false
					return value.every(item => {
						return triggers.indexOf(item) !== -1
					})
				}
			},
			default: 'hover'
		},
		enterDelay: {
			type: [String, Number],
			default: 0
		},
		leaveDelay: {
			type: [String, Number],
			default: 0
		},
		closable: {
			type: Boolean,
			default: false
		},
		highColor: {
			type: Boolean,
			default: false
		},
		never: {
			type: Boolean,
			default: false
		},
		noArrow: {
			type: Boolean,
			default: false
		},
		animationName: {
			type: String,
			default: 'zov-fade'
		},
		autoPopup: {
			type: Boolean,
			default: false
		},
		noDelay: {
			type: Boolean,
			default: false
		},
		fix: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			visible: false,
			timer: null,
			mouseStatus: 'leave',
			currentW: '',
			currentH: ''
		}
	},
	watch: {
		value(val) {
			this.updateVisible(val)
		},
		visible(val) {
			this.mouseStatus = this.visible ? 'enter' : 'leave'
			this.$emit('input', val)
			this.transPopperEventListeners(val)
		}
	},
	methods: {
		updateVisible(status) {
			this.visible = status
		},
		noTrigger(trigger) {
			if (this.never) {
				return true
			}
			if (typeof this.trigger === 'string') {
				return this.trigger !== trigger
			} else if (this.trigger instanceof Array) {
				return this.trigger.indexOf(trigger) === -1
			}
		},
		clearTimer() {
			clearTimeout(this.timer)
			this.timer = null
		},
		setVisible() {
			this.clearTimer()
			/**
			 * 非延时模式，为内部提供，在drop中调用不需要延时处理
			 **/
			if (this.noDelay) {
				this.updateVisible(this.mouseStatus === 'enter')
				return
			}
			/**
			 * 此处必须为异步
			 * 1、配合呼出、收起的延时；
			 * 2、在v-model模式下，我们期望通过v-model连接多个双向响应的组件，此时点击当前组件就会响应到v-model上，从而响应到另一个tooltip组件上，此时同事触发了另一个tooltip
			 * 上的out-click事件，因此会出现我们不期望的效果，这里的异步就可以解决此问题。
			 **/
			this.timer = setTimeout(() => {
				this.updateVisible(this.mouseStatus === 'enter')
				this.clearTimer()
			}, Number(this[this.mouseStatus + 'Delay']))
		},
		hoverHandle(type) {
			if (this.noTrigger('hover')) return
			this.mouseStatus = type
			this.setVisible()
		},
		toggleHandle(event) {
			this.$emit('click', event)
			if (this.noTrigger('click')) return
			this.mouseStatus = this.mouseStatus === 'leave' ? 'enter' : 'leave'
			this.setVisible()
		},
		focusHandle(type) {
			if (this.noTrigger('focus')) return
			this.mouseStatus = type
			this.setVisible()
		},
		closeHandle() {
			this.mouseStatus = 'leave'
			this.setVisible()
		},
		outCloseHandle() {
			if (this.never) return
			this.closeHandle()
		},
		transPopperEventListeners(val) {
			// 根据tooltip组件的显示状态，决定popper的自动更新 「#007」
			val
				? this.$refs['zov-popper'].popper.enableEventListeners()
				: this.$refs['zov-popper'].popper.disableEventListeners()
		},
		updatePopper() {
			this.$refs['zov-popper'].popper.update()
		}
	},
	mounted() {
		// 初始化设置visible的值
		if (this.autoPopup || this.value) {
			this.mouseStatus = 'enter'
			this.setVisible()
		}
		this.currentW = this.$el.offsetWidth
		this.currentH = this.$el.offsetHeight
		this.transPopperEventListeners(this.visible)
	},
	updated() {
		this.flag = false
		if (
			this.currentW !== this.$el.offsetWidth ||
			this.currentH !== this.$el.offsetHeight
		) {
			this.currentW = this.$el.offsetWidth
			this.currentH = this.$el.offsetHeight
		}
	}
}
</script>
