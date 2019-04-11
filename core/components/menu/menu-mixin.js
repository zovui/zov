import { findComponentUpward, findComponentsUpward } from '../../utils'
export default {
    data () {
        return {
            menuComponent: findComponentUpward(this, 'zov-menu')
        }
    },
    computed: {
        parentsMenuSub () {
            return findComponentsUpward(this, 'zov-menu-sub')
        },
        parentsMenuGroup () {
            return findComponentsUpward(this, 'zov-menu-group')
        },
        paddingStyle () {
            let num = this.menuComponent.mode === 'horizontal'
                ? this.parentsMenuGroup.length
                : this.parentsMenuSub.length + this.parentsMenuGroup.length
            num = num + 1
            let indent = this.menuComponent.indent
            return {
                paddingLeft: num * indent + 'px',
                paddingRight: '15px'
            }
        }
    }
}
