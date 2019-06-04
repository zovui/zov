<template>
	<span :class="classes">
		<img :src="src" v-if="src" />
		<Icon
			:type="iconname"
			:iconname="iconname"
			v-else-if="iconname || customIcon"
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
			default() {
				return !this.$IVIEW || this.$IVIEW.size === ''
					? 'default'
					: this.$IVIEW.size
			}
		},
		src: {
			type: String
		},
		iconname: {
			type: String
		},
		customIcon: {
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
					[`${prefix}-icon`]: !!this.iconname || !!this.customIcon
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
				// set children width again to make slot centered
				this.childrenWidth = this.$refs.children.offsetWidth
				const avatarWidth = this.$el.getBoundingClientRect().width
				// add 4px gap for each side to get better performance
				if (avatarWidth - 8 < this.childrenWidth) {
					this.scale = (avatarWidth - 8) / this.childrenWidth
				} else {
					this.scale = 1
				}
			}
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
