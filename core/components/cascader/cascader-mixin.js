import { findComponentUpward } from '../../utils'
import { DropUpdateMixin } from '../../mixins'
export default {
    mixins: [DropUpdateMixin],
    props: {
        childName: {
            type: String,
            default: 'children'
        },
        // 可搜索
        filterable: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        cascaderComponent () {
            return findComponentUpward(this, 'zov-cascader')
        }
    },
    methods: {
        hasChildren (data) {
            return data[this.childName] && data[this.childName].length
        },
        activeItem (item, isdefault) {
            if (item.disabled) return
            const { cascaderComponent } = this
            cascaderComponent.activeArr[item.__floor] = item['__' + this.valueName]
            // 向子组件传输数据
            this.hasChildren(item) ? this.subData = item[this.childName] : this.subData = []
            setTimeout(() => {
                // 这里调用popper的update方法，是为了解决边界情况下，动态改变的drop组件宽度导致的popper定位不更新
                cascaderComponent.dropUpdate()
            })
            cascaderComponent.canSelect(item) && cascaderComponent.select(item, isdefault)
        }
    }
}
