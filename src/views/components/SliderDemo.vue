<template>
	<article class="container">
		<h1>Slider</h1>
		<section class="section">
			<h2>默认状态</h2>
			<p class="props">当前值: {{ value1 }}</p>
			<Slider v-model="value1" />
		</section>
		<section class="section">
			<h2>指定最大最小值</h2>
			<p class="props">min = 1; max = 10; 当前值: {{ value2 }}</p>
			<Slider v-model="value2" :min="1" :max="10" />
		</section>
		<section class="section">
			<h2>tooltipVisible：是否展示tooltip</h2>
			<p class="props">
				当tooltipVisible = 'default'时，拖拽或者hover
				handle时会显示tooltip
			</p>
			<Slider tooltipVisible="default" />
			<p class="props">当tooltipVisible = 'hidden'时，总是隐藏tooltip</p>
			<Slider tooltipVisible="hidden" />
			<p class="props">当tooltipVisible = 'always'时，总是显示tooltip</p>
			<Slider tooltipVisible="always" />
		</section>
		<section class="section">
			<h2>tipFormatter: tooltip文案格式化</h2>
			<p class="props">tipFormatter = (value) => '当前值为: ' + value</p>
			<Slider
				tooltipVisible="always"
				:tipFormatter="value => '当前值为: ' + value"
			/>
		</section>
		<section class="section">
			<h2>range，范围选择</h2>
			<p class="props">当前值{{ rangeValue }}</p>
			<Slider v-model="rangeValue" tooltipVisible="always" range />
		</section>
		<section class="section">
			<h2>step, 设置步长</h2>
			<p class="props">step = 5, 当前值: {{ stepTestValue }}</p>
			<Slider v-model="stepTestValue" :step="5" />
			<p class="props">step = 0.001, 当前值: {{ stepTestValue2 }}</p>
			<Slider v-model="stepTestValue2" :step="0.001" />
			<p class="props">step = 0.00001, 当前值: {{ stepTestValue3 }}</p>
			<Slider v-model="stepTestValue3" :step="0.00001" />
			<p class="props">step = 50, 当前值: {{ stepTestValue4 }}</p>
			<Slider v-model="stepTestValue4" :step="50" />
			<p class="props">step = 80, 当前值: {{ stepTestValue5 }}</p>
			<Slider v-model="stepTestValue5" :step="80" />
			<p class="props">step = 0.1, 当前值: {{ stepTestValue6 }}</p>
			<Slider v-model="stepTestValue6" :step="0.1" range />
		</section>
		<section class="section">
			<h2>marks，打标记</h2>
			<p class="props">当前值: {{ marksTestValue1 }}</p>
			<Slider v-model="marksTestValue1" :marks="marks" />
			<p class="props">当前值: {{ marksTestValue2 }}</p>
			<Slider v-model="marksTestValue2" range :marks="marks" />
		</section>
		<section class="section">
			<h2>
				marks & step，打标记并且设置step，能拖拽到marks上和根据step拖拽
			</h2>
			<p class="props">step = 10; 当前值: {{ marksAndStep }}</p>
			<Slider v-model="marksAndStep" :marks="marks" :step="10" />
			<p class="props">step = 10; 当前值: {{ marksAndStep1 }}</p>
			<Slider
				v-model="marksAndStep1"
				:min="-100"
				:max="200"
				:marks="marks2"
				:step="10"
			/>
		</section>
		<section class="section">
			<h2>marks & onlyMarks，打标记并且只能拖拽至标记上</h2>
			<p class="props">当前值: {{ marksAndOnlyMarksValue1 }}</p>
			<Slider
				v-model="marksAndOnlyMarksValue1"
				:marks="marks"
				only-marks
			/>
			<p class="props">当前值: {{ marksAndOnlyMarksValue2 }}</p>
			<Slider
				v-model="marksAndOnlyMarksValue2"
				range
				:marks="marks"
				only-marks
			/>
		</section>
		<section class="section">
			<h2>vertical垂直模式</h2>
			<p class="props">当前值: {{ vertical.value1 }}</p>
			<div class="vertical-demo">
				<Slider v-model="vertical.value1" vertical />
			</div>
			<p class="props">当前值{{ vertical.value2 }}</p>
			<div class="vertical-demo">
				<Slider
					v-model="vertical.value2"
					tooltipVisible="always"
					range
					vertical
				/>
			</div>
			<p class="props">当前值: {{ vertical.value3 }}</p>
			<div class="vertical-demo">
				<Slider
					v-model="vertical.value3"
					vertical
					:marks="marks"
					only-marks
				/>
			</div>
			<p class="props">当前值: {{ vertical.value4 }}</p>
			<div class="vertical-demo">
				<Slider
					v-model="vertical.value4"
					vertical
					range
					:marks="marks"
					only-marks
				/>
			</div>
		</section>
	</article>
</template>

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

.vertical-demo {
	height: 300px;
}
</style>

<script>
export default {
	data() {
		return {
			value1: 0,
			value2: 2,
			rangeValue: [20, 30],
			stepTestValue: 0,
			stepTestValue2: 0,
			stepTestValue3: 0,
			stepTestValue4: 30,
			stepTestValue5: 10,
			stepTestValue6: [60, 100],
			marks: {
				0: '0°C',
				26: '26°C',
				37: '37°C',
				100: {
					style: {
						color: '#ff5500'
					},
					label: '<strong>100°C</strong>'
				}
			},
			marks2: {
				'-78': '-78°C',
				'-15': '-15°C',
				0: '0°C',
				26: '26°C',
				37: '37°C',
				100: {
					style: {
						color: '#ff5500'
					},
					label: '<strong>100°C</strong>'
				}
			},
			marksTestValue1: 0,
			marksTestValue2: [40, 50],
			marksAndOnlyMarksValue1: 0,
			marksAndOnlyMarksValue2: [0, 20],
			marksAndStep: 0,
			marksAndStep1: -30,
			vertical: {
				value1: 0,
				value2: [18, 54],
				value3: 15,
				value4: [10, 80]
			}
		}
	}
}
</script>
