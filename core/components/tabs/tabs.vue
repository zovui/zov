<script>
import TabsNav from './tabs-nav'
import TabsTab from './tabs-tab'
import TabsContent from './tabs-content'
import { find, findIndex, includes } from '../../utils'

const COMPONENT_NAME = 'zov-tabs'

export default {
	name: COMPONENT_NAME,
	components: {
		TabsNav,
		TabsTab,
		TabsContent
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
		}
	},
	mounted() {
		if (!this.activeId && this.tabPaneList.length) {
			this.changeTo(this.tabPaneList[0].id)
		}
	},
	provide() {
		return {
			Tabs: {
				addTab: tabPane => this.addTab(tabPane),
				removeTab: id => this.removeTab(id),
				changeTo: id => this.changeTo(id)
			}
		}
	},
	data() {
		return {
			tabPaneList: [],
			currentActiveId: this.activeId
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
		addTab(tabPane) {
			this.tabPaneList.push(tabPane)
			this.tabPaneList.sort((pane1, pane2) => {
				return pane1.order < pane2.order ? -1 : 1
			})
		},
		removeTab(id) {
			const index = findIndex(this.tabPaneList, pane => pane.id === id)
			if (index === -1) {
				return
			}
			this.tabPaneList.splice(index, 1)
			this.tabPaneList.sort((pane1, pane2) => {
				return pane1.order < pane2.order ? -1 : 1
			})
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
				/>
				<TabsContent
					tabPaneList={this.tabPaneList}
					activeId={this.currentActiveId}
				/>
				<div class="zov-tabPaneList-hidden">{this.$slots.default}</div>
			</div>
		)
	}
}
</script>
