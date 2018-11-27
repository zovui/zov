// 创建虚拟组件元件,在这里是创建render元件,帮助外部render函数体通过次元件的render函数渲染生成虚拟的组件元件
export default {
    name: 'render-cell',
    functional: true, // 使组件无状态 (没有 data ) 和无实例 (没有 this 上下文)。他们用一个简单的 render 函数返回虚拟节点使他们更容易渲染。
    props: {
        render: {
            type: Function,
            default () {
                return function () {}
            }
        }
    },
    render: (h, ctx) => {
        return ctx.props.render(h)
    }
}
