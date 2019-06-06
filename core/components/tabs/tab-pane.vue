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
	mounted() {
		if (this.Tabs === null) {
			throw new Error('TabPane必须配合Tabs组件使用')
		}
		this.Tabs.addTab(this)
		// 如果是非懒加载项
		if (this.lazy === false) {
			// 标记为渲染
			this.isRender = true
		}
		this.computedLabel = this.$slots.label || this.label
	},
	beforeDestroy() {
		this.Tabs.removeTab(this.id)
	},
	inject: {
		Tabs: {
			default: null
		}
	},
	data() {
		return {
			isRender: false,
			computedLabel: ''
		}
	},
	computed: {
		active() {
			return this.Tabs.activeId === this.id
		},
		show() {
			return this.isRender && this.active
		}
	},
	watch: {
		active(active) {
			if (this.lazy && this.isRender === false && active === true) {
				this.isRender = true
			}
		}
	},
	render() {
		this.computedLabel = this.$slots.label || this.label
		if (this.isRender) {
			return (
				<div
					class="zov-content-item"
					style={{ display: this.show ? 'block' : 'none' }}>
					{this.$slots.default}
				</div>
			)
		}
	}
}
</script>
