<template>
    <div class="starDiv">
        <Rate 
            :allow-half='allowHalf' 
            :disabled='disabled'
            :count='count'
            :show-text='showText'
            :clearable='clearable'
            :custom-icon='customIcon'
            v-model="score"
            @on-change='changeVal'
            >
        </Rate>
    </div>
       
</template>
<script>
    export default {
        name:'star',//星星评分系统
        props:{
            score: Number,//接受数据
            allowHalf:{ //是否需要半星
                type: Boolean,
                default: true
            } ,
            disabled:{ //是否为只读
                type: Boolean,
                default: true
            } ,
            count:{ //总数
                type: Number,
                default: 5
            } ,
            showText:{ //是否显示文字提示
                type: Boolean,
                default: false
            } ,
            clearable:{ //支持允许或者禁用清除。
                type: Boolean,
                default: false
            } ,
            character:String,//自定义字符，现在是5个星星，传A就是5个A
            customIcon:String,//自定义图标。如果是iview的话直接传过来名字
        },
        methods: {
            changeVal(val){//评分改变时触发
                this.$emit('changeVal',val);
            }
        }
    }
</script>
<style lang='less' scoped>
    .starDiv{

    }
</style>
