<template>
	<article class="container">
		<h1>Radio</h1>
		<section class="section">
			<h3>参数</h3>
			<h4>Radio props</h4>
			<p>
				@label 必传，String, Number, Boolean, Object，当前项的值
			</p>
			<p>
				@disabled 非必传，Boolean，禁用当前项，default：false
			</p>
			<h4>RadioGroup props</h4>
			<p>
				@name 非必传，String，原生radio的name值，不设置时会自动生成
			</p>
			<p>
				@value 非必传，String, Number, Boolean,
				Object，当前选中值，可使用v-modal双向绑定，default：-
			</p>
			<p>
				@disabled
				非必传，Boolean，是否禁用所有当前radioGroup下的checkbox，default：false
			</p>
			<p>
				@border 非必传，Boolean，是否显示边框，default：false
			</p>
			<p>
				@connected
				非必传，Boolean，在显示边框的情况下是否组合，default：false
			</p>
			<p>
				@buttonStyle
				非必传，Boolean，按钮样式，在border为true或group为true时生效，可选参数：outline、solid，default：outline
			</p>
			<p>
				@vertical 非必传，Boolean，纵向排列，default：false
			</p>
			<h4>Radio events</h4>
			<p>
				@on-change，Radio组件单独使用并且选中值发生改变时触发，返回值：当前选中项的值
			</p>
			<h4>RadioGroup events</h4>
			<p>@on-change，选中值发生改变时触发，返回值：当前选中项的值</p>
		</section>
		<section class="section">
			<h2>默认状态</h2>
			<p class="props">当前值: {{ radio1 }}</p>
			<div>
				<Radio
					name="aaa"
					v-model="radio1"
					size="large"
					label="1"
				></Radio>
			</div>
		</section>
		<section class="section">
			<h2>多个Radio共用一个值,需要设置相同的name</h2>
			<p class="props">当前值: {{ radio2 }}</p>
			<div>
				<Radio name="aaa" v-model="radio2" label="1"></Radio>
				<Radio name="aaa" v-model="radio2" label="2"></Radio>
			</div>
		</section>
		<section class="section">
			<h2>结合RadioGroup使用</h2>
			<p class="props">当前值: {{ radio3 }}</p>
			<div>
				<RadioGroup v-model="radio3">
					<Radio :label="objectLabel"></Radio>
					<Radio label="4"></Radio>
					<Radio :label="objectLabel1"></Radio>
				</RadioGroup>
			</div>
		</section>
		<section class="section">
			<h2>按钮样式</h2>
			<p class="props">当前值: {{ radio4 }}</p>
			<div>
				<RadioGroup border v-model="radio4">
					<Radio label="A"></Radio>
					<Radio label="B"></Radio>
					<Radio label="C"></Radio>
					<Radio label="D"></Radio>
				</RadioGroup>
				<RadioGroup border buttonStyle="solid" v-model="radio4">
					<Radio label="A"></Radio>
					<Radio label="B"></Radio>
					<Radio label="C"></Radio>
					<Radio label="D"></Radio>
				</RadioGroup>
			</div>
		</section>
		<section class="section">
			<h2>连接在一起的组合按钮样式</h2>
			<p class="props">当前值: {{ radio4 }}</p>
			<div>
				<RadioGroup class="mg-10" connected v-model="radio4">
					<Radio label="A"></Radio>
					<Radio label="B"></Radio>
					<Radio label="C"></Radio>
					<Radio label="D"></Radio>
				</RadioGroup>
				<RadioGroup connected buttonStyle="solid" v-model="radio4">
					<Radio label="A"></Radio>
					<Radio label="B"></Radio>
					<Radio label="C"></Radio>
					<Radio label="D"></Radio>
				</RadioGroup>
			</div>
		</section>
		<section class="section">
			<h2>不可用状态</h2>
			<div>
				<RadioGroup class="mg-10" disabled v-model="radio5">
					<Radio label="A"></Radio>
					<Radio label="B"></Radio>
					<Radio label="C"></Radio>
					<Radio label="D"></Radio>
				</RadioGroup>
				<RadioGroup class="mg-10" connected disabled v-model="radio6">
					<Radio label="A"></Radio>
					<Radio label="B"></Radio>
					<Radio label="C"></Radio>
					<Radio label="D"></Radio>
				</RadioGroup>
				<RadioGroup connected buttonStyle="solid" v-model="radio7">
					<Radio label="A" disabled></Radio>
					<Radio label="B" disabled></Radio>
					<Radio label="C"></Radio>
					<Radio label="D"></Radio>
				</RadioGroup>
			</div>
		</section>
		<section class="section">
			<h2>不同尺寸（size只在为按钮样式时有效）</h2>
			<div>
				<RadioGroup
					class="mg-10"
					connected
					size="large"
					v-model="radio4"
				>
					<Radio label="A"></Radio>
					<Radio label="B"></Radio>
					<Radio label="C"></Radio>
					<Radio label="D"></Radio>
				</RadioGroup>
				<RadioGroup class="mg-10" border size="large" v-model="radio4">
					<Radio label="A"></Radio>
					<Radio label="B"></Radio>
					<Radio label="C"></Radio>
					<Radio label="D"></Radio>
				</RadioGroup>
				<RadioGroup
					class="mg-10"
					connected
					size="small"
					buttonStyle="solid"
					v-model="radio4"
				>
					<Radio label="A"></Radio>
					<Radio label="B"></Radio>
					<Radio label="C"></Radio>
					<Radio label="D"></Radio>
				</RadioGroup>
				<RadioGroup
					border
					size="small"
					buttonStyle="solid"
					v-model="radio4"
				>
					<Radio label="A"></Radio>
					<Radio label="B"></Radio>
					<Radio label="C"></Radio>
					<Radio label="D"></Radio>
				</RadioGroup>
			</div>
		</section>

		<section class="section">
			<h2>排列方式</h2>
			<div>
				<RadioGroup vertical v-model="radio4">
					<Radio label="A"></Radio>
					<Radio label="B"></Radio>
					<Radio label="C"></Radio>
					<Radio label="D"></Radio>
				</RadioGroup>
				<RadioGroup vertical connected v-model="radio4">
					<Radio label="A"></Radio>
					<Radio label="B"></Radio>
					<Radio label="C"></Radio>
					<Radio label="D"></Radio>
				</RadioGroup>
				<RadioGroup vertical border size="small" v-model="radio4">
					<Radio label="A"></Radio>
					<Radio label="B"></Radio>
					<Radio label="C"></Radio>
					<Radio label="D"></Radio>
				</RadioGroup>
			</div>
		</section>
	</article>
</template>

<script>
export default {
	data() {
		return {
			radio1: '',
			radio2: '3',
			radio3: '3',
			radio4: 'A',
			radio5: 'A',
			radio6: 'A',
			radio7: 'A',
			objectLabel: {
				a: 123,
				b: '456'
			},
			objectLabel1: {
				a: 345,
				b: '456'
			}
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
