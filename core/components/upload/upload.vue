<template>
	<div :class="stylePrefix">
		<UploadList
			v-if="showUploadList && listType === 'picture-card'"
			:files="files"
			:listType="listType"
			:class="stylePrefix + '-picture-card'"
			@on-preview="handlePreview"
			@on-delete="handleDelete"
		></UploadList>
		<div
			:class="selectClasses"
			@click="handleClick"
			@drop.prevent="handleDrop"
			@dragover.prevent
			@dragleave.prevent
		>
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
			@on-preview="handlePreview"
			@on-delete="handleDelete"
		></UploadList>
	</div>
</template>

<script>
import UploadList from './upload-list'
import ajax from './ajax.js'

import FileObject from './file.js'

const prefix = 'zov-upload'

const STATUS = {
	LOADING: 'loading',
	FINISHED: 'finished',
	FAIL: 'fail'
}

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
		maxSize: Number, // 上传的单文件大小限制,kb
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
			type: Function
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
			files: []
		}
	},
	watch: {
		defaultFileList: {
			immediate: true,
			handler(fileList) {
				this.files = fileList.map(
					file =>
						new FileObject({
							name: file.name || '',
							url: file.url || ''
						})
				)
			}
		}
	},
	computed: {
		selectClasses() {
			return [
				this.stylePrefix + '-' + this.type,
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
		handleDrop(event) {
			// dragleave和dragover事件的默认行为是拒绝接受任何被拖放的元素。因此需要阻止浏览器这种默认行为
			if (this.type === 'drag' && !this.disabled) {
				let files = event.dataTransfer.files
				if (files) {
					this.uploadFiles(files)
				}
			}
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
						resolve(files)
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
		handleProgress(event, file) {
			this.onProgress(event, file, this.files)
			file.percent = event.percent || 0
		},
		handleSuccess(res, fileObject) {
			if (fileObject) {
				fileObject.status = STATUS.FINISHED
				fileObject.response = res
				this.onSuccess(res, fileObject, this.files)
			}
		},
		handleError(err, response, fileObject) {
			let files = this.files
			fileObject.status = STATUS.FAIL
			files.splice(files.indexOf(fileObject), 1)
			this.onError(err, response, fileObject)
		},
		handlePreview(file) {
			this.$emit('on-preview', file)

			if (this.onPreview) {
				this.onPreview(file)
			} else if (file.url) {
				window.open(file.url, '_blank')
			} else {
				return false
			}
		},
		handleDelete(file) {
			let files = this.files
			files.splice(files.indexOf(file), 1)
			this.onRemove(file, files)
		},
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
		},
		upload(file) {
			let fileObject = new FileObject({
				status: STATUS.LOADING,
				name: file.name,
				url: file.url,
				percent: 0,
				file: file
			})
			this.files.push(fileObject)

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
					this.handleProgress(event, fileObject)
				},
				onSuccess: res => {
					this.handleSuccess(res, fileObject)
				},
				onError: (err, response) => {
					this.handleError(err, response, fileObject)
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
				if (
					!(
						~this.format.indexOf(postfix.toUpperCase()) ||
						~this.format.indexOf(postfix.toLowerCase())
					)
				) {
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
