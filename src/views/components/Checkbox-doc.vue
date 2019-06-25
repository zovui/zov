<template>
	<article class="container">
		<h1>Checkbox</h1>
		<section class="section">
			<h2>默认状态</h2>
			<p class="props">当前值: {{ checkbox1 }}</p>
			<div>
				<checkbox v-model="checkbox1">A</checkbox>
			</div>
		</section>
		<section class="section">
			<h2>组合使用</h2>
			<p class="props">当前值: {{ checkbox2 }}</p>
			<div>
				<CheckboxGroup v-model="checkbox2">
					<Checkbox label="A"></Checkbox>
					<Checkbox label="B"></Checkbox>
					<Checkbox :label="labelObject1"></Checkbox>
				</CheckboxGroup>
			</div>
		</section>
		<section class="section">
			<h2>禁用部分选项</h2>
			<p class="props">当前值: {{ checkbox2 }}</p>
			<div>
				<CheckboxGroup v-model="checkbox2" class="mg-10">
					<Checkbox label="A"></Checkbox>
					<Checkbox label="B" disabled></Checkbox>
					<Checkbox :label="labelObject1"></Checkbox>
				</CheckboxGroup>
				<checkbox :indeterminate="true" disabled>A</checkbox>
			</div>
		</section>

		<section class="section">
			<h2>按钮组禁用</h2>
			<p class="props">当前值: {{ checkbox2 }}</p>
			<div>
				<CheckboxGroup v-model="checkbox2" disabled>
					<Checkbox label="A"></Checkbox>
					<Checkbox label="B"></Checkbox>
					<Checkbox :label="labelObject1"></Checkbox>
				</CheckboxGroup>
			</div>
		</section>
		<section class="section">
			<h2>联动</h2>
			<p class="props">当前值: {{ checkbox3 }}</p>
			<div>
				<checkbox
					v-model="checkbox4"
					:indeterminate="indeterminate"
					@on-change="handleAllChecked"
					>全选</checkbox
				>
				<CheckboxGroup v-model="checkbox3" @on-change="handleChange">
					<Checkbox
						v-for="(item, index) in options"
						:label="item"
						:key="index"
					></Checkbox>
				</CheckboxGroup>
			</div>
		</section>
		<section class="section">
			<h2>纵向排列</h2>
			<p class="props">当前值: {{ checkbox5 }}</p>
			<div>
				<CheckboxGroup v-model="checkbox5" vertical>
					<Checkbox
						v-for="(item, index) in options"
						:label="item"
						:key="index"
					></Checkbox>
				</CheckboxGroup>
			</div>
		</section>
	</article>
</template>

<script>
export default {
	data() {
		return {
			checkbox1: true,
			checkbox2: ['A'],
			labelObject1: {
				a: 123,
				b: 'this is a text!'
			},
			options: [
				'A',
				'B',
				{
					a: 123,
					b: 'this is a text!'
				}
			],
			checkbox3: [],
			checkbox4: false,
			indeterminate: false,
			checkbox5: []
		}
	},
	methods: {
		handleChange(val) {
			if (val.length === this.options.length) {
				this.checkbox4 = true
				this.indeterminate = false
			} else if (val.length) {
				this.checkbox4 = false
				this.indeterminate = true
			} else {
				this.checkbox4 = false
				this.indeterminate = false
			}
		},
		handleAllChecked(val) {
			this.indeterminate = false
			if (val) {
				this.checkbox3 = this.options
			} else {
				this.checkbox3 = []
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
