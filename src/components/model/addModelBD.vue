<template>
  <ul>
    <li>
        <p>商户名称：</p>
        <p><Input v-model="shmcVal" placeholder="请输入商户名称"/></p>
    </li>
    <li>
        <p>联系人：</p>
        <p><Input v-model="lxrVal" placeholder="请输入联系人"/></p>
    </li>
    <li>
        <p>手机号码：</p>
        <p><Input v-model="sjhmVal" type='number' placeholder="请输入手机号码"/></p>
    </li>
    <li>
        <p>logo：</p>
        <p>
          <cuploadimg :upload_url="'http://localhost:8080'" @formUpload='formUpload'></cuploadimg>
        </p>
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
        shmcVal:'',//商户名称
        lxrVal:'',//联系人
        sjhmVal:'',//手机号码
        file:'',//上传图片数据
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
          shmcVal:this.shmcVal,
          lxrVal:this.lxrVal,
          sjhmVal:this.sjhmVal,
          file:this.file,
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