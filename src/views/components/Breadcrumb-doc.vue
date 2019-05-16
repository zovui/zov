<template>
	<article class="container">
		<h1>Breadcrumb</h1>
		<section class="section">
			<h2>基本用法</h2>
			<div>
				<BreadcrumbItem href="/index"
					>home <span slot="separator">></span></BreadcrumbItem
				>
				<BreadcrumbItem href="/index">home</BreadcrumbItem>
			</div>
		</section>
		<section class="section">
			<h2>设置分隔符样式</h2>
			<div>
				<Breadcrumb>
					<BreadcrumbItem href="/index">home</BreadcrumbItem>
					<BreadcrumbItem href="/index">home</BreadcrumbItem>
					<BreadcrumbItem>home</BreadcrumbItem>
					<BreadcrumbItem>home</BreadcrumbItem>
				</Breadcrumb>
				<Breadcrumb separator="<b style='color: red;'>=></b>">
					<BreadcrumbItem href="/index">home</BreadcrumbItem>
					<BreadcrumbItem href="/index">home</BreadcrumbItem>
					<BreadcrumbItem>home</BreadcrumbItem>
					<BreadcrumbItem>home</BreadcrumbItem>
				</Breadcrumb>
			</div>
		</section>
		<section class="section">
			<h2>面包屑导航项数变化</h2>
			<div>
				<Breadcrumb>
					<BreadcrumbItem
						v-for="(route, index) in routes"
						:key="index"
						@on-click="handleClick(index)"
						>{{ route }}</BreadcrumbItem
					>
				</Breadcrumb>
			</div>
		</section>
	</article>
</template>

<script>
export default {
	name: 'Breadcrumb-doc',
	data() {
		return {
			routes: ['首页', '一级导航', '二级导航', '三级导航', '四级导航']
		}
	},
	methods: {
		handleClick(index) {
			this.routes.splice(index, 1)
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
</style>
