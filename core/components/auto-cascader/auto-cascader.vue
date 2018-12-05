<template>
    <transition name="opacity-fade">
        <div
            v-if="data.length && visible"
            id="auto-cascader">
            <!-- titles -->
            <ul class="auto-titles" v-if="titles && titles.length">
                <li v-for="title in titles" :key="title">{{title}}</li>
            </ul>
            <ul class="auto-panel">
                <AutoCasPanel
                    :data="data"
                    :initialData="data"
                    :width="100/(titles.length || columnsNum)+'%'"
                    :activeIndexes="activeIndexesO"
                    :value="value"
                    :multiple="multiple"
                    :notOptional="notOptional"
                    :multipleValues="multipleValues"
                    :panelBtns="panelBtns"
                    :values="values">
                </AutoCasPanel>
            </ul>
            <!-- search panel -->
            <div class="auto-search"
                 v-show="searchBoxShow" @click.self="searchBoxShow = false">
                <div class="auto-search-title">
                    <div class="auto-search-bar">
                        <input type="text" v-model="searchVal" @keyup.enter="GoSearch">
                        <div class="auto-search-enter" @click="GoSearch">
                            <i class="zj-search-icon"></i>
                        </div>
                    </div>
                </div>
                <div class="auto-search-panel">
                    <!-- search result -->
                    <ul v-show="!searchLoading && queryResult.length">
                        <li @click="IndexGo(item)"
                            v-for="(item) in queryResult"
                            :key="item"
                        >
                            【 {{ titles[item.label.split('?').length-1] ? titles[item.label.split('?').length-1] :
                            '--'}} 】
                            <span class="auto-search-result-item"
                                  v-for="s in item.label.split('?')"
                                  :key="s"
                            >
                                {{s}}
                                <i style="font-style:normal"> &nbsp;&#10059; </i>
                            </span>
                        </li>
                    </ul>
                    <!-- search loading -->
                    <div class="auto-search-loading" v-show="searchLoading"><i class="auto-search-loading-icon"></i>loading...
                    </div>
                    <!-- search not found -->
                    <div class="auto-not-found" v-show="!searchLoading && !queryResult.length">{{notFoundText}}</div>
                </div>
            </div>
            <!-- search btn -->
            <div class="auto-search-btn" v-if="searchFlag" @click="searchBoxShow = !searchBoxShow">
                <div class="zj-search-icon"></div>
            </div>
            <!-- operator panel -->
            <div class="auto-operator-panel" v-if="operatorPanelShow">
                <ul class="auto-operator-panel-btns" v-if="multiple">
                    <li v-if="notOptional.indexOf(index + 1) === -1"
                        v-for="(item,index) in panelBtns"
                        @click="GroupSelected(item,index)"
                        :key="index"
                    >
                        <i class="cas-checkbox-icon" :class="{checked : item.checked}"></i>
                        全选{{ item.text.length > 2 ? item.text.substr(0,2) + '..' : item.text }}
                    </li>
                    <li class="auto-clean-btn" @click="ClearValues">
                        <i class="cas-clean-icon"><i></i></i>
                        清空所选
                    </li>
                </ul>
                <ul class="auto-operator-panel-btns auto-result-btns">
                    <li class="auto-result-btns-cancel" @click="Cancel">取消</li>
                    <li class="auto-result-btns-ok" @click="OK">确定</li>
                </ul>
            </div>
            <!-- loading -->
            <transition name="opacity-fade">
                <div v-show="loading" class="auto-cas-loading">
                    <i class="auto-search-loading-icon"></i> loading...
                </div>
            </transition>
        </div>
    </transition>
</template>
<script>
import AutoCasMixin from './auto-casMixin'
/** 计算级联层数**/
import AutoCasPanel from './auto-cas-panel'

export default {
    name: 'AutoCascader',
    mixins: [AutoCasMixin],
    components: {
        AutoCasPanel
    },
    model: {
        prop: 'isShow',
        event: 'change'
    },
    props: {
        isShow: {
            /**  是否显示 **/
            type: Boolean,
            default () {
                return false
            }
        },
        data: {
            /** 级联数据**/
            type: Array,
            default () {
                return []
            }
        },
        titles: {
            /** 级联每一联的title**/
            type: Array,
            default () {
                return []
            }
        },
        activeIndexes: {
            /** 级联索引默认值【点击后索引子级联】**/
            type: Array,
            default () {
                return []
            }
        },
        value: {
            /** 单选级联的最终值，对外暴露**/
            type: Object,
            default () {
                return {}
            }
        },
        multiple: {
            /** 是否支持多选**/
            type: Boolean,
            default: false
        },
        notOptional: {
            /** 不可选的级联项**/
            type: Array,
            default () {
                return []
            }
        },
        values: {
            /** 多选级联的最终值，对外暴露**/
            type: Array,
            default () {
                return []
            }
        },
        searchFlag: {
            /** 是否支持搜索**/
            type: Boolean,
            default: true
        },
        inputSearch: {
            /** 是否支持输入搜索，建议在级联或者数据量小时开启**/
            type: Boolean,
            default: true
        },
        notFoundText: {
            /** 当搜索列表为空时显示的内容**/
            type: String,
            default: '未找到匹配结果！'
        },
        operatorPanelShow: {
            type: Boolean,
            default () {
                return true
            }
        },
        querySelection: {
            /** 【被查数】,由于当数据量大且此组件被循环调用时，querySelection的数据就会几何增长，使页面卡死，所以，可以将此数据作为props数据，公有化**/
            type: Array,
            default () {
                return []
            }
        }
    },
    data () {
        let _this = this
        return {
            visible: _this.isShow,
            loading: false,
            searchBoxShow: false, // 查询呼出，收齐开关
            searchVal: '', // 查询框键入值
            searchLoading: false, // 查询等待
            columnsNum: 0, // 级联层数
            initActiveIndexes: [], // 数据初始化时建立索引
            activeIndexesO: {}, // 组件内索引对象
            queryResult: [], // 搜索结果【查数】
            panelBtns: (() => {
                let arr = []
                _this.titles.forEach((item) => {
                    arr.push({
                        text: item,
                        checked: false
                    })
                })
                return arr
            })(), // 操作面板的按钮对象
            multipleValues: [], // 多选后的结果
            originalV: {} // 原始数据
        }
    },
    watch: {
        data (val) {
            this.querySelection.splice(0)
            this.InitData(val)
        },
        searchVal (val) {
            if (this.inputSearch) {
                this.GoSearch()
            }
        },
        multipleValues (val) {
            let _this = this
            _this.values.splice(0)
            val.forEach((item) => {
                let it = item.id
                _this.values.push(it)
            })
        },
        querySelection (val) {
            if (val.length) {
                this.defaultSelect()
                this.BeforeCancel()
                this.OneTransStereo(this.activeIndexes.length ? this.activeIndexes : this.initActiveIndexes)
            }
        },
        isShow (val) {
            this.visible = val
            if (val) {
                this.defaultSelect()
                this.BeforeCancel()
                this.OneTransStereo(this.activeIndexes.length ? this.activeIndexes : this.initActiveIndexes)
            }
        }
    },
    methods: {
        InitData (val) {
            // 初始化数据并且创建一维数据，追加每一项数据的继承关系
            let _this = this

            function getSelections (arr, label, value) {
                for (let i = 0; i < arr.length; i++) {
                    let item = arr[i]
                    // 初始化【追加必要属性】级联数据
                    _this.$set(item, 'checked', false)
                    // 重组被搜索数据
                    item.__label = label ? label + ' ? ' + item.name : item.name
                    item.__value = value ? value + ',' + item.id : item.id + ''
                    if (item.children && item.children.length) {
                        // 计算级联层数
                        if (_this.columnsNum < item.__value.toString().split(',').length) {
                            _this.columnsNum = item.__value.toString().split(',').length
                        }
                        _this.querySelection.push({
                            label: item.__label,
                            value: item.__value,
                            display: item.__label,
                            item: item,
                            disabled: !!item.disabled
                        })
                        getSelections(item.children, item.__label, item.__value)
                    } else {
                        // 计算级联层数
                        if (_this.columnsNum < item.__value.toString().split(',').length) {
                            _this.columnsNum = item.__value.toString().split(',').length
                        }
                        _this.querySelection.push({
                            label: item.__label,
                            value: item.__value,
                            display: item.__label,
                            item: item,
                            disabled: !!item.disabled
                        })
                    }
                }
            }

            if (!_this.querySelection.length) {
                //  console.log('组件装载querySelection数据')
                getSelections(val)
            } else {
                //  console.log('querySelection由父组件传入')
            }
        },
        GoSearch () {
            let _this = this
            let newVal = _this.searchVal
            if (!newVal) {
                _this.queryResult = []
                return
            }
            _this.queryResult = []
            this.searchLoading = true
            setTimeout(function () { // #001 为了防止for循环在数据量大时阻塞浏览器进程，使用setTimeout将for循环滞后执行【这里测试时是遍历了22万条】
                for (let i = 0; i < _this.querySelection.length; i++) {
                    let item = _this.querySelection[i]
                    if (new RegExp(newVal).test(item.item.id.toString().substr(0, newVal.length)) || new RegExp(newVal).test(item.item.name.substr(0, newVal.length))) {
                        if (item.item.name === newVal || item.item.id.toString() === newVal) {
                            _this.queryResult.unshift(item)
                        } else {
                            _this.queryResult.push(item)
                        }
                    }
                }
                _this.searchLoading = false
            }, 10)
        },
        IndexGo (item) {
            // 按索引展开
            this.OneTransStereo(item.value.toString().split(','))
            this.searchBoxShow = false
        },
        OneTransStereo (V) {
            let _this = this
            // 索引转换函数
            function oneTransStereo (o) {
                if (V.length) {
                    _this.$set(o, 'id', V[0])
                    V.shift()
                    _this.$set(o, 'children', {})
                    oneTransStereo(o.children)
                }
            }

            oneTransStereo(_this.activeIndexesO)
        }
    },
    created () {
        let _this = this
        _this.InitData(_this.data)
    },
    mounted () {
        let _this = this
        _this.defaultSelect()
        _this.BeforeCancel()
    }
}
</script>
<style lang="scss" scoped>
    @import "~./auto-cascader.scss";
</style>
