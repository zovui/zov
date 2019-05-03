<script>
import Icon from '../icon'
import TabsTab from './tabs-tab'
import { find, findComponentsDownward } from '../../utils'
import { on, off } from '../../utils/dom'

// 向前、向后按钮大小
const ACTION_BUTTON_SIZE = 32

export default {
	name: 'zov-tabs-nav',
	components: {
		Icon,
		TabsTab
	},
	props: {
		tabs: Array,
		activeId: String
	},
	created() {
		this.resizeHandler = this.onResize.bind(this)
		on(window, 'resize', this.resizeHandler)
	},
	mounted() {
		this.redraw()
	},
	destroyed() {
		off(window, 'resize', this.resizeHandler)
	},
	data() {
		return {
			tabRectList: [],
			navWidth: 0,
			navHeight: 0,
			tabWrapWidth: 0,
			tabWrapHeight: 0,
			scrollX: 0,
			scrollY: 0,
			resizeHandler: null
		}
	},
	computed: {
		isScrollable() {
			return this.tabWrapWidth > this.navWidth
		},
		sliderStyles() {
			const rect = find(
				this.tabRectList,
				rect => rect.id === this.activeId
			)
			if (rect) {
				return {
					left: rect.offsetLeft + 'px',
					width: rect.scrollWidth + 'px'
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
						? this.navWidth - ACTION_BUTTON_SIZE * 2
						: this.navWidth,
					height: this.navHeight
				},
				vertical: {
					width: this.navWidth,
					height: this.isScrollable
						? this.navHeight - ACTION_BUTTON_SIZE * 2
						: this.navHeight
				}
			}
		},
		// 滚动边界
		scrollBounding() {
			return {
				horizontal: {
					min: 0,
					max:
						-1 *
						(this.tabWrapWidth - this.viewportSize.horizontal.width)
				},
				vertical: {
					min: 0,
					max:
						-1 *
						(this.tabWrapHeight - this.viewportSize.vertical.height)
				}
			}
		}
	},
	watch: {
		activeId: {
			handler() {
				this.scrollActiveTabToViewport()
			},
			immediate: true
		}
	},
	methods: {
		// 重新计算nav的盒子模型
		recalculateNavRect() {
			this.$nextTick(() => {
				const navRect = this.$el.getBoundingClientRect()
				this.navWidth = navRect.width
				this.navHeight = navRect.height
			})
		},
		// 重新计算所有tab的盒子信息
		recalculateScrollableRect() {
			this.$nextTick(() => {
				const tabWrapRect = this.$refs.tabWrap.getBoundingClientRect()
				const children = findComponentsDownward(this, TabsTab.name)
				this.tabWrapWidth = tabWrapRect.width
				this.tabWrapHeight = tabWrapRect.height
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
			})
		},
		redraw() {
			this.recalculateNavRect()
			this.recalculateScrollableRect()
		},
		scrollToPrev() {
			if (!this.isScrollable) {
				return
			}
			this.scrollX = this.normalizeScrollPosition(
				(Math.abs(this.scrollX) - this.viewportSize.horizontal.width) *
					-1
			)
		},
		scrollToNext() {
			if (!this.isScrollable) {
				return
			}
			this.scrollX = this.normalizeScrollPosition(
				(Math.abs(this.scrollX) + this.viewportSize.horizontal.width) *
					-1
			)
		},
		// 滚动活动tab至viewport范围内
		scrollActiveTabToViewport() {
			const rect = find(
				this.tabRectList,
				rect => rect.id === this.activeId
			)
			if (rect) {
				// 可视范围的左边缘
				const viewportBoundingLeft = Math.abs(this.scrollX)
				// 可视范围的右边缘
				const viewportBoundingRight =
					viewportBoundingLeft + this.viewportSize.horizontal.width
				// tab的左边缘
				const tabBoundingLeft = rect.offsetLeft
				// tab的右边缘
				const tabBoundingRight = tabBoundingLeft + rect.scrollWidth
				let scrollX = Math.abs(this.scrollX)
				// 如果激活的tab在左边界外
				if (viewportBoundingLeft > tabBoundingLeft) {
					scrollX -= Math.abs(viewportBoundingLeft - tabBoundingLeft)
					this.scrollX = this.normalizeScrollPosition(scrollX * -1)
					return
				}
				// 如果激活的tab在右边界外
				if (viewportBoundingRight < tabBoundingRight) {
					scrollX += Math.abs(
						viewportBoundingRight - tabBoundingRight
					)
					this.scrollX = this.normalizeScrollPosition(scrollX * -1)
				}
			}
		},
		// 计算正常的滚动位置信息
		normalizeScrollPosition(positionX) {
			if (positionX > this.scrollBounding.horizontal.min) {
				return this.scrollBounding.horizontal.min
			}
			if (
				Math.abs(positionX) >
				Math.abs(this.scrollBounding.horizontal.max)
			) {
				return this.scrollBounding.horizontal.max
			}
			return positionX
		},
		onResize() {
			this.recalculateNavRect()
			this.$nextTick(() => {
				this.scrollActiveTabToViewport()
			})
		}
	},
	render() {
		return (
			<div class={this.classList}>
				<span
					class="zov-tabs-nav-action zov-tabs-nav-action-prev"
					onClick={this.scrollToPrev}>
					<Icon
						class="zov-tabs-nav-action-icon"
						iconname="arrow-back"
					/>
				</span>
				<div class="zov-tabs-nav-scroll-wrap">
					<div
						class="zov-tabs-nav-tabs-wrap"
						style={this.scrollableStyles}>
						<div class="zov-tabs-nav-tabs" ref="tabWrap">
							{this.tabs.map(pane => {
								return (
									<TabsTab
										id={pane.id}
										key={pane.id}
										isActive={pane.id === this.activeId}
										label={pane.computedLabel}
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
					class="zov-tabs-nav-action zov-tabs-nav-action-next"
					onClick={this.scrollToNext}>
					<Icon
						class="zov-tabs-nav-action-icon"
						iconname="arrow-forward"
					/>
				</span>
			</div>
		)
	}
}
</script>
