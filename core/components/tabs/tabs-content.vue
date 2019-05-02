<script>
import { find } from '../../utils'
export default {
	name: 'zov-tab-content',
	props: {
		tabs: Array,
		activeId: String
	},
	render() {
		const activeTabPane = find(this.tabs, vm => vm.id === this.activeId)
		let content = ''
		if (activeTabPane) {
			content = activeTabPane.$slots.default
		}
		return <div class="zov-tab-content">{content}</div>
	}
}
</script>
