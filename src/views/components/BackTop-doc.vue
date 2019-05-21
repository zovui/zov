<style></style>
<template>
	<div>
		<div
			style="border: 3px dashed; text-align: left; margin: 15px;padding: 15px"
		>
			<h3>参数</h3>
			<h4>BackTop props</h4>
			<p>
				@height
				非必传，Number，页面滚动高度达到该值时才显示BackTop组件，default：400
			</p>
			<p>
				@bottom 非必传，Number，组件距离底部的距离，default：30
			</p>
			<p>
				@right 非必传，Number，组件距离右部的距离，default：30
			</p>
			<p>
				@duration 非必传，Number，滚动动画持续时间，单位
				毫秒，default：1000
			</p>
			<h4>BackTop events</h4>
			<p>@on-click，点击按钮时触发，返回值：无</p>
		</div>
		<div style="height: 2000px"></div>
		<BackTop :bottom="150">UP</BackTop>
		<BackTop :bottom="90"></BackTop>
		<BackTop :bottom="30"
			><img
				style="width:40px; height:40px;"
				src="data:image/png;base64,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"
				alt=""
		/></BackTop>
	</div>
</template>
<script>
export default {
	data() {
		return {}
	},
	mounted() {}
}
</script>
