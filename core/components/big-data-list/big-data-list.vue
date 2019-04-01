<template>
    <div class="zov-select">
        <Drop
            :no-arrow="noArrow"
            trigger="focus"
            :never="disabled"
            v-model="dropShow"
        >
            <template #drop-head>
                <SelectHead
                    ref="zov-select-head"
                    :data="currentItemArr"
                    :disabled="disabled"
                    :placeholder="placeholder"
                    :size="size"
                    filterable
                    :multiple="multiple"
                    :clearable="clearable"
                    :label-name="labelName"
                    v-model="query"
                    :dropShow="dropShow"
                    @on-remove-tag="select"
                    @on-clear="clear"
                    @click.native="!disabled && dropShowFocus()"
                />
            </template>
            <LongList
                class="zov-select-body"
                :style="{
                    'width': width + 'px'
                }"
                :data="query ? queryResult : currentData"
            >
                <!-- 「#011」 -->
                <template v-slot="{props}">
                    <div :class="[
                            'zov-select-option',
                            {
                                'zov-select-option-selected': currentValueArr.indexOf(props.item[valueName]) !== -1
                            }
                        ]"
                         :key="props.index + ''"
                         @click.stop.capture="select(props.item)"
                         :disabled="props.item.disabled"
                    >
                        <slot :props="props">
                            {{ props.item[labelName] }}
                        </slot>
                        <Icon v-if="currentValueArr.indexOf(props.item[valueName]) !== -1" iconname="checkmark"/>
                    </div>
                </template>
            </LongList>
            <div
                class="zov-select-no-data"
                v-if="!currentData.length || (!queryResult.length && query)"
            >
                <Spin v-if="queryLoading"/>
                <span v-else>{{ noDataText }}</span>
            </div>
            <Spin cover v-if="loading"/>
        </Drop>
    </div>
</template>
<script>
import LongList from '../long-list'
import SelectedMixin from '../select/select-mixin'
import worker from '../../worker'
let prefix = 'zov-big-data-list'
export default {
    name: prefix,
    components: {
        LongList
    },
    mixins: [
        SelectedMixin
    ],
    watch: {
        query (val) {
            this.queryResult = []
            this.queryLoading = true
            if (val === '') return
            this.throttleFn(() => {
                /**
                 * [test: 20万数据搜索耗时256ms]，【阻塞主线程】以下注释代码为主线程query操作，内存消耗为两部分，一、遍历；二、正则匹配
                 **/
                // console.time('主线程运行，用时')
                for (let i = 0; i < this.currentData.length; i++) {
                    let item = this.currentData[i]
                    if (new RegExp(val).test(item[this.currentQueryName].toString())) {
                        this.queryResult.push(item)
                    }
                }
                this.queryLoading = false
                // console.timeEnd('主线程运行，用时')
                /**
                 * [test: 20万数据搜索耗时800ms]，【部分时间阻塞主线程】以下为子线程处理query操作的代码，将正则匹配部分放在子线程操作，换来的是子线程向主线程传输数据的内存消耗和子线程生成数据的内存消耗，还有由于子线程想主线程回传一个新的数据，所以vue双向绑定数据也造成了较大的时间开销。
                 **/
                // console.time('子线程运行，用时')
                // let _this = this
                // let wk = worker()
                // wk.postMessage({
                //     currentData: _this.currentData,
                //     val: val,
                //     currentQueryName: _this.currentQueryName,
                //     callback: `
                //     let arr = []
                //     for (let i = 0; i < e.data.currentData.length; i++) {
                //         let item = e.data.currentData[i]
                //         if (new RegExp(e.data.val).test(item[e.data.currentQueryName].toString())) {
                //             arr.push(i)
                //         }
                //     }
                //     postMessage(arr)
                // `
                // })
                // wk.onmessage = function (e) {
                //     console.log('query--子线程数据接收成功', e.data.length)
                //     e.data.forEach((item) => {
                //         _this.queryResult.push(_this.currentData[item])
                //     })
                //     console.timeEnd('子线程运行，用时')
                // }
            }, 500)
        }
    },
    methods: {
        defaultSelected (callback) {
            if (this.value === null || this.value === undefined || !this.value.toString()) {
                this.loading = false
                return
            }
            this.value instanceof Array
                ? this.currentValueArr = this.value
                : this.currentValueArr[0] = this.value
            /**
             * 经过测试，在1万条数据的阶乘循环上，webworker明显不阻塞主线程。
             * 此处用webworker的原因是因为，如果组件为多选并已经有了许多默认选项，这种情况下，高密集运算比数据量更耗时，
             * 而且主线程需要的计算结果只是一组经过筛选的下标（数据量相对减少了），并且这组数据不会被vue直接绑定双向响应，因此主线程不会受到这组数据的多大影响。
             **/
            let _this = this
            let wk = worker()
            wk.postMessage({
                currentData: _this.currentData,
                currentValueArr: this.currentValueArr,
                valueName: _this.valueName,
                callback: `
                    let arr = []
                    e.data.currentValueArr.forEach((item) => {
                        for (var i = 0; i < e.data.currentData.length; i++) {
                            if(item === e.data.currentData[i][e.data.valueName]) {
                                arr.push(i)
                                break
                            }
                        }
                    })
                    postMessage(arr)
                `
            })
            wk.onmessage = function (e) {
                // console.log('default--子线程数据接收成功')
                e.data.forEach((item) => {
                    _this.select(_this.currentData[item], 'default')
                })
                _this.loading = false
                callback && callback()
                wk.terminate()
            }
        }
    }
}
</script>
