<template>
    <div>
        <div style="border: 3px dashed; text-align: left; margin: 15px;padding: 15px">
            <h3>参数</h3>
            <p>@data            必传，Array，组件所需要的数据</p>
            <p>@v-model         必传，Array || String || Number，组件输出的值</p>
            <p>@value-name      非必传，String，value的映射key，默认:'value'【说明:选择后，暴露的value】</p>
            <p>@label-name      非必传，String，label的映射key，默认:'label'，【说明:选择后select-head上显示的文案】</p>
            <p>@query-name      非必传，String，按哪个字段搜索，默认:this.labelName</p>
            <p>@multiple        非必传，Boolean，多选，默认:false</p>
            <p>@no-arrow        非必传，Boolean，drop容器的箭头，默认:true</p>
            <p>@placeholder     非必传，String，placeholder，默认:''</p>
            <p>@autofocus       非必传，Boolean，自动获取焦点，默认:false</p>
            <p>@disabled        非必传，Boolean，disabled，默认:false</p>
            <p>@no-data-text    非必传，String，无数据文案，默认:'无数据...'</p>
            <p>@no-repeat       非必传，Boolean，不重复出现，默认:false【<span style="color: red">说明：单例情况下传此项，可优化组件dropdown呼出性能</span>】</p>
            <h3>回调事件</h3>
            <p>@on-change       组件drop呼出、收起的回调，形参：Boolean</p>
            <p>@on-open-change  组件值发生变化后的回调，形参：单选【当前所选项的item】，多选【已选所有项的items】</p>
            <h5>
                注意：BigDataList组件相较Select组件，少`filterable`属性，多`no-repeat`属性。
                BigDataList组件中应用了WebWorker，因此兼容性需据WebWorker决定。
            </h5>
        </div>
        <h3>单例：每个组价对应一组data</h3>
        <div class="box">
            <BigDataList
                placeholder="单选"
                :data="list"
                value-name="id"
                label-name="text"
                disabled
            >
                <div slot-scope="{props}">
                    {{ props.item.text }}
                </div>
            </BigDataList>
            <BigDataList
                placeholder="单选"
                :data="list"
                v-model="value"
                value-name="id"
                label-name="text"
                no-repeat
            >
                <div slot-scope="{props}">
                    {{ props.item.text }}
                </div>
            </BigDataList>
            <BigDataList
                placeholder="多选"
                :data="list1"
                v-model="value1"
                value-name="id"
                label-name="text"
                multiple
                autofocus
                no-repeat
                @on-change="change"
                @on-open-change="open"
            >
                <div slot-scope="{props}">
                    {{ props.item.text }}
                </div>
            </BigDataList>
        </div>
        <h3>多例：多个组件对应一组data【注意：只要一组数据要用到两个以上组件上时，就必须使用repeat属性】</h3>
        <div style="max-height: 500px; overflow: auto;border: 3px dashed">
            <BigDataList
                v-for="(item, index) in listGroup"
                placeholder="循环出来的"
                :key="index"
                :data="ls"
                v-model="item.v"
                value-name="id"
                label-name="text"
                :multiple="Boolean(item.i % 2)"
                @on-change="change"
                @on-open-change="open"
            >
                <div slot-scope="{props}">
                    {{ props.item.text }}
                </div>
            </BigDataList>
        </div>
    </div>
</template>
<script>
export default {
    name: 'big-data-list',
    data () {
        return {
            list: (() => {
                let d = []
                for (let i = 0; i < 10000; i++) {
                    d.push({
                        id: i,
                        text: 'item#' + (i + 1),
                        img: 'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=dc7e87bdfb03738dc14a0a22831ab073/08f790529822720e698c1ae776cb0a46f21fab69.jpg'
                    })
                }
                return d
            })(),
            list1: (() => {
                let d = []
                for (let i = 0; i < 10000; i++) {
                    d.push({
                        id: i,
                        text: 'item#' + (i + 1),
                        img: 'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=dc7e87bdfb03738dc14a0a22831ab073/08f790529822720e698c1ae776cb0a46f21fab69.jpg'
                    })
                }
                return d
            })(),
            value: 7,
            value1: (() => {
                let d = []
                for (let i = 0; i < 5; i++) {
                    d.push(i)
                }
                return d
            })() || [1, 3],
            ls: (() => {
                let d = []
                for (let i = 0; i < 1000; i++) {
                    d.push({
                        id: i,
                        text: 'item#' + (i + 1)
                    })
                }
                return d
            })(),
            listGroup: (() => {
                let d = []
                for (let i = 0; i < 60; i++) {
                    d.push({
                        i: i,
                        v: i
                    })
                }
                return d
            })()
        }
    },
    methods: {
        change (obj) {
            console.log(obj)
        },
        open (type) {
            console.log(type)
        }
    }
}
</script>
<style lang="scss" scoped>
    .zov-select{
        margin: 15px;
    }
    .box{
        flex: 1;
        display: flex;
        &>*{
            flex: 1;
            margin: 0 15px;
        }
    }
</style>
