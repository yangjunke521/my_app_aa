<template>
  <div class="uploadImgDiv">
        <Upload class="upload" 
            v-model="photoVal" 
            :accept="accept"
            :action="upload_url" 
            :data="data"
            :show-upload-list="showList"
            :with-credentials='withCredentials'
            :max-size='maxSize'
            :name='fileName'
            :multiple='multiple'
            :format='format'
            :default-file-list='defaultList'

            :on-success="uploadSuccess"
            :on-error="uploadError"
            :before-upload="beforeUpload" 
            :on-format-error='handleFormatError'
            :on-exceeded-size='onExceededSize'
            >
        <!-- 点击前图片，我这里是svg图 -->
        <div class="bzLogo" v-if="idBefore==''">
            <img src="@/assets/image/uploader.png"/>
        </div>
        <!-- 点击后图片-->
        <img v-bind:src="idBefore" ref="upload-list" class="img-idcard"  v-else>
        </Upload>
  </div>
</template>

<script>
  export default {
    name:'iview-upload-img',
    props:{
        needUpload:{ // 是否需要选取完自动上传功能
            type: Boolean,
            default: true
        },
        needFromUpload:{ // form表单,将上传的file文件通过 formUpload  方法发送出去
            type: Boolean,
            default: true
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
        format:Array,//支持的文件类型
        defaultList:Array,//默认已上传的文件列表
        multiple:{ // 是否支持多选文件
            type: Boolean,
            default: false
        },
        headers:Object,//设置上传的请求头部
        data:Object,//上传时附带的额外参数
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
            debugger
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
            console.log(error);
            this.$Message.info(error);
        },
        handleFormatError (file) {
            this.$Message.info("文件格式不正确");
        },
        onExceededSize(file) {
            this.$Message.info("超过设定大小");
        },
    },

    watch: {}

  }

</script>
<style lang='less' scoped>
    .uploadImgDiv{
        width: 22%;
        height: 80%;
        .img-idcard{
            display: block;
            margin-left: 20%;
            width: 100%;
        }
        .bzLogo,.img-idcard{//班组logo
            &:hover{
                cursor: pointer;
            }
        }
        .bzLogo{
            width:150px;
            height:150px;
            border:1px solid #ccc;
            padding:10px;
        }
    }
    
</style>
