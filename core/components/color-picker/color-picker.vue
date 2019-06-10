<template>
	<div :class="['zov-color-picker', sizeClasses]" :disabled="disabled">
		<Drop
			:no-arrow="noArrow"
			:never="disabled || dragging"
			v-model="dropShow"
			placement="bottom-start"
			:no-delay="true"
		>
			<template #drop-head>
				<div class="zov-color-picker-header">
					<div class="zov-color-picker-header-color">
						<div :style="valueStyle"></div>
					</div>
					<div
						:class="[
							'zov-color-picker-header-arrow',
							dropShow && 'zov-color-picker-header-arrow-up'
						]"
					>
						<Icon iconname="arrow-down" />
					</div>
				</div>
			</template>
			<div @click.stop="dropShow = true">
				<MainPanel v-model="saturationColors" />
				<div class="zov-color-picker-bars">
					<div class="zov-color-picker-bars-current">
						<div :style="currentStyle"></div>
					</div>
					<div class="zov-color-picker-bars-tools">
						<HueBar v-model="saturationColors" />
						<AlphaBar v-model="saturationColors" />
					</div>
				</div>
				<div class="zov-color-picker-values">
					<div
						v-if="format === 'hex'"
						class="zov-color-picker-values-hex"
					>
						<Input v-model="currentValue" @input="inputHandle" />
						<div>HEX</div>
					</div>
					<div v-else class="zov-color-picker-values-rgba">
						<div
							v-for="(item, index) in currentValue"
							:key="index + ''"
						>
							<Input
								v-model="currentValue[index]"
								@input="inputHandle"
							/>
							<div>{{ index.toUpperCase() }}</div>
						</div>
					</div>
				</div>
				<div v-if="recommend" class="zov-color-picker-recommend-colors">
					<div
						class="zov-color-picker-recommend-colors-item"
						v-for="item in colors"
						:key="item"
						@click="setActiveColor(item)"
					>
						<div :style="{ 'background-color': item }"></div>
					</div>
				</div>
				<div class="zov-color-picker-footer">
					<Button size="small" @click.stop="cancelHandle"
						>取消</Button
					>
					<Button
						looks="primary"
						size="small"
						@click.stop="submitHandle"
						>确定</Button
					>
				</div>
			</div>
		</Drop>
	</div>
</template>
<script>
import Drop from '../drop'
import Input from '../input'
import Button from '../button'
import HueBar from './hue-bar'
import AlphaBar from './alpha-bar'
import MainPanel from './main-panel'
import FormDomSizeMixin from '../../mixins/form-dom-size-mixin'
import tinycolor from 'tinycolor2'
import { changeColor, toColorModelNum } from './color-utils'
const prefix = 'zov-color-picker'
export default {
	name: prefix,
	mixins: [FormDomSizeMixin],
	components: {
		Drop,
		Input,
		Button,
		HueBar,
		AlphaBar,
		MainPanel
	},
	props: {
		value: {
			type: String,
			default: ''
		},
		format: {
			type: String,
			validator(value) {
				return ['hsl', 'hsv', 'hex', 'rgb'].indexOf(value) !== -1
			},
			default: 'rgb'
		},
		recommend: {
			type: Boolean,
			default: false
		},
		colors: {
			type: Array,
			default() {
				return [
					'#2d8cf0',
					'#19be6b',
					'#ff9900',
					'#ed3f14',
					'#00b5ff',
					'#19c919',
					'#f9e31c',
					'#ea1a1a',
					'#9b1dea',
					'#00c2b1',
					'#ac7a33',
					'#1d35ea',
					'#8bc34a',
					'#f16b62',
					'#ea4ca3',
					'#0d94aa',
					'#febd79',
					'#5d4037',
					'#00bcd4',
					'#f06292',
					'#cddc39',
					'#607d8b',
					'#000000',
					'#ffffff'
				]
			}
		},
		noArrow: {
			type: Boolean,
			default: true
		},
		disabled: {
			type: Boolean,
			default: false
		},
		autofocus: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			stylePrefix: prefix,
			dropShow: false,
			val: changeColor(this.value),
			currentValue: undefined,
			dragging: false
		}
	},
	computed: {
		valueStyle() {
			return {
				'background-color': this.disabled
					? '#666666'
					: tinycolor(this.value).toRgbString()
			}
		},
		currentStyle() {
			return {
				'background-color': tinycolor(this.formatColor).toRgbString()
			}
		},
		formatColor() {
			const { format, saturationColors } = this
			if (format) {
				if (format === 'hsl') {
					return tinycolor(saturationColors.hsl).toHslString()
				}
				if (format === 'hsv') {
					return tinycolor(saturationColors.hsv).toHsvString()
				}
				if (format === 'hex') {
					return saturationColors.hex
				}
				if (format === 'rgb') {
					return tinycolor(saturationColors.rgb).toRgbString()
				}
			}
			return saturationColors.rgb
		},
		saturationColors: {
			get() {
				return this.val
			},
			set(newVal) {
				this.val = newVal
				this.setCurrentValue()
				this.$emit('on-active-change', tinycolor(this.formatColor))
			}
		}
	},
	watch: {
		dropShow(val) {
			this.setActiveColor(this.value)
			this.$emit('on-open-change', val)
		},
		value(val) {
			this.setActiveColor(val)
		}
	},
	methods: {
		inputHandle() {
			this.val = changeColor(this.currentValue)
		},
		setActiveColor(val) {
			this.saturationColors = changeColor(val)
		},
		submitHandle() {
			this.dropShow = false
			this.$emit('input', this.formatColor)
			this.$emit('on-change', tinycolor(this.formatColor))
		},
		cancelHandle() {
			this.dropShow = false
			this.setActiveColor(this.value)
		},
		setCurrentValue() {
			this.currentValue = toColorModelNum(this.formatColor)
		}
	},
	mounted() {
		this.autofocus && (this.dropShow = true)
		this.setActiveColor(this.value)
	}
}
</script>
