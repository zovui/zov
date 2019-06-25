<template>
	<div :class="classes" :style="styles">
		<slot></slot>
	</div>
</template>
<script>
import {
	oneOf,
	findComponentDownward,
	findBrothersComponents
} from '../../utils'

const prefix = 'zov-row'

export default {
	name: prefix,
	props: {
		type: {
			validator(value) {
				return oneOf(value, ['flex'])
			}
		},
		align: {
			validator(value) {
				return oneOf(value, ['top', 'middle', 'bottom'])
			}
		},
		justify: {
			validator(value) {
				return oneOf(value, [
					'start',
					'end',
					'center',
					'space-around',
					'space-between'
				])
			}
		},
		gutter: {
			type: Number,
			default: 0
		},
		className: String
	},
	computed: {
		classes() {
			return [
				{
					[`${prefix}`]: !this.type,
					[`${prefix}-${this.type}`]: !!this.type,
					[`${prefix}-${this.type}-${this.align}`]: !!this.align,
					[`${prefix}-${this.type}-${this.justify}`]: !!this.justify,
					[`${this.className}`]: !!this.className
				}
			]
		},
		styles() {
			let style = {}
			if (this.gutter !== 0) {
				style = {
					marginLeft: this.gutter / -2 + 'px',
					marginRight: this.gutter / -2 + 'px'
				}
			}

			return style
		}
	},
	methods: {
		updateGutter(val) {
			// 这里会嵌套寻找，把 Col 里的 Row 里的 Col 也找到，所以用 兄弟找
			const Col = findComponentDownward(this, 'zov-col')
			const Cols = findBrothersComponents(Col, 'zov-col', false)
			if (Cols.length) {
				Cols.forEach(child => {
					if (val !== 0) {
						child.gutter = val
					}
				})
			}
		}
	},
	watch: {
		gutter(val) {
			this.updateGutter(val)
		}
	},
	mounted() {
		this.updateGutter(this.gutter)
	}
}
</script>
