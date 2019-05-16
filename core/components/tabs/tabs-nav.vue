<script>
import Icon from '../icon'
import TabsTab from './tabs-tab'
import { find, findComponentsDownward } from '../../utils'
import ResizeObserver from 'resize-observer-polyfill'
import debounce from 'lodash.debounce'

// 向前、向后按钮大小
const ACTION_BUTTON_SIZE = 32

function isHorizontal(direction) {
	return direction === 'horizontal'
}

export default {
	name: 'zov-tabs-nav',
	components: {
		Icon,
		TabsTab
	},
	props: {
		tabPaneList: Array,
		activeId: String,
		direction: String
	},
	mounted() {
		// 设置resize观察者
		this.resizeObserver = new ResizeObserver(
			debounce(this.handleResize.bind(this), 300)
		)
		// 观察nav整个dom的大小变化
		this.resizeObserver.observe(this.$el)
		this.redraw()
	},
	destroyed() {
		this.resizeObserver.disconnect()
	},
	data() {
		return {
			tabRectList: [],
			navRect: {
				width: 0,
				height: 0
			},
			tabsWrapRect: {
				width: 0,
				height: 0
			},
			scrollX: 0,
			scrollY: 0,
			resizeObserver: null
		}
	},
	computed: {
		isScrollable() {
			if (isHorizontal(this.direction)) {
				return this.tabsWrapRect.width > this.navRect.width
			}
			return this.tabsWrapRect.height > this.navRect.height
		},
		sliderStyles() {
			const rect = find(
				this.tabRectList,
				rect => rect.id === this.activeId
			)
			if (rect) {
				if (isHorizontal(this.direction)) {
					return {
						left: rect.offsetLeft + 'px',
						width: rect.scrollWidth + 'px'
					}
				} else {
					return {
						top: rect.offsetTop + 'px',
						height: rect.scrollHeight + 'px'
					}
				}
			}
			return null
		},
		classList() {
			const classList = ['zov-tabs-nav']
			if (this.isScrollable) {
				classList.push('zov-tabs-nav--scrollable')
			}
			return classList
		},
		scrollableStyles() {
			return {
				transform: `translate3d(${this.scrollX}px, ${
					this.scrollY
				}px, 0)`
			}
		},
		// 可视范围大小
		viewportSize() {
			return {
				horizontal: {
					width: this.isScrollable
						? this.navRect.width - ACTION_BUTTON_SIZE * 2
						: this.navRect.width,
					height: this.navRect.height
				},
				vertical: {
					width: this.navRect.width,
					height: this.isScrollable
						? this.navRect.height - ACTION_BUTTON_SIZE * 2
						: this.navRect.height
				}
			}
		},
		// 滚动边界
		scrollBounding() {
			let max = 0
			if (this.isScrollable) {
				if (isHorizontal(this.direction)) {
					max =
						-1 *
						(this.tabsWrapRect.width -
							this.viewportSize.horizontal.width)
				} else {
					max =
						-1 *
						(this.tabsWrapRect.height -
							this.viewportSize.vertical.height)
				}
			}
			return {
				horizontal: {
					min: 0,
					max
				},
				vertical: {
					min: 0,
					max
				}
			}
		},
		actionIcon() {
			return isHorizontal(this.direction)
				? ['arrow-back', 'arrow-forward']
				: ['arrow-up', 'arrow-down']
		},
		// 是否禁用上一页
		isDisabledPrevAction() {
			const position = isHorizontal(this.direction)
				? this.scrollX
				: this.scrollY
			const minPosition = this.scrollBounding[this.direction].min
			return position >= minPosition
		},
		// 是否禁用下一页
		isDisabledNextAction() {
			const position = isHorizontal(this.direction)
				? this.scrollX
				: this.scrollY
			const maxPosition = this.scrollBounding[this.direction].max
			return position <= maxPosition
		},
		// 上一页按钮class
		prevActionClassList() {
			const classList = [
				'zov-tabs-nav-action',
				'zov-tabs-nav-action-prev'
			]
			if (this.isDisabledPrevAction) {
				classList.push(`zov-tabs-nav-action--disabled`)
			}
			return classList
		},
		// 下一页按钮class
		nextActionClassList() {
			const classList = [
				'zov-tabs-nav-action',
				'zov-tabs-nav-action-next'
			]
			if (this.isDisabledNextAction) {
				classList.push(`zov-tabs-nav-action--disabled`)
			}
			return classList
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
			this.$nextTick(() => {
				this.recalculateNavRect()
				this.recalculateScrollableRect()
				this.scrollActiveTabToViewport()
				this.resetPosition()
			})
		},
		tabPaneList() {
			this.redraw()
		}
	},
	methods: {
		// 重新计算nav的盒子模型
		recalculateNavRect() {
			const navRect = this.$el.getBoundingClientRect()
			this.navRect.width = navRect.width
			this.navRect.height = navRect.height
		},
		// 重新计算所有tab的盒子信息
		recalculateScrollableRect() {
			const children = findComponentsDownward(this, TabsTab.name)
			this.tabsWrapRect.width = this.$refs.tabWrap.offsetWidth
			this.tabsWrapRect.height = this.$refs.tabWrap.offsetHeight
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
				this.recalculateNavRect()
				this.recalculateScrollableRect()
				this.scrollActiveTabToViewport()
			})
		},
		// 滚动至上一页
		scrollToPrev() {
			if (!this.isScrollable) {
				return
			}
			if (isHorizontal(this.direction)) {
				this.scrollX = this.normalizeScrollPosition(
					(Math.abs(this.scrollX) -
						this.viewportSize.horizontal.width) *
						-1
				)
			} else {
				this.scrollY = this.normalizeScrollPosition(
					(Math.abs(this.scrollY) -
						this.viewportSize.vertical.height) *
						-1
				)
			}
		},
		// 滚动至下一页
		scrollToNext() {
			if (!this.isScrollable) {
				return
			}
			if (isHorizontal(this.direction)) {
				this.scrollX = this.normalizeScrollPosition(
					(Math.abs(this.scrollX) +
						this.viewportSize.horizontal.width) *
						-1
				)
			} else {
				this.scrollY = this.normalizeScrollPosition(
					(Math.abs(this.scrollY) +
						this.viewportSize.vertical.height) *
						-1
				)
			}
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
						? this.viewportSize.horizontal.width
						: this.viewportSize.vertical.height)
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
				} else {
					this.scrollY = Math.abs(position) * -1
				}
			} else {
				this.resetPosition()
			}
		},
		// 计算正常的滚动位置信息
		normalizeScrollPosition(position) {
			const min = this.scrollBounding[this.direction].min
			const max = this.scrollBounding[this.direction].max
			if (position > min) {
				return min
			}
			if (Math.abs(position) > Math.abs(max)) {
				return max
			}
			return position
		},
		handleResize() {
			this.$nextTick(() => {
				this.recalculateNavRect()
				this.scrollActiveTabToViewport()
				if (isHorizontal(this.direction)) {
					this.scrollX = this.normalizeScrollPosition(this.scrollX)
				} else {
					this.scrollY = this.normalizeScrollPosition(this.scrollY)
				}
			})
		},
		resetPosition() {
			const { min } = this.scrollBounding[this.direction]
			if (isHorizontal(this.direction)) {
				this.scrollX = min
			} else {
				this.scrollY = min
			}
		}
	},
	render() {
		return (
			<div class={this.classList}>
				<span
					class={this.prevActionClassList}
					onClick={this.scrollToPrev}>
					<Icon
						class="zov-tabs-nav-action-icon"
						iconname={this.actionIcon[0]}
					/>
				</span>
				<div class="zov-tabs-nav-scroll-wrap">
					<div
						class="zov-tabs-nav-tabs-wrap"
						style={this.scrollableStyles}>
						<div class="zov-tabs-nav-tabs" ref="tabWrap">
							{this.tabPaneList.map(pane => {
								return (
									<TabsTab
										id={pane.id}
										key={pane.id}
										isActive={pane.id === this.activeId}
										label={pane.computedLabel}
										disabled={pane.disabled}
										onChangeLabel={
											this.recalculateScrollableRect
										}
									/>
								)
							})}
						</div>
						<div
							class="zov-tabs-nav-slider"
							style={this.sliderStyles}
						/>
					</div>
				</div>
				<span
					class={this.nextActionClassList}
					onClick={this.scrollToNext}>
					<Icon
						class="zov-tabs-nav-action-icon"
						iconname={this.actionIcon[1]}
					/>
				</span>
			</div>
		)
	}
}
</script>
