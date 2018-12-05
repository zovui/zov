<template>
    <div class="zov-select">
        <Drop
            :value="autofocus"
            :no-arrow="noArrow"
            :trigger="trigger"
            :never="this.disabled"
            v-model="dropShow"
        >
            <Spin cover v-show="loading"/>
            <SelectHead
                slot="drop-head"
                :autofocus="autofocus"
                :placeholder="placeholder"
                :disabled="disabled"
            />
            <LongList v-if="bigData"
                      :data="currentData"
                      class="zov-select-body"
                      :style="{
                          'width': dropWidth + 'px'
                      }"
            >
                <div class="zov-select-option"
                     slot-scope="{props}"
                     :key="props.index"
                     @click.stop.capture="select(props.item, props.index)"
                     :selected="props.item.selected"
                     :disabled="props.item.disabled"
                >
                    <slot :props="props"></slot>
                </div>
            </LongList>
            <div
                v-else
                class="zov-select-body"
                :style="{
                     'width': dropWidth + 'px'
                }"
            >
                <div class="zov-select-option"
                     v-for="(item, index) in currentData"
                     :key="index"
                     @click.stop.capture="select(item, index)"
                     :selected="item.selected"
                     :disabled="item.disabled"
                >
                    <slot :props="{item, index}"></slot>
                </div>
            </div>
        </Drop>
    </div>
</template>
<script>
import SelectHead from './select-head'
import worker from '../../worker'
let prefix = 'zov-select'
export default {
    name: prefix,
    components: {
        SelectHead
    },
    props: {
        value: {
            type: [Number, String, Array]
        },
        valueName: {
            type: String,
            default: 'value'
        },
        // 组件组装
        data: {
            type: Array,
            default () {
                return []
            }
        },
        // 可搜索
        search: {
            type: Boolean,
            default: false
        },
        // 多选
        multiple: {
            type: Boolean,
            default: false
        },
        // 长列表
        bigData: {
            type: Boolean,
            default: false
        },
        // drop 属性
        trigger: {
            type: String,
            validator (value) {
                return ['hover', 'click'].indexOf(value) !== -1
            },
            default: 'click'
        },
        noArrow: {
            type: Boolean,
            default: true
        },
        // select-head 属性
        placeholder: {
            type: String,
            default: ''
        },
        autofocus: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            loading: true,
            dropShow: this.autofocus && !this.disabled,
            dropWidth: 220,
            currentData: this.data || JSON.parse(JSON.stringify(this.data)),
            currentItemArr: [],
            currentValueArr: []
        }
    },
    watch: {
        dropShow (val) {
            this.$emit('on-open-change', val)
            if (val) this.initData()
        }
    },
    methods: {
        select (item, index) {
            if (item.disabled) return
            this.multiple ? this.check(item, index) : this.single(item, index)
        },
        single (item, index) {
            // 单选
            this.currentItemArr.length && this.$set(this.currentItemArr[0], 'selected', false)
            // 清洗已选
            this.currentItemArr = []
            this.currentValueArr = []
            // 记录已选
            this.currentItemArr.push(item)
            this.currentValueArr.push(item[this.valueName])
            // 修改源数据
            this.$set(item, 'selected', true)
            // 暴露数据
            this.$emit('input', item[this.valueName])
            this.$emit('on-change', { item, index })
            // 收起下拉
            this.dropShow = false
        },
        check (item, index) {
            if (item.selected) {
                // 清洗已选
                this.$delete(this.currentItemArr, this.currentItemArr.indexOf(item))
                this.$delete(this.currentValueArr, this.currentValueArr.indexOf(item[this.valueName]))
            } else {
                // 记录已选
                this.currentItemArr.push(item)
                this.currentValueArr.push(item[this.valueName])
            }
            // 修改源数据
            this.$set(item, 'selected', !item.selected)
            // 暴露数据
            this.$emit('input', this.currentValueArr)
            this.$emit('on-change', { item: this.currentItemArr, index: this.currentValueArr })
        },
        initData () {
            if (!this.value) {
                this.loading = false
                return
            }
            this.currentItemArr = []
            this.currentValueArr = []
            this.value instanceof Array
                ? this.currentValueArr = this.value
                : this.currentValueArr[0] = this.value
            // if (this.bigData) {
            //     /**
            //      * 经过测试，在1万条数据的阶乘循环上，webworker明显不阻塞主线程。
            //      **/
            //     let _this = this
            //     let wk = worker()
            //     wk.postMessage({
            //         currentData: _this.currentData,
            //         currentValueArr: this.currentValueArr,
            //         valueName: _this.valueName,
            //         callback: `
            //         // 数据清洗
            //         for (let i = 0; i < e.data.currentData.length; i++) {
            //             e.data.currentData[i].selected = false
            //         }
            //         // 初始化选择
            //         let arr = []
            //         e.data.currentValueArr.forEach((item) => {
            //             for (var i = 0; i < e.data.currentData.length; i++) {
            //                 if(item === e.data.currentData[i][e.data.valueName]) {
            //                     e.data.currentData[i].selected = true
            //                     arr.push(e.data.currentData[i])
            //                     break
            //                 }
            //             }
            //         })
            //         postMessage({currentData: e.data.currentData,currentItemArr: arr})
            //     `
            //     })
            //     wk.onmessage = function (e) {
            //         console.log('子线程数据接收成功')
            //         _this.currentData = e.data.currentData
            //         _this.currentItemArr = e.data.currentItemArr
            //         _this.loading = false
            //     }
            //     return
            // }
            // 以下是主线程完成次循环的实现，此种方式会阻塞主线程。
            // 数据清洗
            for (let i = 0; i < this.currentData.length; i++) {
                this.$set(this.currentData[i], 'selected', false)
            }
            // 初始化选择
            this.currentValueArr.forEach((item) => {
                for (let i = 0; i < this.currentData.length; i++) {
                    if (item === this.currentData[i][this.valueName]) {
                        this.$set(this.currentData[i], 'selected', true)
                        console.log(this.value, this.currentData[i])
                        this.currentItemArr.push(this.currentData[i])
                        break
                    }
                }
            })
            this.loading = false
        }
    },
    mounted () {
        // this.initData()
        this.dropWidth = this.$el.offsetWidth
    },
    updated () {
        if (this.dropWidth !== this.$el.offsetWidth) {
            this.dropWidth = this.$el.offsetWidth
            return
        }
    }
}
</script>
