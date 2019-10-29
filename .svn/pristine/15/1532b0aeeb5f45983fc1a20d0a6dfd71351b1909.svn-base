<template>
    <div class="cultureDiv">
        <Breadcrumb style="border-bottom:1px solid #ccc;font-size:18px;font-weight:100;padding:8px 0;">
            <BreadcrumbItem>报表管理</BreadcrumbItem>
        </Breadcrumb>
        <Content>
            <section>
                <div class="sec_div">
                    <div class="template_div">
                        <h4>
                            <span>单位表具管理</span>
                            <div class="moreCheck souso">
                                <Input v-model="dwmcVal" placeholder="请输入"/>
                                <Button size="small" @click="search">
                                    <Icon type="ios-search"/>
                                </Button>
                            </div>
                        </h4>
                        <div class="temp_con">
                            <div
                                    class="infinite-list-wrapper"
                                    v-infinite-scroll="loadCompanyMore"
                                    infinite-scroll-disabled="infiniteScrollDisabled"
                            >
                                <ul class="nav_con"
                                    v-if="companyData.length > 0"
                                >
                                    <li :class="{'navLiActive':index === companySelectedIndex}"
                                        v-for="(item, index) in companyData"
                                        :key="index"
                                        @click="navLiChange(index, item)">
                                        <p v-if="index !== companySelectedIndex">{{item.cname}}
                                            <span><img src="@/assets/image/nav_li.jpg"/></span></p>
                                        <div class="navDiv" v-else-if="index === companySelectedIndex">
                                            <div class="navDivL">
                                                <div class="img"><img :src="item.ipath"/></div>
                                            </div>
                                            <div class="navDivR">
                                                <h2>{{item.cname}}</h2>
                                            </div>
                                            <span class="navDivImg"><img src="@/assets/image/nav_li_active.jpg"/></span>
                                        </div>
                                    </li>
                                </ul>
                                <p class="infinite-list-footer" v-if="infiniteScrollLoading">加载中...</p>
                                <p class="infinite-list-footer" v-if="noMore">没有更多了</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sec_div">
                    <div class="template_div">
                        <h4>
                            <span style='float:left;'>报表月份</span>
                            <div class="souso sousoT">
                                <CDate
                                        :dateType="'month'"
                                        :format="'yyyy-MM'"
                                        @changeDate='monthTimeChange'
                                        placeholder=''
                                        :options='monthTimeOptions'
                                        :dateVal="monthTime"
                                ></CDate>
                            </div>
                            <span class="spanT" style="float:left;border:0;">日期范围</span>
                            <div class="souso">
                                <CDate
                                        @changeDate='startTimeChange'
                                        :dateType="'date'"
                                        :format="'yyyy-MM-dd'"
                                        placeholder=''
                                        :options='startTimeOptions'
                                        :dateVal="startTime"
                                        :disabled="hasSummary"
                                >
                                </CDate>
                                <a href="javascript:;" style="padding: 0 .4vw;">-</a>
                                <CDate
                                        :dateType="'date'"
                                        :format="'yyyy-MM-dd'"
                                        @changeDate='endTimeChange'
                                        placeholder=''
                                        :options='endTimeOptions'
                                        :dateVal="endTime"
                                        :disabled="hasSummary"
                                >
                                </CDate>
                                <Button size="small" @click="dateSearch" style="margin-left:10px;">
                                    <Icon type="ios-search"/>
                                </Button>
                            </div>
                        </h4>
                        <div class="temp_con">
                            <h2>
                                <span>月统计总表</span>
                                <div class="moreCheck ytjzbBut">
                                    <Button v-if="!hasSummary" size='small' type="primary" @click="addSummary">添加</Button>
                                    <Button v-if="hasSummary" size='small' type="success">导出</Button>
                                    <Button v-if="hasSummary" size='small' type="success">打印</Button>
                                    <Button v-if="hasSummary" size='small' type="error" @click="deleteSummary">删除</Button>
                                </div>
                            </h2>
                            <div class="bjxxDiv">
                                <h5>总消耗量</h5>
                                <ul>
                                    <li>
                                        <p>电合计(kW·h)</p>
                                        <p>{{bjxxObj.dhj}}</p>
                                    </li>
                                    <li>
                                        <p>水合计(t)</p>
                                        <p>{{bjxxObj.shj}}</p>
                                    </li>
                                    <li>
                                        <p>天然气合计(m³)</p>
                                        <p>{{bjxxObj.trqhj}}</p>
                                    </li>
                                </ul>
                            </div>
                            <div v-if="isCompanyConsume" class="jfjlDiv">
                                <h5>单位消耗量</h5>
                                <el-table
                                        border
                                        v-loading="loading"
                                        :data="companyTableData"
                                        :row-key="getRowKey"
                                        style="width: 100%">
                                    <el-table-column align="center" prop="name" label="商家名称"></el-table-column>
                                    <el-table-column align="center" prop="db" label="电合计"></el-table-column>
                                    <el-table-column align="center" prop="zls" label="水合计"></el-table-column>
                                    <el-table-column align="center" prop="trqb" label="天然气合计"></el-table-column>
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
                            <div v-if="!isCompanyConsume" class="jfjlDiv">
                                <h5>表具消耗量</h5>
                                <el-table
                                        border
                                        v-loading="loading"
                                        :data="meterTableData"
                                        :row-key="getRowKey"
                                        style="width: 100%">
                                    <el-table-column align="center" prop="name" label="表具名称"></el-table-column>
                                    <el-table-column align="center" prop="bb" label="变比"></el-table-column>
                                    <el-table-column align="center" prop="sycj" label="上月抄见"></el-table-column>
                                    <el-table-column align="center" prop="bycj" label="本月抄见"></el-table-column>
                                    <el-table-column align="center" prop="sjyl" label="本月抄见"></el-table-column>
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
        name: 'ReportManagement',//报单管理
        props: [''],
        data() {
            return {
                now: 1,
                size: 30,
                currentSize: 1,
                infiniteScrollLoading: false,
                companySelectedIndex: -1,    //商家列表选中的下标
                companyData: [  //用量排行榜-排名数据
                ],

                dwmcVal: '',    //单位表具管理-输入框
                /**
                 * 以下变量表格使用
                 */
                total: 0,
                loading: false,
                companyTableData: [],
                meterTableData: [],
                currentPage: 1,
                pageSize: 10,
                disablePagination: false,
                selectedCompanyId: null,
                /**
                 * 表具信息
                 */
                bjxxObj: {
                    dhj: '0',   // 电合计
                    shj: '0',   // 水合计
                    trqhj: '0', // 天然气合计
                },
                monthTime: '',
                startTime: '',  // 开始时间
                endTime: '',    // 结束时间
                isCompanyConsume: true,     // 判断单位汇总还是表具汇总，用于切换显示
                hasSummaryCount: 0,         // 统计hasSummary请求执行的次数
                hasSummaryCompany: true,   // 标识所有商家是否有汇总数据
                hasSummaryMeter: true,     // 点击商家后，标识该商家下的表具是否有汇总数据
                fullScreenLoading: null,    //全屏加载框
                monthTimeOptions: {
                    disabledDate(date) {
                        const now = new Date();
                        return (date.getMonth() > now.getMonth());
                    }
                },
                startTimeOptions: {
                    disabledDate: (date) => {
                        if (!this.monthTime) return true;
                        const monthDate = new Date(this.monthTime);
                        const lastMonthDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), 0);
                        const dateO = new Date(date);
                        return (lastMonthDate.getFullYear() === dateO.getFullYear()) ? lastMonthDate.getMonth() !== dateO.getMonth() : true;
                    }
                },
                endTimeOptions: {
                    disabledDate: (date) => {
                        if (!this.monthTime) return true;
                        const monthDate = new Date(this.monthTime);
                        const lastMonthDate = new Date(monthDate.getFullYear(), monthDate.getMonth());
                        const dateO = new Date(date);
                        return (lastMonthDate.getFullYear() === dateO.getFullYear()) ? lastMonthDate.getMonth() !== dateO.getMonth() : true;
                    }
                },
            }
        },

        components: {
            CDate,
        },

        computed: {
            noMore() {
                return this.currentSize === 0;
            },
            infiniteScrollDisabled() {
                return !!(this.infiniteScrollLoading || this.noMore);
            },
            hasSummary() {
                return (this.isCompanyConsume ? this.hasSummaryCompany : this.hasSummaryMeter);
            },
        },

        beforeMount() {
        },
        mounted() {
            const now = new Date();
            this.monthTime = `${now.getFullYear()}-${now.getMonth() + 1}`;
            this.monthTimeChange({ val: this.monthTime });

            // 请求是否有汇总数据并且加载数据
            this.queryHasSummaryAndLoad();
        },

        methods: {
            startTimeChange(data) {
                this.startTime = data.val;
            },
            endTimeChange(data) {
                this.endTime = data.val;
            },
            monthTimeChange(date) {
                this.monthTime = date.val;
                const dateStr = date.val;
                // 获取选择的时间
                const thisMonthO = new Date(dateStr);
                // 获选当前选择的年份与月份
                const thisYear = thisMonthO.getFullYear(), thisMonth = thisMonthO.getMonth() + 1;

                // 获取上月时间
                const lastMonthO = new Date(thisYear, thisMonth - 2);
                // 获取上月的年份与月份
                const lastYear = lastMonthO.getFullYear(), lastMonth = lastMonthO.getMonth() + 1;

                this.startTime = `${lastYear}-${(lastMonth < 10 ? "0" + lastMonth : lastMonth)}-18`;
                this.endTime = `${thisYear}-${thisMonth < 10 ? "0" + thisMonth : thisMonth}-17`;

                // 请求是否有汇总数据并且加载数据
                this.queryHasSummaryAndLoad();
            },
            // 商家列表滑动到最下时，触发该事件，
            loadCompanyMore() {
                this.selectCompany();
            },
            search() {//单位表具管理-搜索确定
                this.now = 1;
                this.currentSize = 1;
                this.companyData = [];
                this.selectCompany();
            },
            dateSearch() {
                const lastDate = new Date(this.startTime);
                const thisDate = new Date(this.endTime);
                if (lastDate.getTime() >= thisDate.getTime()) {
                    this.$message({
                        type: 'warning',
                        message: '第一个日期不能超过第二个日期。'
                    });
                } else {
                    // 请求是否有汇总数据并且加载数据
                    this.queryHasSummaryAndLoad();
                }
            },
            openFullScreen() {
                this.fullScreenLoading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(255, 255, 255, 0.7)'
                });
            },
            closeFullScreen() {
                this.fullScreenLoading.close();
            },
            selectCompany() {
                const that = this;
                that.infiniteScrollLoading = true;
                $.ajax(
                    {
                        url: '/api/report/company_list',
                        data: {
                            now: that.now,
                            size: that.size,
                            comName: that.dwmcVal,
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result.success) {
                                that.companyData = that.companyData.concat(result.data);
                                that.currentSize = result.data.length;
                                that.now = result.now;
                            } else {
                                that.currentSize = 0;
                            }
                        },
                        complete() {
                            that.infiniteScrollLoading = false;
                        },
                    }
                );
            },
            queryTotalConsume() {
                const that = this;
                $.ajax(
                    {
                        url: '/api/report/total_consume',
                        data: {
                            startTime: that.startTime,
                            endTime: that.endTime,
                            comId: that.selectedCompanyId,
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result.success) {
                                that.bjxxObj.dhj = result.data.db;
                                that.bjxxObj.shj = result.data.zls;
                                that.bjxxObj.trqhj = result.data.trqb;
                            } else {
                                that.bjxxObj = {
                                    dhj: 0,
                                    shj: 0,
                                    trqhj: 0,
                                };
                            }
                        },
                        complete() {
                        },
                    }
                );
            },
            queryCompanyConsume() {
                const that = this;
                that.loading = true;
                $.ajax(
                    {
                        url: '/api/report/company_consume_t',
                        data: {
                            now: that.currentPage,
                            size: that.pageSize,
                            startTime: that.startTime,
                            endTime: that.endTime,
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result.success) {
                                that.companyTableData = result.data;
                                that.total = result.total;
                            }
                        },
                        complete() {
                            that.loading = false;
                        },
                    }
                );
            },
            queryMeterConsume() {
                const that = this;
                that.loading = true;
                $.ajax(
                    {
                        url: '/api/report/meter_consume_t',
                        data: {
                            now: that.currentPage,
                            size: that.pageSize,
                            startTime: that.startTime,
                            endTime: that.endTime,
                            comId: that.selectedCompanyId,
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result.success) {
                                that.meterTableData = result.data;
                                that.total = result.total;
                            }
                        },
                        complete() {
                            that.loading = false;
                        },
                    }
                );
            },
            queryConsumeSummary() {
                // 初始化表格组件变量的初始值
                this.loading = false;
                this.total = 0;
                this.currentPage = 1;

                // 加载下方表格数据
                this.queryTotalConsume();
                if (this.isCompanyConsume) {
                    this.queryCompanyConsume();
                } else {
                    this.queryMeterConsume();
                }
            },
            queryTotalConsumeSummaryT() {
                // 查询商家总消耗量
                const that = this;
                $.ajax(
                    {
                        url: '/api/report/total_consume_st',
                        data: {
                            month: that.monthTime,
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result.success) {
                                that.bjxxObj.dhj = result.data.db;
                                that.bjxxObj.shj = result.data.zls;
                                that.bjxxObj.trqhj = result.data.trqb;
                                const dateRange = result.data.daterange;
                                const dateRanges = dateRange.split('~');
                                that.startTime = dateRanges[0];
                                that.endTime = dateRanges[1];
                                that.queryCompanyConsumeSummaryT(result.data.id);
                            } else {
                                that.bjxxObj = {
                                    dhj: 0,
                                    shj: 0,
                                    trqhj: 0,
                                };
                            }
                        },
                        complete() {
                        },
                    }
                );
            },
            queryTotalConsumeMeterSummaryT() {
                // 查询表具总消耗量
                const that = this;
                $.ajax(
                    {
                        url: '/api/report/total_consume_meter_st',
                        data: {
                            month: that.monthTime,
                            comId: that.selectedCompanyId,
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result.success) {
                                that.bjxxObj.dhj = result.data.db;
                                that.bjxxObj.shj = result.data.zls;
                                that.bjxxObj.trqhj = result.data.trqb;
                                const dateRange = result.data.daterange;
                                const dateRanges = dateRange.split('~');
                                that.startTime = dateRanges[0];
                                that.endTime = dateRanges[1];
                                that.queryMeterConsumeConsumeSummaryT(result.data.id);
                            } else {
                                that.bjxxObj = {
                                    dhj: 0,
                                    shj: 0,
                                    trqhj: 0,
                                };
                            }
                        },
                        complete() {
                        },
                    }
                );
            },
            queryCompanyConsumeSummaryT(repId) {
                // 加载商家消耗量汇总表格
                const that = this;
                that.loading = true;
                $.ajax(
                    {
                        url: '/api/report/company_consume_st',
                        data: {
                            now: that.currentPage,
                            size: that.pageSize,
                            repId: repId
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result.success) {
                                that.companyTableData = result.data;
                                that.total = result.total;
                            }
                        },
                        complete() {
                            that.loading = false;
                        },
                    }
                );
            },
            queryMeterConsumeConsumeSummaryT(repId) {
                // 加载表具消耗量汇总表格
                const that = this;
                that.loading = true;
                $.ajax(
                    {
                        url: '/api/report/meter_consume_st',
                        data: {
                            now: that.currentPage,
                            size: that.pageSize,
                            repId: repId
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result.success) {
                                that.meterTableData = result.data;
                                that.total = result.total;
                            }
                        },
                        complete() {
                            that.loading = false;
                        },
                    }
                );
            },
            queryConsumeSummaryST() {
                // 初始化表格组件变量的初始值
                this.loading = false;
                this.total = 0;
                this.currentPage = 1;

                // 加载下方表格数据
                if (this.isCompanyConsume) {
                    this.queryTotalConsumeSummaryT();
                } else {
                    this.queryTotalConsumeMeterSummaryT();
                }
            },
            queryHasSummaryAndLoad() {
                const that = this;
                this.hasSummaryCount = 0;
                function callback() {
                    that.hasSummaryCount ++;
                    if (that.hasSummaryCount === 2) {
                        // 如果存在汇总数据，则为true
                        if (that.hasSummary) {
                            that.queryConsumeSummaryST();
                        } else {
                            that.queryConsumeSummary();
                        }
                    }
                }
                this.queryHasSummaryCompany(callback);
                this.queryHasSummaryMeter(callback);
            },
            queryHasSummaryCompany(callback) {
                const that = this;
                $.ajax(
                    {
                        url: '/api/report/has_summary_company',
                        data: {
                            month: that.monthTime,
                        },
                        dataType: 'json',
                        success: function (result) {
                            that.hasSummaryCompany = false;
                            if (result.success) {
                                if (result.hasOwnProperty("isExists")) {
                                    that.hasSummaryCompany = result.isExists;
                                }
                            }
                        },
                        complete() {
                            callback();
                        },
                    }
                );
            },
            queryHasSummaryMeter(callback) {
                const that = this;
                $.ajax(
                    {
                        url: '/api/report/has_summary_meter',
                        data: {
                            month: that.monthTime,
                            comId: that.selectedCompanyId,
                        },
                        dataType: 'json',
                        success: function (result) {
                            that.hasSummaryMeter = false;
                            if (result.success) {
                                if (result.hasOwnProperty("isExists")) {
                                    that.hasSummaryMeter = result.isExists;
                                }
                            }
                        },
                        complete() {
                            callback();
                        },
                    }
                );
            },
            addSummaryCompany(callback) {
                // 添加商家汇总信息
                const that = this;
                $.ajax(
                    {
                        url: '/api/report/add_summary_company',
                        data: {
                            month: that.monthTime,
                            startTime: that.startTime,
                            endTime: that.endTime,
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result.success) {
                                if (result.message) {
                                    let type = 'info';
                                    if (result.code === 2) {
                                        type = 'success';
                                    }
                                    that.$message({
                                        type: type,
                                        message: result.message
                                    });
                                }
                            }
                        },
                        complete() {
                            callback();
                        },
                    }
                );
            },
            addSummaryMeter(callback) {
                // 添加表具汇总信息
                const that = this;
                $.ajax(
                    {
                        url: '/api/report/add_summary_meter',
                        data: {
                            month: that.monthTime,
                            startTime: that.startTime,
                            endTime: that.endTime,
                            comId: that.selectedCompanyId,
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result.success) {
                                if (result.message) {
                                    let type = 'info';
                                    if (result.code === 2) {
                                        type = 'success';
                                    }
                                    that.$message({
                                        type: type,
                                        message: result.message
                                    });
                                }
                            }
                        },
                        complete() {
                            callback();
                        },
                    }
                );
            },
            /**
             * 添加汇总信息
             */
            addSummary() {
                const that = this;
                that.openFullScreen();
                function callback() {
                    // 添加完成后加载数据
                    that.closeFullScreen();
                    that.queryHasSummaryAndLoad();
                }
                if (this.isCompanyConsume) {
                    this.addSummaryCompany(callback);
                } else {
                    this.addSummaryMeter(callback);
                }
            },
            delSummaryCompany(callback) {
                // 删除商家汇总信息
                const that = this;
                $.ajax(
                    {
                        url: '/api/report/del_summary_company',
                        data: {
                            month: that.monthTime,
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result.success) {
                                if (result.message) {
                                    let type = 'info';
                                    if (result.code === 2) {
                                        type = 'success';
                                    }
                                    that.$message({
                                        type: type,
                                        message: result.message
                                    });
                                }
                            }
                        },
                        complete() {
                            callback();
                        },
                    }
                );
            },
            delSummaryMeter(callback) {
                // 删除表具汇总信息
                const that = this;
                $.ajax(
                    {
                        url: '/api/report/del_summary_meter',
                        data: {
                            month: that.monthTime,
                            comId: that.selectedCompanyId,
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result.success) {
                                if (result.message) {
                                    let type = 'info';
                                    if (result.code === 2) {
                                        type = 'success';
                                    }
                                    that.$message({
                                        type: type,
                                        message: result.message
                                    });
                                }
                            }
                        },
                        complete() {
                            callback();
                        },
                    }
                );
            },
            getRowKey(row) {
                return row.id;
            },
            currentPageChange(index) {
                this.currentPage = index;
                this.queryCompanyConsume();
            },
            /**
             * 删除汇总信息
             */
            deleteSummary() {
                const that = this;
                that.openFullScreen();
                function callback() {
                    that.closeFullScreen();
                    that.queryHasSummaryAndLoad();
                }
                if (this.isCompanyConsume) {
                    this.delSummaryCompany(callback);
                } else {
                    this.delSummaryMeter(callback);
                }
            },
            /**
             * 单位表具管理
             */
            navLiChange(index, item) {
                if (this.companySelectedIndex === index) {
                    this.companySelectedIndex = -1;
                    this.isCompanyConsume = true;
                    this.selectedCompanyId = null;
                } else {
                    this.isCompanyConsume = false;
                    this.companySelectedIndex = index;
                    this.selectedCompanyId = item.cid;
                }

                // 请求是否有汇总数据并且加载数据
                this.queryHasSummaryAndLoad();
            },
        },
        watch: {
        },
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
                float: left;
                height: 100%;

                &:first-child {
                    width: 23.15%;

                    .template_div {

                    }
                }

                &:last-child {
                    width: calc(76.85% - 18px);
                    margin-left: 18px;

                    .template_div {
                        .temp_con {
                            padding: 0 18px;

                            h2 {
                                height: 5.4vh;
                                border-top: 1px solid #ccc;
                                line-height: 5.4vh;

                                span {
                                    font-size: 16px;
                                    font-weight: 600;
                                }
                            }

                            h5 {
                                height: 40px;
                                line-height: 40px;
                                padding-left: 10px;
                                text-indent: 1.2vw;
                            }

                            .bjxxDiv {
                                h5 {
                                    font-size: 18px;
                                    font-weight: 500;
                                    border: 1px solid #ccc;
                                    border-bottom: 0;
                                    background: url(../../assets/image/zxhl.png) no-repeat 10px center;
                                }

                                ul {
                                    overflow: hidden;
                                    border: 1px solid #ccc;

                                    li {
                                        float: left;
                                        width: 33.33%;

                                        p {
                                            font-size: 16px;
                                            float: left;
                                            width: 50%;
                                            height: 40px;
                                            line-height: 40px;
                                            text-align: center;
                                            border-right: 1px solid #ccc;

                                            &:first-child {
                                                font-weight: 900;
                                            }
                                        }

                                        &:last-child {
                                            p:last-child {
                                                border-right: 0;
                                            }
                                        }
                                    }
                                }

                            }

                            .jfjlDiv {
                                h5 {
                                    font-size: 18px;
                                    font-weight: 500;
                                    border: 1px solid #ccc;
                                    border-bottom: 0;
                                    border-top: 0;
                                    background: url(../../assets/image/xhl.png) no-repeat 10px center;
                                }
                            }
                        }
                    }
                }

                .template_div {
                    border: 1px solid #cacaca;
                    box-shadow: 0 0 3px #cacaca;
                    /*overflow-y: auto;*/
                    height: 100%;

                    h4 {
                        // height: 4.3vh;
                        height: 5%;
                        padding-top: 1vh;

                        span {
                            border-left: 4px solid #1dc9ff;
                            padding-left: 10px;
                            font-size: 18px;
                            font-weight: 500;
                        }
                    }

                    .moreCheck {
                        float: right;
                        width: 8vw;
                        margin-right: 10px;
                        text-align: center;
                    }

                    .ytjzbBut { //月统计总表
                        width: auto;

                        .ivu-btn-small {
                            font-size: 16px;
                            color: #fefefe;
                            margin-left: 18px;
                        }
                    }

                    .temp_con {
                        height: 95%;

                        .nav {
                            border: 1px solid #ccc;
                            border-left: 0;
                            border-right: 0;
                            overflow: hidden;

                            li {
                                float: left;
                                width: 33.33%;
                                text-align: center;
                                border-bottom: 4px solid rgba(0, 0, 0, 0);
                                color: #333;
                                padding: 1.23vh 0;
                                font-size: 14px;

                                &:hover {
                                    cursor: pointer;
                                }
                            }
                        }

                        .nav_con {
                            border-top: 1px solid #cccc;
                            margin: 0 10px;
                            /*height: 100%;*/

                            li {
                                padding: 0 18px;
                                overflow: hidden;
                                border-bottom: 1px solid #ddd;

                                &:hover {
                                    cursor: pointer;
                                }

                                p {
                                    float: left;
                                    width: 100%;
                                    padding: 3.8% 0;
                                    font-size: 16px;

                                    span {
                                        float: right;
                                    }
                                }
                            }

                            .navLiActive {
                                padding: 18px;
                                border-bottom: 1px solid #ddd;

                                .navDiv {
                                    height: 6.68vh;
                                    position: relative;

                                    h2 {
                                        font-size: 16px;
                                    }

                                    .navDivL {
                                        width: 4.5vw;
                                        float: left;
                                    }

                                    .navDivR {
                                        width: 8vw;
                                        float: left;
                                        padding-left: 1.5vw;
                                        padding-top: 1.5vh;

                                        p {
                                            border: 0;
                                            padding: 1.8% 0;
                                            color: #5094ff;
                                        }
                                    }

                                    .navDivImg {
                                        position: absolute;
                                        right: 0;
                                        top: 1.5vh;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .souso {
                float: left;
                width: 20vw;
                margin-left: 10px;
            }

            .sousoT {
                width: 5.21vw;
            }
        }
    }
    .el-pagination {
        margin-top: 10px;
        float: right;
        clear: both;
    }
</style>