import Vue from 'vue'
import Spin from '../components/spin'
export default {
    inserted (el, binding) {
        let instance = new Vue({
            render (h) {
                return h(Spin, {
                    props: {
                        cover: true
                    }
                })
            }
        })
        if (window.getComputedStyle(el, null).position === 'static') {
            el.style.position = 'relative'
        }
        el.appendChild(instance.$mount().$el)
        el._inserted = instance.$children[0]
        el._inserted.show = binding.value
    },
    componentUpdated (el, binding) {
        el._inserted.show = binding.value
    }
}
