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
        <div class="box">
            <Divider className="red">Left Text</Divider>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                probare, quae sunt a te dicta? Refert tamen, quo modo.
            </p>
            <Divider orientation="right" :style="stylesObject">Right Text</Divider>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                probare, quae sunt a te dicta? Refert tamen, quo modo.
            </p>
        </div>
        <div class="box">
            <h3>参数</h3>
            <p>@className 分割线样式类  类型：string  默认值：-</p>
            <p>@dashed 是否虚线  类型：boolean  默认值：false</p>
            <p>@orientation 分割线标题的位置  类型：(enum)left、right、center  默认值：center</p>
            <p>@style 分割线样式对象  类型：object  默认值：-</p>
            <p>@type 水平还是垂直类型  类型：(enum)horizontal、vertical  默认值：horizontal</p>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                stylesObject:{
                    fontSize:'20px',
                    color:'red'
                }
            }
        }
    }
</script>
<style>
    .box{
        border: 3px dashed;
        margin: 15px;
        padding: 15px;
    }
    .red:after,.red:before{
        border-color:red!important;
    }
</style>