<template>
    <Layout class="org-layout">
        <Header class="org-layout-header">
            <div class="org-layout-header-logo">
                <img src="./assets/logo.png">
            </div>
            <div class="org-layout-header-nav">
                <Switcher class="org-layout-header-theme-btn" v-model="isdark">
                    <span slot="open"><Icon iconname="moon"></Icon></span>
                    <span slot="close"><Icon iconname="sunny"></Icon></span>
                </Switcher>
            </div>
        </Header>
        <Layout class="org-layout-main">
            <Sider
                v-model="collapsed"
                breakpoint="md"
                collapsedTrigger
            >
                <Menu :thumbnail="collapsed">
                    <MenuOption
                        v-for="(item,index) in $router.options.routes[1].children"
                        :key="index"
                        :name="item.path"
                        @click="$router.push({path: item.path})"
                    >
                        <Icon :iconname="item.routerOptions.iconname" thumbnail-icon/>
                        {{ item.routerOptions.disc }}
                    </MenuOption>
                    <MenuSub name="components">
                        <template #title>
                            组件
                        </template>
                        <MenuOption
                            v-for="(item,index) in $router.options.routes[2].children"
                            :key="index"
                            :name="item.path"
                            @click="$router.push({path: item.path})"
                        >
                            {{ item.path.substr(1) }}
                        </MenuOption>
                    </MenuSub>
                </Menu>
            </Sider>
            <Content><router-view/></Content>
        </Layout>
    </Layout>
</template>
<script>
export default {
    data () {
        return {
            collapsed: false,
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
    }
}
</script>
