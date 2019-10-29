<template>
    <div class="cultureDiv">
        <Breadcrumb style="border-bottom:1px solid #ccc;font-size:18px;font-weight:100;padding:8px 0;">
            <BreadcrumbItem>告警管理<span style="padding:0 10px;">></span>故障信息</BreadcrumbItem>
        </Breadcrumb>
        <content>
            <section>
                <div class="sec_div">
                    <div class="template_div">
                        <h4>
                            <span>单位名称</span>
                            <div class="souso">
                                <Input v-model="dwmcVal" placeholder="请输入"/>
                                <Button size="small" @click="search">
                                    <Icon type="ios-search"/>
                                </Button>
                            </div>
                            <div class="moreCheck">
                                <Button @click="handleState">处理</Button>
                            </div>
                        </h4>
                        <div class="temp_con">
                            <div class="table">
                                <el-table
                                        border
                                        v-loading="loading"
                                        :data="tableData"
                                        style="width: 100%"
                                        :row-key="getRowKey"
                                        @selection-change="handleSelectionChange">
                                    <el-table-column
                                            type="selection">
                                    </el-table-column>
                                    <el-table-column align="center" prop="companyName" label="单位名称"></el-table-column>
                                    <el-table-column align="center" prop="repTime" label="上报时间" width="180"></el-table-column>
                                    <el-table-column align="center" prop="faultContent" label="故障内容"></el-table-column>
                                    <el-table-column align="center" prop="image" label="图片">
                                        <template slot-scope="imageScope">
                                            <el-image style=" width: 50px; height: 50px;" :src="imageScope.row.image"></el-image>
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="center" prop="state" label="状态">
                                        <template slot-scope="stateScope">
                                            <el-tag
                                                    :type="stateScope.row.state === '已处理' ? 'success' : 'danger'"
                                                    disable-transitions>{{stateScope.row.state}}</el-tag>
                                        </template>
                                    </el-table-column>
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
                </div>
            </section>
        </content>
    </div>
</template>

<script>
    import $ from 'jquery';

    export default {
        name: '',
        props: ['fault'],//故障信息
        data() {
            return {
                dwmcVal: '',//单位名称
                total: 0,
                currentPage: 1,
                pageSize: 7,
                loading: true,
                disablePagination: false,
                tableData: [],
                selectedData: [],
            };
        },

        components: {
        },

        computed: {
        },

        beforeMount() {
        },

        mounted() {
            this.getFaultInfoByComId();
        },

        methods: {
            getFaultInfoByComId() {
                const that = this;
                this.loading = true;
                this.disablePagination = true;
                $.ajax('/api/fault/fault_info', {
                    data: {
                        cname: that.dwmcVal,
                        now: that.currentPage,
                        size: that.pageSize,
                    },
                    dataType: 'json',
                    success: function(res) {
                        that.total = res.total;
                        that.tableData = res.data;
                    },
                    complete: function() {
                        that.loading = false;
                        that.disablePagination = false  ;
                    }
                });
            },
            search() {//搜索框点击事件
                this.currentPage = 1;
                this.getFaultInfoByComId();
            },
            handleState() {//点击处理事件
                const that = this;
                const comIds = [];
                this.selectedData.forEach((item) => {
                    comIds.push(item.companyId);
                });
                if (comIds.length > 0) {
                    this.$confirm('是否修改选中项为已处理?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'info'
                    }).then(() => {
                        $.ajax('/api/fault/handle_state', {
                            data: {
                                comIds: comIds.join(',')
                            },
                            dataType: 'json',
                            success(res) {
                                if (res.success) {
                                    that.$message({
                                        type: 'success',
                                        message: '处理成功!'
                                    });
                                }
                                that.getFaultInfoByComId();
                            }
                        });
                    }).catch(() => {
                    });
                }
            },
            currentPageChange(currentPage) {
                this.currentPage = currentPage;
                this.getFaultInfoByComId();
            },
            // 指定一个key标识这一行的数据
            getRowKey (row) {
                return row.companyId;
            },
            // val表示选中的表格行数据
            handleSelectionChange (val) {
                this.selectedData = val;
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

            .sec_div {
                width: 100%;
                height: 100%;
                border: 1px solid #ccc;
                box-shadow: 0 0 3px #cacaca;
            }

            .template_div {
                h4 {
                    height: 4.3vh;
                    padding-top: .4vh;

                    span {
                        border-left: 4px solid #1dc9ff;
                        padding-left: 10px;
                        font-size: 16px;
                        font-weight: 600;
                        float: left;
                        padding-top: .6vh;
                    }

                    .souso {
                        float: left;
                        width: 12.7vw;
                        margin-left: 10px;
                        padding-top: 0.3vh;
                    }

                    .moreCheck {
                        float: right;

                        .ivu-btn {
                            margin-right: 18px;
                            color: #fff;

                            &:nth-child(1) {
                                background: #00bb58;
                            }
                        }
                    }
                }

                .temp_con {
                    height: 95%;
                    padding: 0 10px;

                    .table {
                        padding-top: 8px;
                        border-top: 1px solid #ccc;
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