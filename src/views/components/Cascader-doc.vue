<template>
	<div>
		<div style="border: 1px dashed;">
			<h3>基本</h3>
			<Cascader
				:data="[
					{ value: 1, children: [{ value: 1 }, { value: 2 }] },
					{ value: 2, children: [{ value: 1 }, { value: 2 }] }
				]"
				v-model="base"
				@on-change="change"
			/>
			<h3>常规</h3>
			<div class="box">
				<Cascader
					size="small"
					placeholder="单选"
					:data="list"
					v-model="value"
					label-name="text"
					value-name="id"
					child-name="children1"
					autofocus
				/>
				<Cascader
					placeholder="多选"
					:data="list"
					v-model="value1"
					label-name="text"
					value-name="id"
					child-name="children1"
					multiple
				/>
			</div>
			<h3>可搜索</h3>
			<div class="box">
				<Cascader
					placeholder="单选，可搜索"
					:data="list"
					v-model="value2"
					label-name="text"
					value-name="id"
					child-name="children1"
					filterable
				/>
				<Cascader
					placeholder="多选，可搜索"
					:data="list"
					v-model="value3"
					label-name="text"
					value-name="id"
					query-name="id"
					child-name="children1"
					filterable
					multiple
				/>
			</div>
			<h3>
				不同列可选，优先级：优先级 whichColumnOptional >
				everyoneOptional > last【default：最后一项】<br />
				<span style="color: red">注意：从需求角度看三种互斥</span>
			</h3>
			<div class="box">
				<Cascader
					placeholder="【默认】最后一项"
					:data="list"
					v-model="value4"
					label-name="text"
					value-name="id"
					child-name="children1"
				/>

				<Cascader
					placeholder="可搜索【0, 1】"
					:data="list"
					v-model="value5"
					label-name="text"
					value-name="id"
					child-name="children1"
					:which-column-optional="[0, 1]"
					multiple
					filterable
				/>
				<Cascader
					placeholder="单选，每列可选"
					:data="list"
					v-model="value6"
					label-name="text"
					value-name="id"
					child-name="children1"
					everyone-optional
				/>
				<Cascader
					placeholder="多选，每列可选"
					:data="list"
					v-model="value7"
					label-name="text"
					value-name="id"
					child-name="children1"
					multiple
					everyone-optional
				/>
			</div>
		</div>
		<div
			style="border: 3px dashed; text-align: left; margin: 15px;padding: 15px"
		>
			<h3>参数</h3>
			<p>@data 必传，Array，组件所需要的数据</p>
			<p>@v-model 必传，Array || String || Number，组件输出的值</p>
			<p>
				@value-name 非必传，String，value的映射key，默认:'value'<br />
				<span style="color: green">说明：选择后，暴露的value</span>
			</p>
			<p>
				@label-name 非必传，String，label的映射key，默认:'label'<br />
				<span style="color: green"
					>说明：选择后select-head上显示的文案</span
				>
			</p>
			<p>
				@query-name
				非必传，String，按哪个字段搜索，默认:this.labelName<br />
				<span style="color: green"
					>说明：查询依赖字段，`value` || `label`</span
				>
			</p>
			<p>
				@child-name
				非必传，String，分组数据中children字段的映射key，默认'children'
			</p>
			<p>@multiple 非必传，Boolean，多选，默认:false</p>
			<p>@filterable 非必传，Boolean，可搜索，默认:false</p>
			<p>@no-arrow 非必传，Boolean，drop容器的尖角，默认:true</p>
			<p>@placeholder 非必传，String，placeholder，默认:''</p>
			<p>@autofocus 非必传，Boolean，自动获取焦点，默认:false</p>
			<p>@disabled 非必传，Boolean，disabled，默认:false</p>
			<p>@no-data-text 非必传，String，无数据文案，默认:'无数据...'</p>
			<h3>Cascader 特色属性</h3>
			<p>
				@everyoneOptional 非必传，Boolean，规定每列的项可选，默认:false
			</p>
			<p>
				@whichColumnOptional 非必传，Array，规定那一列的项可选，默认:[]
			</p>
			<h3>回调事件</h3>
			<p>@on-open-change 组件drop呼出、收起的回调，形参：Boolean</p>
			<p>
				@on-change
				组件值发生变化后的回调，形参：单选【当前所选项的item】，多选【已选所有项的items】
			</p>
			<h3>补充说明</h3>
			<p style="color: red">
				1、不同列可选，优先级：优先级 whichColumnOptional >
				everyoneOptional > last【default：最后一项】
				2、搜索结果遵循可选列配置项的规则，默认最后一项。
			</p>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			list: (() => {
				let d = []
				for (let i = 0; i < 3; i++) {
					let x = {
						text: '第' + i + '连',
						id: i,
						children1: []
					}
					for (let j = 0; j < 5; j++) {
						let z = {
							id: j,
							text: '第' + j + '排',
							children1: []
						}
						for (let k = 0; k < 4; k++) {
							let l = {
								id: k,
								text: '第' + k + '班',
								children1: []
							}
							z.children1.push(l)
						}
						x.children1.push(z)
					}
					d.push(x)
				}
				return d
			})(),
			base: '',
			value: '',
			value1: ['1,1,1', '1,1,2'],
			value2: '',
			value3: [],
			value4: '',
			value5: [],
			value6: '',
			value7: ''
		}
	},
	methods: {
		change(val) {
			console.log(val)
		}
	}
}
</script>
<style lang="scss" scoped>
.box {
	display: flex;
	& > * {
		margin: 15px;
		flex: 1;
	}
}
</style>
