<template>
    <li :class="classes" @click.stop="clickHandle" :style="paddingStyle">
        <slot>item</slot>
    </li>
</template>
<script>
import MenuMixin from './menu-mixin'
let prefix = 'zov-menu-item'
export default {
    name: prefix,
    mixins: [MenuMixin],
    props: {
        name: {
            type: [String, Number],
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        classes () {
            return [
                prefix,
                this.name === this.menuComponent.currentActiveName && prefix + '-active'
            ]
        }
    },
    methods: {
        upwardUpdateActive () {
            this.menuComponent.activeFullPath = []
            this.parentsMenuSub.forEach(component => {
                component.active = true
                let name = component.name + ''
                this.menuComponent.activeFullPath.push(name)
                this.menuComponent.currentOpenNames.indexOf(name) === -1 && this.menuComponent.currentOpenNames.push(name)
            })
            this.menuComponent.$emit('on-change', this.name)
        },
        clickHandle () {
            this.menuComponent.currentActiveName = this.name
            this.upwardUpdateActive()
        }
    },
    mounted () {
        this.menuComponent.currentActiveName + '' === this.name + '' && this.upwardUpdateActive()
    }
}
</script>
