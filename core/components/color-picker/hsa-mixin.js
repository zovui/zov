import { getTouches } from './utils'
import { findComponentUpward } from '../../utils'
export default {
	props: {
		focused: {
			type: Boolean,
			default: false
		},
		value: {
			type: Object,
			default: undefined
		}
	},
	computed: {
		colorPickerComponent() {
			return findComponentUpward(this, 'zov-color-picker')
		}
	},
	methods: {
		handleLeft(e) {
			this.handleSlide(e, this.left, 'left')
		},
		handleRight(e) {
			this.handleSlide(e, this.right, 'right')
		},
		handleUp(e) {
			this.handleSlide(e, this.up, 'up')
		},
		handleDown(e) {
			this.handleSlide(e, this.down, 'down')
		},
		handleMouseDown(e) {
			this.colorPickerComponent.dragging = true
			this.handleChange(e, true)
			window.addEventListener('mousemove', this.handleChange, false)
			window.addEventListener('mouseup', this.handleMouseUp, false)
		},
		handleMouseUp(e) {
			this.unbindEventListeners()
			// 此处延迟处理是为了保证以下行为在 out-click 执行之后
			setTimeout(() => {
				this.colorPickerComponent.dragging = false
			})
		},
		unbindEventListeners() {
			window.removeEventListener('mousemove', this.handleChange)
			window.removeEventListener('mouseup', this.handleMouseUp)
		},
		getLeft(e) {
			const xOffset =
				this.$refs.container.getBoundingClientRect().left +
				window.pageXOffset
			const pageX = e.pageX || getTouches(e, 'PageX')
			return pageX - xOffset
		},
		getTop(e) {
			const yOffset =
				this.$refs.container.getBoundingClientRect().top +
				window.pageYOffset
			const pageY = e.pageY || getTouches(e, 'PageY')
			return pageY - yOffset
		}
	}
}
