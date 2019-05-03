<script>
export default {
	name: 'zov-tabs-tab',
	props: {
		id: String,
		index: Number,
		isActive: Boolean,
		label: [Array, String]
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
