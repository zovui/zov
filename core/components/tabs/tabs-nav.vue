<script>
import TabsTab from './tabs-tab'
import { find, findComponentsDownward } from '../../utils'
import { isHorizontal } from './helper'
import TabsNavAction from './tabs-nav-action'
import TabsNavViewport from './tabs-nav-viewport'
import { TabsBorderCardRoller, TabsBorderCardTab } from './border-card'
import { TabsCardRoller, TabsCardTab } from './card'

export default {
	name: 'zov-tabs-nav',
	components: {
		TabsTab,
		TabsNavAction,
		TabsNavViewport,
		TabsBorderCardRoller,
		TabsBorderCardTab
	},
	props: {
		tabPaneList: Array,
		activeId: String,
		direction: String,
		type: String
	},
	mounted() {
		this.redraw()
	},
	data() {
		return {
			tabRectList: [],
			navRect: {
				width: 0,
				height: 0
			},
			viewportRect: {
				width: 0,
				height: 0
			},
			rollerRect: {
				width: 0,
				height: 0
			},
			scrollX: 0,
			scrollY: 0
		}
	},
	computed: {
		isScrollable() {
			if (isHorizontal(this.direction)) {
				return this.rollerRect.width > this.viewportRect.width
			}
			return this.rollerRect.height > this.viewportRect.height
		},
		classList() {
			const classList = ['zov-tabs-nav']
			if (this.isScrollable) {
				classList.push('zov-tabs-nav--scrollable')
			}
			return classList
		},
		// 滚动边界
		scrollBounding() {
			let max = 0
			if (this.isScrollable) {
				if (isHorizontal(this.direction)) {
					max = -1 * (this.rollerRect.width - this.viewportRect.width)
				} else {
					max =
						-1 * (this.rollerRect.height - this.viewportRect.height)
				}
			}
			return {
				min: 0,
				max
			}
		},
		// 是否禁用上一页
		isDisabledPrevAction() {
			const { min } = this.scrollBounding
			const position = isHorizontal(this.direction)
				? this.scrollX
				: this.scrollY
			return position >= min
		},
		// 是否禁用下一页
		isDisabledNextAction() {
			const { max } = this.scrollBounding
			const position = isHorizontal(this.direction)
				? this.scrollX
				: this.scrollY
			return position <= max
		}
	},
	watch: {
		activeId: {
			handler() {
				this.scrollActiveTabToViewport()
			},
			immediate: true
		},
		// 监听方向变化
		direction() {
			this.redraw()
		},
		tabPaneList() {
			this.redraw()
		}
	},
	methods: {
		updateNavRect() {
			const { width, height } = this.$el.getBoundingClientRect()
			this.navRect = {
				width,
				height
			}
		},
		updateViewportRect() {
			const { width, height } = this.$refs.viewport.getViewportRect()
			this.viewportRect = {
				width,
				height
			}
		},
		updateRollerRect() {
			const { width, height } = this.$refs.viewport.getRollerRect()
			this.rollerRect = {
				width,
				height
			}
		},
		updateTabRectList() {
			let tabComponentName
			switch (this.type) {
				case 'border-card':
					tabComponentName = TabsBorderCardTab.name
					break
				case 'card':
					tabComponentName = TabsCardTab.name
					break
				default:
					tabComponentName = ''
			}
			const children = findComponentsDownward(this, tabComponentName)
			this.tabRectList = children.map(vm => {
				const rect = vm.$el.getBoundingClientRect()
				return {
					id: vm.id,
					scrollWidth: rect.width,
					scrollHeight: rect.height,
					offsetLeft: vm.$el.offsetLeft,
					offsetTop: vm.$el.offsetTop
				}
			})
		},
		// 重绘
		redraw() {
			this.$nextTick(() => {
				this.updateNavRect()
				this.updateRollerRect()
				this.updateTabRectList()
				this.$nextTick(() => {
					this.updateViewportRect()
					this.scrollActiveTabToViewport()
				})
			})
		},
		// 滚动至上一页
		scrollToPrev() {
			if (!this.isScrollable) {
				return
			}
			if (isHorizontal(this.direction)) {
				this.scrollX = this.normalizeScrollPosition(
					(Math.abs(this.scrollX) - this.viewportRect.width) * -1
				)
			} else {
				this.scrollY = this.normalizeScrollPosition(
					(Math.abs(this.scrollY) - this.viewportRect.height) * -1
				)
			}
			this.$emit('prev')
		},
		// 滚动至下一页
		scrollToNext() {
			if (!this.isScrollable) {
				return
			}
			if (isHorizontal(this.direction)) {
				this.scrollX = this.normalizeScrollPosition(
					(Math.abs(this.scrollX) + this.viewportRect.width) * -1
				)
			} else {
				this.scrollY = this.normalizeScrollPosition(
					(Math.abs(this.scrollY) + this.viewportRect.height) * -1
				)
			}
			this.$emit('next')
		},
		// 滚动活动tab至viewport范围内
		scrollActiveTabToViewport() {
			const rect = find(
				this.tabRectList,
				rect => rect.id === this.activeId
			)
			if (rect) {
				// 可视范围的左边缘
				const viewportBoundingLeft = Math.abs(
					isHorizontal(this.direction) ? this.scrollX : this.scrollY
				)
				// 可视范围的右边缘
				const viewportBoundingRight =
					viewportBoundingLeft +
					(isHorizontal(this.direction)
						? this.viewportRect.width
						: this.viewportRect.height)
				// tab的左边缘
				const tabBoundingLeft = isHorizontal(this.direction)
					? rect.offsetLeft
					: rect.offsetTop
				// tab的右边缘
				const tabBoundingRight =
					tabBoundingLeft +
					(isHorizontal(this.direction)
						? rect.scrollWidth
						: rect.scrollHeight)
				// 此时为正数，仅为了方便计算
				let position = Math.abs(
					isHorizontal(this.direction) ? this.scrollX : this.scrollY
				)
				// 如果激活的tab在左边界外
				if (viewportBoundingLeft > tabBoundingLeft) {
					position -= Math.abs(viewportBoundingLeft - tabBoundingLeft)
					position = this.normalizeScrollPosition(position * -1)
				} else if (viewportBoundingRight < tabBoundingRight) {
					// 如果激活的tab在右边界外
					position += Math.abs(
						viewportBoundingRight - tabBoundingRight
					)
					position = this.normalizeScrollPosition(position * -1)
				}

				if (isHorizontal(this.direction)) {
					this.scrollX = Math.abs(position) * -1
					this.scrollY = 0
				} else {
					this.scrollY = Math.abs(position) * -1
					this.scrollX = 0
				}
			} else {
				this.resetPosition()
			}
		},
		// 计算正常的滚动位置信息
		normalizeScrollPosition(position) {
			const min = this.scrollBounding.min
			const max = this.scrollBounding.max
			if (position > min) {
				return min
			}
			if (Math.abs(position) > Math.abs(max)) {
				return max
			}
			return position
		},
		onResize() {
			this.$nextTick(() => {
				this.updateNavRect()
				this.updateViewportRect()
				this.updateRollerRect()
				this.updateTabRectList()
				this.$nextTick(() => {
					this.scrollActiveTabToViewport()
					if (isHorizontal(this.direction)) {
						this.scrollX = this.normalizeScrollPosition(
							this.scrollX
						)
					} else {
						this.scrollY = this.normalizeScrollPosition(
							this.scrollY
						)
					}
				})
			})
		},
		resetPosition() {
			const { min } = this.scrollBounding
			if (isHorizontal(this.direction)) {
				this.scrollX = min
				this.scrollY = 0
			} else {
				this.scrollY = min
				this.scrollX = 0
			}
		}
	},
	render() {
		let roller = ''
		switch (this.type) {
			case 'border-card':
				roller = (
					<TabsBorderCardRoller
						activeId={this.activeId}
						direction={this.direction}
						tabRectList={this.tabRectList}>
						{this.tabPaneList.map(pane => {
							return (
								<TabsBorderCardTab
									id={pane.id}
									key={pane.id}
									isActive={pane.id === this.activeId}
									label={pane.computedLabel}
									disabled={pane.disabled}
								/>
							)
						})}
					</TabsBorderCardRoller>
				)
				break
			case 'card':
				roller = (
					<TabsCardRoller>
						{this.tabPaneList.map(pane => {
							return (
								<TabsCardTab
									id={pane.id}
									key={pane.id}
									isActive={pane.id === this.activeId}
									label={pane.computedLabel}
									disabled={pane.disabled}
									closable={pane.closable}
								/>
							)
						})}
					</TabsCardRoller>
				)
				break
		}
		return (
			<div class={this.classList}>
				<TabsNavAction
					isPrev={true}
					direction={this.direction}
					disabled={this.isDisabledPrevAction}
					onClick={this.scrollToPrev}
				/>
				<TabsNavViewport
					scrollX={this.scrollX}
					scrollY={this.scrollY}
					onResize={this.onResize}
					ref="viewport">
					{roller}
				</TabsNavViewport>
				<TabsNavAction
					isNext={true}
					direction={this.direction}
					disabled={this.isDisabledNextAction}
					onClick={this.scrollToNext}
				/>
				<div class="zov-tabs-extra">{this.$slots.default}</div>
			</div>
		)
	}
}
</script>
