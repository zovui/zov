<script>
export default {
	name: 'zov-tabs-tab',
	props: {
		id: String,
		index: Number,
		isActive: Boolean,
		label: [Array, String],
		disabled: Boolean,
		closable: Boolean
	},
	inject: {
		Tabs: {
			default: null
		}
	},
	computed: {
		classList() {
			const classList = ['zov-tabs-tab']
			if (this.isActive) {
				classList.push('zov-tabs-tab--active')
			}
			if (this.disabled) {
				classList.push('zov-tabs-tab--disabled')
			}
			return classList
		}
	},
	methods: {
		handleClick() {
			this.Tabs.changeTo(this.id)
		},
		handleClose() {
			this.Tabs.removeTab(this.id)
		}
	}
}
</script>
