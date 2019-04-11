<template>
    <li class="zov-menu-group">
        <div class="zov-menu-group-title" :style="paddingStyle">
            <slot name="title">menu group title</slot>
        </div>
        <ul class="zov-menu-group-body">
            <slot>item</slot>
        </ul>
    </li>
</template>
<script>
import MenuMixin from './menu-mixin'
let prefix = 'zov-menu-group'
export default {
    name: prefix,
    mixins: [MenuMixin]
}
</script>
