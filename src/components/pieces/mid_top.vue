<template>
    <li>
        <div class="main">
            <div id="index_map" class="map-user-content">
                <div class="text-number" v-show="province">
                    <h2>{{province}}本日访问量</h2>
                    <p class="number">
                        <span class="big">123,123,123</span>
                    </p>
                </div>
                <div class="text-number" v-show="province">
                    <h2>{{province}}本日用户量</h2>
                    <p class="number">
                        <span class="big">123,123,123</span>
                    </p>
                </div>
            </div>
            <div class="map-user-button">
                <a :class="{active:type==1}" href="javascript:void(0);">金融</a>
                <a :class="{active:type==2}" href="javascript:void(0);">房产</a>
                <a :class="{active:type==3}" href="javascript:void(0);">汽车</a>
                <a :class="{active:type==4}" href="javascript:void(0);">教育</a>
                <a :class="{active:type==5}" href="javascript:void(0);">社交</a>
            </div>
            <div class="map-user-chart">
                <div style="width:100%;height:100%;"></div>
            </div>
            <ul class="portrait-warp">
                <li>
                    <span class="point"></span>
                    <span class="point"></span>
                    <div class="top-line">
                        <em v-for="n in 13"></em>
                    </div>
                    <img src="../../assets/img/boy01.png" />
                    <div class="map-user-data">
                        <p>
                            <span>性别：</span>
                            <em>男</em>
                            <span>年龄：</span>
                            <em>23</em>
                        </p>
                        <div class="tag">
                            <strong style="color:rgba(0,255,255,1)" title="">asdf</strong>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </li>
</template>
<script>
    import echarts from 'echarts'
    import china from 'assets/js/china.json'
    import { province } from 'assets/js/province.json'
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'

    echarts.registerMap('china', china)

    export default {
        data() {
            return {
                type: 1,
                data: {},
                provinces: [],
                cur_province: ''
            }
        },
        watch: {
            type(newVal, oldVal) {
                //切换tab
            }
        },
        methods: {
            getData() {
                let type = this.type
                mAjax(this, {
                    url: API.map_user,
                    data: {
                        type: this.type
                    },
                    success: data => {
                        this.data = data.pros
                        for (var i in this.data) {
                            this.provinces.push(i)
                        }
                        this.cur_province = this.provinces[0]
                    }
                })
            },
            getProvinceName(pinyin) {
                for (var i = 0; i < province.length; i++) {
                    if (province[i].value == pinyin) {
                        return province[i].name
                    }
                }
                return false
            },
            getProvincePinyin(name) {
                for (var i = 0; i < province.length; i++) {
                    if (province[i].name == name) {
                        return province[i].value
                    }
                }
                return false
            }
        },
        mounted() {
            this.getData()
            let mapCont = document.querySelector('.map-user-chart>div')
            let map = echarts.init(mapCont)
            map.setOption({
                grid: {
                    left: 'left'
                },
                series: [
                    {
                        type: 'map',
                        map: 'china',
                        roam: false,
                        top: 40,
                        itemStyle: {
                            normal: {
                                areaColor: '#031c31',
                                borderColor: '#0e6893',
                                borderWidth: 2,
                                opacity: 0.8
                            },
                            emphasis: {
                                areaColor: 'rgba(0,208,227,0.7)'
                            }
                        },
                        slient: true,
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        data: province
                    }
                ]
            })
        }
    }

</script>