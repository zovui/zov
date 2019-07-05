<template>
	<article class="container">
		<h1>Page</h1>
		<section class="section">
			<h3>简洁版</h3>
			<div class="page-box">
				<Page
					:current="1"
					:total="total"
					simple
					@on-change="onChange"
				></Page>
				<p>{{ current }}</p>
			</div>
		</section>
		<section class="section">
			<h3>展示总页数---翻页文字配置</h3>
			<div class="page-box">
				<Page
					prev-text="上一页"
					next-text="下一页"
					:total="total"
					show-total
					:current.sync="current"
				></Page>
			</div>
		</section>
		<section class="section">
			<h3>数据较多--切换每页条数--快速切换页码</h3>
			<div class="page-box">
				<Page :total="333" show-total></Page>
			</div>
			<div class="page-box">
				<Page :total="333" show-total show-sizer></Page>
			</div>
			<div class="page-box">
				<Page
					:total="33333"
					show-total
					show-sizer
					show-elevator
					:page-size-opts="pageSizeOpts"
				></Page>
			</div>
		</section>
		<section class="section">
			<h3>small版</h3>
			<div class="page-box">
				<Page :total="40" size="small" show-total></Page>
			</div>
			<div class="page-box">
				<Page :total="40" size="small" show-sizer></Page>
			</div>
			<div class="page-box">
				<p>1</p>
				<p>2</p>
				<p>3</p>
				<p>4</p>
				<p>5</p>
				<p>6</p>
				<Page
					:current="3"
					:total="40"
					size="small"
					placement="top"
					show-sizer
					show-elevator
				></Page>
			</div>
		</section>
		<table class="page-table">
			<tr>
				<th>属性</th>
				<th>说明</th>
				<th>类型</th>
				<th>默认值</th>
			</tr>
			<tr>
				<td>current</td>
				<td>当前页码，支持 .sync 修饰符</td>
				<td>Numbe</td>
				<td>1</td>
			</tr>
			<tr>
				<td>total</td>
				<td>数据总数</td>
				<td>Number</td>
				<td>0</td>
			</tr>
			<tr>
				<td>page-size</td>
				<td>每页条数</td>
				<td>Number</td>
				<td>10</td>
			</tr>
			<tr>
				<td>page-size-opts</td>
				<td>每页条数切换的配置</td>
				<td>Array</td>
				<td>[{value:10},{value:20},{value:30},{value:40}]</td>
			</tr>
			<tr>
				<td>size</td>
				<td>可选值为<code>small</code>（迷你版）或不填（默认）</td>
				<td>String</td>
				<td>-</td>
			</tr>
			<tr>
				<td>simple</td>
				<td>简洁版</td>
				<td>Boolean</td>
				<td>false</td>
			</tr>
			<tr>
				<td>show-total</td>
				<td>显示总数</td>
				<td>Boolean</td>
				<td>false</td>
			</tr>
			<tr>
				<td>show-elevator</td>
				<td>显示电梯，可以快速切换到某一页</td>
				<td>Boolean</td>
				<td>false</td>
			</tr>
			<tr>
				<td>show-sizer</td>
				<td>显示分页，用来改变<code>page-size</code></td>
				<td>Boolean</td>
				<td>false</td>
			</tr>
			<tr>
				<td>class-name</td>
				<td>自定义 class 名称</td>
				<td>String</td>
				<td>-</td>
			</tr>
			<tr>
				<td>styles</td>
				<td>自定义 style 样式</td>
				<td>Object</td>
				<td>-</td>
			</tr>
			<tr>
				<td>prev-text</td>
				<td>替代图标显示的上一页文字</td>
				<td>String</td>
				<td>-</td>
			</tr>
			<tr>
				<td>next-text</td>
				<td>替代图标显示的下一页文字</td>
				<td>String</td>
				<td>-</td>
			</tr>
		</table>

		<br />
		<br />
		<br />
		<table class="page-table">
			<tr>
				<th>事件名</th>
				<th>说明</th>
				<th>返回值</th>
			</tr>
			<tr>
				<td>on-change</td>
				<td>页码改变的回调，返回改变后的页码</td>
				<td>页码</td>
			</tr>
			<tr>
				<td>on-page-size-change</td>
				<td>切换每页条数时的回调，返回切换后的每页条数</td>
				<td>page-size</td>
			</tr>
		</table>
	</article>
</template>
<script>
export default {
	data() {
		return {
			current: 1,
			total: 21,
			pageSizeOpts: [
				{ value: 15 },
				{ value: 25 },
				{ value: 35 },
				{ value: 45 }
			]
		}
	},
	methods: {
		subject() {
			this.total -= 1
		},
		change() {
			this.current = 1
		},
		onChange(page) {
			this.current = page
		}
	}
}
</script>
<style lang="scss" scoped>
.container {
	width: 1000px;
	margin: 0 auto;
}
.page-box {
	padding: 20px 0px;
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
.page-table {
	border: 1px solid #666;
	border-collapse: collapse;
	tr {
		td,
		th {
			border: 1px solid #666;
			padding: 2px 5px;
		}
	}
}
</style>
