<script>
import Icon from '../icon'
import TabsTab from './tabs-tab'
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
	computed: {
		isScrollable() {
			return false
		},
		classList() {
			const classList = ['zov-tabs-nav']
			if (this.isScrollable) {
				classList.push('zov-tabs-nav--scrollable')
			}
			return classList
		}
	},
	render() {
		return (
			<div class={this.classList}>
				<span class="zov-tabs-nav-action zov-tabs-nav-action-prev">
					<Icon
						class="zov-tabs-nav-action-icon"
						iconname="arrow-back"
					/>
				</span>
				<div class="zov-tabs-nav-scroll-wrap">
					<div class="zov-tabs-nav-scroll">
						{this.tabs.map(tabPane => {
							return (
								<TabsTab
									id={tabPane.id}
									isActive={tabPane.id === this.activeId}>
									{tabPane.computedLabel}
								</TabsTab>
							)
						})}
					</div>
				</div>
				<span class="zov-tabs-nav-action zov-tabs-nav-action-next">
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
