<template>
    <transition appear name="ll">
        <div class="long_list" @scroll="onScroll">
            <div :style="listStyle">
                <template v-for="(item,index) in list">
                    <slot :props="{item, index : sI + index}"></slot>
                </template>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'LongList',
        props: {
            longList: {
                //列表数据
                type: Array,
                default() {
                    return []
                }
            },
            itemH: {
                //列表项的高度（定高项必传）
                type: Number,
                default() {
                    return 1
                }
            },
            threshold: {
                //阈值，窗口外预留节点数，此缓冲值适当设置的大一些可以提高视图插入视觉体验
                type: Number,
                default() {
                    return 35
                }
            }
        },
        data() {
            return {
                //窗口高度
                winH: 0,
                startI: 0,
                listStyle: {}
            }
        },
        computed: {
            //窗口显示item的数量
            remain() {
                return Math.ceil(this.winH / this.itemH)
            },

            endI() {
                return this.startI + this.remain
            },
            sI() {
                return this.startI < this.threshold ? 0 : this.startI - this.threshold;
            },
            eI() {
                return (this.longList.length - this.endI) < this.threshold ? this.longList.length : this.endI + this.threshold;
            },
            list() {
                return this.longList.slice(this.sI, this.eI)
            }
        },
        methods: {
            setStyle() {
                this.listStyle = {
                    'padding-top': this.itemH * this.sI + 'px',
                    'padding-bottom': this.itemH * (this.longList.length - this.eI) + 'px'
                }
            },
            onScroll() {
                this.startI = Math.floor(this.$el.scrollTop / this.itemH);
                this.setStyle()
            }
        },
        mounted() {
            this.winH = this.$el.offsetHeight;
            this.setStyle();
        }
    }
</script>
<style lang="scss" scoped>
    .long_list {
        overflow-y: auto;
        border: 1px solid rebeccapurple;
        -webkit-overflow-scrolling: touch;
    }

    .ll-enter {
        transform: scale(.8);
        border: 5px solid #00c800;
    }

    .ll-leave-to {
        transform: scale(1);
        border: none;
    }

    .ll-enter-active {
        transition: all 1s cubic-bezier(0.22, 1.17, 0.24, 1.04);
    }
</style>
