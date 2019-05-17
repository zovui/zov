<script>
import TabsContentItem from './tabs-content-item'
export default {
	name: 'zov-tab-content',
	props: {
		tabPaneList: Array,
		activeId: String
	},
	render() {
		let activeId = this.activeId
		let content = ''
		if (this.tabPaneList.length) {
			content = this.tabPaneList
				.filter(pane => pane.id === activeId || pane.lazy === false)
				.map(pane => {
					return (
						<TabsContentItem show={pane.id === activeId}>
							{pane.$slots.default}
						</TabsContentItem>
					)
				})
		}
		return <div class="zov-tabs-content">{content}</div>
	}
}
</script>
