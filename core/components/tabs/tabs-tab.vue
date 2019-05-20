<script>
import { isFunction } from '../../utils'

function callAsyncHook({ context, hookName, data, callback }) {
	const hook = context[hookName]
	if (isFunction(hook)) {
		const returnValue = hook(...data)
		if (returnValue instanceof Promise) {
			returnValue.then(is => {
				if (is) {
					callback()
				}
			})
		} else if (typeof returnValue === 'boolean') {
			if (returnValue) {
				callback()
			}
		}
	} else {
		callback()
	}
}

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
			let from = this.Tabs.activeId
			let to = this.id
			callAsyncHook({
				context: this.Tabs,
				hookName: 'beforeChange',
				data: [from, to],
				callback: () => {
					this.Tabs.changeTo(to)
				}
			})
		},
		handleClose() {
			callAsyncHook({
				context: this.Tabs,
				hookName: 'beforeClose',
				data: [this.id],
				callback: () => {
					this.Tabs.removeTab(this.id)
				}
			})
		}
	},
	render() {
		return <span />
	}
}
</script>
