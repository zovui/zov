import Tooltip from '../components/tooltip'
export default function(ctx) {
	return {
		inserted(el, binding) {
			let _props
			if (typeof binding.value === 'string') {
				_props = {
					text: binding.value
				}
			} else if (typeof binding.value === 'object') {
				_props = binding.value
			}
			let instance = new ctx({
				render(h) {
					return h(Tooltip, {
						props: _props
					})
				}
			})
			el.parentNode.appendChild(instance.$mount().$el)
			instance.$mount().$el.appendChild(el)
		}
	}
}
