<template>
	<article class="container">
		<h1>Modal</h1>
		<section class="section">
			<h3>参数</h3>
			<h4>Modal props</h4>
			<p>
				@value
				必填，Boolean，弹窗是否显示，可使用v-model双向绑定数据，default：false
			</p>
			<p>
				@closable 非必传，Boolean，是否显示关闭按钮，default：true
			</p>
			<p>
				@title 非必传，String，弹窗标题，default：提示
			</p>
			<p>
				@width
				非必传，String，Number，弹窗的宽度，支持百分比，default：520
			</p>
			<p>
				@centered 非必传，Boolean，弹窗是否垂直居中，default：false
			</p>
			<p>
				@mask 非必传，Boolean，是否显示遮罩层，default：true
			</p>
			<p>
				@maskClosable
				非必传，Boolean，是否允许点击遮罩层关闭，default：true
			</p>
			<p>
				@confirmText 非必传，String，确定按钮文案，default：确定
			</p>
			<p>
				@cancelText 非必传，String，取消按钮文案，default：取消
			</p>
			<p>
				@headerHide 非必传，Boolean，是否隐藏弹窗头部，default：false
			</p>
			<p>
				@footerHide 非必传，Boolean，是否隐藏对话框底部，default：false
			</p>
			<p>
				@fullscreen 非必传，Boolean，是否全屏展示，default：false
			</p>
			<p>
				@bottomAlign
				非必填，String，底部对其方式，可选值有left、center、right，default：center
			</p>
			<p>
				@confirmLoading
				非必传，Boolean，点击确定按钮的时候是否显示loading状态，default：false
			</p>
			<p>
				@contentLoading
				非必传，Boolean，loading整个内容区域，default：false
			</p>
			<p>
				@modalStyle 非必传，Object，弹窗样式，default：{}
			</p>
			<p>
				@zIndex 非必传，Number，手动设置弹窗层级，default：-
			</p>
			<p>
				@baseIndex
				非必传，Number，当前弹窗基础层级，每次打开弹窗都会在当前基础层级上加一，default：1000
			</p>
			<p>
				@transfer
				非必传，Boolean，将弹窗dom结构转移到body元素中，default：true
			</p>
			<h4>Modal events</h4>
			<p>@on-open，当弹窗打开时触发，返回值：null</p>
			<p>@on-close，当弹窗关闭时触发，返回值：null</p>
			<p>@on-visible-change，当弹窗可见行改变时触发，返回值：null</p>
			<p>
				@on-cancel，点击关闭按钮，取消按钮，或遮罩层时触发，返回值：null
			</p>
			<p>
				@on-confirm，点击确定按钮时触发，confirmLoading为true时需要在on-confirm的事件处理函数中关闭弹窗，返回值：event
			</p>
			<h4>Modal instance</h4>
			<p>this.$modal.alert(config) 通知类单按钮弹窗</p>
			<p>this.$modal.info(config) type为info的alert型弹窗</p>
			<p>this.$modal.success(config) type为success的alert型弹窗</p>
			<p>this.$modal.error(config) type为error的alert型弹窗</p>
			<p>this.$modal.warning(config) type为warning的alert型弹窗</p>
			<p>this.$modal.confirm(config) type为confirm，确认类双按钮弹窗</p>
			<p>this.$modal.remove() 关闭对话框</p>
			<h4>config</h4>
			<p>
				@type String，控制alert弹窗中的icon类型
			</p>
			<p>
				@title String，弹窗标题
			</p>
			<p>
				@content String，中间内容区块文案
			</p>
			<p>
				@render Function，弹窗中部内容区域的dom结构使用render函数渲染
			</p>
			<p>
				@width Number，String，弹窗宽度，default: 400
			</p>
			<p>
				@confirmText String，确认按钮文案
			</p>
			<p>
				@cancelText String，取消按钮文案
			</p>
			<p>
				@closable Boolean，是否展示关闭按钮，default: false
			</p>
			<p>
				@maskClosable Boolean，是否支持点击遮罩层关闭，default: false
			</p>
			<p>
				@confirmLoading
				Boolean，确认按钮点击时候是否展示为loading状态，配合onConfirm使用，default:
				false
			</p>
			<p>
				@bottomAlign String，弹窗底部的对齐方式，default: right
			</p>
			<p>
				@onConfirm Function，点击确定按钮时的回调，default: () => {}
			</p>
			<p>
				@onCancel Function，点击取消按钮时的回调，default: () => {}
			</p>
			<p>
				@headerHide Boolean，隐藏头部。default：true
			</p>
		</section>
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
