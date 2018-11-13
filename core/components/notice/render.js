// 创建虚拟组件元件,在这里是创建render元件,帮助外部render函数体通过次元件的render函数渲染生成虚拟的组件元件
export default {
    name: 'render-cell',
    functional: true,
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
