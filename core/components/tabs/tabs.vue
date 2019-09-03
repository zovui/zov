<script>
import TabsNav from './tabs-nav'
import TabsTab from './tabs-tab'
import { find, findIndex, includes } from '../../utils'

const COMPONENT_NAME = 'zov-tabs'

export default {
	name: COMPONENT_NAME,
	components: {
		TabsNav,
		TabsTab
	},
	model: {
		prop: 'activeId',
		event: 'on-change'
	},
	props: {
		activeId: {
			type: String
		},
		tabPosition: {
			type: String,
			default: 'top',
			validator(pos) {
				return includes(['top', 'bottom', 'left', 'right'], pos)
			}
		},
		type: {
			type: String,
			default: 'border-card',
			validator(type) {
				return includes(['border-card', 'card'], type)
			}
		},
		beforeClose: Function,
		beforeChange: Function,
		preventDefaultRemove: Boolean
	},
	mounted() {
		if (!this.activeId && this.tabPaneList.length) {
			this.changeTo(this.tabPaneList[0].id)
		} else {
			this.changeTo(this.activeId)
		}
	},
	provide() {
		const proxy = {
			addTab: tabPane => this.addTab(tabPane),
			removeTab: id => this.removeTab(id),
			changeTo: id => this.changeTo(id)
		}
		Object.defineProperties(proxy, {
			activeId: {
				configurable: false,
				enumerable: true,
				get: () => this.currentActiveId
			},
			beforeClose: {
				configurable: false,
				enumerable: true,
				get: () => this.beforeClose
			},
			beforeChange: {
				configurable: false,
				enumerable: true,
				get: () => this.beforeChange
			}
		})
		return {
			Tabs: proxy
		}
	},
	data() {
		return {
			tabPaneList: [],
			currentActiveId: null
		}
	},
	computed: {
		direction() {
			switch (this.tabPosition) {
				case 'top':
				case 'bottom':
					return 'horizontal'
				case 'left':
				case 'right':
					return 'vertical'
			}
			return 'horizontal'
		},
		classList() {
			const classList = [COMPONENT_NAME]
			classList.push(`${COMPONENT_NAME}--${this.direction}`)
			classList.push(`${COMPONENT_NAME}--${this.tabPosition}`)
			classList.push(`${COMPONENT_NAME}--${this.type}`)
			return classList
		}
	},
	watch: {
		activeId(activeId) {
			this.changeTo(activeId)
		},
		currentActiveId(activeId) {
			this.$emit('on-change', activeId)
		}
	},
	methods: {
		hasTab(id) {
			const index = findIndex(this.tabPaneList, pane => pane.id === id)
			return index !== -1
		},
		addTab(tabPane) {
			if (this.hasTab(tabPane.id)) {
				this.removeTab(tabPane.id)
			}
			this.tabPaneList.push(tabPane)
			this.tabPaneList.sort((pane1, pane2) => {
				return pane1.order < pane2.order ? -1 : 1
			})
			this.$emit('on-add', tabPane.id)
		},
		removeTab(id) {
			if (this.preventDefaultRemove) {
				this.$emit('on-remove', id)
				return
			}
			const index = findIndex(this.tabPaneList, pane => pane.id === id)
			if (index === -1) {
				return
			}
			const isActive = this.currentActiveId === id
			let nextTabId = this.currentActiveId
			if (isActive && this.tabPaneList.length > 1) {
				switch (id) {
					case this.tabPaneList[0].id:
						nextTabId = this.tabPaneList[index + 1].id
						break
					case this.tabPaneList[this.tabPaneList.length - 1].id:
						nextTabId = this.tabPaneList[index - 1].id
						break
					default:
						nextTabId = this.tabPaneList[index + 1].id
				}
			}
			this.tabPaneList.splice(index, 1)
			this.tabPaneList.sort((pane1, pane2) => {
				return pane1.order < pane2.order ? -1 : 1
			})
			this.$emit('on-remove', id)
			this.changeTo(nextTabId)
		},
		changeTo(id) {
			const targetTab = find(this.tabPaneList, vm => vm.id === id)
			if (targetTab && !targetTab.disabled) {
				this.currentActiveId = targetTab.id
			}
		}
	},
	render() {
		return (
			<div class={this.classList}>
				<TabsNav
					type={this.type}
					tabPaneList={this.tabPaneList}
					activeId={this.currentActiveId}
					direction={this.direction}
					onNext={() => this.$emit('on-next')}
					onPrev={() => this.$emit('on-prev')}>
					{this.$slots.extra}
				</TabsNav>
				<div class="zov-tabs-content">{this.$slots.default}</div>
			</div>
		)
	}
}
</script>
