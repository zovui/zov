export default {
	props: {
		file: Object
	},
	methods: {
		handleDelete() {
			this.$emit('on-delete', this.file)
			return false
		},
		handlePreview() {
			if (this.file.status === 'finished') {
				this.$emit('on-preview', this.file)
			}
		},
		showImage(file) {
			// 其他主流浏览器和IE10+,使用FileReader
			let fileReader = new FileReader()

			fileReader.onload = event => {
				this.$refs.img.src = event.target.result
			}

			fileReader.readAsDataURL(file)
		}
	}
}
