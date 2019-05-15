<template>
	<article class="container">
		<h1>Tabs</h1>
		<article class="article">
			<section
				class="component-introduction"
				v-for="introduction of componentIntroduction"
				:key="introduction.header"
			>
				<h2 class="component-introduction-header">
					{{ introduction.header }}
				</h2>
				<table class="component-introduction-content">
					<thead>
						<tr>
							<th
								v-for="header of introduction.content.headers"
								:key="header"
							>
								{{ header }}
							</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="props of introduction.content.data"
							:key="props.props"
						>
							<td>{{ props.props }}</td>
							<td>{{ props.introduction }}</td>
							<td>{{ props.type }}</td>
							<td>{{ props.default }}</td>
						</tr>
					</tbody>
				</table>
			</section>
		</article>
		<article class="article">
			<section class="demo">
				<h2 class="demo-header">默认使用</h2>
				<div class="demo-content">
					<Tabs>
						<TabPane label="Tab1" id="1">Content of tab 1</TabPane>
						<TabPane label="Tab 2" id="2">Content of tab 2</TabPane>
						<TabPane label="Tab 3" id="3">Content of tab 3</TabPane>
					</Tabs>
				</div>
			</section>
			<section class="demo">
				<h2 class="demo-header">当tabs超出屏幕时，可滚动nav</h2>
				<div class="demo-content">
					<Tabs>
						<TabPane
							v-for="i in 40"
							:label="'Tab' + i"
							:id="'' + i"
							:key="i"
							>Content of tab {{ i }}</TabPane
						>
					</Tabs>
				</div>
			</section>
			<section class="demo">
				<h2 class="demo-header">tabPosition</h2>
				<div class="demo-content">
					<label
						v-for="pos of ['top', 'bottom', 'left', 'right']"
						:key="pos"
					>
						<input
							class="radio"
							type="radio"
							:value="pos"
							name="tabPosition"
							v-model="tabPosition"
						/>
						{{ pos }}
					</label>
				</div>
				<div class="demo-content" :style="{ height: '300px' }">
					<Tabs :tabPosition="tabPosition">
						<TabPane
							v-for="i in 40"
							:label="'Tab' + i"
							:id="'' + i"
							:key="i"
							>Content of tab {{ i }}</TabPane
						>
					</Tabs>
				</div>
			</section>
			<section class="demo">
				<h2 class="demo-header">
					给TabPane指定order，可让渲染出来的tabs进行排序
				</h2>
				<div class="demo-content">
					TabPane的order配合v-if使用时非常有用
				</div>
				<div class="demo-content" :style="{ height: '300px' }">
					<Tabs>
						<TabPane
							v-for="i in 3"
							:label="'Tab' + i"
							:id="'' + i"
							:key="i"
							:order="3 - i"
							>Content of tab {{ i }}</TabPane
						>
					</Tabs>
				</div>
			</section>
		</article>
	</article>
</template>

<style lang="scss" scoped>
.container {
	min-width: 600px;
	margin: 0 auto;
}

.article {
	margin: 20px 0;
}

.component-introduction {
	margin: 20px 0;
	.component-introduction-header {
		margin: 20px 0;
	}
	.component-introduction-content {
		border-collapse: collapse;
		border-spacing: 0;
		margin: 20px 0;
		width: 100%;
		border: 1px solid #dddddd;
		thead {
			background: #eeeeee;
		}
		th,
		td {
			border: 1px solid #dddddd;
			vertical-align: middle;
			height: 36px;
			text-align: center;
		}
	}
}

.demo {
	box-sizing: border-box;
	margin: 20px 0;
	border: 1px solid #f5f5f5;
	padding: 20px 30px;
	box-shadow: 0 0 5px 0 #7f7f7f;
	.demo-header {
		margin: 10px 0;
	}
	.demo-props {
		margin: 10px 0;
	}
	.demo-content {
		margin: 10px 0;
	}
}

.radio {
	appearance: radio !important;
}
</style>

<script>
export default {
	name: 'TabsDemo',
	data() {
		return {
			componentIntroduction: [
				{
					header: 'Tabs属性',
					content: {
						headers: ['props', '说明', '类型', '默认值'],
						data: [
							{
								props: 'activeId',
								introduction: '激活的tab对应的id',
								type: 'string',
								default: '第一个tabs的id'
							},
							{
								props: 'type',
								introduction: 'tabs类型',
								type: 'string',
								default: 'line'
							},
							{
								props: 'tabPosition',
								introduction: 'tab展示的位置',
								type: 'string',
								default: 'top'
							}
						]
					}
				}
			],
			bindingLabel: 'bindingLabel',
			activeKey: '1',
			tabPosition: 'top'
		}
	}
}
</script>
