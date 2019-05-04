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
					<Tabs v-model="activeKey">
						<TabPane :label="bindingLabel" id="1"
							>Content of tab 1</TabPane
						>
						<TabPane label="Tab 2" id="2">Content of tab 2</TabPane>
						<TabPane label="Tab 3" id="3">Content of tab 3</TabPane>
						<TabPane label="Tab 4" id="4">Content of tab 4</TabPane>
						<TabPane label="Tab 5" id="5">Content of tab 5</TabPane>
						<TabPane label="Tab 6" id="6">Content of tab 6</TabPane>
						<TabPane label="Tab 7" id="7">Content of tab 7</TabPane>
						<TabPane label="Tab 8" id="8">Content of tab 8</TabPane>
						<TabPane label="Tab 9" id="9">Content of tab 9</TabPane>
						<TabPane label="Tab 10" id="10"
							>Content of tab 10</TabPane
						>
						<TabPane label="Tab 11" id="11"
							>Content of tab 11</TabPane
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
					<Tabs activeId="1" :tabPosition="tabPosition">
						<TabPane label="Tab 1" id="1">Content of tab 1</TabPane>
						<TabPane label="Tab 2" id="2">Content of tab 2</TabPane>
						<TabPane label="Tab 3" id="3">Content of tab 3</TabPane>
						<TabPane label="Tab 4" id="4">Content of tab 4</TabPane>
						<TabPane label="Tab 5" id="5">Content of tab 5</TabPane>
						<TabPane label="Tab 6" id="6">Content of tab 6</TabPane>
						<TabPane label="Tab 7" id="7">Content of tab 7</TabPane>
						<TabPane label="Tab 8" id="8">Content of tab 8</TabPane>
						<TabPane label="Tab 9" id="9">Content of tab 9</TabPane>
						<TabPane label="Tab 10" id="10"
							>Content of tab 10</TabPane
						>
						<TabPane label="Tab 11" id="11"
							>Content of tab 11</TabPane
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
								props: 'type',
								introduction: 'tabs类型',
								type: 'string',
								default: 'line'
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
