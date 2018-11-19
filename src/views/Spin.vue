<template>
    <div>
        <div class="div">
            <Spin cover></Spin>
            <ul class="ul">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
            </ul>
        </div>
        <div class="div">
            <Spin cover spinname="dbcircle"></Spin>
            <ul class="ul">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
            </ul>
        </div>
        <div class="box">
            <Spin></Spin>
            <Spin spinname="dbcircle"></Spin>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            cover: true
        }
    },
    mounted () {
        setTimeout(() => {
            this.cover = false
        }, 1000)
    }
}
</script>
<style lang="scss" scoped>
    .div{
        margin: 15px;
        position: relative;
        .zov-spin{
            font-size: 3em;
        }
    }
    .ul{
        border:1px solid #ccc;
        li{
            padding: 15px 0;
            &:not(:nth-of-type(1)){
                border-top: 1px solid #ccc;
            }
        }
    }
    .box>*{
        margin: 15px;
    }
</style>
