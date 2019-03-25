<template>
    <div class="zov-color-picker-main-panel" @click="$el.focus()">
        <div class="zov-color-picker-main-panel-hue"></div>
        <div class="zov-color-picker-main-panel-saturation"></div>
        <div class="zov-color-picker-main-panel-lightness"></div>
        <div class="zov-color-picker-main-panel-pointer"></div>
    </div>
</template>
<script>
let prefix = 'zov-color-picker-main-panel'
export default {
    name: prefix,
    data () {
        return {}
    }
}
</script>
