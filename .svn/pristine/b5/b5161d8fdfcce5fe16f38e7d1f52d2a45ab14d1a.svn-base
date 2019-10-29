<template>
    <div class="cultureDiv">
        <Breadcrumb style="border-bottom:1px solid #ccc;font-size:18px;font-weight:100;padding:8px 0;">
            <BreadcrumbItem>基础数据<span style="padding:0 10px;">></span>断合闸信息</BreadcrumbItem>
        </Breadcrumb>
        <Content>
            <section>
                <div class="sec_div">
                    <div class="template_div">
                        <h4>
                            <span>表具名称</span>
                            <div class="souso sousoT">
                                <Input v-model="bjmcVal" placeholder="请输入"/>
                            </div>
                            <span class="spanT">时间范围</span>
                            <div class="souso">
                                <CDate @changeDate='startData' :placeholder='"请输入开始日期"'></CDate>
                                <a href="javascript:;" style="padding: 0 .4vw;">-</a>
                                <CDate @changeDate='endData' :placeholder='"请输入结束日期"'></CDate>
                                <Button size="small" @click="search" style="margin-left:10px;">
                                    <Icon type="ios-search"/>
                                </Button>
                            </div>
                        </h4>
                        <div class="temp_con">
                            <div class="table">
                                <el-table
                                        border
                                        v-loading="loading"
                                        :data="tableData"
                                        style="width: 100%">
                                    <el-table-column
                                            type="selection">
                                    </el-table-column>
                                    <el-table-column align="center" prop="gateControlName" label="闸控名称"></el-table-column>
                                    <el-table-column align="center" prop="meterName" label="表具名称"></el-table-column>
                                    <el-table-column align="center" prop="czr" label="操作人"></el-table-column>
                                    <el-table-column align="center" prop="time" label="操作时间"></el-table-column>
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
        </Content>
    </div>
</template>

<script>
    import CDate from '@/components/comIview/cdate'

    export default {
        name: '',
        props: ['gate'],//断合闸信息
        data() {
            return {
                bjmcVal: '',//表具名称
                startTime: '',//开始时间
                endTime: '',//结束时间
                total: 0,
                currentPage: 1,
                pageSize: 12,
                loading: false,
                disablePagination: false,
                tableData: [],
            };
        },

        components: {
            CDate
        },

        computed: {},

        beforeMount() {
        },

        mounted() {
            this.queryGateControlInfo();
        },

        methods: {
            queryGateControlInfo() {
                const that = this;
                that.loading = true;
                that.disablePagination = true;
                $.ajax('/api/gate/gate_info', {
                    data: {
                        mName: that.bjmcVal,
                        startTime: that.startTime,
                        endTime: that.endTime,
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
                        that.disablePagination = false;
                    }
                });
            },
            search() {//搜索框点击事件
                if (this.startTime && this.endTime) {
                    const s = new Date(this.startTime).getTime();
                    const e = new Date(this.endTime).getTime();
                    if (s > e) {
                        this.$message({
                            type: 'warning',
                            message: '开始不能大于结束时间!'
                        });
                        return;
                    }
                }
                this.queryGateControlInfo();
            },
            addData() {//点击添加事件

            },
            editData() {//点击修改事件

            },
            deleteData() {//点击删除事件

            },
            startData(data) {
                this.startTime = data.val;
            },
            endData(data) {
                this.endTime = data.val;
            },
            currentPageChange(currentPage) {
                this.currentPage = currentPage;
                this.queryGateControlInfo();
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
                        width: 20.5vw;
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