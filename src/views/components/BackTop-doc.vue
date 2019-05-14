<style>
body {
	height: 2000px;
}
</style>
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
		<BackTop> </BackTop>
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
