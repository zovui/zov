<template>
	<div style="text-align: center">
		<Button looks="primary" @click="$LoadingBar.start()">start</Button> |
		<Button looks="success" @click="$LoadingBar.finish()">finish</Button> |
		<Button looks="error" @click="$LoadingBar.error()">error</Button> |
		<Button looks="warning" @click="$LoadingBar.warning()">waring</Button>
	</div>
</template>
<script>
export default {
	mounted() {
		this.$LoadingBar.start()
		this.$LoadingBar.finish()
		this.$LoadingBar.error()
		this.$LoadingBar.start()
	}
}
</script>
