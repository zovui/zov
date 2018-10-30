<style lang="scss" scoped="">
    .self-content{
        padding:0;
    }
</style>
<template>
    <div>
        <button @click="Bshow = true;Bshow1 = false">alert first</button>
        <button @click="Bshow = false;Bshow1 = true">alert secont</button>
        <AutoCascader
            v-model="Bshow"
            style="width:700px;"
            multiple
            :titles="['省份','城市','区县','商圈']"
            :notOptional="[1]"
            :inputSearch="true"
            :data="list"
            :activeIndexes="[100023,1086,1089,21870 ] || [100005,10034,1534,10134]"
            :values="values">
        </AutoCascader>

        <AutoCascader
            v-model="Bshow1"
            style="width:700px;"
            multiple
            :titles="['省份','城市','区县','商圈']"
            :notOptional="[1]"
            :inputSearch="true"
            :data="list"
            :activeIndexes="[100023,1086,1089,21870 ] || [100005,10034,1534,10134]"
            :values="values2">
        </AutoCascader>
    </div>
</template>
<script>
export default {
    data () {
        return {
            Bshow : false,
            Bshow1:false,
            ll:[],
            list : [
                {
                    name : "直辖市",
                    id : 100001,
                    children : [{
                        name : "北京",
                        id : 1,
                        children : [{
                            name : "朝阳",
                            id : 1142,
                            children : [{
                                name : "国贸",
                                id : 1195,
                            },{
                                name : "大望路",
                                id : 5785,
                            }],
                        },{
                            name : "海淀",
                            id : 1143,
                            children : [{
                                name : "中关村",
                                id : 1295,
                            },{
                                name : "五道口",
                                id : 6485,
                            }]
                        }],
                    },{
                        name : "上海",
                        id : 2,
                        children : [],
                    }]
                },{
                    name : "山西",
                    id : 100005,
                    children : [{
                        name : "太原",
                        id : 740,
                        children : [{
                            name : "小店",
                            id : 1740,
                            children : [{
                                name : "小店1",
                                id : 1340,
                            },{
                                name : "小店2",
                                id : 1140,
                            }]
                        },{
                            name : "哈哈",
                            id : 2740,
                        }],
                    },{
                        name : "临汾",
                        id : 5669,
                        children : [],
                    },{
                        name : "大同",
                        id : 10034,
                        children : [{
                            name : "阳高",
                            id : 1534,
                            children:[{
                                name : "金光街",
                                id : 10134,
                            },{
                                name : "学府街",
                                id : 21534,
                            }]
                        },{
                            name : "浑源",
                            id : 10934,
                        }],
                    }],
                },{
                    name : "河北",
                    id : 100004,
                    children : [],
                }
            ],
            list1 : [],
            value : {id:55975},
            values2 : [2],
            values : [1,2]
        }
    },
    methods : {
        OK (){
            // console.log(this.values)
        }
    },
    mounted (){
        let _this = this
    }
}
</script>
<style>
    *{
        box-sizing: border-box;
    }
    ul,li{
        list-style: none;
        padding: 0;
        margin: 0;
        text-align: left;
    }
</style>
