<template>
    <ul>
        <li>
            <p>集中器名称：</p>
            <p><Input v-model="jzqVal" placeholder="请输入集中器名称"/></p>
        </li>
        <li>
            <p>集中第IP地址：</p>
            <p><Input v-model="ipVal" placeholder="请输入集中器IP地址"/></p>
        </li>
        <li>
            <p>行政区域码：</p>
            <p><Input v-model="xzqymVal"  placeholder="请输入行政区域码"/></p>
        </li>
        <li>
            <p>终端地址：</p>
            <p><Input v-model="zddzVal"  placeholder="请输入终端地址"/></p>
        </li>
        <li>
            <p>通讯端口：</p>
            <p><Input v-model="txdkVal"  placeholder="请输入通讯端口"/></p>
        </li>
    </ul>
</template>

<script>
    import cuploadimg from '@/components/comIview/cuploadimg'//下拉
    export default {
        name:'',
        props:[''],
        data () {
            return {
                jzqVal:'',//商户名称
                ipVal:'',//联系人
                xzqymVal:'',//手机号码
                zddzVal:'',//上传图片数据
                txdkVal:'',
            };
        },

        components: {
            cuploadimg
        },

        computed: {},

        beforeMount() {},

        mounted() {},

        methods: {
            formUpload(file){//接收点击上传以后的数据
                this.file = file;
            },
            putData(){//点击确定时事件
                let str = {
                    jzqVal:this.jzqVal,
                    ipVal:this.ipVal,
                    xzqymVal:this.xzqymVal,
                    zddzVal:this.zddzVal,
                    txdkVal:this.txdkVal,
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