<template>
    <div>
        <Button type="primary" @click="$LoadingBar.start()">start</Button> |
        <Button type="success" @click="$LoadingBar.finish()">finish</Button> |
        <Button type="error" @click="$LoadingBar.error()">error</Button> |
        <Button type="warning" @click="$LoadingBar.warning()">waring</Button>
    </div>
</template>
<script>
export default {
    mounted () {
        this.$LoadingBar.start()
        this.$LoadingBar.finish()
        this.$LoadingBar.error()
        this.$LoadingBar.start()
    }
}
</script>
