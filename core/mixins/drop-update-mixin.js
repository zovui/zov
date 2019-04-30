/**
 * 说明：凡是用到popper组件的，都可以需要这个方法，来更新popper的位置，如组件：drop、cascader
 **/
import { findComponentDownward } from '../utils'
export default {
	computed: {
		popperComponent() {
			return findComponentDownward(this, 'zov-popper')
		}
	},
	methods: {
		dropUpdate() {
			this.popperComponent.popper.update()
		}
	}
}
