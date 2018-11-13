<template>
    <div id="app">
        <div id="nav">
            <template v-for="(item,index) in $router.options.routes">
                <router-link :to="item.path" :key="index">{{ item.path.substr(1) }}</router-link>
                {{ index ===  $router.options.routes.length - 1 ? '' : '|'}}
            </template>
            <p class="c">
                test text 这是一大段文字
            </p>
            <input type="text" placeholder="请输入哈哈哈">
            <input type="text" placeholder="请输入哈哈哈" disabled>
            <button @click="isdark = !isdark"> dark </button>
        </div>
        <router-view/>
    </div>
</template>
<style lang="scss">
    #app {
        text-align: center;
    }
    #nav {
        padding: 30px;
        a {
            font-weight: bold;
        }
    }
</style>
<script>
export default {
    data () {
        return {
            isdark: false
        }
    },
    watch: {
        'isdark' (val) {
            val ? this.$Dark.open() : this.$Dark.close()
        }
    }
}
</script>
