<template>
    <div class="zov-select">
        <Drop
            :no-arrow="noArrow"
            :trigger="trigger"
            :never="disabled"
            v-model="dropShow"
        >
            <SelectHead
                ref="zov-select-head"
                slot="drop-head"
                :data="currentItemArr"
                :disabled="disabled"
                :placeholder="placeholder"
                :filterable="filterable"
                :multiple="multiple"
                :label-name="labelName"
                v-model="query"
                :dropShow="dropShow"
                @on-remove-tag="select"
                @click.native="!disabled && dropShowFocus()"
                @remove-tag-end="removeTagEnd"
            />
            <div
                class="zov-select-body"
                :style="{
                     'width': dropWidth + 'px'
                }"
            >
                <!-- 分组 -->
                <template v-if="group">
                    <template v-if="filterable && query">
                        <Option
                            :data="queryResult"
                            @on-click="select"
                        >
                            <template slot-scope="{props}">
                                <slot :props="props"></slot>
                            </template>
                        </Option>
                    </template>
                    <template v-else>
                        <div
                            v-for="(item, index) in currentData"
                            :key="index"
                        >
                            <div class="zov-select-option-group-title">
                                {{ item[groupLabelName] }}
                            </div>
                            <Option
                                :data="item[groupChildName]"
                                @on-click="select"
                            >
                                <template slot-scope="{props}">
                                    <slot :props="props"></slot>
                                </template>
                            </Option>
                        </div>
                    </template>
                </template>
                <!-- 不分组 -->
                <template v-else>
                    <Option
                        :data="filterable && query ? queryResult : currentData"
                        @on-click="select"
                    >
                        <template slot-scope="{props}">
                            <slot :props="props"></slot>
                        </template>
                    </Option>
                </template>
            </div>
            <div
                class="zov-select-no-data"
                v-if="!currentData.length || (!queryResult.length && filterable && query)"
            >
                <Spin v-if="queryLoading"/>
                <span v-else>{{ noDataText }}</span>
            </div>
            <Spin cover v-show="loading"/>
        </Drop>
    </div>
</template>
<script>
import SelectHead from './select-head'
import Option from './option'
import SelectedMixin from './selected-mixin'
let prefix = 'zov-select'
export default {
    name: prefix,
    components: {
        SelectHead,
        Option
    },
    mixins: [
        SelectedMixin
    ],
    props: {
        // 可搜索
        filterable: {
            type: Boolean,
            default: false
        },
        group: {
            type: Boolean,
            default: false
        },
        groupChildName: {
            type: String,
            default: 'label'
        },
        groupLabelName: {
            type: String,
            default: 'label'
        }
    },
    data () {
        return {
            currentData: JSON.parse(JSON.stringify(this.data))
        }
    },
    computed: {
        'trigger' () {
            return this.filterable ? 'focus' : 'click'
        }
    },
    watch: {
        query (val) {
            if (!this.filterable) return
            this.queryResult = []
            this.queryLoading = true
            if (val === '') return
            this.throttleFn(() => {
                if (this.group) {
                    this.currentData.forEach((group) => {
                        group[this.groupChildName].forEach((item) => {
                            if (new RegExp(val).test(item[this.currentQueryName].toString())) {
                                this.queryResult.push(item)
                            }
                        })
                    })
                } else {
                    for (let i = 0; i < this.currentData.length; i++) {
                        let item = this.currentData[i]
                        if (new RegExp(val).test(item[this.currentQueryName].toString())) {
                            this.queryResult.push(item)
                        }
                    }
                }
                this.queryLoading = false
            }, 10)
        }
    },
    methods: {
        select (item, isDefault) {
            if (item.disabled) return
            this.multiple ? this.check(item, isDefault) : this.single(item, isDefault)
        },
        single (item, isDefault) {
            // 单选
            this.currentItemArr.length && this.$set(this.currentItemArr[0], 'selected', false)
            // 清洗已选
            this.currentItemArr = []
            this.currentValueArr = []
            // 修改源数据
            this.$set(item, 'selected', true)
            // 记录已选
            this.currentItemArr.push(item)
            this.currentValueArr.push(item[this.valueName])
            // 暴露数据
            this.$emit('input', item[this.valueName])
            this.$emit('on-change', item)
            // 单选query值设置
            this.query = item[this.currentQueryName]
            // 收起下拉
            !isDefault && this.dropHideBlur()
        },
        check (item, isDefault) {
            if (item.selected) {
                // 清洗已选
                this.$delete(this.currentItemArr, this.currentItemArr.indexOf(item))
                this.$delete(this.currentValueArr, this.currentValueArr.indexOf(item[this.valueName]))
            } else {
                // 记录已选
                this.currentItemArr.push(item)
                !isDefault && this.currentValueArr.push(item[this.valueName])
            }
            // 修改源数据
            this.$set(item, 'selected', !item.selected)
            // 暴露数据
            this.$emit('input', this.currentValueArr)
            this.$emit('on-change', this.currentItemArr)
            // 获取焦点
            !isDefault && this.dropShowFocus()
        },
        defaultSelected (callback) {
            if (this.value === null || this.value === undefined || !this.value.toString()) {
                this.loading = false
                return
            }
            this.value instanceof Array
                ? this.currentValueArr = this.value
                : this.currentValueArr[0] = this.value
            // 初始化选择
            this.currentValueArr.forEach((item) => {
                for (let i = 0; i < this.currentData.length; i++) {
                    if (item === this.currentData[i][this.valueName]) {
                        this.select(this.currentData[i], 'default')
                        break
                    }
                }
            })
            this.loading = false
            callback()
        }
    }
}
</script>
