<template>
	<article class="container">
		<h1>Modal</h1>
		<section class="section">
			<h2>基本用法</h2>
			<div>
				<Button @click="handleShow('show1')">展示弹窗</Button>
				<Modal v-model="show1">这是一个Modal</Modal>
			</div>
		</section>
		<section class="section">
			<h2>禁用点击遮罩层关闭并不展示关闭按钮</h2>
			<div>
				<Button @click="handleShow('show6')">展示弹窗</Button>
				<Modal v-model="show6" :closable="false" :mask-closable="false"
					>这是一个Modal</Modal
				>
			</div>
		</section>
		<section class="section">
			<h2>自定义页头和页脚</h2>
			<div>
				<Button @click="handleShow('show2')">展示弹窗</Button>
				<Modal v-model="show2">
					<div slot="header">
						<span style="color: red;">温馨提示</span>
					</div>
					这是一个Modal
					<div slot="footer">
						<a href="#">这是一个链接</a>
					</div>
				</Modal>
			</div>
		</section>
		<section class="section">
			<h2>自定义按钮文案及按钮位置</h2>
			<div>
				<Button @click="handleShow('show3')">展示弹窗</Button>
				<Modal
					v-model="show3"
					title="温馨提示"
					width="400px"
					confirm-text="ok"
					cancel-text="cancel"
					bottom-align="right"
					>这是一个Modal</Modal
				>
			</div>
		</section>
		<section class="section">
			<h2>自定义弹窗垂直居中</h2>
			<div>
				<Button @click="handleShow('show4')">展示弹窗</Button>
				<Modal v-model="show4" :centered="true" bottom-align="right"
					>这是一个Modal</Modal
				>
			</div>
		</section>
		<section class="section">
			<h2>异步关闭弹窗</h2>
			<p class="props">confirmLoading配合on-confirm自定义事件使用</p>
			<div>
				<Button @click="handleShow('show5')">展示弹窗</Button>
				<Modal
					v-model="show5"
					bottom-align="right"
					:confirmLoading="true"
					@on-confirm="handleConfirmAsync"
					>这是一个Modal</Modal
				>
			</div>
		</section>
		<section class="section">
			<h2>初始化时loading整个弹窗内容区</h2>
			<div>
				<Button @click="handleShow('show7')">展示弹窗</Button>
				<Modal
					v-model="show7"
					bottom-align="right"
					:contentLoading="contentLoading"
					@on-open="handleOpen"
					>这是一个Modal</Modal
				>
			</div>
		</section>
		<section class="section">
			<h2>打开一个alert</h2>
			<p class="props">
				alert方法参数type可设置为info，success，warning，error和confirm，用于确认弹窗的图标类型。
				当type不存在时，可通过设置iconName和iconColor来控制图标展示样式。当使用render方法时，则优先使用render渲染body部分的内容。
				通过info，success，warning，error方法打开的弹窗图标不可更改。它们同样具有render方法。
			</p>
			<div>
				<Button @click="alert">alert</Button>
				<Button @click="alertInfo">alert</Button>
				<Button @click="info">info</Button>
				<Button @click="success">success</Button>
				<Button @click="warning">warning</Button>
				<Button @click="error">error</Button>
			</div>
		</section>
		<section class="section">
			<h2>打开一个confirm</h2>
			<p class="props">
				confirm用于打开一个confirm弹窗，有固定的图标，有取消按钮。当使用render方法时，则优先使用render渲染body部分的内容。
			</p>
			<div>
				<Button @click="confirm">confirm</Button>
			</div>
		</section>
	</article>
</template>

<script>
export default {
	data() {
		return {
			show1: false,
			show2: false,
			show3: false,
			show4: false,
			show5: false,
			show6: false,
			show7: false,
			contentLoading: false
		}
	},
	methods: {
		handleShow(key) {
			this[key] = true
		},
		alert() {
			this.$Modal.alert({
				title: '温馨提示',
				iconName: 'help-circle-outline',
				content: `这是一个Modal！！！！！！
                    这是一个Modal！！！！！！`,
				bottomAlign: 'center',
				render: h => {
					return h(
						'div',
						{
							style: {
								textAlign: 'center',
								paddingTop: '30px'
							}
						},
						[
							h('Icon', {
								props: {
									iconname: 'lock'
								},
								style: {
									fontSize: '30px',
									color: '#F55'
								}
							}),
							h(
								'p',
								{
									style: {
										lineHeight: '30px',
										marginTop: '15px',
										marginBottom: '20px'
									}
								},
								'使用render生成主体部分内容'
							)
						]
					)
				}
			})
		},
		alertInfo() {
			this.$Modal.alert({
				type: 'info',
				title: '温馨提示',
				iconName: 'help-circle-outline',
				content: `这是一个Modal！！！！！！
                    这是一个Modal！！！！！！`,
				bottomAlign: 'center',
				confirmText: 'ok'
			})
		},
		info() {
			this.$Modal.info({
				title: '温馨提示',
				iconName: 'help-circle-outline',
				content: '这是一个Modal！！！！！！这是一个Modal！！！！！！',
				confirmLoading: true,
				onConfirm: () => {
					this.$Modal.remove()
					this.success()
				}
			})
		},
		success() {
			this.$Modal.success({
				title: '温馨提示',
				iconName: 'help-circle-outline',
				content: '这是一个Modal！！！！！！这是一个Modal！！！！！！',
				confirmLoading: true,
				onConfirm: () => {
					setTimeout(() => {
						this.$Modal.remove()
					}, 1000)
				}
			})
		},
		warning() {
			this.$Modal.warning({
				title: '温馨提示',
				iconName: 'help-circle-outline',
				content: '这是一个Modal！！！！！！这是一个Modal！！！！！！'
			})
		},
		error() {
			this.$Modal.error({
				title: '温馨提示',
				iconName: 'help-circle-outline',
				content: '这是一个Modal！！！！！！这是一个Modal！！！！！！'
			})
		},
		confirm() {
			this.$Modal.confirm({
				title: '确认删除',
				iconName: 'help-circle-outline',
				content: '确认删除XXXXXXXXXXXXXXXXX吗？',
				confirmLoading: true,
				onConfirm: () => {
					setTimeout(() => {
						this.$Modal.remove()
					}, 1000)
				}
			})
		},
		handleConfirmAsync() {
			setTimeout(() => {
				this.show5 = false
			}, 3000)
		},
		handleOpen() {
			this.contentLoading = true
			setTimeout(() => {
				this.contentLoading = false
			}, 3000)
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
