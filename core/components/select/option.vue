<template>
    <div>
        <div
            class="zov-select-option"
            v-for="(item, index) in data"
            :key="index"
            @click.stop.capture="$emit('on-click', item)"
            :selected="item.selected"
            :disabled="item.disabled"
        >
            <slot :props="{item, index}"></slot>
            <Icon class="zov-select-option-selected" v-if="item.selected" iconname="checkmark"/>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        data: {
            type: Array,
            default () {
                return []
            }
        }
    }
}
</script>
