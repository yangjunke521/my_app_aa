<template>
    <div class="cultureDiv">
        <Breadcrumb style="border-bottom:1px solid #ccc;font-size:18px;font-weight:100;padding:8px 0;">
            <BreadcrumbItem>通知公告</BreadcrumbItem>
        </Breadcrumb>
        <Content>
            <section>
                <div class="sec_div">
                    <div class="template_div">
                        <h4>
                            <span>标题</span>
                            <div class="souso sousoT">
                                <Input v-model="title" placeholder="请输入"/>
                            </div>
                            <span class="spanT">内容</span>
                            <div class="souso">
                                <Input v-model="content" placeholder="请输入"/>
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
                                        :row-key="getRowKey"
                                        style="width: 100%">
                                    <el-table-column label="" width="35" center>
                                        <template slot-scope="scope">
                                            <el-radio
                                                    v-model="radioSelectedNid"
                                                    :label="scope.row.nid"
                                                    @click.native.prevent="radioClick(scope.row.nid)">
                                            </el-radio>
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="center" prop="title" label="标题"></el-table-column>
                                    <el-table-column align="center" prop="timeScope" label="时间范围"></el-table-column>
                                    <el-table-column align="center" prop="content" label="内容" :show-overflow-tooltip="true"></el-table-column>
                                    <el-table-column align="center" prop="time" label="添加时间"></el-table-column>
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
                            id="addNoticeModal"
                            class-name='addModelBD'
                            v-model="showModel"
                            :closable='false'
                            :title="modalTitle">
                        <NoticeModal ref="NoticeModel"></NoticeModal>
                        <div slot="footer">
                            <Button type="text" size="large" @click="clickCancel">取消</Button>
                            <Button type="primary" size="large" @click="clickOk">确定</Button>
                        </div>
                    </Modal>
                </div>
            </section>
        </Content>
    </div>
</template>

<script>
    import NoticeModal from '@/components/model/NoticeModal';

    export default {
        name: '',
        props: [],//通知公告
        data() {
            return {
                title: '',  // 标题搜索框
                content: '',    // 内容搜索框
                total: 0,
                currentPage: 1,
                pageSize: 12,
                loading: false,
                disablePagination: false,
                tableData: [],
                showModel: false,
                noticeId: '',
                noticeTitle: '',//标题
                noticeContent: '',//内容
                startTime: '',// 开始时间
                endTime: '',// 结束时间
                radioSelectedNid:'',    //表格选择的行ID
                updateMaskLoading:'', //加载控件的实例
                submitType: 'insert', // insert 新增 update 修改
            };
        },

        components: {
            NoticeModal,
        },

        computed: {
            modalTitle() {
                if (this.submitType === 'insert') {
                    return '新增通知'
                } else {
                    return '修改通知'
                }
            }
        },

        beforeMount() {
        },

        mounted() {
            this.queryNoticeInfo();
        },

        methods: {
            queryNoticeInfo() {
                const that = this;
                this.loading = true;
                this.disablePagination = true;
                $.ajax('/api/notice/notice_info', {
                    data: {
                        title: that.title,
                        content: that.content,
                        now: that.currentPage,
                        size: that.pageSize,
                    },
                    dataType: 'json',
                    success(res) {
                        if (res.success) {
                            that.total = res.total;
                            that.tableData = res.data;
                        }
                    },
                    complete() {
                        that.loading = false;
                        that.disablePagination = false;
                    },
                });
            },
            queryOneNoticeInfo(complete) {
                const that = this;
                $.ajax('/api/notice/notice_info', {
                    data: {
                        nid: that.radioSelectedNid,
                        now: 1,
                        size: 1,
                    },
                    dataType: 'json',
                    success(res) {
                        if (res.success) {
                            if (res.data && res.data.length) {
                                const row = res.data[0];
                                that.$refs.NoticeModel.noticeId = row.nid;
                                that.$refs.NoticeModel.noticeTitle = row.title;
                                that.$refs.NoticeModel.noticeContent = row.content;
                                const time = row.timeScope.trim().split('-');
                                if (time && time.length) {
                                    that.$refs.NoticeModel.dateValue = time;
                                }
                            }
                        }
                    },
                    complete() {
                        complete();
                    },
                });
            },
            search() {//搜索框点击事件
                this.queryNoticeInfo();
            },
            addNewNotice() {
                const that = this;
                $.ajax('/api/notice/new_notice', {
                    data: {
                        title: that.noticeTitle,
                        content: that.noticeContent,
                        startTime: that.startTime,
                        endTime: that.endTime,
                    },
                    dataType: 'json',
                    success(res) {
                        if (res.success) {
                            that.$message({
                                type: 'success',
                                message: '添加成功!'
                            });
                        } else {
                            that.$message({
                                type: 'error',
                                message: '添加失败!'
                            });
                        }
                    },
                    complete() {
                        that.queryNoticeInfo();
                    },
                });
            },
            updateNotice() {
                const that = this;
                $.ajax('/api/notice/update_notice', {
                    data: {
                        nid: that.noticeId,
                        title: that.noticeTitle,
                        content: that.noticeContent,
                        startTime: that.startTime,
                        endTime: that.endTime,
                    },
                    dataType: 'json',
                    success(res) {
                        if (res.success) {
                            that.$message({
                                type: 'success',
                                message: '修改成功!'
                            });
                        } else {
                            that.$message({
                                type: 'error',
                                message: '修改失败!'
                            });
                        }
                    },
                    complete() {
                        that.queryNoticeInfo();
                        that.radioSelectedNid = ''
                    },
                });
            },
            deleteNotice() {
                const that = this;
                $.ajax('/api/notice/delete_notice', {
                    data: {
                        nid: that.radioSelectedNid,
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
                        that.queryNoticeInfo();
                        that.radioSelectedNid = ''
                    },
                });
            },
            addData() {//点击添加事件
                this.submitType = 'insert';
                this.$refs.NoticeModel.resetForm();
                this.showModel = true;
            },
            editData() {//点击修改事件
                this.submitType = 'update';
                if (this.radioSelectedNid) {
                    this.showModel = true;
                    // 点击编辑按钮加载一条通知，同时使用加载动画作为过渡效果
                    this.openUpdateMask();
                    this.queryOneNoticeInfo(() => {
                        this.closeUpdateMask();
                    });
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请选择一条数据!',
                        duration: 900,
                    });
                }
            },
            deleteData() {//点击删除事件
                const that = this;
                if (this.radioSelectedNid) {
                    this.$confirm('是否删除选中项?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'info'
                    }).then(() => {
                        that.deleteNotice();
                    }).catch(() => {
                    });
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请选择一条数据!',
                        duration: 900,
                    });
                }
            },
            // 弹框确定按钮点击
            clickOk() {
                const isValidate = this.$refs.NoticeModel.validateForm();
                if (isValidate) {
                    this.noticeTitle = this.$refs.NoticeModel.noticeTitle;
                    this.noticeContent = this.$refs.NoticeModel.noticeContent;
                    this.startTime = this.$refs.NoticeModel.startTime;
                    this.endTime = this.$refs.NoticeModel.endTime;
                    if (this.submitType === 'insert') {
                        this.addNewNotice();
                    } else {
                        this.noticeId = this.$refs.NoticeModel.noticeId;
                        this.updateNotice();
                    }
                    this.showModel = false;
                }
            },
            // 弹框取消按钮点击
            clickCancel() {
                this.showModel = false;
            },
            currentPageChange(index) {
                this.currentPage = index;
                this.queryNoticeInfo();
            },
            getRowKey(row) {
                return row.nId;
            },
            radioClick(nid) {
                nid === this.radioSelectedNid ? this.radioSelectedNid = '' : this.radioSelectedNid = nid;
            },
            // 打开加载控件
            openUpdateMask() {
                this.updateMaskLoading = this.$loading({
                    lock: true,
                    target: "#addNoticeModal .ivu-modal-content",
                    text: '正在加载',
                    spinner: 'el-icon-loading',
                    background: 'rgba(255, 255, 255, 0.6)'
                });
            },
            // 关闭加载控件
            closeUpdateMask() {
                this.updateMaskLoading.close();
                this.updateMaskLoading = '';
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

                    .spanT {
                        border-left: 0;
                    }

                    .souso {
                        float: left;
                        width: 12.7vw;
                        margin-left: 10px;
                        padding-top: 0.3vh;
                    }

                    .sousoT {
                        width: 8.9vw;
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
                                background: #00bb58;
                            }

                            &:nth-child(3) {
                                background: #ff0000;
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

        .el-pagination {
            margin-top: 10px;
            float: right;
            clear: both;
        }
    }
</style>