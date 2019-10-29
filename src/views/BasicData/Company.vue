<template>
   <div class="cultureDiv">
    <Breadcrumb style="border-bottom:1px solid #ccc;font-size:18px;font-weight:100;padding:8px 0;">
      <BreadcrumbItem>基础数据<span style="padding:0 10px;">></span>单位管理</BreadcrumbItem>
    </Breadcrumb>
    <Content>
      <section>
        <div class="sec_div">
           <div class="template_div">
             <h4>
               <span>商户名</span>
               <div class="souso">
                 <Input v-model="shmVal" placeholder="请输入"/>
                 <Button size="small" @click="search"><Icon type="ios-search" /></Button>
               </div>
               <div class="moreCheck">
                  <Button @click="addData">添加</Button>
                  <Button @click="editData">修改</Button>
                  <Button @click="deleteData">删除</Button>
               </div>
             </h4>
             <div class="temp_con">
               <div class="table">

                   <el-table
                           border
                           v-loading="loading"
                           :data="tableData"
                           style="width: 100%; margin-top: 10px;"
                           :row-key="getRowKey"
                           @selection-change="handleSelectionChange">
                       <el-table-column
                               type="selection">
                       </el-table-column>
                       <el-table-column align="center" prop="shmc" label="商户名"></el-table-column>
                       <el-table-column align="center" prop="lxr" label="联系人"></el-table-column>
                       <el-table-column align="center" prop="sjhm" label="手机号码"></el-table-column>
                       <el-table-column align="center" prop="cjr" label="创建人"></el-table-column>
                       <el-table-column align="center" prop="cjsj" label="创建时间" width="180"></el-table-column>
                       <el-table-column align="center" prop="gxsj" label="更新时间" width="180"></el-table-column>
                   </el-table>
                   <el-pagination
                           background
                           @current-change="currentPageChange"
                           layout="prev, pager, next"
                           :current-page="currentPage"
                           :total="total"
                           :page-size="pageSizse"
                           :disabled="disablePagination">
                   </el-pagination>



               </div>
             </div>
           </div>
           <Modal
              class-name='addModelBD'
              v-model="addModel"
              :closable='false'
              :title="title"
              @on-ok="clickTrue"
              @on-cancel="cancel">
              <addModel ref="addModel" ></addModel>
            </Modal>
        </div>
      </section>
    </Content>
  </div>
</template>

<script>
  import addModel from '@/components/model/addModelBD';
  import $ from 'jquery';
  export default {
    name:'',
    props:['Company'],//单位管理
    data () {
      return {
        shmVal:'',//商户名
        addModel:false,//新增弹框状态
          title:"新增单位",
          //表格使用参数
          dwmcVal: '',//单位名称
          total: 0,//每页默认显示
          currentPage: 1,
          pageSizse: 10,
          loading: true,
          disablePagination: false,
          tableData: [],
          handleSelectionChangedata:[],
          thinsertorup : 1,
          thinsertorupid : 0
      };
    },

    components: {
      addModel

    },

    computed: {},

    beforeMount() {},

    mounted() {
        this.getFaultInfoByComId();
    },

    methods: {
      getFaultInfoByComId() {
            const that = this;
            this.loading = true;
            this.disablePagination = true;
            $.ajax('/api/MerchantController/merchantinfo', {
                data: {
                    cname: that.dwmcVal,
                    now: that.currentPage,
                    size: that.pageSizse,
                },
                dataType: 'json',
                success: function(res) {
                    that.total = res.total;
                    that.tableData = res.data;
                },
                complete: function() {
                    that.loading = false;
                    that.disablePagination = false;
                }
            });

        },

      currentPageChange(currentPage) {
          this.currentPage = currentPage;
          this.getFaultInfoByComId();
      },
      // 指定一个key标识这一行的数据
      getRowKey (row) {
          return row.shid;
      },
      // val表示选中的表格行数据
      handleSelectionChange (val) {

          this.handleSelectionChangedata = val;
      },
      search(){//搜索框点击事件
          this.dwmcVal = this.shmVal;
          this.getFaultInfoByComId();
      },
      addData(){//点击添加事件
          this.$refs.addModel.shmcVal = "";
          this.$refs.addModel.lxrVal  = "";
          this.$refs.addModel.sjhmVal = "";
          this.$refs.addModel.file = "";
          this.thinsertorup = 1;
          this.thinsertorupid = 0;
          this.addModel=true;
      },
      clickTrue(){//新增弹框点击确定事件
          if(this.thinsertorup == 1){
              this.insertsh();
          }else{
              this.updatesh();
          }
      },
      cancel(){//取消事件
            this.addModel=false;
          this.$refs.addModel.shmcVal = "";
          this.$refs.addModel.lxrVal  = "";
          this.$refs.addModel.sjhmVal = "";
          this.$refs.addModel.file = "";
      },
      editData() {//点击修改事件

          if (this.handleSelectionChangedata != null && this.handleSelectionChangedata.length == 1) {
              const comIds = [];
              this.handleSelectionChangedata.forEach((item) => {
                  comIds.push(item);
              });
              this.title="修改单位";
              if (comIds.length > 0) {

                  this.$refs.addModel.shmcVal = comIds[0].shmc;
                  this.$refs.addModel.lxrVal = comIds[0].lxr;
                  this.$refs.addModel.sjhmVal = comIds[0].sjhm;
                  this.$refs.addModel.file = null;
                  this.thinsertorupid = comIds[0].shid;
                  this.thinsertorup = 2;
                  this.addModel = true;
              }
          }else{
              this.$message({type: 'info', message: "请选择一条信息操作！"});
          }
      },
      deleteData(){//点击删除事件
          if (this.handleSelectionChangedata != null && this.handleSelectionChangedata.length == 1) {
              let that = this;
              const comIds = [];
              this.handleSelectionChangedata.forEach((item) => {
                  comIds.push(item);
              });
              if (comIds.length > 0) {

                  this.$confirm('是否删除选中数据?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'info'}).then(() => {

                      $.ajax({
                          url: "/api/MerchantController/deleteMsh",
                          async : false,
                          data:{
                              'shid' : comIds[0].shid
                          },
                          dateType: 'json',
                          success: function(res){
                              debugger;
                              if(res != null && res.success == true){
                                  that.getFaultInfoByComId();
                                  that.$message({type: 'success', message: res.message});
                              }else{
                                  that.$message({type: 'error', message: res.message});
                              }
                          }
                      });

                  }).catch(() => {this.$message({type: 'info', message: '已取消删除'});});
              }
          }else{
                this.$message({type: 'info', message: "请选择一条信息操作！"});
            }
      },
        insertsh(){
            let that = this;
            this.$refs.addModel.putData();//调动addModelBD.vue里面的putData事件
            let shmc = this.$refs.addModel.shmcVal;
            let lxr = this.$refs.addModel.lxrVal;
            let sjhm = this.$refs.addModel.sjhmVal;
            let logo = this.$refs.addModel.file;
            //验证新增条件
            if(shmc.length <= 50 && shmc.length > 0){
                if( lxr.length <= 50 && lxr.length > 0){
                    if(sjhm.length <= 30 && sjhm.length >= 11){
                        if(logo != null){
                            //实例化新增对象
                            let formData = new FormData();
                            formData.append('shmc', shmc);
                            formData.append('lxr', lxr);
                            formData.append('sjhm', sjhm);
                            formData.append('file', logo);
                            //设置请求头部
                            let config = {
                                headers: {
                                    'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()
                                }
                            }
                            //开始文件及新增条件上传
                            this.$axios.post('/api/MerchantController/insertmerchant', formData, config).then(function (res) {
                                if(res != null && res.data.success == true){
                                    //上传成功，刷新表格
                                    that.getFaultInfoByComId();
                                    that.$message({type: 'success', message: res.data.message});
                                }else{
                                    that.$message({type: 'error', message: res.data.message});
                                }
                            });
                        }else{
                            that.$message({type: 'error', message: '商户logo不可为空'});
                        }
                    }else{
                        that.$message({type: 'error', message: '手机号码最少11位，不可大于50'});
                    }
                }else{
                    that.$message({type: 'error',message: '联系人不可为空，且长度不可大于50'});
                }
            }else{
                that.$message({type: 'error',message: '商户名称不能为空且长度不能大于50！'});
            }
        },
        updatesh(){
          if(this.thinsertorupid == 0){return;}
            let that = this;
            this.$refs.addModel.putData();//调动addModelBD.vue里面的putData事件
            let shmc = this.$refs.addModel.shmcVal;
            let lxr = this.$refs.addModel.lxrVal;
            let sjhm = this.$refs.addModel.sjhmVal;
            let logo = this.$refs.addModel.file;
            let shid = this.thinsertorupid;
            //验证新增条件
            if(shmc.length <= 50 && shmc.length > 0){
                if( lxr.length <= 50 && lxr.length > 0){
                    if(sjhm.length <= 30 && sjhm.length >= 11){
                        if(logo != null && logo != ""){
                            //实例化新增对象
                            let formData = new FormData();
                            formData.append('shmc', shmc);
                            formData.append('lxr', lxr);
                            formData.append('sjhm', sjhm);
                            formData.append('file', logo);
                            formData.append('shid', shid);
                            //设置请求头部
                            let config = {
                                headers: {
                                    'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()
                                }
                            }
                            //开始文件及新增条件上传
                            this.$axios.post('/api/MerchantController/updatemerchant', formData, config).then(function (res) {
                                if(res != null && res.data.success == true){
                                    //修改成功，刷新表格
                                    that.getFaultInfoByComId();
                                    that.thinsertorupid = 0;
                                    that.thinsertorup = 1;
                                    that.$message({type: 'success', message: res.data.message});
                                }else{
                                    that.$message({type: 'error', message: res.data.message});
                                }
                            });
                        }else{
                            that.$message({type: 'error', message: '商户logo不可为空'});
                        }
                    }else{
                        that.$message({type: 'error', message: '手机号码最少11位，不可大于50'});
                    }
                }else{
                    that.$message({type: 'error',message: '联系人不可为空，且长度不可大于50'});
                }
            }else{
                that.$message({type: 'error',message: '商户名称不能为空且长度不能大于50！'});
            }
        }
    },

    watch: {}

  }

</script>
<style lang='less' scoped>
  .cultureDiv {
    padding: 0 20px 20px;
    max-width: calc(100vw - 300px);
    min-height: calc(100vh - 57px);
    section {
      width: 100%;
      height: 87vh;
      padding-top: 18px;
      .sec_div{
        width:100%;
        height:100%;
        border:1px solid #ccc;
        box-shadow: 0 0 3px #cacaca;
      }
      .template_div {
        h4{
          height: 4.3vh;
          padding-top: .4vh;
          span{
            border-left:4px solid #1dc9ff;
            padding-left: 10px;
            font-size: 16px;
            font-weight: 600;
            float: left;
            padding-top: .6vh;
          }
          .souso{
            float:left;
            width: 12.7vw;
            margin-left:10px;
            padding-top: 0.3vh;
          }
          .moreCheck{
            float:right;
            .ivu-btn{
              margin-right:18px;
              color:#fff;
              &:nth-child(1){
                background:#008cca;
              }
              &:nth-child(2){
                background:#00bb58;
              }
              &:nth-child(3){
                background:#ff0000;
              }
            }
          }
        }
        .temp_con{
          height:95%;
          padding:0 10px;
          .table{
            border-top:1px solid #ccc;
          }
        }
      }
    }
  }
  .el-pagination {
      margin-top: 10px;
      float: right;
      clear: both;
  }
</style>