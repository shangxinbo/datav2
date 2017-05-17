<template>
    <li>
        <div class="main total_account-class">
            <h1 class="small">各类账户总量</h1>
            <div id="total_account" class="top-content" v-if="topAll.length>0">
                <div class="text-number">
                    <h2>微博用户量</h2>
                    <p class="number">
                        <span class="big">{{topAll[0].value|flatNum}}</span>
                        <span class="small">
                            <em>+{{topNew[0].value|flatNum}}</em>
                            <em>+{{(topNew[0].value*100/topAll[0].value).toFixed(1) + '%'}}</em>
                        </span>
                    </p>
                </div>
                <div class="text-number">
                    <h2>QQ用户量</h2>
                    <p class="number">
                        <span class="big">{{topAll[1].value|flatNum}}</span>
                        <span class="small">
                            <em>+{{topNew[1].value|flatNum}}</em>
                            <em>+{{(topNew[1].value*100/topAll[1].value).toFixed(1) + '%'}}</em>
                        </span>
                    </p>
                </div>
                <div class="text-number">
                    <h2>邮箱用户量</h2>
                    <p class="number">
                        <span class="big">{{topAll[2].value|flatNum}}</span>
                        <span class="small">
                            <em>+{{topNew[2].value|flatNum}}</em>
                            <em>+{{(topNew[2].value*100/topAll[2].value).toFixed(1) + '%'}}</em>
                        </span>
                    </p>
                </div>
            </div>
            <div class="total-account-chart">
                <div id="total_account1" style="width:345px;height:260px;"></div>
                <div id="total_account2" style="width:345px;height:260px;"></div>
            </div>
        </div>
    </li>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    import echarts from 'echarts'
    export default {
        data() {
            return {
                topAll: [],
                topNew: [],
                color1: ['#0383bd', '#003879', '#024f91', '#006799', '#007eb5', '#22a1cd', '#55a7c2', '#76b1c5', '#94bbc8', '#aebec2'],
                color2: ['#5607c3', '#8420f5', '#9b5af3', '#c693f5', '#e9c7ff', '#c3b1cb', '#7a38bc', '#8024cd', '#5a0f91', '#450068'],
                defaultOpt: {
                    title: {
                        x: 'center',
                        textStyle: {
                            color: 'white',
                            fontWeight: 'normal',
                            fontSize: 14
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b} : {c} ({d}%)"
                    },
                    series: [
                        {
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '54%'],
                            startAngle: -29,
                            labelLine: {
                                normal: {
                                    length: 20,
                                    length2: 15
                                }
                            },
                            itemStyle: {
                                normal: {
                                    borderWidth: '-1'
                                },
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                }
            }
        },
        filters: {
            flatNum(val) {
                let t = val
                if (t > 100000000) {
                    t = (t / 100000000).toString()
                    if (t.indexOf('.') > 0) {
                        t = t.substr(0, 5)
                    } else {
                        if (t.length < 4) {
                            t = t + '.'
                            for (let m = 0; m < (4 - t.length); m++) {
                                t += '0'
                            }
                        }
                    }
                    return t + '亿'
                } else {
                    t = (t / 10000).toString()
                    if (t.indexOf('.') > 0) {
                        if (t > 1000) {
                            t = t.substr(0, 4)
                        } else {
                            t = t.substr(0, 5)
                        }
                    } else {
                        if (t.length < 4) {
                            t = t + '.'
                            for (let m = 0; m < (4 - t.length); m++) {
                                t += '0'
                            }
                        }
                    }
                    return t + '万'
                }
            }
        },
        mounted() {
            mAjax(this, {
                url: API.total_account,
                success: data => {
                    this.data = data
                    this.topAll = data.topAll
                    this.topNew = data.topNew
                    let data1 = [], data2 = []
                    data.allAccountList.forEach((el, index) => {
                        data1.push({
                            value: el.value,
                            name: el.name,
                            itemStyle: {
                                normal: {
                                    color: this.color1[index]
                                }
                            }
                        })
                    })
                    data.newAccountList.forEach((el, index) => {
                        data2.push({
                            value: el.value,
                            name: el.name,
                            itemStyle: {
                                normal: {
                                    color: this.color2[index]
                                }
                            }
                        })
                    })
                    this.render1(data1)
                    this.render2(data2)
                }
            })
        },
        methods: {
            render1(data) {
                let obj = Object.assign({}, this.defaultOpt)
                obj.title.title = '账户总存量占比'
                obj.series[0].data = data
                let chart = echarts.init(document.querySelector('#total_account1'))
                chart.setOption(obj)
            },
            render2(data) {
                let obj = Object.assign({}, this.defaultOpt)
                obj.title.title = '昨日账号新增量占比'
                obj.series[0].data = data
                let chart = echarts.init(document.querySelector('#total_account2'))
                chart.setOption(obj)
            }
        }
    }

</script>