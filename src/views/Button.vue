<template>
    <div>
        <p>
            size
            <Button size="large" @click="size = 'large'">large</Button>
            <Button @click="size = 'default'">middle</Button>
            <Button size="small" @click="size = 'small'">small</Button>
        </p>
        <p>
            type
            <Button :size="size">default</Button>
            <Button :size="size" type="primary">primary</Button>
            <Button :size="size" type="dashed">dashed</Button>
            <Button :size="size" type="text">text</Button>
            <Button :size="size" type="info">info</Button>
            <Button :size="size" type="success">success</Button>
            <Button :size="size" type="warning">warning</Button>
            <Button :size="size" type="error">error</Button>
        </p>
        <p>
            shape
            <Button :size="size" shape="circle">default</Button>
            <Button :size="size" shape="circle" type="primary">primary</Button>
            <Button :size="size" shape="circle" type="dashed">dashed</Button>
            <Button :size="size" shape="circle" type="text">text</Button>
            <Button :size="size" shape="circle" type="info">info</Button>
            <Button :size="size" shape="circle" type="success">success</Button>
            <Button :size="size" shape="circle" type="warning">warning</Button>
            <Button :size="size" shape="circle" type="error">error</Button>
        </p>
        <p>
            disabled
            <Button :size="size" shape="circle" disabled>default</Button>
            <Button :size="size" shape="circle" type="primary" disabled>primary</Button>
            <Button :size="size" shape="circle" type="dashed" disabled>dashed</Button>
            <Button :size="size" shape="circle" type="text" disabled>text</Button>
            <Button :size="size" shape="circle" type="info" disabled>info</Button>
            <Button :size="size" shape="circle" type="success" disabled>success</Button>
            <Button :size="size" shape="circle" type="warning" disabled>warning</Button>
            <Button :size="size" shape="circle" type="error" disabled>error</Button>
        </p>
        <p>
            Icon
            <Button loading>loading</Button>
            <Button loading spinname="dbcircle">自定义loading</Button>
            <Button type="info" iconname="zov-icon-wifi">自定义icon</Button>
            <Button loading iconname="zov-icon-cloud-download">自定义icon</Button>

            <Button loading :size="size" shape="circle">default</Button>
            <Button loading :size="size" shape="circle" type="primary">primary</Button>
            <Button loading :size="size" shape="circle" type="dashed">dashed</Button>
            <Button loading :size="size" shape="circle" type="text">text</Button>
            <Button loading :size="size" shape="circle" type="info">info</Button>
            <Button loading :size="size" shape="circle" type="success">success</Button>
            <Button loading :size="size" shape="circle" type="warning">warning</Button>
            <Button loading :size="size" shape="circle" type="error">error</Button>
        </p>
        <p>
            无文本 button
            <Button loading />
            <Button type="info" iconname="zov-icon-wifi" />
            <Button type="success" shape="circle" iconname="zov-icon-wifi"/>
        </p>
    </div>
</template>
<script>
export default {
    data () {
        return {
            size: 'default'
        }
    }
}
</script>
