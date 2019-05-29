<template>
	<div :class="stylePrefix">
		<UploadList
			v-if="showUploadList && listType === 'picture-card'"
			:files="files"
			:listType="listType"
			:class="stylePrefix + '-picture-card'"
		></UploadList>
		<div :class="selectClasses" @click="handleClick">
			<input
				ref="fileInput"
				:class="stylePrefix + '-input'"
				type="file"
				:name="name"
				:disabled="disabled"
				:multiple="multiple"
				:accept="accept"
				@change="handleFileChange"
			/>
			<slot>
				<Icon
					:class="stylePrefix + '-picture-card-add-icon'"
					v-if="listType === 'picture-card'"
					iconname="add"
				></Icon>
			</slot>
		</div>
		<slot name="tip"></slot>
		<UploadList
			v-if="showUploadList && ~['text', 'picture'].indexOf(listType)"
			:files="files"
			:listType="listType"
		></UploadList>
	</div>
</template>

<script>
import UploadList from './upload-list'
import ajax from './ajax.js'

const prefix = 'zov-upload'

export default {
	name: prefix,
	props: {
		action: [String, Function], // 上传的地址
		headers: {
			// 上传的请求头
			type: Object,
			default: () => ({})
		},
		multiple: {
			// 是否支持多选
			type: Boolean,
			default: false
		},
		paste: {
			// 是否支持粘贴上传
			type: Boolean,
			default: false
		},
		disabled: {
			// 是否禁用
			type: Boolean,
			default: false
		},
		data: {
			// 上传附带参数
			type: Object,
			default: () => ({})
		},
		name: {
			// 上传文件的字段名
			type: String,
			default: 'file'
		},
		withCredentials: {
			// 上传请求是否携带cookie
			type: Boolean,
			default: false
		},
		showUploadList: {
			// 是否展示上传列表
			type: Boolean,
			default: true
		},
		type: {
			// 上传控件类型
			type: String,
			default: 'select',
			validator: value => {
				return ~['select', 'drag'].indexOf(value)
			}
		},
		accept: String, // 支持上传文件的MIME类型
		format: {
			type: Array,
			default: () => []
		},
		maxSize: Number, // 上传的单文件大小限制
		limit: {
			type: Number,
			validator: value => {
				return value > 0 && value % 1 === 0
			}
		}, // 上传文件的个数限制
		defaultFileList: {
			// 默认的已上传文件列表
			type: Array,
			default: () => []
		},
		customRequest: {
			type: Function,
			default: ajax
		}, // 自定义上传实现
		listType: {
			// 上传列表的样式
			type: String,
			default: 'text',
			validator: value => {
				return ~['text', 'picture', 'picture-card'].indexOf(value)
			}
		},
		autoUpload: {
			// 是否在选取文件后立即自动上传
			type: Boolean,
			default: true
		},
		beforeUpload: Function, // 上传文件之前的钩子
		beforeMultipleUpload: Function, // 批量上传文件之前的钩子
		onProgress: {
			type: Function,
			default() {
				return {}
			}
		}, // 文件上传时的钩子
		onSuccess: {
			type: Function,
			default() {
				return {}
			}
		}, // 文件上传成功时的钩子
		onError: {
			type: Function,
			default() {
				return {}
			}
		}, // 文件上传失败时的钩子
		onPreview: {
			type: Function,
			default() {
				return {}
			}
		}, // 点击已上传文件时的钩子
		onRemove: {
			type: Function,
			default() {
				return {}
			}
		}, // 文件列表移除文件时的钩子
		onFormatError: {
			type: Function,
			default() {
				return {}
			}
		}, // 文件格式验证失败时的钩子
		onExceededSize: {
			type: Function,
			default() {
				return {}
			}
		}, // 文件大小验证失败时的钩子
		onExceededLimit: {
			type: Function,
			default() {
				return {}
			}
		} // 文件数量超出预期的个数
	},
	data() {
		return {
			stylePrefix: prefix,
			files: this.defaultFileList
		}
	},
	computed: {
		selectClasses() {
			return [
				this.stylePrefix + '-select',
				{
					[this.stylePrefix + '-picture-card-select']:
						this.listType === 'picture-card'
				}
			]
		}
	},
	components: {
		UploadList
	},
	methods: {
		handleClick() {
			this.$refs.fileInput.click()
		},
		handleFileChange(event) {
			let files = event.target.files

			if (files) {
				this.uploadFiles(files)
			}

			this.$refs.fileInput.value = null
		},
		handleBeforeMultipleUpload(files) {
			return new Promise((resolve, reject) => {
				if (this.beforeMultipleUpload) {
					let beforeMultipleUploadReturn = this.beforeMultipleUpload(
						files
					)

					if (
						beforeMultipleUploadReturn &&
						beforeMultipleUploadReturn.then
					) {
						beforeMultipleUploadReturn
							.then(process => {
								if (
									process instanceof Array &&
									process.every(item => item instanceof File)
								) {
									resolve(process)
								} else {
									resolve(files)
								}
							})
							.catch(() => {
								reject()
							})
					} else if (beforeMultipleUploadReturn !== false) {
						resolve(file)
					} else {
						reject()
					}
				} else {
					resolve(files)
				}
			})
		},
		handleBeforeUpload(file) {
			return new Promise((resolve, reject) => {
				if (this.beforeUpload) {
					let beforeUploadReturn = this.beforeUpload(file)

					if (beforeUploadReturn && beforeUploadReturn.then) {
						beforeUploadReturn
							.then(process => {
								resolve(
									process instanceof File ? process : file
								)
							})
							.catch(() => {
								reject()
							})
					} else if (beforeUploadReturn !== false) {
						resolve(file)
					} else {
						reject()
					}
				} else {
					resolve(file)
				}
			})
		},
		handleProgress() {},
		handleSuccess() {},
		handleError() {},
		uploadFiles(files) {
			files = [...files]

			// 如果支持批量上传
			if (this.multiple) {
				if (files.length) {
					this.handleBeforeMultipleUpload(files)
						.then(uploadFiles => {
							if (this.isExceededLimit(uploadFiles)) {
								this.onExceededLimit(uploadFiles, this.files)
								return false
								// todo 错误处理
							} else {
								uploadFiles.forEach(file => {
									this.uploadFile(file)
								})
							}
						})
						.catch(() => {})
				}
			}
			// 如果不支持批量上传，且上传文件列表不为空
			else if (files.length) {
				this.uploadFile(files.slice(0, 1)[0])
			}
		},
		uploadFile(file) {
			this.handleBeforeUpload(file)
				.then(uploadFile => {
					if (this.validatorFile(uploadFile)) {
						this.upload(uploadFile)
					}
				})
				.catch(() => {})
			// this.validator(file).then(() => {
			//
			// }).catch(() => {
			//
			// });
		},
		upload(file) {
			let formData = new FormData()
			formData.append(this.name, file)
			ajax({
				headers: this.headers,
				withCredentials: this.withCredentials,
				file: file,
				data: this.data,
				filename: this.name,
				action: this.action,
				onProgress: event => {
					this.handleProgress(event, file)
				},
				onSuccess: res => {
					this.handleSuccess(res, file)
				},
				onError: (err, response) => {
					this.handleError(err, response, file)
				}
			})
		},
		isExceededLimit(files) {
			if (this.limit) {
				return this.files.length + files.length > this.limit
			} else {
				return false
			}
		},
		validatorFile(file) {
			let name = file.name
			let size = file.size / 1024

			if (this.format.length) {
				let postfix = name.split('.').pop()
				if (!~this.format.indexOf(postfix)) {
					this.onFormatError(file)
					return false
				}
			}

			if (this.maxSize >= 0 && size > this.maxSize) {
				this.onExceededSize(file)
				return false
			}

			return true
		}
	}
}
</script>
