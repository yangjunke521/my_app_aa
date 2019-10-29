<template>
   <div class="cultureDiv">
    <Breadcrumb style="border-bottom:1px solid #ccc;font-size:18px;font-weight:100;padding:8px 0;">
      <BreadcrumbItem>基础数据<span style="padding:0 10px;">></span>集中器管理</BreadcrumbItem>
    </Breadcrumb>
    <Content>
      <section>
        <div class="sec_div">
           <div class="template_div">
             <h4>
               <span>集中器名称</span>
               <div class="souso">
                 <Input v-model="jzqVal" placeholder="请输入"/>
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
                       <el-table-column align="center" prop="cName" label="集中器名称"></el-table-column>
                       <el-table-column align="center" prop="cIp" label="集中器IP地址"></el-table-column>
                       <el-table-column align="center" prop="cAddressA1" label="行政区域码"></el-table-column>
                       <el-table-column align="center" prop="cAddressA2" label="终端地址"></el-table-column>
                       <el-table-column align="center" prop="cAddressPort" label="通讯端口" ></el-table-column>
                       <el-table-column align="center" prop="cLasttime" label="最后登陆时间" width="180"></el-table-column>
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
                    class-name='addModel'
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
    import addModel from '@/components/model/addModelJzq';
    import $ from 'jquery';
  export default {
    name:'',
    props:['Company'],//集中器管理
    data () {
      return {
        jzqVal:'',//集中器名称
          addModel:false,//弹框状态
          title:"新增集中器",
          //表格使用参数
          total: 0,//每页默认显示
          currentPage: 1,
          pageSizse: 10,
          loading: true,
          disablePagination: false,
          tableData: [],
          handleSelectionChangedata:[],
          thinsertorup : 1,
          thinsertorupid : 0,
          cId:'',
      };
    },

    components: {addModel},

    computed: {},

    beforeMount() {},

    mounted() {
        this.selectjzq(null);
    },

    methods: {
        selectjzq(){
            const that = this;
            this.loading = true;
            this.disablePagination = true;
            $.ajax({
                    url: '/api/ConcentratorController/selectjqz',     // 请求地址, 就是你的控制器, 如 test.com/home/index/index
                    data: {
                       cName: that.jzqVal,
                        now: that.currentPage,
                        size: that.pageSizse,
                    },   // 需要传送的参数
                    type: 'POST',   // 请求方式
                    dataType: 'json', // 返回数据的格式, 通常为JSON
                    success: function (result) {
                            that.total = result.total;
                            that.tableData = result.data;

                    },
                    complete: function() {
                    that.loading = false;
                    that.disablePagination = false;
                    }
                });
        },
        addjzq(){
            //if(this.thinsertorupid == 0){return;}
            let that=this;
            this.$refs.addModel.putData();//调动addModelBD.vue里面的putData事件
            let cName = this.$refs.addModel.jzqVal;
            let cIp = this.$refs.addModel.ipVal;
            let cAddressA1 = this.$refs.addModel.xzqymVal;
            let cAddressA2 = this.$refs.addModel.zddzVal;
            let cAddressPort = this.$refs.addModel.txdkVal;
            let rep = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
            //新增条件
            if(cName.length <= 50 && cName.length > 0){
                if(cIp.length < 16 && cIp.length > 14  && cIp !=null || cIp !=''){
                    if(rep.test(cIp)){

                    if(cAddressA1.length <= 50 && cAddressA1.length > 0){
                        if(cAddressA2.length <= 50 && cAddressA2.length > 0){
                            if(cAddressPort.length <= 10 && cAddressPort.length > 0){
                                //实例化新曾对象
                                let formData = new FormData();
                                formData.append('cName', cName);
                                formData.append('cIp', cIp);
                                formData.append('cAddressA1', cAddressA1);
                                formData.append('cAddressA2', cAddressA2);
                                formData.append('cAddressPort', cAddressPort);
                                //设置请求头部
                                let config = {
                                    headers: {
                                        'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()
                                    }
                                }
                                //开始文件及新增条件上传
                                this.$axios.post('/api/ConcentratorController/addjzq', formData, config).then(function (res) {
                                    if(res != null && res.data.success == true){
                                        //新曾成功，刷新表格
                                        that.selectjzq();
                                        that.thinsertorupid = 0;
                                        that.thinsertorup = 1;
                                        that.$message({type: 'success', message: res.data.message});
                                    }else{
                                        that.$message({type: 'error', message: res.data.message});
                                    }
                                });
                            }else{
                                that.$message({type: 'error', message: '通讯端口不可为空'});
                            }
                        }else{
                            that.$message({type: 'error', message: '终端地址不能为空，不可大于50'});
                        }
                    }else{
                        that.$message({type: 'error',message: '行政区域码不可为空，且长度不可大于50'});
                    }

                    }else { that.$message({type: 'error',message: 'IP地址不合法'});}
                }else{
                    that.$message({type: 'error',message: 'IP地址不能为空，且不能大于15'});
                }
            }else{
                that.$message({type: 'error',message: '集中器名称不能为空，且长度不可大于50'});
            }
        },
        updatejzq(){
            if(this.thinsertorupid == 0){return;}
            let that=this;
            this.$refs.addModel.putData();//调动addModelBD.vue里面的putData事件
            let cName = this.$refs.addModel.jzqVal;
            let cIp = this.$refs.addModel.ipVal;
            let cAddressA1 = this.$refs.addModel.xzqymVal;
            let cAddressA2 = this.$refs.addModel.zddzVal;
            let cAddressPort = this.$refs.addModel.txdkVal;
            let rep = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
            let cId = this.thinsertorupid;
            //修改新增条件
            if(cName.length <= 50 && cName.length > 0){
                if(cIp.length < 16 && cIp.length > 14  && cIp !=null || cIp !=''){
                    if(rep.test(cIp)){

                        if(cAddressA1.length <= 50 && cAddressA1.length > 0){
                        if(cAddressA2.length <= 50 && cAddressA2.length > 0){
                            if(cAddressPort.length <= 10 && cAddressPort.length > 0){
                                //实例化修改对象
                                let formData = new FormData();
                                formData.append('cName', cName);
                                formData.append('cIp', cIp);
                                formData.append('cAddressA1', cAddressA1);
                                formData.append('cAddressA2', cAddressA2);
                                formData.append('cAddressPort', cAddressPort);
                                formData.append('cId', cId);
                                //设置请求头部
                                let config = {
                                    headers: {
                                        'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()
                                    }
                                }
                                //开始文件及新增条件上传
                                this.$axios.post('/api/ConcentratorController/updatejzq', formData, config).then(function (res) {
                                    if(res != null && res.data.success == true){
                                        //修改成功，刷新表格
                                        that.selectjzq();
                                        that.thinsertorupid = 0;
                                        that.thinsertorup = 1;
                                        that.$message({type: 'success', message: res.data.message});
                                    }else{
                                        that.$message({type: 'error', message: res.data.message});
                                    }
                                });
                            }else{
                                that.$message({type: 'error', message: '通讯端口不可为空'});
                            }
                        }else{
                            that.$message({type: 'error', message: '终端地址不能为空，不可大于50'});
                        }
                    }else{
                        that.$message({type: 'error',message: '行政区域码不可为空，且长度不可大于50'});
                    }
                    }else { that.$message({type: 'error',message: 'IP地址不合法'});}
                }else{
                    that.$message({type: 'error',message: 'IP地址不能为空'});
                }

            }else{
                that.$message({type: 'error',message: '集中器名称不能为空'});
            }


        },
        addData(){//点击添加事件
                this.$refs.addModel.jzqVal = "",
                this.$refs.addModel.jzqipVal="",
                this.$refs.addModel.xzqymVal="",
                this.$refs.addModel.zddzVal="",
                this.$refs.addModel.txdkVal="",
                this.thinsertorup = 1;
                this.thinsertorupid = 0;
                this.addModel=true;

        },
        deletejzq(){
            const that = this;
            let cId = this.thinsertorupid;
            this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
            $.ajax({
                url: '/api/ConcentratorController/selectbj',     // 请求地址, 就是你的控制器, 如 test.com/home/index/index
                data: {
                    cId:cId,
                },   // 需要传送的参数
                type: 'POST',   // 请求方式
                dataType: 'json', // 返回数据的格式, 通常为JSON
                success: function (result) {
                    if(result.success){
                        that.$message({type: 'success', message: result.message});
                        that.selectjzq();
                    }else{
                        that.$message({type: 'error', message: result.message});
                    }
                },
            });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消删除'
                });
            });
        },
        search(){//搜索框点击事件
            this.selectjzq(this.jzqVal);
        },
        // 指定一个key标识这一行的数据
        getRowKey (row) {
            return row.shid;
        },
        // val表示选中的表格行数据
        handleSelectionChange (val) {
            this.handleSelectionChangedata = val;
        },
        currentPageChange(currentPage) {
            this.currentPage = currentPage;
            this.selectjzq();
        },
        clickTrue(){//新增弹框点击确定事件
            if(this.thinsertorup == 1){
                this.addjzq();
            }else{
                this.updatejzq();
            }
        },
        cancel(){//取消事件
            this.addModel=false;
            this.$refs.addModel.shmcVal = "";
            this.$refs.addModel.lxrVal  = "";
            this.$refs.addModel.sjhmVal = "";
            this.$refs.addModel.file = "";
        },
      editData(){//点击修改事件
          if (this.handleSelectionChangedata != null && this.handleSelectionChangedata.length == 1){
          const comIds = [];
          this.handleSelectionChangedata.forEach((item) => {
              comIds.push(item);
          });
          this.title="修改集中器";
          if(comIds.length>0){
              this.$refs.addModel.jzqVal = comIds[0].cName;
              this.$refs.addModel.ipVal  = comIds[0].cIp;
              this.$refs.addModel.xzqymVal = comIds[0].cAddressA1;
              this.$refs.addModel.zddzVal = comIds[0].cAddressA2;
              this.$refs.addModel.txdkVal=comIds[0].cAddressPort;
              this.thinsertorupid = comIds[0].cId;
              this.thinsertorup = 2;
              this.addModel=true;

          }
          }else{
              this.$message({type: 'info', message: "请选择一条信息操作！"});
          }

      },

      deleteData(){//点击删除事件
          if (this.handleSelectionChangedata != null && this.handleSelectionChangedata.length == 1){
          const comIds = [];
          this.handleSelectionChangedata.forEach((item) => {
              comIds.push(item);
          });
          this.addModel.title="修改集中器";
          if(comIds.length>0){
              this.thinsertorupid = comIds[0].cId;
              this.thinsertorup = 2;
              this.deletejzq();
          }
          }else{
              this.$message({type: 'info', message: "请选择一条信息操作！"});
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
    .spanT{
        border-left:0;
    }
    .souso{
        float:left;
        width: 12.7vw;
        margin-left:10px;
        padding-top: 0.3vh;
    }
    .sousoT{
        width: 8.9vw;
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