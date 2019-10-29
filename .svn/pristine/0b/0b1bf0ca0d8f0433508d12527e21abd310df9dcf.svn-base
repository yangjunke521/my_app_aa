<template>
    <div class="cultureDiv">
        <Breadcrumb style="border-bottom:1px solid #ccc;font-size:18px;font-weight:100;padding:8px 0;">
            <BreadcrumbItem>基础数据<span style="padding:0 10px;">></span>调价列表</BreadcrumbItem>
        </Breadcrumb>
        <Content>
            <section>
                <div class="sec_div">
                    <div class="template_div">
                        <h4>
                            <span>调价列表</span>
                            <div class="souso">
                                <Input v-model="pchVal" placeholder="请输入"/>
                                <Button size="small" @click="search">
                                    <Icon type="ios-search"/>
                                </Button>
                            </div>
                            <div class="moreCheck">
                                <Button @click="addData">添加</Button>
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
                                    <el-table-column align="center" prop="oldPriceName" label="旧收费项目"></el-table-column>
                                    <el-table-column align="center" prop="newPriceName" label="新收费项目"></el-table-column>
                                    <el-table-column align="center" prop="adjustDate" label="调整时间"></el-table-column>
                                    <el-table-column align="center" prop="isAdjust" label="是否已调整">
                                        <template slot-scope="stateScope">
                                            <el-tag
                                                    :type="stateScope.row.isAdjust === '是' ? 'success' : 'danger'"
                                                    disable-transitions>{{stateScope.row.isAdjust}}
                                            </el-tag>
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="center" prop="createName" label="创建人"></el-table-column>
                                    <el-table-column align="center" prop="createDate" label="创建时间"></el-table-column>
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
                <Modal
                        id="addPCModal"
                        class-name='addModelBD'
                        v-model="showModal"
                        :closable="modalCloseable"
                        title="新增调价信息">
                    <UnifiedModal
                            ref="UnifiedModal"
                            @oldPChange="oldPChange">
                    </UnifiedModal>
                    <div slot="footer">
                        <Button type="text" size="large" @click="clickCancel">取消</Button>
                        <Button type="primary" size="large" @click="clickOk">确定</Button>
                    </div>
                </Modal>
            </section>
        </Content>
    </div>
</template>

<script>
    import UnifiedModal from '@/components/model/UnifiedModal';

    export default {
        name: '',
        props: ['Company'],//调价列表
        data() {
            return {
                pchVal: '',//商户名
                loading: false,
                tableData: [],
                currentPage: 1,
                total: 0,
                pageSize: 10,
                disablePagination: false,
                showModal: false,
                modalCloseable: false,
                selectedData: [], //表格选中项
            };
        },

        components: {
            UnifiedModal
        },

        computed: {},

        beforeMount() {
        },

        mounted() {
            this.queryTableInfo();
            this.queryOldPriceList();
        },

        methods: {
            queryTableInfo() {
                const that = this;
                this.loading = true;
                this.disablePagination = true;
                $.ajax('/api/unified/pchange_info', {
                    data: {
                        chname: that.pchVal,
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
            // 选择旧收费项目列表后，加载新收费项目列表
            oldPChange(data) {
                if (data) {
                    this.queryNewPriceList(data);
                    this.$refs.UnifiedModal.newPriceSelDisabled = false;
                } else {
                    this.$refs.UnifiedModal.newPriceData = [];
                    this.$refs.UnifiedModal.newPriceSelDisabled = true;
                    this.$refs.UnifiedModal.$refs.newSelector.clearSingleSelect();
                }
            },
            //  查询旧收费项目列表
            queryOldPriceList() {
                const that = this;
                $.ajax('/api/price/getall', {
                    data: {
                    },
                    dataType: 'json',
                    success: function(res) {
                        if (res.success) {
                            that.$refs.UnifiedModal.oldPriceData = res.data;
                        }
                    },
                    complete: function() {
                    }
                });
            },
            // 查询新收费项目列表，不包括旧收费项目列表
            queryNewPriceList(exId) {
                const that = this;
                $.ajax('/api/price/getall', {
                    data: {
                        excludeId: exId,
                    },
                    dataType: 'json',
                    success: function(res) {
                        if (res.success) {
                            that.$refs.UnifiedModal.newPriceData = res.data;
                        }
                    },
                    complete: function() {
                    }
                });
            },
            clickOk() {
                const that = this;
                if (this.$refs.UnifiedModal.validateForm()) {
                    $.ajax('/api/unified/addpc', {
                        data: {
                            oldPriceId: that.$refs.UnifiedModal.oldPriceId,
                            newPriceId: that.$refs.UnifiedModal.newPriceId,
                            adjustDate: that.$refs.UnifiedModal.adjustDate,
                        },
                        dataType: 'json',
                        success: function(res) {
                            if (res.success) {
                                that.$message({
                                    type: 'success',
                                    message: '调价信息添加成功!'
                                });
                            } else {
                                console.error(`调价信息添加失败, oldPriceId: ${that.$refs.UnifiedModal.oldPriceId}, newPriceId: ${that.$refs.UnifiedModal.newPriceId}, adjustDate: ${that.$refs.UnifiedModal.adjustDate}`)
                            }
                        },
                        complete: function() {
                            that.showModal = false;
                            that.queryTableInfo();
                        }
                    });
                }
            },
            clickCancel() {
                this.showModal = false;
            },
            search() {//搜索框点击事件
                this.queryTableInfo();
            },
            addData() {//点击添加事件
                this.showModal = true;
                this.$refs.UnifiedModal.resetForm();
            },
            deleteData() {//点击删除事件
                if (this.handleSelectionChangedata != null && this.handleSelectionChangedata.length == 1){
                const that = this;
                const pcIds = [];
                this.selectedData.forEach((item) => {
                    pcIds.push(item.id);
                });
                if (pcIds.length > 0) {
                    this.$confirm('是否删除选中项?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'info'
                    }).then(() => {
                        $.ajax('/api/unified/deletepc', {
                            data: {
                                pcIds: pcIds.join(',')
                            },
                            dataType: 'json',
                            success(res) {
                                if (res.success) {
                                    that.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                                }
                            },
                            complete() {
                                that.queryTableInfo();
                            }
                        });
                    }).catch(() => {
                    });
                }
                }else{
                    this.$message({type: 'info', message: "请选择一条信息操作！"});
                }
            },
            handleSelectionChange(val) {
                this.selectedData = val;
            },
            currentPageChange(now) {
                this.currentPage = now;
                this.queryTableInfo();
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
                                background: #008cca;
                            }

                            &:nth-child(2) {
                                background: #ff0000;
                            }
                        }
                    }
                }

                .temp_con {
                    height: 95%;
                    padding: 0 10px;

                    .table {
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