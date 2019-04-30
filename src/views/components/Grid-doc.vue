<template>
	<div>
		<h3>基本</h3>
		<Row>
			<Col span="2" v-for="item in 12" :key="item">{{ item }}</Col>
		</Row>
		<h3>间隔</h3>
		<Row :gutter="16">
			<Col span="6" v-for="item in 4" :key="item">
				<div style="height: 100%;background: rgba(0,0,0,0.65)">
					{{ item }}
				</div>
			</Col>
		</Row>
		<h3>order</h3>
		<Row type="flex">
			<Col span="6" order="4">1 | order-4</Col>
			<Col span="6" order="3">2 | order-3</Col>
			<Col span="6" order="2">3 | order-2</Col>
			<Col span="6" order="1">4 | order-1</Col>
		</Row>
		<h3>左右偏移</h3>
		<Row>
			<Col span="8">col-8</Col>
			<Col span="8" offset="8">col-8 | offset-8</Col>
		</Row>
		<br />
		<Row>
			<Col span="6" offset="8">col-6 | offset-8</Col>
			<Col span="6" offset="4">col-6 | offset-4</Col>
		</Row>
		<br />
		<Row>
			<Col span="12" offset="8">col-12 | offset-8</Col>
		</Row>
		<h3>排序</h3>
		<Row>
			<Col span="18" push="6">col-18 | push-6</Col>
			<Col span="6" pull="18">col-6 | pull-18</Col>
		</Row>
		<h3>响应式布局</h3>
		<Row>
			<Col :xs="2" :sm="4" :md="6" :lg="8">Col--1</Col>
			<Col :xs="20" :sm="16" :md="12" :lg="8">Col--2</Col>
			<Col :xs="2" :sm="4" :md="6" :lg="8">Col--3</Col>
		</Row>
		<h3>对齐方式</h3>
		<p>顶部对齐</p>
		<Row type="flex" justify="center" align="top" class="code-row-bg">
			<Col span="4"><p style="height: 80px">col-4</p></Col>
			<Col span="4"><p style="height: 30px">col-4</p></Col>
			<Col span="4"><p style="height: 100px">col-4</p></Col>
			<Col span="4"><p style="height: 60px">col-4</p></Col>
		</Row>
		<p>底部对齐</p>
		<Row type="flex" justify="center" align="bottom" class="code-row-bg">
			<Col span="4"><p style="height: 80px">col-4</p></Col>
			<Col span="4"><p style="height: 30px">col-4</p></Col>
			<Col span="4"><p style="height: 100px">col-4</p></Col>
			<Col span="4"><p style="height: 60px">col-4</p></Col>
		</Row>
		<p>居中对齐</p>
		<Row type="flex" justify="center" align="middle" class="code-row-bg">
			<Col span="4"><p style="height: 80px">col-4</p></Col>
			<Col span="4"><p style="height: 30px">col-4</p></Col>
			<Col span="4"><p style="height: 100px">col-4</p></Col>
			<Col span="4"><p style="height: 60px">col-4</p></Col>
		</Row>
		<h3>其它属性的响应式</h3>
		<span>
			span pull push offset order 属性可以通过内嵌到 xs sm md lg
			属性中来使用。 其中 :xs="6" 相当于 :xs="{ span: 6 }"。
		</span>
		<Row>
			<Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }"
				>Col</Col
			>
			<Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }"
				>Col</Col
			>
			<Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }"
				>Col</Col
			>
		</Row>
	</div>
</template>
<style lang="scss" scoped>
.zov-col {
	padding: 30px 0;
	background: #2aa198;
	&:nth-of-type(2n) {
		background: #1cd779;
	}
}
</style>
