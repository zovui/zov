<template>
    <div>
<!--        <Layout>-->
<!--            <Header>Header</Header>-->
<!--            <Content>Content</Content>-->
<!--            <Footer>Footer</Footer>-->
<!--        </Layout>-->
        <div style="border: 3px dashed; text-align: left; margin: 15px;padding: 15px">
            xs: '480px',<br>
            sm: '768px',<br>
            md: '992px',<br>
            lg: '1200px',<br>
            xl: '1600px'<br>
        </div>
        <Layout>
            <Header>
                <Menu high-color mode="horizontal">
                    <MenuOption name="1"/>
                    <MenuOption name="2"/>
                    <MenuSub name="3">
                        <MenuGroup>
                            <MenuOption name="3-1-1"/>
                            <MenuOption name="3-1-2"/>
                        </MenuGroup>
                        <MenuGroup>
                            <MenuOption name="3-2-1"/>
                            <MenuOption name="3-2-2"/>
                        </MenuGroup>
                    </MenuSub>
                </Menu>
            </Header>
            <Layout>
                <Sider v-model="collapsed" breakpoint="sm">
                    <Menu :thumbnail="collapsed">
                        <MenuOption name="1"/>
                        <MenuOption name="2"/>
                        <MenuSub name="3">
                            <MenuGroup>
                                <MenuOption name="3-1-1"/>
                                <MenuOption name="3-1-2"/>
                            </MenuGroup>
                            <MenuGroup>
                                <MenuOption name="3-2-1"/>
                                <MenuOption name="3-2-2"/>
                            </MenuGroup>
                        </MenuSub>
                    </Menu>
                </Sider>
                <Content>Content</Content>
            </Layout>
            <Footer>Footer</Footer>
        </Layout>
    </div>
</template>
<script>
export default {
    data () {
        return {
            collapsed: false
        }
    }
}
</script>
