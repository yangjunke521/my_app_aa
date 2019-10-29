<template>
  <div class="uploadImgDiv">
        <Upload class="upload" 
            v-model="photoVal" 
            :accept="accept" 
            :show-upload-list="showList" 
            :action="upload_url" 
            :with-credentials='withCredentials' 
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :before-upload="beforeUpload" 
            >
            <!-- 点击前图片，我这里是svg图 -->
            <div class="bzLogo" v-if="idBefore==''">
                <icon-svg icon-class="update" />
            </div>
            <!-- 点击后图片-->
            <img v-bind:src="idBefore" ref="upload-list" class="img-idcard"  v-else>
            <Button class="clickImg">添加封面</Button>
        </Upload>
  </div>
</template>

<script>
  import '@/icons/PartyGroup/update.svg'//上传
  export default {
    name:'iview-upload-img',//点击按钮上传图片
     props:{
       needUpload:{ // 是否需要选取完自动上传功能
            type: Boolean,
            default: true
        },
        needFromUpload:{ // form表单,将上传的file文件通过 formUpload  方法发送出去
            type: Boolean,
            default: false
        },
        showList:{//是否显示已上传文件列表
            type: Boolean,
            default: false
        },
        withCredentials:{//支持发送cookie凭证信息
            type: Boolean,
            default: false
        },
        accept:{//接受文件类型-图片上传类型-不同的格式之间以逗号隔开
            type: String,
            default: 'image/jpg, image/jpeg,image/png,image/gif,image/bmp'
        },
        multiple:{ // 是否支持多选文件
            type: Boolean,
            default: false
        },
        headers:Object,//设置上传的请求头部
        upload_url:String,//上传后台地址
        maxSize:Number,//上传最大限制，单位kb
        fileName:String,//上传的文件字段名,默认file
        type:String,//select-点击选择，drag-支持拖拽

    },
    data () {
      return {
          photoVal:'',
          idBefore:'',//地址
          uploadFile:'',//上传给后台的数据
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
        beforeUpload(file){//上传前配置
            this.idBefore = window.URL.createObjectURL(file);
             // 保存文件到需要上传的文件数组里
             this.uploadFile=file;
             if(!this.needUpload){//如果需要手动上传
                return false; // 返回 falsa 停止自动上传 我们需要手动上传
            }
             if(this.needFromUpload){//form表单
                this.$emit('formUpload',file);
                return false; // 返回 falsa 停止自动上传 我们需要手动上传
            }
        },
        clickUpload () { // 上传文件
                let item = this.uploadFile;
                this.$refs.upload.post(item);
        },
        uploadSuccess (res, file) { //上传成功
            this.$Message.info(res.msg);
            if(res.code == 200){
                let str = {
                    'res' : res,
                    'file' : file
                }
              this.$emit('successFun',str);
            }
        },
        uploadError(error, file) { //上传失败
            this.$Message.info(error);
        },
    },

    watch: {}

  }

</script>
<style lang='less' scoped>
    .uploadImgDiv{
        width: 22%;
        height: 80%;
        .upload{
            position: relative;
            .clickImg{
                position: absolute;
                left:100%;
                bottom:0;
            }
        }
        .img-idcard{
            display: block;
            width: 100%;
        }
        .bzLogo,.img-idcard{//班组logo
            &:hover{
                cursor: pointer;
            }
        }
    }
    
</style>