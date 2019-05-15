<script>
import { find } from '../../utils'
export default {
	name: 'zov-tab-content',
	props: {
		tabPaneList: Array,
		activeId: String
	},
	render() {
		const activeTabPane = find(
			this.tabPaneList,
			vm => vm.id === this.activeId
		)
		let content = ''
		if (activeTabPane) {
			content = activeTabPane.$slots.default
		}
		return <div class="zov-tabs-content">{content}</div>
	}
}
</script>
