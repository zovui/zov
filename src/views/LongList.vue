<template>
    <div class="home" style="height: 450px">
        <LongList style="height:90%" :longList="list" :itemH="65" :threshold="15">
            <div slot-scope="{props}" :index="props.item.id" class="item">
                <img :src="props.item.img" alt="">
                <div>
                    下标：{{ props.index }}内容：{{ props.item.text }}
                </div>
            </div>
        </LongList>
    </div>
</template>

<script>
export default {
    name: 'long-list-demo',
    data () {
        return {
            f: true,
            list: (() => {
                let d = []
                for (var i = 0; i < 100; i++) {
                    d.push({
                        id: i,
                        text: 'item #' + (i + 1),
                        img: 'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=dc7e87bdfb03738dc14a0a22831ab073/08f790529822720e698c1ae776cb0a46f21fab69.jpg'
                    })
                }
                return d
            })()
        }
    }
}
</script>
<style lang="scss" scoped>
    .item{
        overflow: hidden;
        padding: 15px;
        &>*{
            float: left;
        }
        &>img{
            width: 35px;
            height:35px;
        }
        border-bottom: 1px solid #ccc;
        &::after{
            content: '';
            display: block;
            clear: both;
        }
    }
</style>
