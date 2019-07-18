<template>
	<div class="App">
		<p>
			<strong>基本</strong>
			<rate v-model="myCurrentRate" :length="5" />
		</p>
		<p>
			<strong>带默认值</strong>
			<rate :value="3" />
		</p>
		<p>
			<strong>设置大小</strong>
			<rate :value="3" :width="'22px'" :height="'22px'" />
		</p>
		<p>
			<strong>显示数字 带默认数字</strong>
			<rate :value="3" :showcount="true" />
		</p>
		<p>
			<strong>传入能内容</strong>
			<rate
				:length="8"
				:value="6"
				:ratedesc="[
					'非常差',
					'差',
					'一般',
					'好',
					'非常好',
					'好极了',
					'无敌了',
					'没谁了'
				]"
			/>
		</p>
		<p>
			<strong>只读</strong>
			<rate
				:length="5"
				:value="3"
				:disabled="true"
				:ratedesc="['Very Bad', 'Bad', 'Normal', 'Good', 'Very Good']"
			/>
		</p>
		<p>
			<strong>颜色</strong>
			<rate
				:length="5"
				:value="4"
				:color="'#99a9bf'"
				:disabled="true"
				:ratedesc="['Very Bad', 'Bad', 'Normal', 'Good', 'Very Good']"
			/>
		</p>
		<table>
			<tr>
				<th>属性</th>
				<th>说明</th>
				<th>类型</th>
				<th>默认值</th>
			</tr>
			<tr>
				<td>value / v-model</td>
				<td>
					绑定值
				</td>
				<td>number</td>
				<td>0</td>
			</tr>
			<tr>
				<td>length</td>
				<td>最大分值</td>
				<td>Number</td>
				<td>5</td>
			</tr>
			<tr>
				<td>color</td>
				<td>
					icon颜色
				</td>
				<td>String</td>
				<td>'#efc20f'</td>
			</tr>
			<tr>
				<td>height</td>
				<td>设置icon高度</td>
				<td>String</td>
				<td>'16px'</td>
			</tr>
			<tr>
				<td>width</td>
				<td>设置icon宽度</td>
				<td>String</td>
				<td>'16px'</td>
			</tr>
			<tr>
				<td>showcount</td>
				<td>是否显示辅助数字</td>
				<td>Boolean</td>
				<td>false</td>
			</tr>
			<tr>
				<td>svgPath</td>
				<td>
					设置icon的'svg的path'
				</td>
				<td>String</td>
				<td>-</td>
			</tr>
			<tr>
				<td>right</td>
				<td>设置icon右padding</td>
				<td>String</td>
				<td>'5px'</td>
			</tr>
			<tr>
				<td>left</td>
				<td>设置icon左padding</td>
				<td>String</td>
				<td>'5px'</td>
			</tr>
			<tr>
				<td>ratedesc</td>
				<td>辅助文字数组</td>
				<td>String</td>
				<td>' '</td>
			</tr>
			<tr>
				<td>disabled</td>
				<td>是否为只读</td>
				<td>Boolean</td>
				<td>false</td>
			</tr>
		</table>
	</div>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {
			myCurrentRate: 1
		}
	}
}
</script>

<style lang="scss" scoped>
p {
	display: flex;
	padding-bottom: 30px;
	strong {
		width: 200px;
	}
}
table {
	font-size: 12px;
	border-collapse: collapse;
	border-spacing: 0;
	empty-cells: show;
	border: 1px solid #e9e9e9;
	width: 100%;
	margin-bottom: 24px;
	th,
	td {
		border: 1px solid #e9e9e9;
		padding: 8px 16px;
		text-align: left;
	}
}
</style>
