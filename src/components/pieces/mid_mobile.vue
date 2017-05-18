<template>
    <li>
        <div class="main">
            <h1 class="small">分地域手机总用户</h1>
            <div class="area-user-content" v-if="data.length>0">
                <div class="text-number">
                    <h2>{{data[0].name}}</h2>
                    <p class="number">
                        <span class="big">{{data[0].value}}</span>
                    </p>
                </div>
                <div class="text-number">
                    <h2>{{data[1].name}}</h2>
                    <p class="number">
                        <span class="big">{{data[1].value}}</span>
                    </p>
                </div>
                <div class="text-number">
                    <h2>{{data[2].name}}</h2>
                    <p class="number">
                        <span class="big">{{data[2].value}}</span>
                    </p>
                </div>
            </div>
            <div class="area-user-chart">
                <div id="area_user" style="width:652px;height:432px;"></div>
            </div>
        </div>
    </li>
</template>
<script>
    import { mAjax, numberFormatter } from 'src/services/functions'
    import API from 'src/services/api'
    import echarts from 'echarts'
    import GeoMap from 'assets/js/GeoMap.json'
    export default {
        data() {
            return {
                data:[]
            }
        },
        mounted() {
            mAjax(this, {
                url: API.area_user,
                success: data => {
                    this.data = data.stat.sort((a,b)=>{
                        return b.value -a.value
                    }).slice(0,3)
                    let res = []
                    data.stat.forEach(el => {
                        let geoCoord = GeoMap[el.name]
                        if (geoCoord) {
                            res.push({
                                name: el.name,
                                value: geoCoord.concat(el.value)
                            })
                        }
                    })
                    this.render(res)
                }
            })
        },
        methods: {
            render(data) {
                data = data.sort((a,b)=>{
                    return b.value[2] - a.value[2]
                })
                let opt = {
                    tooltip: {
                        trigger: 'item',
                        formatter: function (param) {
                            return param.data.name + ':' + numberFormatter(param.data.value[2])
                        }
                    },
                    geo: {
                        map: 'china',
                        label: {
                            emphasis: {
                                show: false   //显示省名
                            }
                        },
                        zoom: 0.9,
                        roam: false,         //放大缩小
                        itemStyle: {
                            normal: {
                                areaColor: '#003052',
                                borderColor: '#00091a',
                                borderWidth: 1
                            },
                            emphasis: {
                                areaColor: '#014e7b'
                            }
                        }
                    },
                    series: [
                        {
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: data,
                            symbolSize: function (val) {       //计算坐标点大小
                                return Math.sqrt(val[2]) / 115
                            },
                            label: {
                                normal: {
                                    show: false
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: 'rgba(0,255,204,0.84)'
                                }
                            }
                        },
                        {
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            data: data.slice(0,6),
                            symbolSize: function (val) {
                                return Math.sqrt(val[2]) / 115
                            },
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: 'rgba(0,255,204,0.84)',
                                    shadowBlur: 10,
                                    shadowColor: '#333'
                                }
                            },
                            zlevel: 1
                        }
                    ]
                }
                echarts.init(document.getElementById('area_user')).setOption(opt)
            }
        }
    }

</script>