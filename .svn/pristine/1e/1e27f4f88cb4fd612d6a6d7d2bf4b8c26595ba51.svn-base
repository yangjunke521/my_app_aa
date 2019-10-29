<template>
    <div class="cultureDiv">
        <Breadcrumb style="border-bottom:1px solid #ccc;font-size:18px;font-weight:100;padding:8px 0;">
            <BreadcrumbItem>业务管理</BreadcrumbItem>
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
                            <ul class='nav_con' v-if="ylphbData.length>0">
                                <li :class="{'navLiActive':index === nav_conIndex}" v-for="(item,index) in ylphbData"
                                    @click="navLiChange(index)">
                                    <p v-if="index !== nav_conIndex">{{item.companyName}} <span><img
                                            src="@/assets/image/nav_li.jpg"/></span></p>
                                    <div class="navDiv" v-else-if="index === nav_conIndex">
                                        <div class="navDivL">
                                            <div class="img"><img width="80vh" height="80vh"  :src="item.src"/></div>
                                            <h2>{{item.companyName}}</h2>
                                        </div>
                                        <div class="navDivR">
                                            <p v-for="(meterItem, meterIndex) in item.con"
                                               @click="meterChange(meterIndex)">{{meterItem.meterName}}</p>
                                        </div>
                                        <span class="navDivImg"><img src="@/assets/image/nav_li_active.jpg"/></span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="sec_div">
                    <div class="template_div">
                        <h4>
                            <span></span>
                            <Button size='small' @click="lzClick">拉闸</Button>
                            <Button size='small' @click="hzClick">合闸</Button>
                            <Button size='small' @click="bdClick">保电</Button>
                            <Button size='small' @click="jcbdClick">解除保电</Button>
                            <Button size='small' @click="xdsjClick">校对时间</Button>
                            <Button size='small' @click="dqsjClick">读取数据</Button>
                        </h4>
                        <div class="temp_con">
                            <div class="con_top">
                                <h5>基本信息</h5>
                                <ul>
                                    <li>
                                        <p class="name">表号：</p>
                                        <p class="value">{{basicInfo.meterNo}}</p>

                                        <p class="name">表具名称：</p>
                                        <p class="value">{{basicInfo.meterName}}</p>

                                        <p class="name">设备号：</p>
                                        <p class="value">{{basicInfo.deviceNo}}</p>

                                        <p class="name">累计量：</p>
                                        <p class="value">{{realBasicInfo.total}}</p>

                                        <p class="name">抄表日期：</p>
                                        <p class="value">{{realBasicInfo.cbsj}}</p>
                                    </li>
                                    <li>
                                        <p class="name">表具类型：</p>
                                        <p class="value">{{basicInfo.typeName}}</p>

                                        <p class="name">表具型号：</p>
                                        <p class="value">{{basicInfo.meterModel}}</p>

                                        <template v-if="basicInfo.type === 'db'">
                                            <p class="name">剩余电量：</p>
                                        </template>
                                        <template v-else-if="basicInfo.type === 'zls' || basicInfo.type === 'trqb'">
                                            <p class="name">剩余容量：</p>
                                        </template>
                                        <p class="value">{{realBasicInfo.dumpEnergy}}</p>

                                        <p class="name">保电状态：</p>
                                        <p class="value">{{basicInfo.powercon}}</p>

                                        <p class="name">报警量：</p>
                                        <p class="value">{{basicInfo.warnvalue}}</p>

                                    </li>
                                    <li>
                                        <p class="name">商户名称：</p>
                                        <p class="value">{{basicInfo.companyName}}</p>

                                        <p class="name">安装位置：</p>
                                        <p class="value">{{basicInfo.azwz}}</p>

                                        <p class="name">倍率：</p>
                                        <p class="value">{{basicInfo.bl}}</p>

                                        <p class="name">表具状态：</p>
                                        <p class="value">{{basicInfo.meterState}}</p>

                                    </li>
                                </ul>
                            </div>
                            <div class="con_bottom">
                                <h5>当前数据</h5>
                                <ul>
                                    <li>
                                        <p class="name">电量：</p>
                                        <p class="value">{{currentData.dl}}</p>
                                    </li>
                                    <li>
                                        <p class="name">电压：</p>
                                        <p class="value">{{currentData.dy}}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="template_div">
                        <h4>
                            <span>{{meterName}}用量统计图</span>
                        </h4>
                        <div class="temp_con">
                            <BarChart @echartsClick='barClick' ref="dbylChart"></BarChart>
                        </div>
                    </div>
                </div>
            </section>
        </Content>
    </div>
</template>


<script>
    import BarChart from "@/components/echarts/bar_dbyl";//柱图插件-电表用量
    import $ from "jquery";

    export default {
        name: 'index',//首页
        props: [''],
        data() {
            return {
                /**
                 * 用量排行榜
                 */
                ylphTitList: ['单位', '表具'],//用量排行榜
                ylphTit: 0,//用量排行榜
                ylphbList: ['电表', '水表', '燃气表'],//用量排行榜
                ylphb_act: 0,//用量排行榜
                ylphbData: [],//单位表具管理列表
                /**
                 * 单位表具管理
                 */
                dwmcVal: '',//单位表具管理-输入框
                nav_conIndex: 0,//默认选中的值
                meterIndex: 0, // 表具的下标， 用于获取表具ID
                basicInfo: { //基础信息
                    meterNo: '',
                    meterModel: '',
                    type: '',
                    typeName: '',
                    companyName: '',
                    meterName: '',
                    azwz: '',
                    deviceNo: '',
                    powercon: '',
                    bl: '',
                    warnvalue: '',
                    meterState: '',
                },
                realBasicInfo: { //实时基础信息
                    dumpEnergy: '',
                    total: '',
                    cbsj: '',
                },
                currentData: {
                    dl: 0,
                    dy: 0
                },
                meterName: '',
            }
        },

        components: {
            BarChart
        },

        computed: {},

        beforeMount() {
        },

        mounted() {
            this.getCompanyList(null);
        },

        methods: {
            loadInfoWhenHasData() {
                if (this.ylphbData && this.ylphbData.length) {
                    const comList = this.ylphbData[this.nav_conIndex];
                    if (comList.hasOwnProperty("con")) {
                        const cons = comList.con;
                        if (cons && cons.length) {
                            const meterId = cons[this.meterIndex].meterId;
                            this.meterName = cons[this.meterIndex].meterName;
                            this.getMeterBasicInfo(meterId);
                            this.getCurrentData(meterId);
                            this.getUsageAmountData(meterId);
                        }
                    }
                }
            },
            /**
             * 用户排名切换
             */
            yhphChange(index) {//单位表具
                this.ylphTit = index;
            },
            barClick(data) {//柱图点击事件
                // alert('柱图点击事件');
            },
            search() {//单位表具管理-搜索确定
                this.getCompanyList(this.dwmcVal);
            },
            // 获取商家列表
            // 参数：商家名称
            getCompanyList(comName) {
                const that = this;
                $.ajax('/api/business/company_list', {
                    dataType: 'json',
                    data: {
                        comName: comName
                    },
                    success: function (res) {
                        if (res.success) {
                            that.ylphbData = res.data;
                            that.loadInfoWhenHasData();
                        }
                    }
                });
            },
            getMeterBasicInfo(meterId) {
                const that = this;
                $.ajax('/api/business/meter_basic_info', {
                    dataType: 'json',
                    data: {
                        meterId: meterId
                    },
                    success: function (res) {
                        if (res.success) {
                            that.basicInfo = res.data;
                        }
                    }
                });
                this.getMeterRealBasicInfo(meterId);
            },
            getMeterRealBasicInfo(meterId) {
                const that = this;
                $.ajax('/api/business/meter_rtbasic_info', {
                    dataType: 'json',
                    data: {
                        meterId: meterId
                    },
                    success: function (res) {
                        if (res.success) {
                            that.realBasicInfo = res.data;
                        } else {
                            if (!res.data) {
                                that.realBasicInfo = {
                                    dumpEnergy: '暂无数据',
                                    total: '暂无数据',
                                    cbsj: '暂无数据',
                                }
                            }
                        }
                    }
                });
            },
            getCurrentData(meterId) {
                const that = this;
                $.ajax('/api/business/current_data', {
                    dataType: 'json',
                    data: {
                        meterId: meterId
                    },
                    success: function (res) {
                        if (res.success) {
                            that.currentData = res.data;
                        }
                    }
                });
            },
            getUsageAmountData(meterId) {
                const that = this;
                $.ajax('/api/business/today_usage_amount', {
                    dataType: 'json',
                    data: {
                        meterId: meterId
                    },
                    success: function (res) {
                        if (res.success) {
                            that.$refs.dbylChart.xData = res.sj;
                            that.$refs.dbylChart.yData = res.yl;
                            that.$refs.dbylChart.setChartOption();
                        }
                    }
                });
            },
            /**
             * 基本信息
             */
            lzClick() {//拉闸

            },
            hzClick() {//拉闸

            },
            bdClick() {//保电

            },
            jcbdClick() {//解除保电

            },
            xdsjClick() {//校对时间

            },
            dqsjClick() {//读取数据

            },
            /**
             * 单位表具管理
             */
            navLiChange(index) {
                this.nav_conIndex = index;
                // 表具默认选择第一个
                this.meterIndex = 0;
            },
            // 修改表具下标变量
            meterChange(index) {
                this.meterIndex = index;
                this.loadInfoWhenHasData();
            },
        }
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
            margin-top: 18px;

            .sec_div {
                float: left;
                height: 100%;

                &:first-child {
                    width: 23.15%;

                    .template_div {
                        height: 100%;
                    }
                }

                &:last-child {
                    width: calc(76.85% - 18px);
                    margin-left: 18px;

                    .template_div {
                        &:first-child {
                            height: 48%;
                            margin-bottom: 18px;

                            h4 {
                                padding-top: .4vh;
                            }

                            .ivu-btn-small {
                                margin-right: 18px;
                                color: #fff;
                                font-size: 16px;

                                &:nth-of-type(1) {
                                    background: #008cca;
                                }

                                &:nth-of-type(2) {
                                    background: #00bb58;
                                }

                                &:nth-of-type(3) {
                                    background: #ff0000;
                                }

                                &:nth-of-type(4) {
                                    background: #00bb58;
                                }

                                &:nth-of-type(5) {
                                    background: #ffa800;
                                }

                                &:nth-of-type(6) {
                                    background: #ffa800;
                                }
                            }

                            .temp_con {
                                height: 87%;
                                margin: 0 10px;
                                border-top: 1px solid #ccc;
                                padding-top: 2.1%;

                                h5 {
                                    height: 5vh;
                                    line-height: 5vh;
                                    padding-left: 10px;
                                    border-bottom: 1px solid #ccc;
                                    text-indent: 1.2vw;
                                    font-size: 18px;
                                    font-weight: 400;
                                }

                                .con_top {
                                    height: calc(70% - 10px);
                                    margin-bottom: 10px;
                                    border: 1px solid #ccc;
                                    border-radius: 2px;

                                    h5 {
                                        background: url(../../assets/image/jbxx.png) no-repeat 10px center;
                                    }

                                    ul {
                                        li {
                                            border-left: 1px dashed #ccc;
                                        }
                                    }
                                }

                                .con_bottom {
                                    height: 30%;
                                    border: 1px solid #ccc;
                                    border-radius: 2px;

                                    h5 {
                                        background: url(../../assets/image/dqsj.png) no-repeat 10px center;
                                    }

                                    ul {
                                        height: 49%;
                                    }
                                }

                                ul {
                                    padding: 10px;
                                    height: 74%;

                                    li {
                                        float: left;
                                        width: 33.33%;
                                        height: 100%;
                                        border-left: 1px solid #ccc;
                                        padding-left: 18px;

                                        p {
                                            float: left;
                                            height: 2.8vh;
                                            line-height: 2.8vh;
                                            font-size: 16px;
                                        }

                                        .name {
                                            width: 5vw;
                                            color: #666;
                                        }

                                        .value {
                                            width: calc(100% - 5vw);
                                            color: #333;
                                        }
                                    }
                                }
                            }
                        }

                        &:last-child {
                            height: calc(52% - 18px);

                            .temp_con {
                                height: 88%;
                                margin: 0 10px;
                                border-top: 1px solid #ccc;

                            }

                            .moreCheckT {
                                float: right;
                                margin-right: 10px;
                                text-align: center;

                                p {
                                    width: 2vw;
                                    float: left;
                                    border: 1px solid #ccc;
                                    border-radius: 10px;
                                    margin-left: 10px;

                                    &:hover {
                                        cursor: pointer;
                                    }
                                }

                                .pActive {
                                    color: #ffa701;
                                    border: 1px solid #ffa701;
                                }
                            }

                            .moreCheckTh .pActive {
                                color: #a36dff;
                                border: 1px solid #a36dff;
                            }
                        }
                    }
                }

                .template_div {
                    border: 1px solid #cacaca;
                    box-shadow: 0 0 3px #cacaca;
                    overflow-y: auto;

                    h4 {
                        height: 4.3vh;
                        padding-top: 1vh;

                        span {
                            border-left: 4px solid #1dc9ff;
                            padding-left: 10px;
                            font-size: 18px;
                            font-weight: 500;
                        }

                        .moreCheck {
                            float: right;
                            width: 8vw;
                            margin-right: 10px;
                            text-align: center;
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

                            li {
                                padding: 0 18px;
                                overflow: hidden;

                                &:hover {
                                    cursor: pointer;
                                }

                                p {
                                    float: left;
                                    width: 100%;
                                    padding: 3.8% 0;
                                    border-bottom: 1px solid #ddd;
                                    font-size: 16px;

                                    span {
                                        float: right;
                                    }
                                }
                            }

                            .navLiActive {
                                padding: 18px;
                                padding-bottom: 0;

                                .navDiv {
                                    height: 13vh;
                                    border-bottom: 1px solid #ddd;
                                    position: relative;

                                    .navDivL {
                                        width: 4.5vw;
                                        float: left;
                                        background: url(../../assets/image/bg_right.jpg) no-repeat center right;

                                        h2 {
                                            font-size: 16px;
                                        }
                                    }

                                    .navDivR {
                                        width: 8vw;
                                        float: left;
                                        padding-left: 1.5vw;

                                        p {
                                            border: 0;
                                            padding: 1.8% 0;
                                            color: #5094ff;
                                        }
                                    }

                                    .navDivImg {
                                        position: absolute;
                                        right: 0;
                                        top: 0;
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }
    }
</style>