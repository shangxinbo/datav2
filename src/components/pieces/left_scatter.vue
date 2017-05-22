<template>
    <li>
        <div class="main" v-show="!iframe">
            <h1>各省投资消费占比</h1>
            <div class="scatter-chart-warp">
                <div id="scatter" style="width:680px;height:537px;"></div>
            </div>
            <div class="scatter-right">
                <div class="title">
                    <h5>
                        <span>贷款/信用卡消费</span>(日均占比)</h5>
                    <h5>
                        <span>投资理财</span>(日均占比)</h5>
                </div>
                <ul class="scatter-data">
                    <li v-for="(item,index) in top">
                        <span>{{item.province.substr(0, 2)}}</span>
                        <em>{{Math.round(item.in * 10000) / 100 + '%'}}</em>
                        <em>{{Math.round(item.out * 10000) / 100 + '%'}}</em>
                    </li>
                </ul>
            </div>
        </div>
        <iframe v-show="iframe" src="http://www.geotmt.com/index.php?m=content&c=index&a=lists&catid=52"></iframe>
    </li>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    import echarts from 'echarts'
    export default {
        data() {
            return {
                iframe: false,
                top: [],
                schema: [
                    { text: '投资理财', unit: '' },
                    { text: '贷款/信用卡消费', unit: '' },
                    { text: '省份', unit: '' },
                    { text: '总量', unit: '' },
                    { text: '时间', unit: '' }
                ],
                colors: [
                    'rgba(255,87,119,0.5)',
                    'rgba(177,27,232,0.5)',
                    'rgba(116,67,255,0.5)',
                    'rgba(39,120,255,0.5)',
                    'rgba(39,191,255,0.5)',
                    'rgba(0,222,214,0.5)',
                    'rgba(0,222,157,0.5)',
                    'rgba(57,237,86,0.5)',
                    'rgba(255,87,119,0.5)',
                    'rgba(177,27,232,0.5)',
                    'rgba(116,67,255,0.5)',
                    'rgba(39,120,255,0.5)',
                    'rgba(39,191,255,0.5)',
                    'rgba(0,222,214,0.5)',
                    'rgba(0,222,157,0.5)'
                ]
            }
        },
        methods: {
            setAxis(name, min, max) {
                let lineStyle = {
                    lineStyle: {
                        color: '#40444a',
                        width: 2
                    }
                }
                return {
                    type: 'log',
                    name: name,
                    min: min,
                    max: max,
                    nameTextStyle: {
                        fontSize: 14,
                        color: 'rgba(255,255,255,0.4)'
                    },
                    splitLine: {
                        show: false
                    },
                    splitNumber: 7,
                    axisTick: lineStyle,
                    axisLine: lineStyle,
                    axisLabel: {
                        textStyle: {
                            color: '#fff',
                            fontSize: 12,
                            fontWeight: 'lighter'
                        },
                        formatter: function (value, index) {
                            return Math.round(value * 1000) / 10 + '%'
                        }
                    }
                }
            },
            getSeries(data) {
                var series = new Array()
                for (var i = 0; i < data.series.length; i++) {
                    var s = data.series[i]
                    var arr1 = Array()
                    for (var j = 0; j < s.length; j++) {
                        var arr2 = [s[j].uv_out, s[j].uv_in, s[j].uv_all, s[j].name, s[j].day]
                        arr1.push(arr2)
                    }
                    series.push(arr1)
                }
                return series
            },
            timer() {
                let _this = this
                setInterval(() => {
                    _this.iframe = !_this.iframe
                }, 100 * 1000)
            }
        },
        mounted() {
            mAjax(this, {
                url: API.timeline,
                success: data => {
                    data = data.val
                    let province = []
                    //top值
                    if (data.top.length > 0) {
                        let top = data.top.sort(function (a, b) {
                            return Math.round(b * 1000) - Math.round(a * 1000)
                        })

                        for (let i = 0; i < top.length; i++) {
                            province.push(top[i].province)
                        }
                        this.top = top
                    } else {
                        return false
                    }

                    let option = {
                        baseOption: {
                            timeline: {
                                show: false,
                                axisType: 'category',
                                autoPlay: true,
                                playInterval: 3000,      //切换时间
                                data: []
                            },
                            title: {
                                text: data.timeline[0]
                            },
                            tooltip: {
                                padding: 5,
                                backgroundColor: '#222',
                                borderColor: '#777',
                                borderWidth: 1,
                                formatter: function (obj) {
                                    let value = obj.value
                                    return this.schema[2].text + '：' + value[3] + '<br>'
                                        + this.schema[1].text + '：' + Math.round(value[1] * 10000) / 100 + '%<br>'
                                        + this.schema[0].text + '：' + Math.round(value[0] * 10000) / 100 + '%<br>'
                                }
                            },
                            grid: {
                                top: '24%',
                                left: '12%',
                                right: '13%',
                                bottom: '10%'
                            },
                            xAxis: this.setAxis('投资理财', 0.01, 0.12),
                            yAxis: this.setAxis('贷款/信用卡', 0.01, 0.025),
                            visualMap: [
                                {
                                    show: false,
                                    dimension: 3,
                                    categories: province,
                                    calculable: true,
                                    precision: 0.1,
                                    textGap: 30,
                                    textStyle: {
                                        color: '#ccc'
                                    },
                                    inRange: {
                                        color: this.colors
                                    }
                                }
                            ],
                            series: [
                                {
                                    type: 'scatter',
                                    data: this.getSeries(data)[0],
                                    symbolSize: function (val) {
                                        return val[2] * 1000
                                    }
                                }
                            ],
                            animationDurationUpdate: 1000,      //动画持续时间
                            animationEasingUpdate: 'quinticInOut'
                        },
                        options: []
                    }

                    for (var n = 0; n < data.timeline.length; n++) {
                        option.baseOption.timeline.data.push(data.timeline[n])
                        option.options.push({
                            title: {
                                show: true,
                                text: data.timeline[n],
                                textStyle: {
                                    fontSize: 50,
                                    fontWeight: 'normal',
                                    color: 'rgba(64,68,74,0.4)'
                                },
                                right: "12%",
                                bottom: '13%'
                            },
                            series: {
                                name: data.timeline[n],
                                type: 'scatter',
                                data: this.getSeries(data)[n],
                                symbolSize: function (val) {
                                    return val[2] * 1000
                                }
                            }
                        })
                    }
                    echarts.init(document.getElementById('scatter')).setOption(option)
                    this.timer()
                }
            })
        }
    }

</script>