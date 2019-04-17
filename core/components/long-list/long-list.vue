<template>
    <div class="zov-long-list" @scroll="update">
        <div :style="listStyle">
            <slot v-for="(item,index) in list" :props="{item, index : sI + index}"></slot>
        </div>
    </div>
</template>
<script>
const prefix = 'zov-long-list'
export default {
    name: prefix,
    props: {
        data: {
            // 列表数据
            type: Array,
            required: true,
            default () {
                return []
            }
        },
        threshold: {
            // 阈值，窗口外预留节点数，此缓冲值适当设置的大一些可以提高视图插入视觉体验
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            // 窗口高度，默认给1而不是0的目的是防止0参与计算
            winH: 1,
            itemHeight: 1,
            startI: 0,
            listStyle: {},
            timer: null
        }
    },
    computed: {
        // 窗口显示item的数量
        remain () {
            return Math.ceil(this.winH / this.itemHeight)
        },
        endI () {
            return this.startI + this.remain - 1
        },
        sI () {
            return this.startI < this.getThreshold ? 0 : this.startI - this.getThreshold
        },
        eI () {
            return (this.data.length - this.endI) < this.getThreshold ? this.data.length : this.endI + this.getThreshold
        },
        list () {
            return this.data.slice(this.sI, this.eI)
        },
        getThreshold () {
            return this.threshold || (this.data.length < 20000 ? 10 : 20)
        }
    },
    watch: {
        data () {
            this.update()
        }
    },
    methods: {
        getElH (el) {
            // 给定值1，防止NAN参与计算
            if (!el) return 1
            return el.offsetHeight || parseInt(window.getComputedStyle(el, null).height) || parseInt(window.getComputedStyle(el, null).maxHeight) || parseInt(window.getComputedStyle(el, null).lineHeight) || 1
        },
        setStyle () {
            this.listStyle = {
                'padding-top': this.itemHeight * this.sI + 'px',
                'padding-bottom': this.itemHeight * (this.data.length - this.eI) + 'px'
            }
        },
        update () {
            // 小于20000不节流
            if (this.data.length < 20000) {
                this.startI = Math.floor(this.$el.scrollTop / this.itemHeight)
                this.setStyle()
            } else {
                clearTimeout(this.timer)
                this.timer = null
                this.timer = setTimeout(() => {
                    this.startI = Math.floor(this.$el.scrollTop / this.itemHeight)
                    this.setStyle()
                    clearTimeout(this.timer)
                    this.timer = null
                }, 50)
            }
        }
    },
    updated () {
        // 当窗口或者子项高度变化导致组件更新后重新计算依赖这两个高度的数值。
        if (this.winH !== this.getElH(this.$el)) {
            this.winH = this.getElH(this.$el)
            this.update()
        }
        if (this.itemHeight !== this.getElH(this.$el.childNodes[0].childNodes[0])) {
            this.itemHeight = this.getElH(this.$el.childNodes[0].childNodes[0])
            this.update()
        }
    },
    mounted () {
        this.winH = this.getElH(this.$el)
        this.itemHeight = this.getElH(this.$el.childNodes[0].childNodes[0])
        this.update()
    }
}
</script>
