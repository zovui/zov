<template>
	<span :class="classes">
		<img
			:src="src"
			v-if="src"
			alt="hello"
			:title="title"
			@error="handleError"
		/>
		<Icon
			v-else-if="iconname || custom"
			:iconname="iconname"
			:custom="custom"
		></Icon>
		<span
			ref="children"
			:class="[prefix + '-string']"
			:style="childrenStyle"
			v-else
			><slot></slot
		></span>
	</span>
</template>
<script>
import Icon from '../icon'
import { oneOf } from '../../utils'

const prefix = 'zov-avatar'

export default {
	name: prefix,
	components: { Icon },
	props: {
		shape: {
			validator(value) {
				return oneOf(value, ['circle', 'square'])
			},
			default: 'circle'
		},
		size: {
			validator(value) {
				return oneOf(value, ['small', 'large', 'default'])
			},
			default: 'default'
		},
		src: {
			type: String
		},
		iconname: {
			type: String
		},
		custom: {
			type: String,
			default: ''
		},
		title: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			prefix: prefix,
			scale: 1,
			childrenWidth: 0,
			isSlotShow: false
		}
	},
	computed: {
		classes() {
			return [
				`${prefix}`,
				`${prefix}-${this.shape}`,
				`${prefix}-${this.size}`,
				{
					[`${prefix}-image`]: !!this.src,
					[`${prefix}-icon`]: !!this.iconname || !!this.custom
				}
			]
		},
		childrenStyle() {
			let style = {}
			if (this.isSlotShow) {
				style = {
					msTransform: `scale(${this.scale})`,
					WebkitTransform: `scale(${this.scale})`,
					transform: `scale(${this.scale})`,
					position: 'absolute',
					display: 'inline-block',
					left: `calc(50% - ${Math.round(this.childrenWidth / 2)}px)`
				}
			}
			return style
		}
	},
	methods: {
		setScale() {
			this.isSlotShow = !this.src && !this.iconname
			if (this.$refs.children) {
				this.childrenWidth = this.$refs.children.offsetWidth
				const avatarWidth = this.$el.getBoundingClientRect().width
				if (avatarWidth - 8 < this.childrenWidth) {
					this.scale = (avatarWidth - 8) / this.childrenWidth
				} else {
					this.scale = 1
				}
			}
		},
		handleError(e) {
			this.$emit('on-error', e)
		}
	},
	mounted() {
		this.setScale()
	},
	updated() {
		this.setScale()
	}
}
</script>
