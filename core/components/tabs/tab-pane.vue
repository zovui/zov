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
		label: String,
		// tab的顺序
		order: {
			type: Number,
			default: 0
		},
		// 是否禁用该tab
		disabled: {
			type: Boolean,
			default: false
		},
		// 是否懒加载
		lazy: {
			type: Boolean,
			default: true
		},
		closable: {
			type: Boolean,
			default: false
		}
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
			computedLabel: ''
		}
	},
	render() {
		this.computedLabel = this.$slots.label || this.label
		return <span class="zov-tab-pane" />
	}
}
</script>
