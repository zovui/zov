<template>
    <span
        v-if="data.length"
        class="zov-cascader-column"
    >
        <div
            class="zov-cascader-column-inner"
        >
            <div
                v-for="(item, index) in data"
                :key="index + ''"
                :class="[
                    'zov-select-option',
                    {
                        'zov-cascader-option-active': activeValues.indexOf(item['__' + valueName]) !== -1,
                        'zov-cascader-option-selected': selectedValues.indexOf(item['__' + valueName]) !== -1
                    }
                ]"
                :disabled="item.disabled"
                @click.stop.capture="activeItem(item)"
            >
                {{ item[labelName] }}
                <div class="zov-cascader-option-arrow-forward">
                    <Icon v-if="selectedValues.indexOf(item['__' + valueName]) !== -1" iconname="checkmark"/>
                    <Icon
                        v-if="hasChildren(item)"
                        iconname="arrow-forward"
                    />
                </div>
            </div>
        </div>
        <!-- 递归当前组件 -->
        <zov-cascader-column
            v-if="subData && subData.length"
            :data="subData"
            :selected-values="selectedValues"
            :active-values="activeValues"
            :label-name="labelName"
            :value-name="valueName"
            :child-name="childName"
            :filterable="filterable"
        />
    </span>
</template>
<script>
import Icon from '../icon'
import CascaderMixin from './cascader-mixin'
let prefix = 'zov-cascader-column'
export default {
    name: prefix,
    components: { Icon },
    mixins: [
        CascaderMixin
    ],
    props: {
        data: {
            type: Array,
            default () {
                return []
            }
        },
        // value 字段的映射字段
        valueName: {
            type: String,
            default: 'value'
        },
        // label 字段的映射字段
        labelName: {
            type: String,
            default: 'label'
        },
        // 按哪个字段搜索
        queryName: {
            type: String,
            default: ''
        },
        selectedValues: {
            type: Array,
            default () {
                return []
            }
        },
        activeValues: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data () {
        return {
            subData: []
        }
    },
    watch: {
        data () {
            this.subData = []
        }
    }
}
</script>
