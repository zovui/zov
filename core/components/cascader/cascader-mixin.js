export default {
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
    methods: {
        dropUpdate () {
            this.$children[0].$children[0].$children[1] && this.$children[0].$children[0].$children[1].popper.update()
        },
        hasChildren (data) {
            return data[this.childName] && data[this.childName].length
        },
        findCascaderComponent () {
            let component = null
            function f (c) {
                if (!c && c.$options) return
                if (c.$options.name === 'zov-cascader') {
                    component = c
                    return
                }
                f(c.$parent)
            }
            f(this)
            return component
        },
        activeItem (item) {
            if (item.disabled) return
            let cascaderComponent = this.findCascaderComponent()
            cascaderComponent.activeArr[item.__floor] = item['__' + this.valueName]
            // this.clearActiveStatus(item)
            this.hasChildren(item) ? this.subData = item[this.childName] : this.subData = []
            setTimeout(() => {
                // 这里调用popper的update方法，是为了解决边界情况下，动态改变的drop组件宽度导致的popper定位不更新
                cascaderComponent.dropUpdate()
            })
            cascaderComponent.canSelect(item) && cascaderComponent.select(item)
        }
    }
}
