<template>
    <div>
        <Button @click="mode === 'horizontal' ? mode = 'vertical' : mode = 'horizontal'"> 切换模式 </Button>
        <Button @click="highColor = !highColor"> 高亮 {{ highColor }} </Button>
        <Button @click="accordion = !accordion"> 手风琴模式 {{ accordion }} </Button>
        <Button @click="trigger === 'hover' ? trigger = 'click' : trigger = 'hover'"> trigger {{ trigger }} </Button>
        <Menu
            :mode="mode"
            :high-color="highColor"
            :accordion="accordion"
            :trigger="trigger"
            active-name="4-3-3-1"
            :open-names="['2', '3']"
            @on-change="change"
            @on-open-change="open"
        >
            <MenuItem name="1">
                <Icon iconname="apps"/>
                哈哈
            </MenuItem>
            <MenuSub
                v-for="(item, index) in menu"
                :key="index + ''"
                :name="index + 2"
            >
                <template #title>
                    <Icon iconname="apps"/>
                    {{ item.title }}
                </template>
                <MenuGroup v-for="(innerItem, innerIndex) in item.group" :key="innerIndex + ''">
                    <template #title>{{ innerItem.title }}</template>
                    <MenuItem
                        v-for="(menuItem, menuIndex) in innerItem.list"
                        :key="menuIndex + ''"
                        :name="(index + 2) + '-' + (innerIndex + 1) + '-' + (menuIndex + 1)"
                    >
                        {{ menuItem }}
                    </MenuItem>
                </MenuGroup>
            </MenuSub>
            <MenuSub name="4">
                <MenuItem name="4-1"/>
                <MenuItem name="4-2"/>
                <MenuSub name="4-3">
                    <MenuItem name="4-3-1"/>
                    <MenuItem name="4-3-2"/>
                    <MenuSub name="4-3-3">
                        <MenuItem name="4-3-3-1"/>
                        <MenuItem name="4-3-3-2"/>
                    </MenuSub>
                </MenuSub>
                <MenuSub name="4-4">
                    <MenuItem name="4-4-1"/>
                    <MenuItem name="4-4-2"/>
                </MenuSub>
            </MenuSub>
            <MenuGroup>
                <MenuItem name="5"/>
                <MenuItem name="6"/>
            </MenuGroup>
        </Menu>

        <div style="border: 3px dashed; text-align: left; margin: 15px;padding: 15px">
            <h3>参数</h3>
            <h4>Menu props</h4>
            <p>@mode                                非必传，String，模式，备选'horizontal'、'vertical'，default：'vertical'</p>
            <p>@high-color                          非必传，Boolean，高亮模式，默认: false</p>
            <p>@open-names                          非必传，Array，初始化MenuSub展开项的name集合，触发展开，默认:[]<br></p>
            <p>@active-name                         非必传，[Number, String]，当前激活的MenuItem，默认: undefined<br>
                <span style="color: green">说明：如果当前MenuItem是在未展开的MenuSub项中，则会将其所有父级MenuSub展开</span>
            </p>
            <p>@accordion                           非必传，Boolean，在'vertical'手风琴展开模式，默认：false</p>
            <p>@no-arrow                            非必传，Boolean，在'horizontal'模式下，drop是否有尖角，默认：false</p>
            <p>@trigger                             非必传，String，在'horizontal'模式下，drop的呼出事件，默认：'hover'</p>
            <p>@width                               非必传，[String, Number]，在'vertical'宽度，默认：240</p>
            <p>@indent                              非必传，[String, Number]，缩进，默认：15</p>
            <br>
            <h4>MenuSub props</h4>
            <p>@name                                必传，[String, Number]，当前组件的唯一标识，默认--</p>
            <br>
            <h4>MenuItem props</h4>
            <p>@name                                必传，[String, Number]，当前组件的唯一标识，默认--</p>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            mode: 'horizontal',
            highColor: false,
            accordion: false,
            trigger: 'hover',
            menu: [{
                title: '首页',
                group: [
                    {
                        title: '第一组',
                        list: ['home第一项', 'home第二项']
                    },
                    {
                        title: '第二组',
                        list: ['home第一项', 'home第二项']
                    }
                ]
            }, {
                title: '关于',
                group: [
                    {
                        title: '第一组',
                        list: ['about第一项', 'about第二项']
                    },
                    {
                        title: '第二组',
                        list: ['about第一项', 'about第二项']
                    }
                ]
            }]
        }
    },
    methods: {
        change (name) {
            console.log(name)
        },
        open (obj) {
            console.log(JSON.stringify(obj))
        }
    }
}
</script>
