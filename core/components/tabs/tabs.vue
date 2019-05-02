<script>
import TabsNav from './tabs-nav'
import TabsTab from './tabs-tab'
import TabsContent from './tabs-content'
import { find, findIndex } from '../../utils'

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
			tabs: [],
			currentActiveId: this.activeId
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
			this.tabs.push(tabPane)
		},
		removeTab(id) {
			const index = findIndex(this.tabs, pane => pane.id === id)
			if (index === -1) {
				return
			}
			this.tabs.splice(index, 1)
		},
		changeTo(id) {
			const targetTab = find(this.tabs, vm => vm.id === id)
			if (targetTab) {
				this.currentActiveId = targetTab.id
			}
		}
	},
	render() {
		return (
			<div class="zov-tabs">
				<TabsNav tabs={this.tabs} activeId={this.currentActiveId} />
				<TabsContent tabs={this.tabs} activeId={this.currentActiveId} />
				<div class="zov-tabs-hidden">{this.$slots.default}</div>
			</div>
		)
	}
}
</script>
