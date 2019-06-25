<template>
	<div class="demo">
		<div
			style="border: 3px dashed; text-align: left; margin: 15px;padding: 15px"
		>
			<h3>参数</h3>
			<h4>Sider props</h4>
			<p>
				@breakpoint
				非必传，String，触发响应式布局的断点，可选值为xs,sm,md,lg,xl或xxl，若不设此属性则不会触发响应式布局，默认--
			</p>
			<span style="color: green">
				说明： xs: '480px',<br />
				sm: '768px',<br />
				md: '992px',<br />
				lg: '1200px',<br />
				xl: '1600px'<br />
			</span>
			<p>
				@value 非必传，Boolean，侧边栏是否收起，可使用 v-model
				双向绑定数据。默认: false|展开
			</p>
			<p>
				@width 非必传，[Number, String]但是只能为数字，宽度，默认：240
			</p>
			<p>
				@collapsed-width 非必传，[Number,
				String]但是只能为数字，收起状态下的宽度，默认：64
			</p>
			<p>
				@collapsed-trigger 非必传，Boolean，显示默认触发器，默认：false
			</p>
			<h4>Sider events</h4>
			<p>@on-collapse 展开-收起时的回调，形参：Boolean</p>
		</div>
		<Layout class="container-demo">
			<Header>
				<Menu high-color mode="horizontal">
					<MenuOption name="1" />
					<MenuOption name="2" />
					<MenuSub name="3">
						<MenuGroup>
							<MenuOption name="3-1-1" />
							<MenuOption name="3-1-2" />
						</MenuGroup>
						<MenuGroup>
							<MenuOption name="3-2-1" />
							<MenuOption name="3-2-2" />
						</MenuGroup>
					</MenuSub>
				</Menu>
			</Header>
			<Layout>
				<Sider
					v-model="collapsed"
					breakpoint="sm"
					@on-collapse="collapse"
				>
					<Menu :thumbnail="collapsed">
						<MenuOption name="1" />
						<MenuOption name="2" />
						<MenuSub name="3">
							<MenuGroup>
								<MenuOption name="3-1-1" />
								<MenuOption name="3-1-2" />
							</MenuGroup>
							<MenuGroup>
								<MenuOption name="3-2-1" />
								<MenuOption name="3-2-2" />
							</MenuGroup>
						</MenuSub>
					</Menu>
				</Sider>
				<Content>
					<div class="sider-bar" @click="collapsed = !collapsed">
						<Icon
							:iconname="
								collapsed ? 'arrow-forward' : 'arrow-back'
							"
						/>
					</div>
					Content
				</Content>
			</Layout>
			<Footer>Footer</Footer>
		</Layout>
		<Layout class="container">
			<Header></Header>
			<Layout>
				<Sider></Sider>
				<Layout>
					<Content></Content>
					<Footer></Footer>
				</Layout>
			</Layout>
		</Layout>
		<Layout class="container">
			<Sider></Sider>
			<Layout>
				<Header></Header>
				<Content></Content>
				<Footer></Footer>
			</Layout>
		</Layout>
		<Layout class="container">
			<Header></Header>
			<Layout>
				<Sider></Sider>
				<Content></Content>
			</Layout>
			<Footer></Footer>
		</Layout>
	</div>
</template>
<script>
export default {
	data() {
		return {
			collapsed: false
		}
	},
	methods: {
		collapse(f) {
			console.log(f)
		}
	}
}
</script>
<style lang="scss" scoped>
.demo {
	$color-primary: #2d8cf0;
	$layout-header-background: lighten($color-primary, 10%);
	$layout-content-background: lighten($color-primary, 25%);
	$layout-footer-background: $layout-header-background;
	$layout-sider-background: $color-primary;
	.zov-layout-header {
		background: $layout-header-background;
	}
	.zov-layout-content {
		background: $layout-content-background;
	}
	.zov-layout-sider {
		background: $layout-sider-background;
	}
	.zov-layout-footer {
		background: $layout-footer-background;
	}
}
.container {
	height: 400px;
	margin-top: 15px;
}
.sider-bar {
	width: 45px;
	height: 45px;
	line-height: 45px;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
	margin: 5px;
	border-radius: 4px;
	text-align: center;
	background: #fff;
}
</style>
