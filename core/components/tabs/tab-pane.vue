<script>
export default {
	name: 'zov-tab-pane',
	props: {
		// 键值，标识tab-pane的唯一性
		id: {
			type: String,
			required: true
		},
		// tab的名字
		label: String
	},
	created() {
		if (this.Tabs === null) {
			throw new Error('TabPane必须配合Tabs组件使用')
		}
		this.Tabs.addTab(this)
	},
	destroyed() {
		this.Tabs.removeTab(this.id)
	},
	inject: {
		Tabs: {
			default: null
		}
	},
	data() {
		return {
			computedLabel: '',
			content: ''
		}
	},
	render() {
		this.computedLabel = this.$slots.label || this.label
		this.content = this.$slots.default
		return <span class="zov-tab-pane" />
	}
}
</script>
