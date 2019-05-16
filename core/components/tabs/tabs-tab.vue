<script>
export default {
	name: 'zov-tabs-tab',
	props: {
		id: String,
		index: Number,
		isActive: Boolean,
		label: [Array, String],
		disabled: Boolean
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
	watch: {
		label() {
			this.$emit('changeLabel')
		}
	},
	methods: {
		handleClick() {
			this.Tabs.changeTo(this.id)
		}
	},
	render() {
		return (
			<div class={this.classList} onClick={this.handleClick}>
				{this.label}
			</div>
		)
	}
}
</script>
