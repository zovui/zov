<template>
	<article class="container">
		<h1>Upload</h1>
		<section class="section">
			<h3>参数</h3>
			<h4>Upload props</h4>
			<p>
				@action 必传，String, Function，上传地址
			</p>
			<p>
				@headers 非必传，Object，上传的请求头，default：{}
			</p>
			<p>
				@multiple 非必传，Boolean，多选，default：false
			</p>
			<p>
				@disabled 非必传，Boolean，禁用上传，default：false
			</p>
			<p>
				@data 非必传，Object，上传附带数据，default：{}
			</p>
			<p>
				@name 非必传，String，上传文件键值，default：file
			</p>
			<p>
				@withCredentials
				非必传，Boolean，上传请求是否携带cookie，default：false
			</p>
			<p>
				@showUploadList 非必传，Boolean，是否展示上传列表，default：true
			</p>
			<p>
				@type 非必传，String，上传控件类型，default：select
			</p>
			<p>
				@accept 非必传，String，支持上传文件的MIME类型
			</p>
			<p>
				@format 非必传，Array，支持上传文件后缀名列表，default：[]
			</p>
			<p>
				@maxSize 非必传，Number，上传的单文件大小限制,kb
			</p>
			<p>
				@limit 非必传，Number，上传文件的总个数限制，只支持整数
			</p>
			<p>
				@defaultFileList 非必传，Array，默认已上传文件列表
			</p>
			<p>
				@customRequest 非必传，Function，自定义上传实现
			</p>
			<p>
				@listType
				非必传，String，上传列表样式，可选值：text、picture、picture-card
			</p>
			<p>
				@autoUpload
				非必传，Boolean，是否在选取文件后立即自动上传，default：true
			</p>
			<p>
				@beforeUpload 非必传，Function，上传文件之前的钩子
			</p>
			<p>
				@beforeMultipleUpload 非必传，Function，批量上传文件之前的钩子
			</p>
			<p>
				@onProgress 非必传，Function，文件上传中的钩子
			</p>
			<p>
				@onSuccess 非必传，Function，文件上传成功的钩子
			</p>
			<p>
				@onError 非必传，Function，文件上传失败时的钩子
			</p>
			<p>
				@onPreview 非必传，Function，点击已上传文件时的钩子
			</p>
			<p>
				@onRemove 非必传，Function，文件列表移除文件时的钩子
			</p>
			<p>
				@onFormatError 非必传，Function，文件格式验证失败时的钩子
			</p>
			<p>
				@onExceededSize 非必传，Function，文件大小验证失败时的钩子
			</p>
			<p>
				@onExceededLimit 非必传，Function，文件数量超出预期的个数
			</p>
		</section>
		<section class="section">
			<h2>基本用法</h2>
			<div>
				<Upload action="//jsonplaceholder.typicode.com/posts/">
					<Button><Icon iconname="cloud-upload"></Icon>上传</Button>
				</Upload>
				<Upload action="//jsonplaceholder.typicode.com/posts/" disabled>
					<Button><Icon iconname="cloud-upload"></Icon>上传</Button>
				</Upload>
			</div>
		</section>
		<section class="section">
			<h2>支持多选</h2>
			<div>
				<Upload action="//jsonplaceholder.typicode.com/posts/" multiple>
					<Button><Icon iconname="cloud-upload"></Icon>上传</Button>
				</Upload>
			</div>
		</section>
		<section class="section">
			<h2>已上传列表样式</h2>
			<div>
				<Upload
					action="//jsonplaceholder.typicode.com/posts/"
					:default-file-list="defaultFileList"
					list-type="text"
				>
					<Button><Icon iconname="cloud-upload"></Icon>上传</Button>
				</Upload>
				<Upload
					action="//jsonplaceholder.typicode.com/posts/"
					:default-file-list="defaultFileList"
					list-type="picture"
				>
					<Button><Icon iconname="cloud-upload"></Icon>上传</Button>
				</Upload>
				<Upload
					action="//jsonplaceholder.typicode.com/posts/"
					:default-file-list="defaultFileList"
					list-Type="picture-card"
					:on-success="handleSuccess"
				>
				</Upload>
				<Upload
					action="//jsonplaceholder.typicode.com/posts/"
					:default-file-list="defaultFileList"
					list-Type="picture-card"
				>
					<span>点击上传</span>
				</Upload>
			</div>
		</section>
		<section class="section">
			<h2>拖拽上传</h2>
			<div>
				<Upload
					action="//jsonplaceholder.typicode.com/posts/"
					:default-file-list="defaultFileList"
					list-Type="text"
					type="drag"
				>
					<div class="drag-upload-container">
						<Icon
							class="drag-upload-icon"
							iconname="cloud-upload"
						></Icon>
						<p class="drag-upload-text">
							将文件拖到此处，或
							<span class="drag-upload-strong">点击上传</span>
						</p>
					</div>
				</Upload>
			</div>
		</section>

		<section class="section">
			<h2>上传校验</h2>
			<div>
				<Upload
					action="//jsonplaceholder.typicode.com/posts/"
					accept="image/jpeg, image/png"
					:format="format"
					:max-size="15"
					:limit="3"
					:on-error="handleError"
					:on-remove="handleRemove"
					:on-format-error="handleFormatError"
					:on-exceeded-limit="handleExceededLimit"
					:on-exceeded-size="handleExceededSize"
					multiple
				>
					<Button><Icon iconname="cloud-upload"></Icon>上传</Button>
				</Upload>
			</div>
		</section>
	</article>
</template>

<script>
export default {
	data() {
		return {
			defaultFileList: [
				{
					name: 'xxxx.jpg',
					url:
						'https://cn.bing.com/th?id=OHR.Manhattanhenge_ZH-CN4659585143_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp'
				},
				{
					name: 'yyyyyyyy.jpeg',
					url:
						'https://camo.githubusercontent.com/a4ee422ec1accc811276f220561976f14005b13b/687474703a2f2f7a6f762e7468657068656e69782e636e2f696d672f6c6f676f2e35313134623463362e706e67'
				},
				{
					name: 'zzzzzzzzzzzz.jpeg',
					url: ''
				}
			],
			format: ['jpg', 'jpeg', 'png']
		}
	},
	methods: {
		handleSuccess(res, file, files) {
			file.url =
				'https://camo.githubusercontent.com/a4ee422ec1accc811276f220561976f14005b13b/687474703a2f2f7a6f762e7468657068656e69782e636e2f696d672f6c6f676f2e35313134623463362e706e67'
		},
		handleError(err, response, file) {
			this.$Message.error({
				title: '提示',
				text: file.name + '上传失败！',
				duration: 500,
				closable: false
			})
		},
		handleRemove(file, fileList) {
			this.$Message.info({
				title: '提示',
				text: file.name + '已删除',
				duration: 500,
				closable: false
			})
		},
		handleFormatError(file) {
			this.$Message.error({
				title: '提示',
				text: file.name + '格式错误！',
				duration: 500,
				closable: false
			})
		},
		handleExceededLimit(uploadFiles, fileList) {
			this.$Message.error({
				title: '提示',
				text: '已上传文件个数不能超过3个',
				duration: 500,
				closable: false
			})
		},
		handleExceededSize(file) {
			this.$Message.error({
				title: '提示',
				text: '单个文件大小不能超过15kb',
				duration: 500,
				closable: false
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.container {
	width: 1000px;
	margin: 0 auto;
}
.section {
	box-sizing: border-box;
	margin: 20px 0;
	border: 1px solid #f5f5f5;
	padding: 20px 30px;
	box-shadow: 0 0 5px 0 #7f7f7f;
}
.props {
	margin: 20px 0;
}
.mg-10 {
	margin-bottom: 10px;
}

.drag-upload {
	&-container {
		border: 1px dashed #e4e4e4;
		text-align: center;
		border-radius: 4px;
		height: 100px;
		padding: 20px;
	}
	&-icon {
		font-size: 30px;
		color: #2d8cf0;
	}
	&-strong {
		color: #2d8cf0;
	}
}
</style>
