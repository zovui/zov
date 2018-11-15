<template>
    <div>
        <p>
            size
            <Button size="large" @click="size = 'large'"> large </Button>
            <Button @click="size = 'default'"> middle </Button>
            <Button size="small" @click="size = 'small'"> small </Button>
        </p>
        <p>
            type
            <Button :size="size"> default </Button>
            <Button :size="size" type="primary"> primary </Button>
            <Button :size="size" type="dashed"> dashed </Button>
            <Button :size="size" type="text"> text </Button>
            <Button :size="size" type="info"> info </Button>
            <Button :size="size" type="success"> success </Button>
            <Button :size="size" type="warning"> warning </Button>
            <Button :size="size" type="error"> error </Button>
        </p>
        <p>
            shape
            <Button :size="size" shape="circle"> default </Button>
            <Button :size="size" shape="circle" type="primary"> primary </Button>
            <Button :size="size" shape="circle" type="dashed"> dashed </Button>
            <Button :size="size" shape="circle" type="text"> text </Button>
            <Button :size="size" shape="circle" type="info"> info </Button>
            <Button :size="size" shape="circle" type="success"> success </Button>
            <Button :size="size" shape="circle" type="warning"> warning </Button>
            <Button :size="size" shape="circle" type="error"> error </Button>
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
