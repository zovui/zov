<template>
	<div :class="classes" :style="styles">
		<slot></slot>
	</div>
</template>
<script>
import { findComponentUpward } from '../../utils'
const prefix = 'zov-col'

export default {
	name: prefix,
	props: {
		span: [Number, String],
		order: [Number, String],
		offset: [Number, String],
		push: [Number, String],
		pull: [Number, String],
		className: String,
		xs: [Number, Object],
		sm: [Number, Object],
		md: [Number, Object],
		lg: [Number, Object]
	},
	data() {
		return {
			gutter: 0
		}
	},
	computed: {
		classes() {
			let classList = [
				`${prefix}`,
				{
					[`${prefix}-span-${this.span}`]: this.span,
					[`${prefix}-order-${this.order}`]: this.order,
					[`${prefix}-offset-${this.offset}`]: this.offset,
					[`${prefix}-push-${this.push}`]: this.push,
					[`${prefix}-pull-${this.pull}`]: this.pull,
					[`${this.className}`]: !!this.className
				}
			]
			let arr = ['xs', 'sm', 'md', 'lg']
			arr.forEach(size => {
				if (typeof this[size] === 'number') {
					classList.push(`${prefix}-span-${size}-${this[size]}`)
				} else if (typeof this[size] === 'object') {
					let props = this[size]
					Object.keys(props).forEach(prop => {
						classList.push(
							prop !== 'span'
								? `${prefix}-${size}-${prop}-${props[prop]}`
								: `${prefix}-span-${size}-${props[prop]}`
						)
					})
				}
			})

			return classList
		},
		styles() {
			let style = {}
			if (this.gutter !== 0) {
				style = {
					paddingLeft: this.gutter / 2 + 'px',
					paddingRight: this.gutter / 2 + 'px'
				}
			}

			return style
		}
	},
	methods: {
		updateGutter() {
			const Row = findComponentUpward(this, 'Row')
			if (Row) {
				Row.updateGutter(Row.gutter)
			}
		}
	},
	mounted() {
		this.updateGutter()
	},
	beforeDestroy() {
		this.updateGutter()
	}
}
</script>
