<template>
    <ul>
        <li>
            <p>费率名称：</p>
            <p><Input v-model="pnameVal" placeholder="请输入费率名称"/></p>
        </li>
        <li>
            <p>单价：</p>
            <p><Input v-model="ppriceVal" placeholder="请输入单价"/></p>
        </li>
        <li>
            <p >收费类别：</p>
            <p><cunival :sel_val='sflbVal' :options='sflbVals' @changeFun='sflbsj'></cunival></p>
        </li>
        <li>
            <p>创建人：</p>
            <p><Input v-model="punameVal"  placeholder="创建人"/></p>
        </li>
    </ul>
</template>

<script>
    import cunival from '@/components/comIview/cunival'//下拉
    export default {
        name:'',
        props:[''],
        data () {
            return {
                pnameVal:'',//商户名称
                ppriceVal:'',//联系人
                sflbVal:'',//手机号码
                punameVal:'',//上传图片数据
                sflbVal:'', //缴费类型
                sflbVals:[],//缴费类型
            };
        },

        components: {

            cunival
        },

        computed: {},

        beforeMount() {},

        mounted() {},

        methods: {
            /**
             * 下拉事件
             */
            sflbsj(data){//收费类别
                this.sflbVal=data.value;
            },
            formUpload(file){//接收点击上传以后的数据
                this.file = file;
            },
            putData(){//点击确定时事件
                let str = {
                    pnameVal:this.pnameVal,
                    ppriceVal:this.ppriceVal,
                    sflbVal:this.sflbVal,
                    punameVal:this.punameVal,
                }
                // alert('点击确定-新增单位弹框');
            },

        },

        watch: {}

    }

</script>
<style lang='less' scoped>
    ul{
        overflow: hidden;
    li{
        overflow: hidden;
        padding: 4px 0;
    p{
        float:left;
    &:first-child{
         width:25%;
     }
    &:last-child{
         width:75%;
     }
    }
    }
    }
</style>