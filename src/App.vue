<template>
    <div id="app">
        <p style="padding: 15px 0">
            主题
            <Switcher v-model="isdark">
                <span slot="open">亮</span>
                <span slot="close">暗</span>
            </Switcher>
        </p>
        <ul id="nav">
            <li v-for="(item,index) in $router.options.routes" :key="index">
                <router-link :to="item.path" :key="index">{{ item.path.substr(1) }}</router-link>
            </li>
        </ul>
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
        isdark (val) {
            val ? this.$Dark.open(() => {
                localStorage.setItem('zov-theme', 'dark')
            }) : this.$Dark.close(() => {
                localStorage.setItem('zov-theme', '')
            })
        }
    },
    mounted () {
        this.isdark = (localStorage.getItem('zov-theme') === 'dark')
        console.log(this.version)
    }
}
</script>
