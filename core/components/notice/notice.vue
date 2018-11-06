<template>
    <div class="zov-notice">
        <div>
            {{ title }}
        </div>
        <div>
            {{ text }}
        </div>
    </div>
</template>
<script>
    export default {
        name: 'notice',
        data () {
            return {
                title: '标题',
                text: '文案文案文案文案文案文案文案文案，文案文案文案文案文案文案文案'
            }
        }
    }
</script>
