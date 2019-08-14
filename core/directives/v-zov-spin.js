import Spin from '../components/spin'
export default function(ctx) {
	return {
		inserted(el, binding) {
			let _props = {
				cover: true
			}
			if (typeof binding.value === 'object') {
				_props = {
					..._props,
					...binding.value
				}
			}
			let instance = new ctx({
				render(h) {
					return h(Spin, {
						props: _props
					})
				}
			})
			if (window.getComputedStyle(el, null).position === 'static') {
				el.style.position = 'relative'
			}
			el.appendChild(instance.$mount().$el)
			el._inserted = instance.$children[0]
			el._inserted.show =
				typeof binding.value === 'object'
					? binding.value.show
					: binding.value
		},
		componentUpdated(el, binding) {
			el._inserted.show =
				typeof binding.value === 'object'
					? binding.value.show
					: binding.value
		}
	}
}
