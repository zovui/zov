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
					<Tabs :tab-position="tabPosition">
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
			<section class="demo">
				<h2 class="demo-header">
					给TabPane指定disabled，禁用某tab
				</h2>
				<div class="demo-content">
					<Tabs>
						<TabPane
							v-for="i in 3"
							:label="'Tab' + i"
							:id="'' + i"
							:disabled="i === 2"
							:key="i"
							>Content of tab {{ i }}</TabPane
						>
					</Tabs>
				</div>
			</section>
			<section class="demo">
				<h2 class="demo-header">
					给TabPane指定lazy, 是否懒加载
				</h2>
				<div class="demo-content">
					<p>
						给TabPane指定lazy = true，在tabs渲染时，只有当activeId
						===
						TabPane.id时才会被挂载，当切换至别的tab时，其内容会被销毁
					</p>
					<p>
						给TabPane指定lazy = false，在tabs渲染时，预渲染其内容
					</p>
				</div>
				<div class="demo-content">
					<Tabs>
						<TabPane label="static" id="1" :lazy="false">
							<StaticTestComponent />
						</TabPane>
						<TabPane label="static" id="2" :lazy="false">
							<StaticTestComponent />
						</TabPane>
						<TabPane label="lazy" id="3">
							<LazyTestComponent />
						</TabPane>
					</Tabs>
				</div>
			</section>
			<section class="demo">
				<h2 class="demo-header">
					卡片化Tabs，指定Tabs的type = card, 默认为border-card
				</h2>
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
							v-model="cardTabPosition"
						/>
						{{ pos }}
					</label>
				</div>
				<div class="demo-content">
					<Tabs type="card" :tab-position="cardTabPosition">
						<TabPane
							v-for="i in 3"
							:label="'Tab' + i"
							:id="'' + i"
							:key="i"
							>Content of tab {{ i }}</TabPane
						>
					</Tabs>
				</div>
				<div class="demo-content" :style="{ height: '300px' }">
					<Tabs type="card" :tab-position="cardTabPosition">
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
					可关闭的TabPane
				</h2>
				<div class="demo-content">
					<Tabs type="card">
						<TabPane label="Tab1" id="1" closable
							>Content of tab 1</TabPane
						>
						<TabPane label="Tab 2" id="2" closable
							>Content of tab 2</TabPane
						>
						<TabPane label="Tab 3" id="3" closable
							>Content of tab 3</TabPane
						>
					</Tabs>
				</div>
			</section>
			<section class="demo">
				<h2 class="demo-header">
					可关闭的TabPane + Tabs的beforeClose钩子
				</h2>
				<div class="demo-content">
					<p>beforeClose需要返回值</p>
					<p>
						若返回值为Promise,
						需要返回已经resolved的Promise，并且在resolved时传入true或false来指定是否关闭
					</p>
					<p>
						若返回值为boolean类型，则通过true |
						false来选择是否可关闭
					</p>
				</div>
				<div class="demo-content">
					<h3>返回boolean值</h3>
					<Tabs type="card" :before-close="beforeClose">
						<TabPane label="Tab1" id="1" closable
							>Content of tab 1</TabPane
						>
						<TabPane label="Tab 2" id="2" closable
							>Content of tab 2</TabPane
						>
						<TabPane label="Tab 3" id="3" closable
							>Content of tab 3</TabPane
						>
					</Tabs>
				</div>
				<div class="demo-content">
					<h3>返回Promise值</h3>
					<Tabs type="card" :before-close="beforeCloseByPromise">
						<TabPane label="Tab1" id="1" closable
							>Content of tab 1</TabPane
						>
						<TabPane label="Tab 2" id="2" closable
							>Content of tab 2</TabPane
						>
						<TabPane label="Tab 3" id="3" closable
							>Content of tab 3</TabPane
						>
					</Tabs>
				</div>
			</section>
			<section class="demo">
				<h2 class="demo-header">
					Tabs的beforeChange钩子
				</h2>
				<div class="demo-content">
					<p>beforeChange需要返回值</p>
					<p>
						若返回值为Promise,
						需要返回已经resolved的Promise，并且在resolved时传入true或false来指定是否跳转
					</p>
					<p>
						若返回值为boolean类型，则通过true | false来选择是否跳转
					</p>
				</div>
				<div class="demo-content">
					<h3>返回boolean值</h3>
					<Tabs type="card" :before-change="beforeChange">
						<TabPane label="Tab1" id="1" closable
							>Content of tab 1</TabPane
						>
						<TabPane label="Tab 2" id="2" closable
							>Content of tab 2</TabPane
						>
						<TabPane label="Tab 3" id="3" closable
							>Content of tab 3</TabPane
						>
					</Tabs>
				</div>
				<div class="demo-content">
					<h3>返回Promise值</h3>
					<Tabs type="card" :before-change="beforeChangeByPromise">
						<TabPane label="Tab1" id="1" closable
							>Content of tab 1</TabPane
						>
						<TabPane label="Tab 2" id="2" closable
							>Content of tab 2</TabPane
						>
						<TabPane label="Tab 3" id="3" closable
							>Content of tab 3</TabPane
						>
					</Tabs>
				</div>
			</section>
		</article>
	</article>
</template>

<style lang="scss" scoped>
@import '../../../core/styles/colors';
@import '../../../core/styles/mixins/get-color';
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
			@include get-color-border(background-color);
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
	components: {
		StaticTestComponent: {
			mounted() {
				console.log('static component is mounted!')
			},
			destroyed() {
				console.log('static component is destroyed!')
			},
			render(h) {
				return h('p', "I'm static component!")
			}
		},
		LazyTestComponent: {
			mounted() {
				console.log('lazy component is mounted!')
			},
			destroyed() {
				console.log('lazy component is destroyed!')
			},
			render(h) {
				return h('p', "I'm lazy component!")
			}
		}
	},
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
								introduction:
									'tabs类型, 可选border-card | card',
								type: 'string',
								default: 'border-card'
							},
							{
								props: 'tabPosition',
								introduction: 'tab展示的位置',
								type: 'string',
								default: 'top'
							},
							{
								props: 'beforeClose',
								introduction: 'tab关闭时的钩子，可阻止关闭行为',
								type: 'Function',
								default: 'undefined'
							},
							{
								props: 'beforeChange',
								introduction:
									'tab切换时的钩子，可阻止切换tab的行为',
								type: 'Function',
								default: 'undefined'
							},
							{
								props: 'preventDefaultRemove',
								introduction: '可阻止默认的删除行为',
								type: 'boolean',
								default: 'false'
							}
						]
					}
				},
				{
					header: 'TabPane props',
					content: {
						headers: ['props', '说明', '类型', '默认值'],
						data: [
							{
								props: 'id',
								introduction: 'tab的id',
								type: 'string',
								default: '无'
							},
							{
								props: 'label',
								introduction: 'tab的label',
								type: 'string',
								default: "''"
							},
							{
								props: 'order',
								introduction: 'tab展示顺序',
								type: 'number',
								default: '0'
							},
							{
								props: 'disabled',
								introduction: '是否禁用某tab',
								type: 'boolean',
								default: 'false'
							},
							{
								props: 'lazy',
								introduction: '是否懒加载',
								type: 'boolean',
								default: 'true'
							},
							{
								props: 'closable',
								introduction: '是否可关闭',
								type: 'boolean',
								default: 'false'
							}
						]
					}
				},
				{
					header: 'TabPane slots',
					content: {
						headers: ['slot名', '说明'],
						data: [
							{
								props: 'label',
								introduction: '自定义label内容'
							},
							{
								props: 'default',
								introduction: 'tab对应的内容'
							}
						]
					}
				}
			],
			bindingLabel: 'bindingLabel',
			activeKey: '1',
			tabPosition: 'top',
			cardTabPosition: 'top'
		}
	},
	methods: {
		beforeClose(id) {
			return window.confirm('是否要关闭Tab: ' + id)
		},
		beforeCloseByPromise(id) {
			return new Promise(resolve => {
				setTimeout(function() {
					resolve(window.confirm('是否要关闭Tab: ' + id))
				}, 3000)
			})
		},
		beforeChange(from, to) {
			return window.confirm(`是否要从Tab: ${from} 跳转到 Tab: ${to}`)
		},
		beforeChangeByPromise(from, to) {
			return new Promise(resolve => {
				setTimeout(function() {
					resolve(
						window.confirm(`是否要从Tab: ${from} 跳转到 Tab: ${to}`)
					)
				}, 3000)
			})
		}
	}
}
</script>
