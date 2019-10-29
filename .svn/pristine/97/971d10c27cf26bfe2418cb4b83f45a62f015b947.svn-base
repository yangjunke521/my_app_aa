<template>
   <div class="cultureDiv">
    <Breadcrumb style="border-bottom:1px solid #ccc;font-size:18px;font-weight:100;padding:8px 0;">
      <BreadcrumbItem>基础数据<span style="padding:0 10px;">></span>表具回收站</BreadcrumbItem>
    </Breadcrumb>
    <Content>
      <section>
        <div class="sec_div">
           <div class="template_div">
             <h4>
               <span>表计编号</span>
               <div class="souso sousoT">
                 <Input v-model="bjbhVal" placeholder="请输入"/>
               </div>
               <span class="spanT">商户名称</span>
               <div class="souso">
                 <Input v-model="dwmVal" placeholder="请输入"/>
                 <Button size="small" @click="search"><Icon type="ios-search" /></Button>
               </div>
               <div class="moreCheck">
                  <Button @click="editData">恢复</Button>
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
                       <el-table-column align="center" prop="mno" label="表具编号"></el-table-column>
                       <el-table-column align="center" prop="mname" label="表具名称"></el-table-column>
                       <el-table-column align="center" prop="mreadtype" label="抄表方式"></el-table-column>
                       <el-table-column align="center" prop="mtype" label="表具类型"></el-table-column>
                       <el-table-column align="center" prop="mbl" label="倍率" ></el-table-column>
                       <el-table-column align="center" prop="mazwz" label="安装位置" ></el-table-column>
                       <el-table-column align="center" prop="cname" label="商户名称" ></el-table-column>
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
    props:['Company'],//表具回收站
    data () {
      return {
        bjbhVal:'',//表计编号
        dwmVal:'',//单位名
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
        this.selecthsz();
    },

    methods: {
        selecthsz(){
            const that = this;
            this.loading = true;
            this.disablePagination = true;
            $.ajax({
                url: '/api/RevoceryController/selecthsz',     // 请求地址, 就是你的控制器, 如 test.com/home/index/index
                data: {
                    cName: that.dwmVal,
                    now: that.currentPage,
                    size: that.pageSizse,
                    mNo:that.bjbhVal
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
        updatehf(mno){
            const mdelete=2;
            this.disablePagination = true;
            const that =this;
            this.$confirm('是否恢复?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
            $.ajax({
                url: '/api/RevoceryController/updatehf',     // 请求地址, 就是你的控制器, 如 test.com/home/index/index
                data: {
                    mdelete:mdelete,
                    mNo:mno,
                },   // 需要传送的参数
                type: 'POST',   // 请求方式
                dataType: 'json', // 返回数据的格式, 通常为JSON
                success: function (result) {
                    if (result.success) {
                        that.$message({
                            type: 'success',
                            message: '恢复成功!'
                        });
                }
                   that.selecthsz();
                },
            });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消恢复'
            });
            });
        },
        deletebj(mno){
            this.disablePagination = true;
            const that =this;
            this.$confirm('是否删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                $.ajax({
                    url: '/api/RevoceryController/deletebj',     // 请求地址, 就是你的控制器, 如 test.com/home/index/index
                    data: {
                        mNo:mno,
                    },   // 需要传送的参数
                    type: 'POST',   // 请求方式
                    dataType: 'json', // 返回数据的格式, 通常为JSON
                    success: function (result) {
                        if (result.success) {
                            that.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }
                        that.selecthsz();
                    }
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消删除'
                });
            });
        },
      search(){//搜索框点击事件
        this.selecthsz(this.dwmVal);
      },

      editData(){//点击恢复事件
          const comIds = [];
          this.handleSelectionChangedata.forEach((item) => {
              comIds.push(item);
          });
          if(comIds.length>0){
              const mno= this.tableData[this.thinsertorupid].mno;
              this.updatehf(mno);
          }
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
            this.selecthsz();
        },
      deleteData(){//点击删除事件
          if (this.handleSelectionChangedata != null && this.handleSelectionChangedata.length == 1){
          const comIds = [];
          this.handleSelectionChangedata.forEach((item) => {
              comIds.push(item);
          });
          if(comIds.length>0){
              const mno= this.tableData[this.thinsertorupid].mno;
              this.deletebj(mno);
          }
          }else{
              this.$message({type: 'info', message: "请选择一条信息操作！"});
          }
      },
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