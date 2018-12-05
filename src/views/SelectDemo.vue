<template>
    <div class="box">
        <Select
            :data="list"
            :no-arrow="false"
            autofocus
            placeholder="autofocus,单选,短列表"
            v-model="value1"
            value-name="id"
        >
            <div slot-scope="{props}">
                {{ props.item.text }}
            </div>
        </Select>
        <Select
            :data="list1"
            placeholder="单选,数据量大的列表"
            big-data
            value-name="id"
            v-model="value4"
        >
            <div slot-scope="{props}">
                {{ props.index }}--{{ props.item.text }}
            </div>
        </Select>
        <Select
            :data="list"
            :no-arrow="false"
            placeholder="多选,短列表"
            multiple
            v-model="value3"
            value-name="id"
        >
            <div slot-scope="{props}">
                {{ props.item.text }}
            </div>
        </Select>
        <Select
            :data="list1"
            placeholder="多选,数据量大的列表"
            big-data
            multiple
            autofocus
            v-model="value2"
            value-name="id"
        >
            <div slot-scope="{props}">
                {{ props.index }}--{{ props.item.text }}
            </div>
        </Select>
        <Select
            :data="list1"
            placeholder="单选,数据量大的列表"
            big-data
            value-name="id"
            disabled
        >
            <div slot-scope="{props}">
                {{ props.index }}--{{ props.item.text }}
            </div>
        </Select>
    </div>
</template>
<script>
export default {
    data () {
        return {
            list: (() => {
                let d = []
                for (let i = 0; i < 10; i++) {
                    d.push({
                        disabled: i === 1 || i === 3,
                        id: i,
                        text: 'item #' + (i + 1),
                        img: 'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=dc7e87bdfb03738dc14a0a22831ab073/08f790529822720e698c1ae776cb0a46f21fab69.jpg'
                    })
                }
                return d
            })(),
            list1: (() => {
                let d = []
                for (let i = 0; i < 100000; i++) {
                    d.push({
                        id: i,
                        text: 'item #' + (i + 1),
                        img: 'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=dc7e87bdfb03738dc14a0a22831ab073/08f790529822720e698c1ae776cb0a46f21fab69.jpg'
                    })
                }
                return d
            })(),
            value1: 4,
            value2: (() => {
                let arr = []
                for (let i = 0; i < 10; i++) {
                    arr.push(i)
                }
                return arr
            })(),
            value3: [],
            value4: ''
        }
    }
}
</script>
<style lang="scss" scoped>
    .box{
        display: flex;
        &>*{
            flex: 1;
            margin: 0 15px;
        }
    }
</style>
