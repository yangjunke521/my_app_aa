<template>
    <div class="echarts" ref="chart"></div>
</template>

<script>
    const echarts = require('echarts');
    export default {
        name: 'bar_dbyl',//电表1用量
        props: ['datas'],
        data() {
            return {
                chart: null,
                // xData: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'],
                // yData: [10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 200],
               xData: [],
               yData: [],
            };
        },

        components: {},

        computed: {},

        beforeMount() {
        },

        mounted() {
            this.initCharts();
            window.onresize = () => {
                // 基于准备好的dom，初始化echarts实例
               this.chart.resize();
            };
        },
        methods: {
            initCharts() {
                this.chart = echarts.init(this.$refs.chart);
                this.setChartOption();
                this.chart.on('click', (params) => {
                    this.$emit('echartsClick', params);
                });
            },
            setChartOption() {
                this.chart.setOption({
                    color: ['#ffa701'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: this.xData,
                            axisTick: {show: false},
                            axisLine: {
                                symbol: 'none',
                                lineStyle: {
                                    color: '#ccc'
                                }
                            },
                            axisLabel: {
                                color: '#333',
                                interval: 0,
                                rotate: 90
                            },
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            splitLine: {    //网格线
                                lineStyle: {
                                    type: 'dashed'    //设置网格线类型 dotted：虚线   solid:实线
                                },
                                show: true //隐藏或显示
                            },
                            axisLine: {
                                symbol: 'none',
                                lineStyle: {
                                    color: '#ccc'
                                }
                            },
                            axisLabel: {
                                color: '#333',
                            }

                        }
                    ],
                    series: [
                        {
                            name: '用量',
                            type: 'bar',
                            barWidth: '15',
                            data: this.yData,
                            itemStyle: {
                                //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
                                emphasis: {
                                    barBorderRadius: 30
                                },

                                normal: {
                                    //柱形图圆角，初始化效果
                                    barBorderRadius: [10, 10, 10, 10],
                                }
                            }
                        }
                    ]
                })
            }
        },

        watch: {}

    }

</script>
<style lang='less' scoped>
    .echarts {
        width: 100%;
        height: 100%;
    }
</style>