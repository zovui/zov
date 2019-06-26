<template>
	<article class="container">
		<h1>Progress</h1>
		<section class="section">
			<h3>参数</h3>
			<h4>Progress props</h4>
			<p>
				@percent 必传，Number，当前百分比，default：0
			</p>
			<p>
				@type 非必传，String，样式类型，目前只支持线型，default：line
			</p>
			<p>
				@format 非必传，Function，自定义进度信息样式，支持render函数
			</p>
			<p>
				@textInside
				非必传，Boolean，进度信息是否展示在进度条里，default：false
			</p>
			<p>
				@showInfo 非必传，Boolean，进度信息是否展示，default：true
			</p>
			<p>
				@strokeColor 非必传，String，进度条填充色，default：-
			</p>
			<p>
				@strokeWidth 非必传，Number，进度条宽度，default：8
			</p>
			<p>
				@status
				非必传，String，进度条状态，可选值有：normal、active、success、exception，default：normal
			</p>
		</section>
		<section class="section">
			<h2>默认状态</h2>
			<div>
				<Progress></Progress>
				<Progress :percent="20"></Progress>
				<Progress :percent="80"></Progress>
			</div>
		</section>
		<section class="section">
			<h2>自定义宽度</h2>
			<div>
				<Progress :percent="80"></Progress>
				<Progress :percent="80" :strokeWidth="15"></Progress>
				<Progress :percent="80" :strokeWidth="20"></Progress>
			</div>
		</section>
		<section class="section">
			<h2>自定义颜色</h2>
			<div>
				<Progress :percent="80"></Progress>
				<Progress :percent="80" :strokeColor="'#0eb31b'"></Progress>
			</div>
		</section>
		<section class="section">
			<h2>不同文案位置</h2>
			<div>
				<Progress :percent="80" :strokeWidth="20"></Progress>
				<Progress :percent="80" textInside :strokeWidth="20"></Progress>
			</div>
		</section>
		<section class="section">
			<h2>自定义文案格式</h2>
			<div>
				<Progress :percent="80"></Progress>
				<Progress :percent="80" :format="format"></Progress>
			</div>
		</section>
		<section class="section">
			<h2>进度条的不同状态</h2>
			<div>
				<Progress :percent="80"></Progress>
				<Progress :percent="80" status="active"></Progress>
				<Progress :percent="80" status="success"></Progress>
				<Progress :percent="80" status="exception"></Progress>
			</div>
		</section>
		<section class="section">
			<h2>进度条的动态展示</h2>
			<div>
				<Progress :percent="percent"></Progress>
				<Progress :percent="percent" status="active"></Progress>
				<Progress :percent="percent" status="success"></Progress>
				<Progress :percent="percent" status="exception"></Progress>
				<Progress
					:percent="percent"
					textInside
					:strokeWidth="20"
					status="active"
				></Progress>
				<Progress :percent="percent" :format="format"></Progress>
				<ButtonGroup>
					<Button @click="handleAdd(10)">+</Button>
					<Button @click="handleAdd(-10)">-</Button>
				</ButtonGroup>
			</div>
		</section>
	</article>
</template>

<script>
export default {
	data() {
		return {
			format: (h, data) => {
				return h(
					'span',
					{
						style: {
							color: '#ce0808'
						}
					},
					data.percent + '℃'
				)
			},
			percent: 10
		}
	},
	methods: {
		handleAdd(num) {
			let percent = this.percent + num
			if (percent <= 0) {
				this.percent = 0
			} else if (percent >= 100) {
				this.percent = 100
			} else {
				this.percent = percent
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
