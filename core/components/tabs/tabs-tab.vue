<script>
import { isFunction } from '../../utils'

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
			if (isFunction(this.Tabs.beforeClose)) {
				const returnValue = this.Tabs.beforeClose(this.id)
				if (returnValue instanceof Promise) {
					returnValue.then(isJump => {
						if (isJump) {
							this.Tabs.removeTab(this.id)
						}
					})
				} else if (typeof returnValue === 'boolean') {
					if (returnValue) {
						this.Tabs.removeTab(this.id)
					}
				}
			} else {
				this.Tabs.removeTab(this.id)
			}
		}
	},
	render() {
		return <span />
	}
}
</script>
