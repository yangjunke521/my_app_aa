<template>
    <div class="cultureDiv">
        <Breadcrumb style="border-bottom:1px solid #ccc;font-size:18px;font-weight:100;padding:8px 0;">
            <BreadcrumbItem>基础数据<span style="padding:0 10px;">></span>单价管理</BreadcrumbItem>
        </Breadcrumb>
        <Content>
            <section>
                <div class="sec_div">
                    <div class="template_div">
                        <h4>
                            <span>费率名称</span>
                            <div class="souso sousoT">
                                <Input v-model="flmcVal" placeholder="请输入"/>
                            </div>
                            <span class="spanT">收费类别</span>
                            <div class="souso">
                                <Input v-model="sflbVal" placeholder="请输入"/>
                                <Button size="small" @click="search">
                                    <Icon type="ios-search"/>
                                </Button>
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
                                        style="width: 100%"
                                        @selection-change="handleSelectionChange">
                                    <el-table-column
                                            type="selection">
                                    </el-table-column>
                                    <el-table-column align="center" prop="pname" label="费率名称"></el-table-column>
                                    <el-table-column align="center" prop="pprice" label="单价"></el-table-column>
                                    <el-table-column align="center" prop="sflb" label="收费类别"></el-table-column>
                                    <el-table-column align="center" prop="puname" label="创建人"></el-table-column>
                                    <el-table-column align="center" prop="pcreatTime" label="创建时间"></el-table-column>
                                </el-table>
                                <el-pagination
                                        background
                                        @current-change="currentPageChange"
                                        layout="prev, pager, next"
                                        :current-page="currentPage"
                                        :total="total"
                                        :page-size="pageSize"
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
    import addModel from '@/components/model/addModelDj';
    import $ from 'jquery';
    export default {
        name: '',
        props: ['Company'],//单价管理
        data() {
            return {
                flmcVal: '',//费率名称
                sflbVal: '',//收费类别
                title:'',
                loading: false,
                addModel:false,//弹框状态
                tableData: [],
                currentPage: 1,
                total:0,   //总页数
                pageSize: 10,
                disablePagination: false,   //表格按钮禁用
                thinsertorup : 1,
                thinsertorupid : 0,
                handleSelectionChangedata:[],
                cId:'',
            };
        },

        components: {addModel},

        computed: {},

        beforeMount() {
        },

        mounted() {
            this.queryPage();
            this.xialakuang();
        },

        methods: {
            queryPage() {
                const that = this;
                this.loading = true;
                $.ajax('/api/price/pricelist', {
                    data: {
                        flmc: that.flmcVal,
                        sfmc:that.sflbVal,
                        now: that.currentPage,
                        size: that.pageSize,
                    },
                    dataType: 'json',
                    success: function(res) {
                        if (res.success) {
                            that.total = res.total;
                            that.tableData = res.data;
                        }
                    },
                    complete: function() {
                        that.loading = false;
                        that.disablePagination = false;
                    }
                });
            },
            xialakuang(){
                const that = this;
                $.ajax('/api/price/xialakuang', {
                    dataType: 'json',
                    success: function(res) {
                        if(res != null && res.success == true){
                            that.$nextTick(() => {
                                that.$refs.addModel.sflbVals = res.data.sflb;
                            });
                        }
                    }
                });
            },
            insertdj(){
                //if(this.thinsertorupid == 0){return;}
                let that=this;
                this.$refs.addModel.putData();//调动addModelBD.vue里面的putData事件
                let pname = this.$refs.addModel.pnameVal;
                let pprice = this.$refs.addModel.ppriceVal;
                let sflb = this.$refs.addModel.sflbVal;
                let puname = this.$refs.addModel.punameVal;
                let cId = this.thinsertorupid;
                //新增条件
                if(pname.length <= 10 && pname.length > 0){
                    if(pprice.length <= 20 && pprice.length > 0){
                        if(sflb.length <= 50 && sflb.length > 0){
                            if(puname.length <= 50 && puname.length > 0){
                                    //实例化新曾对象
                                    let formData = new FormData();
                                    formData.append('pName', pname);
                                    formData.append('pPrice', pprice);
                                    formData.append('pType', sflb);
                                    formData.append('pUname', puname);
                                    //设置请求头部
                                    let config = {
                                        headers: {
                                            'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()
                                        }
                                    }
                                    //开始文件及新增条件上传
                                    this.$axios.post('/api/price/insertdj', formData, config).then(function (res) {
                                        if(res != null && res.data.success == true){
                                            //新曾成功，刷新表格
                                            that.queryPage();
                                            that.thinsertorupid = 0;
                                            that.thinsertorup = 1;
                                            that.$message({type: 'success', message: res.data.message});
                                        }else{
                                            that.$message({type: 'error', message: res.data.message});
                                        }
                                    });
                            }else{
                                that.$message({type: 'error', message: '创建人不能为空'});
                            }
                        }else{
                            that.$message({type: 'error',message: '收费类别必须选择'});
                        }
                    }else{
                        that.$message({type: 'error',message: '单价不能为空'});
                    }
                }else{
                    that.$message({type: 'error',message: '费率名称不能为空'});
                }
            },
            updatedj(){
                let that=this;
                this.$refs.addModel.putData();//调动addModelBD.vue里面的putData事件
                let pname = this.$refs.addModel.pnameVal;
                let pprice = this.$refs.addModel.ppriceVal;
                let sflb = this.$refs.addModel.sflbVal;
                let pid = this.thinsertorupid;
                //修改条件
                if(pname.length <= 10 && pname.length > 0){
                    if(pprice.length <= 20 && pprice.length > 0){
                        if(sflb.length <= 50 && sflb.length > 0){
                                //实例化新曾对象
                                let formData = new FormData();
                                formData.append("pId",pid)
                                formData.append('pName', pname);
                                formData.append('pPrice', pprice);
                                formData.append('pType', sflb);
                                //设置请求头部
                                let config = {
                                    headers: {
                                        'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()
                                    }
                                }
                                //开始文件及新增条件上传
                                this.$axios.post('/api/price/updatedj', formData, config).then(function (res) {
                                    if(res != null && res.data.success == true){
                                        //新曾成功，刷新表格
                                        that.queryPage();
                                        that.thinsertorupid = 0;
                                        that.thinsertorup = 1;
                                        that.$message({type: 'success', message: res.data.message});
                                    }else{
                                        that.$message({type: 'error', message: res.data.message});
                                    }
                                });
                        }else{
                            that.$message({type: 'error',message: '收费类别必须选择'});
                        }
                    }else{
                        that.$message({type: 'error',message: '单价不能为空'});
                    }
                }else{
                    that.$message({type: 'error',message: '费率名称不能为空'});
                }
            },
            deletedj(){
                const that = this;
                let pId = this.thinsertorupid;
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    $.ajax({
                        url: '/api/price/deletedj',     // 请求地址, 就是你的控制器, 如 test.com/home/index/index
                        data: {
                            pId:pId,
                        },   // 需要传送的参数
                        type: 'POST',   // 请求方式
                        dataType: 'json', // 返回数据的格式, 通常为JSON
                        success: function (result) {
                            if(result.success){
                                that.$message({type: 'success', message: result.message});
                                that.queryPage();
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
            search() {//搜索框点击事件
                this.queryPage(this.flmcVal + this.sflbVal);
            },
            addData() {//点击添加事件
                this.title="新增单价";
                this.$refs.addModel.pnameVal = "",
                this.$refs.addModel.ppriceVal="",
                this.$refs.addModel.sflbVal="",
                this.$refs.addModel.punameVal="",
                this.thinsertorup = 1;
                this.thinsertorupid = 0;
                this.addModel=true;
            },
            clickTrue(){//新增弹框点击确定事件
                if(this.thinsertorup == 1){
                    this.insertdj();
                }else{
                    this.updatedj();
                }
            },
            // 指定一个key标识这一行的数据
            getRowKey (row) {
                return row.shid;
            },
            // val表示选中的表格行数据
            handleSelectionChange (val) { //表格点击事件
                this.handleSelectionChangedata = val;
            },
            currentPageChange(currentPage) {//当前选中页改变后触发
                this.currentPage = currentPage;
                this.queryPage();
            },
            cancel(){//取消事件
                this.addModel=false;
                this.$refs.addModel.pname = "";
                this.$refs.addModel.pprice  = "";
                this.$refs.addModel.sflb = "";
                this.$refs.addModel.puname = "";
            },
            editData() {//点击修改事件
                if (this.handleSelectionChangedata != null && this.handleSelectionChangedata.length == 1){
                const comIds = [];
                this.handleSelectionChangedata.forEach((item) => {
                    comIds.push(item);
                });
                this.title="修改单价";
                if(comIds.length>0){
                    this.$refs.addModel.pnameVal = comIds[0].pname;
                    this.$refs.addModel.ppriceVal  = comIds[0].pprice;
                    this.$refs.addModel.sflbVal = comIds[0].sflb;
                    this.$refs.addModel.punameVal=comIds[0].puname;
                    this.thinsertorupid = comIds[0].pid;
                    this.thinsertorup = 2;
                    this.addModel=true;
                }
                }else{
                    this.$message({type: 'info', message: "请选择一条信息操作！"});
                }
            },
            deleteData() {//点击删除事件
                if (this.handleSelectionChangedata != null && this.handleSelectionChangedata.length == 1){
                    const comIds = [];
                this.handleSelectionChangedata.forEach((item) => {
                    comIds.push(item);
                });
                if(comIds.length>0){
                    this.thinsertorupid = comIds[0].pid;
                    this.thinsertorup = 2;
                    this.deletedj();
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