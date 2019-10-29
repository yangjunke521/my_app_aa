<template>
  <div class="uploadDiv">
        <Input v-model="fileName" placeholder="请选择要上传的班歌文件" clearable />
        <Upload 
           ref="uploadFile"
           name='uploadFile'
           :before-upload="beforeUpload"
           :show-upload-list="false"
           :on-success="uploadSuccess"
           :on-error="uploadError"
           :max-size="2048"
           :on-format-error="handleFormatError"
           :data="{dbCode:3}"
           :action="upload_url">
            <Button class="upload-btn" title="上传excel">{{this.lltext}}</Button>
       </Upload>
        <Button v-if="moreBut" @click="moreButFun" style="margin-left:1%;">拉取已学习文件</Button>
        
<!--            :format="['.doc/.docx,.ppt/.pptx/.pps,.xls/.xlsx,.pot,.pps,.vsd,.rtf.wps,.et,.dps.pdf.txt']" -->
  </div>
</template>

<script>

  export default {
    name:'iview-upload-file',
    props:{
        lltext: { // 
            type: String,
            default: '浏览'
        },
        moreBut: { //培训新增学习页面所需要的特殊额外的button按钮
            type: Boolean,
            default: false
        },
        needUpload:{ // 是否需要选取完自动上传功能
            type: Boolean,
            default: false
        },
        needFromUpload:{ // form表单,将上传的file文件通过 formUpload  方法发送出去
            type: Boolean,
            default: false
        },
        upload_url:String,//上传后台地址
    },
    data () {
      return {
          fileName:'',//input内容
          uploadFile:[],//存放选中的文件
          accept:'',//接受的文件格式，不同的格式之间以逗号隔开
          showList:false,//是否显示已上传文件列表 true代表显示，false代表不显示
          withCredentials:false,//支持发送cookie凭证信息
          idBefore:'',//地址
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
        beforeUpload(file){//上传前配置
            if(this.fileName==''){
                this.fileName = file.name;
            }else{
                this.fileName += ','+file.name;
            }
             // 保存文件到需要上传的文件数组里
             this.uploadFile.push(file)
            if(!this.needUpload){//如果需要手动上传
                return false; // 返回 falsa 停止自动上传 我们需要手动上传
            }
            if(this.needFromUpload){//form表单
                this.$emit('formUpload',file);
                return false; // 返回 falsa 停止自动上传 我们需要手动上传
            }
        },
        clickUpload () { // 点击进行上传文件---在需要手动上传时候调用这个方法就可以进行上传指令
            for (let i = 0; i < this.uploadFile.length; i++) {
                let item = this.file[i]
                this.$refs.upload.post(item);
            }

        },
         uploadSuccess (res, file) { //上传成功
            this.$Message.info(res.msg);
            if(res.code == 200){
                this.excel_name = res.info.originalName;
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
        handleFormatError (file) {
            this.$Message.info("文件格式不正确,请上传excel格式文件");
        },
        uploadError(error, file) { 
            this.$Message.info(error);
        },

        //额外的button事件
        moreButFun(){
            this.$emit('moreButFun');
        }
    },

    watch: {
        fileName(val){//清除选中文件
            if(val == ''){
                this.uploadFile = [];
            }
        }
    }

  }

</script>
<style lang='less' scoped>
    .uploadDiv{
        padding-top: 4%;
        .ivu-upload{
            display: inline-block;
        }
        .ivu-btn-ghost{
            color:#000;
        }
    }
    
</style>