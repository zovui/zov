<template>
    <div>
        <div class="box">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                probare, quae sunt a te dicta? Refert tamen, quo modo.
            </p>
            <Divider />
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                probare, quae sunt a te dicta? Refert tamen, quo modo.
            </p>
            <Divider>With Text</Divider>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                probare, quae sunt a te dicta? Refert tamen, quo modo.
            </p>
            <Divider dashed />
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                probare, quae sunt a te dicta? Refert tamen, quo modo.
            </p>
        </div>
        <div class="box">
            <Divider orientation="left">Left Text</Divider>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                probare, quae sunt a te dicta? Refert tamen, quo modo.
            </p>
            <Divider orientation="right">Right Text</Divider>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                probare, quae sunt a te dicta? Refert tamen, quo modo.
            </p>
        </div>
        <div class="box">
            Text
            <Divider type="vertical" />
            <a href="#">Link</a>
            <Divider type="vertical" />
            <a href="#">Link</a>
        </div>
    </div>
</template>
<script>
    export default {
    
    }
</script>
<style>
    .box{
        border: 3px dashed;
        margin: 15px;
        padding: 15px;
    }
</style>