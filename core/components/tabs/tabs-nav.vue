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
		activeId: String,
		direction: String
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
			if (this.direction === 'horizontal') {
				return this.tabWrapWidth > this.navWidth
			}
			return this.tabWrapHeight > this.navHeight
		},
		sliderStyles() {
			const rect = find(
				this.tabRectList,
				rect => rect.id === this.activeId
			)
			if (rect) {
				if (this.direction === 'horizontal') {
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
		},
		actionIcon() {
			return this.direction === 'horizontal'
				? ['arrow-back', 'arrow-forward']
				: ['arrow-up', 'arrow-down']
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
		direction(direction) {
			this.recalculateNavRect()
			this.recalculateScrollableRect()
			this.scrollActiveTabToViewport()
			this.$nextTick(() => {
				if (direction === 'horizontal') {
					this.scrollY = 0
				} else {
					this.scrollX = 0
				}
			})
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
				const children = findComponentsDownward(this, TabsTab.name)
				this.tabWrapWidth = this.$refs.tabWrap.offsetWidth
				this.tabWrapHeight = this.$refs.tabWrap.offsetHeight
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
			if (this.direction === 'horizontal') {
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
		scrollToNext() {
			if (!this.isScrollable) {
				return
			}
			if (this.direction === 'horizontal') {
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
			this.$nextTick(() => {
				const rect = find(
					this.tabRectList,
					rect => rect.id === this.activeId
				)
				if (rect) {
					// 可视范围的左边缘
					const viewportBoundingLeft = Math.abs(
						this.direction === 'horizontal'
							? this.scrollX
							: this.scrollY
					)
					// 可视范围的右边缘
					const viewportBoundingRight =
						viewportBoundingLeft +
						(this.direction === 'horizontal'
							? this.viewportSize.horizontal.width
							: this.viewportSize.vertical.height)
					// tab的左边缘
					const tabBoundingLeft =
						this.direction === 'horizontal'
							? rect.offsetLeft
							: rect.offsetTop
					// tab的右边缘
					const tabBoundingRight =
						tabBoundingLeft +
						(this.direction === 'horizontal'
							? rect.scrollWidth
							: rect.scrollHeight)
					// 此时为正数，仅为了方便计算
					let position = Math.abs(
						this.direction === 'horizontal'
							? this.scrollX
							: this.scrollY
					)
					// 如果激活的tab在左边界外
					if (viewportBoundingLeft > tabBoundingLeft) {
						position -= Math.abs(
							viewportBoundingLeft - tabBoundingLeft
						)
						position = this.normalizeScrollPosition(position * -1)
					} else if (viewportBoundingRight < tabBoundingRight) {
						// 如果激活的tab在右边界外
						position += Math.abs(
							viewportBoundingRight - tabBoundingRight
						)
						position = this.normalizeScrollPosition(position * -1)
					}

					if (this.direction === 'horizontal') {
						this.scrollX = Math.abs(position) * -1
					} else {
						this.scrollY = Math.abs(position) * -1
					}
				}
			})
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
		onResize() {
			this.recalculateNavRect()
			this.scrollActiveTabToViewport()
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
						iconname={this.actionIcon[0]}
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
						iconname={this.actionIcon[1]}
					/>
				</span>
			</div>
		)
	}
}
</script>
