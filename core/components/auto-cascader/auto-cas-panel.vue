<template>
    <span>
        <ul class="auto-cas-item"
            v-if="data && data.length"
            :style="{width: width}">
            <li v-for="(item,index) in data"
                :i="index"
                :vallue="item.id"
                :class="{
                    'cas-has-children' :('children' in item && item.children.length),
                    'cas-item-active' : (activeIndexes.id == item.id && 'children' in item && item.children.length)
                }"
                @click="ClickItem(item)">
                <i v-if="notOptional.indexOf(item.__value ? item.__value.split(',').length : 0) === -1"
                   :class="{
                        'cas-radio-icon' : !multiple,
                        'cas-checkbox-icon' : multiple,
                        checked : item.checked
                    }"
                   @click.stop="CheckedItem(item,$event)"></i>
                {{item.name}}
            </li>
        </ul>
        <AutoCasPanel
            v-if="sublist && sublist.length"
            :width="width"
            :initialData="initialData"
            :data="sublist"
            :activeIndexes="activeIndexes.children"
            :value="value"
            :multiple="multiple"
            :notOptional="notOptional"
            :multipleValues="multipleValues"
            :panelBtns="panelBtns"
            :values="values">
        </AutoCasPanel>
    </span>
</template>
<script>
    import AutoCasMixin from './auto-casMixin'

    export default {
        name: 'AutoCasPanel',
        mixins: [AutoCasMixin],
        props: {
            width: {
                type: String
            },
            data: {
                /*级联每一个children的数据【当前级对应的数据】*/
                type: Array,
                default() {
                    return [];
                }
            },
            initialData: {
                /*【从组件根模板传过来的变量】级联原始数据【为了操作原始数据，达到单选和多选的目的】*/
                type: Array,
                default() {
                    return [];
                }
            },
            activeIndexes: {
                /*级联索引默认值【点击后索引子级联】*/
                type: Object,
                default() {
                    return {};
                }
            },
            multiple: {
                /*【从组件根模板传过来的变量】是否支持多选*/
                type: Boolean,
                default: false
            },
            notOptional: {
                /*不可选的级联项*/
                type: Array,
                default() {
                    return [];
                }
            },
            value: {
                /*【从组件根模板传过来的变量】级联的最终值，对外暴露*/
                type: Object,
                default() {
                    return {};
                }
            },
            multipleValues: {
                /*【从组件根模板传过来的变量】多选后的结果*/
                type: Array,
                default() {
                    return [];
                }
            },
            panelBtns: {
                /*【从组件根模板传过来的变量】操作按钮对象组合*/
                type: Array,
                default() {
                    return [];
                }
            },
            values: {
                /*【从组件根模板传过来的变量】多选级联的最终值，对外暴露*/
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                query: '',
                sublist: [],
                activeIndex: {}
            }
        },
        watch: {
            data() {
                this.sublist = [];
                this.ByIndexes()
            },
            activeIndexes: {
                deep: true,
                handler() {
                    // console.log('----->索引变化<-----')
                    this.ByIndexes()
                }
            }
        },
        methods: {
            ClickItem(item) {
                if (item.children && item.children.length) {
                    this.activeIndexes.id = item.id
                    this.sublist = item.children;
                } else {
                    this.sublist = [];
                }
            },
            CheckedItem(item, e) {
                let _this = this
                if (_this.multiple) {
                    //多选
                    if (!item.checked) {
                        _this.multipleValues.push(item)
                    } else {
                        _this.Multiple(_this.multipleValues, item)
                    }
                    item.checked = !item.checked
                } else {
                    //单选
                    if (!item.checked) {
                        _this.$set(_this.value, 'id', item.id)
                        _this.$set(_this.value, 'name', item.name)
                        _this.Radio(_this.initialData)
                        item.checked = true
                    }
                }
            },
            ByIndexes() {
                //展开索引
                let _this = this
                if (_this.data && _this.data.length) {
                    let _item = []
                    for (let i = 0; i < _this.data.length; i++) {
                        if (_this.activeIndexes.id && _this.activeIndexes.id == _this.data[i].id) {
                            _item = _this.data[i]
                            _this.ScrollIntoView(i, _item.__value.split(',').length - 1)
                            break
                        }
                    }
                    _this.ClickItem(_item)
                }
            },
            ScrollIntoView(item, index) {
                setTimeout(() => {
                    let els = document.querySelectorAll('.auto-cas-item')
                    if (els.length) {
                        let el = els[index].querySelectorAll('[i="' + item + '"]')[0]
                        el.scrollIntoView()
                        el.setAttribute("animitions", "flicker")
                        setTimeout(() => {
                            el.setAttribute("animitions", "")
                        }, 1000)
                    }
                }, 100)
            }
        },
        mounted() {
            this.ByIndexes()
        }
    };
</script>
<style lang="scss" scoped>
    @import "~./auto-cascader.scss";
</style>
