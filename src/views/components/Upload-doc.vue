<template>
	<article class="container">
		<h1>Upload</h1>
		<section class="section">
			<h2>基本用法</h2>
			<div>
				<Upload>
					<Button><Icon iconname="cloud-upload"></Icon>上传</Button>
				</Upload>
				<Upload disabled>
					<Button><Icon iconname="cloud-upload"></Icon>上传</Button>
				</Upload>
			</div>
		</section>
		<section class="section">
			<h2>支持多选</h2>
			<div>
				<Upload multiple>
					<Button><Icon iconname="cloud-upload"></Icon>上传</Button>
				</Upload>
			</div>
		</section>
		<section class="section">
			<h2>已上传列表样式</h2>
			<div>
				<Upload :default-file-list="defaultFileList" listType="text">
					<Button><Icon iconname="cloud-upload"></Icon>上传</Button>
				</Upload>
				<Upload :default-file-list="defaultFileList" listType="picture">
					<Button><Icon iconname="cloud-upload"></Icon>上传</Button>
				</Upload>
				<Upload
					:default-file-list="defaultFileList"
					listType="picture-card"
				>
				</Upload>
				<Upload
					:default-file-list="defaultFileList"
					listType="picture-card"
				>
					<span>点击上传</span>
				</Upload>
			</div>
		</section>
		<!--<section class="section">-->
		<!--<h2>打开一个confirm</h2>-->
		<!--<p class="props">-->
		<!--confirm用于打开一个confirm弹窗，有固定的图标，有取消按钮。当使用render方法时，则优先使用render渲染body部分的内容。-->
		<!--</p>-->
		<!--<div>-->
		<!--<Button @click="confirm">confirm</Button>-->
		<!--</div>-->
		<!--</section>-->
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
			]
		}
	},
	methods: {}
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
</style>
