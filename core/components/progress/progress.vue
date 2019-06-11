<template>
	<div :class="classes">
		<div :class="lineClasses">
			<div :class="outerClasses" :style="outerStyles">
				<div
					v-if="showInfo && textInside && !progressPercent"
					:class="innerTextClasses"
					:style="innerTextStyles"
				>
					<slot>
						<progressText
							v-if="format"
							:render="format"
							:percent="progressPercent"
						></progressText>
						<span v-else>{{ progressPercent }}%</span>
					</slot>
				</div>
				<div v-else :class="innerClasses" :style="innerStyles">
					<div
						v-if="showInfo && textInside"
						:class="innerTextClasses"
						:style="innerTextStyles"
					>
						<slot>
							<progressText
								v-if="format"
								:render="format"
								:percent="progressPercent"
							></progressText>
							<span v-else>{{ progressPercent }}%</span>
						</slot>
					</div>
				</div>
			</div>
		</div>
		<div v-if="showInfo && !textInside" :class="outerTextClasses">
			<slot>
				<progressText
					v-if="format"
					:render="format"
					:percent="progressPercent"
				></progressText>
				<template v-else>
					<Icon
						:class="[
							stylePrefix + '-line-icon',
							stylePrefix + '-line-icon-success'
						]"
						v-if="progressStatus === 'success'"
						:iconname="icons.success"
					/>
					<Icon
						:class="[
							stylePrefix + '-line-icon ',
							stylePrefix + '-line-icon-exception'
						]"
						v-else-if="progressStatus === 'exception'"
						:iconname="icons.exception"
					/>
					<span v-else>{{ progressPercent }}%</span>
				</template>
			</slot>
		</div>
	</div>
</template>

<script>
const prefix = 'zov-progress'
const icons = {
	success: 'checkmark-circle',
	exception: 'close-circle'
}

export default {
	name: prefix,
	props: {
		percent: {
			// 百分比
			type: Number,
			default: 0
		},
		type: {
			// todo 样式类型，可支持线型，环型，仪表盘型
			type: String,
			validator: value => {
				return ~['line', 'circle', 'dashboard'].indexOf(value)
			},
			default: 'line'
		},
		format: {
			// 自定义进度信息样式，支持render函数
			type: Function
		},
		textInside: {
			// 进度信息展示位置
			type: Boolean,
			default: false
		},
		showInfo: {
			// 进度信息是否展示
			type: Boolean,
			default: true
		},
		strokeColor: String, // 进度条填充色
		strokeWidth: {
			// 进度条宽度
			type: Number,
			default: 8
		},
		status: {
			// 进度条状态
			type: String,
			default: 'normal',
			validator: value => {
				return ~['normal', 'active', 'success', 'exception'].indexOf(
					value
				)
			}
		}
	},
	data() {
		return {
			stylePrefix: prefix,
			progressStatus: this.status,
			icons: icons
		}
	},
	computed: {
		classes() {
			return [
				this.stylePrefix,
				{
					[this.stylePrefix + '-' + this.progressStatus]: ~[
						'active',
						'success',
						'exception'
					].indexOf(this.progressStatus),
					[this.stylePrefix + '-show-info']:
						this.showInfo && !this.textInside
				}
			]
		},
		lineClasses() {
			return [this.stylePrefix + '-line']
		},
		outerClasses() {
			return [this.stylePrefix + '-outer']
		},
		innerClasses() {
			return [this.stylePrefix + '-inner']
		},
		innerTextClasses() {
			return [this.stylePrefix + '-inner-text']
		},
		outerTextClasses() {
			return [this.stylePrefix + '-outer-text']
		},
		innerStyles() {
			return {
				width: this.progressPercent + '%',
				lineHeight: this.strokeWidth + 'px',
				backgroundColor: this.strokeColor || ''
			}
		},
		innerTextStyles() {
			return {
				lineHeight: this.strokeWidth + 'px'
			}
		},
		outerStyles() {
			return {
				height: this.strokeWidth + 'px'
			}
		},
		progressPercent() {
			if (this.percent <= 0) {
				return 0
			} else if (this.percent >= 100) {
				return 100
			} else {
				return this.percent
			}
		}
	},
	watch: {
		status(status) {
			this.progressStatus = status
		},
		progressPercent: {
			immediate: true,
			handler(percent) {
				if (
					percent >= 100 &&
					~['normal', 'active'].indexOf(this.status)
				) {
					this.progressStatus = 'success'
				} else {
					this.progressStatus = this.status
				}
			}
		}
	},
	components: {
		progressText: {
			functional: true,
			props: {
				render: {
					type: Function,
					default: (h, props) => {
						return h('span', {}, props.percent + '%')
					}
				},
				percent: Number
			},
			render(h, ctx) {
				return ctx.props.render(h, ctx.props)
			}
		}
	}
}
</script>
