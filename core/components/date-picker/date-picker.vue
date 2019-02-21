<template>
    <div>
        <Drop
            :no-arrow="noArrow"
            trigger="click"
            :never="disabled"
            v-model="dropShow"
        >
            <SelectHead
                ref="zov-select-head"
                slot="drop-head"
                iconname="calendar"
                :data="currentItemArr"
                :disabled="disabled"
                :placeholder="placeholder"
                :filterable="true"
                :multiple="multiple"
                v-model="query"
                :dropShow="dropShow"
                @on-remove-tag="select"
                @click.native="!disabled && dropShowFocus()"
                @remove-tag-end="dropUpdate"
            />
            <div>
                <DayTable/>
            </div>
        </Drop>
    </div>
</template>
<script>
import Drop from '../drop'
import SelectHead from '../select/select-head'
import DayTable from './date-table/day-table'
let prefix = 'zov-data-picker'
export default {
    name: prefix,
    components: { Drop, SelectHead, DayTable },
    props: {
        // 组件组装
        value: {
            type: [Number, String, Array]
        },
        // 多选
        multiple: {
            type: Boolean,
            default: false
        },
        // drop 属性
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
            currentItemArr: [],
            query: '',
            dropShow: false
        }
    }
}
</script>
