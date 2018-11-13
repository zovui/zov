<template>
    <div>
        <p>
            <button @click="test">全配置项</button>
        </p>
        <p>
            无配置
            <button @click="$Message.open()">普通消息</button> |
            <button @click="$Message.info()">带图标的普通消息</button> |
            <button @click="$Message.success()">success</button> |
            <button @click="$Message.error()">error</button> |
            <button @click="$Message.warning()">waring</button>
        </p>
        <p>
            灵活配置
            <button @click="$Message.open({
                title: '提示',
                text:  '您打开了一条 普通 的Message消息！'
            })">普通消息</button> |
            <button @click="$Message.info({
                title: '提示',
                text:  '您打开了一条 info 的Message消息！不自动关闭',
                duration:0
            })">带图标的普通消息</button> |
            <button @click="$Message.success({
                text: '您打开了一条 success 的Message消息！10s，没有关闭按钮',
                duration:10000,
                closable:false
            })">success</button> |
            <button @click="$Message.error({
                text: '您打开了一条 error 的Message消息！不自动关闭',
                duration:0
            })">error</button> |
            <button @click="$Message.warning({
                text: '您打开了一条 waring 的Message消息！不自动关闭',
                duration:0
            })">waring</button>
        </p>
    </div>
</template>
<script>
export default {
    methods: {
        test () {
            this.$Message.open({
                // 标题
                title: 'test info标题',
                // 说明
                text: 'test info文案info文案info文案info文案info文案',
                // 停留时间，为 0 时则长久停留
                duration: Math.random() * 10000,
                // 关闭的回调
                onClose: function () {
                    console.log('close')
                },
                // 自定义描述
                render: h => {
                    return h('div', [
                        '这是render出来的',
                        h('div', [
                            '1',
                            h('br'),
                            '2'
                        ])
                    ])
                },
                // 是否提供关闭按钮 默认true
                closable: true
            })
        }
    }
}
</script>
