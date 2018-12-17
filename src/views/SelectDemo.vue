<template>
    <div class="out-box">
        <div style="border: 3px dashed; text-align: left; margin: 15px;padding: 15px">
            <h3>参数</h3>
            <p>@data            必传，Array，组件所需要的数据</p>
            <p>@v-model         必传，Array || String || Number，组件输出的值</p>
            <p>@value-name      非必传，String，value的映射key，默认:'value'【说明:选择后，暴露的value】</p>
            <p>@label-name      非必传，String，label的映射key，默认:'label'，【说明:选择后select-head上显示的文案】</p>
            <p>@query-name      非必传，String，按哪个字段搜索，默认:this.labelName</p>
            <p>@multiple        非必传，Boolean，多选，默认:false</p>
            <p>@filterable      非必传，Boolean，可搜索，默认:false</p>
            <p>@no-arrow        非必传，Boolean，drop容器的尖叫，默认:true</p>
            <p>@placeholder     非必传，String，placeholder，默认:''</p>
            <p>@autofocus       非必传，Boolean，自动获取焦点，默认:false</p>
            <p>@disabled        非必传，Boolean，disabled，默认:false</p>
            <p>@no-data-text    非必传，String，无数据文案，默认:'无数据...'</p>
            <h3>回调事件</h3>
            <p>@on-change       组件drop呼出、收起的回调，形参：Boolean</p>
            <p>@on-open-change  组件值发生变化后的回调，形参：单选【当前所选项的item】，多选【已选所有项的items】</p>
        </div>
        <div class="box">
            单选不可搜索
            <Select
                :data="list"
                :no-arrow="false"
                placeholder="autofocus,单选"
                v-model="value1"
                value-name="id"
                label-name="text"
                autofocus
            >
                <div slot-scope="{props}">
                    {{ props.item.text }}
                </div>
            </Select>
            单选可搜索
            <Select
                :data="list"
                :no-arrow="false"
                placeholder="单选"
                v-model="value2"
                value-name="id"
                label-name="text"
                filterable
            >
                <div slot-scope="{props}">
                    {{ props.item.text }}
                </div>
            </Select>
            disabled
            <Select
                :data="list"
                placeholder="多选"
                multiple
                value-name="id"
                label-name="text"
                disabled
            >
                <div slot-scope="{props}">
                    {{ props.item.text }}
                </div>
            </Select>
        </div>
        <div class="box">
            多选，不可搜索
            <Select
                :data="list"
                placeholder="多选"
                multiple
                v-model="value3"
                value-name="id"
                label-name="text"
            >
                <div slot-scope="{props}">
                    {{ props.item.text }}
                </div>
            </Select>
            多选，可搜索
            <Select
                :data="list"
                placeholder="autofocus, 多选"
                multiple
                filterable
                v-model="value4"
                value-name="id"
                label-name="text"
                query-name="id"
                @on-change="change"
                @on-open-change="open"
                autofocus
            >
                <div slot-scope="{props}">
                    {{ props.item.text }}
                </div>
            </Select>
        </div>
        <div>
            分组
            <Select
                :data="listGroup"
                placeholder="分组select"
                multiple
                filterable
                v-model="value4"
                value-name="id"
                label-name="text"
                query-name="text"
                group
                group-label-name="label"
                group-child-name="children"
                @on-change="change"
                @on-open-change="open"
            >
                <div slot-scope="{props}">
                    {{ props.item.text }}
                </div>
            </Select>
        </div>
        <h3>测试数据量较大的情况下，常规select的性能，【卡顿，而且组件内部单独维护data，内存占用率较高】，可以到 BigDataList 组件测试数据量较大是组件的性能表现</h3>
        <div style="max-height: 400px;overflow: auto; border:3px dashed">
            <Select
                v-for="(item, index) in values"
                placeholder="循环出来的"
                :key="index"
                :data="lists"
                v-model="item.v"
                filterable
                value-name="id"
                label-name="text"
                query-name="text"
            >
                <div slot-scope="{props}">
                    {{ props.item.text }}
                </div>
            </Select>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            list: (() => {
                let d = []
                for (let i = 0; i < 200; i++) {
                    d.push({
                        id: i,
                        text: 'item#' + (i + 1),
                        img: 'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=dc7e87bdfb03738dc14a0a22831ab073/08f790529822720e698c1ae776cb0a46f21fab69.jpg'
                    })
                }
                return d
            })(),
            lists: (() => {
                let d = []
                for (let i = 0; i < 100; i++) {
                    d.push({
                        id: i,
                        text: 'item#' + (i + 1)
                    })
                }
                return d
            })(),
            values: (() => {
                let d = []
                for (let i = 0; i < 10; i++) {
                    d.push({ v: null })
                }
                return d
            })(),
            listGroup: (() => {
                let d = []
                for (let i = 0; i < 4; i++) {
                    let x = {
                        label: '第' + i + '组',
                        children: []
                    }
                    for (let j = 0; j < 5; j++) {
                        x.children.push({
                            id: i + '---' + j,
                            text: 'item#' + (i + '---' + (j + 1))
                        })
                    }
                    d.push(x)
                }
                return d
            })(),
            value1: 4,
            value2: '',
            value3: [0, 2, 4],
            value4: [2, 3],
            value5: ''
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
    .out-box{
        .box{
            display: flex;
            &>*{
                flex: 1;
                margin: 0 15px;
            }
        }
    }
</style>
