import { findComponentUpward, findComponentsUpward } from '../../utils'
export default {
	data() {
		return {
			menuComponent: findComponentUpward(this, 'zov-menu'),
			hasThumbnailIcon: false
		}
	},
	computed: {
		isVerticalMode() {
			return this.menuComponent.mode === 'vertical'
		},
		isHorizontalMode() {
			return this.menuComponent.mode === 'horizontal'
		},
		parentsMenuSub() {
			return findComponentsUpward(this, 'zov-menu-sub')
		},
		parentsMenuGroup() {
			return findComponentsUpward(this, 'zov-menu-group')
		},
		paddingStyle() {
			let num =
				this.isHorizontalMode || this.menuComponent.currentThumbnail
					? this.parentsMenuGroup.length &&
					  !this.$parent.parentsMenuSub.length
						? 0
						: this.parentsMenuGroup.length
					: this.parentsMenuSub.length + this.parentsMenuGroup.length
			num = num + 1
			let indent = this.menuComponent.indent
			return {
				paddingLeft: num * indent + 'px',
				paddingRight: '15px'
			}
		}
	},
	methods: {
		checkHasIcon() {
			let title = this.$refs['title']
			if (title) {
				for (let x in title.children) {
					let el = title.children[x]
					if (
						el.getAttribute &&
						el.getAttribute('thumbnail-icon') !== null
					) {
						this.hasThumbnailIcon = true
					}
				}
			}
		}
	},
	mounted() {
		this.checkHasIcon()
	},
	updated() {
		this.checkHasIcon()
	}
}
