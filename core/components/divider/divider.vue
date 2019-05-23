<template>
    <div :class="classes" :style="styles">
        <span :class="txtClass" v-if="hasTxt">
            <slot></slot>
        </span>
    </div>
</template>
<script>
    const prefix = 'zov-divider';
    export default {
        name:prefix,
        data(){
            return {
                stylePrefix: prefix,
                txtClass:`${prefix}-inner-text`,
                hasTxt:false,
            }
        },
        props:{
            className:{
                type:String,
                default:''
            },
            dashed:{
                type:Boolean,
                default:false
            },
            //分割线标题位置，分为三种：center、left、right
            orientation:{
                type:String,
                default:'center',
                validator:function(value){
                    if(['center','left','right'].indexOf(value) !== -1){
                        return value;
                    }
                    return 'center';
                }
            },
            styles:{
                type:Object,
                default:function(){
                    return {}
                },
                validator:function(value){
                    if(typeof value === 'object'){
                        return value;
                    }
                    return {}
                }
            },
            type:{
                type:String,
                default:'horizontal',
                validator:function(value){
                    if(['horizontal','vertical'].indexOf(value) !== -1){
                        return value;
                    }
                    return 'horizontal';
                }
            }
        },
        computed:{
            classes:function(){
                var hasTxt = !!this.$slots.default;
                this.hasTxt = hasTxt;
                return [
                    this.stylePrefix,
                    (this.stylePrefix + '-' + this.type),
                    (this.dashed ? (this.stylePrefix + '-dashed') : ''),
                    hasTxt ? (this.stylePrefix + '-with-text-' + this.orientation) : '',
                    this.className
                ]
            }
        }
    }
</script>
<style>

</style>