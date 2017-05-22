<style scoped>
    .fade1-leave-active {
        transition: opacity 0.5s, margin-top 0.5s;
        opacity: 0;
        margin-top: -25px;
    }

    .fade1-enter-active {
        opacity: 1;
        margin-top: 0px;
    }

    .fade2-enter-active {
        transition: opacity 0.5s, margin-top 0.5s;
        opacity: 1;
        margin-top: 0px
    }

    .fade2-leave-active {
        opacity: 0;
        margin-top: 25px
    }
</style>
<template>
    <li>
        <div class="main">
            <div id="index_map" class="map-user-content">
                <div class="text-number" v-show="cur_province">
                    <h2>
                        <transition name="fade1">
                            <span ref="pre1" v-show="pv_animate1">{{pre_province}}本日访问量</span>
                        </transition>
                        <transition name="fade2" @after-enter="aniend">
                            <span ref="next1" v-show="pv_animate2">{{next_province}}本日访问量</span>
                        </transition>
                    </h2>
                    <p class="number">
                        <count class="big" :num="pv"></count>
                    </p>
                </div>
                <div class="text-number" v-show="cur_province">
                    <h2>
                        <transition name="fade1">
                            <span ref="pre1" v-show="pv_animate1">{{pre_province}}本日用户量</span>
                        </transition>
                        <transition name="fade2" @after-enter="aniend">
                            <span ref="next1" v-show="pv_animate2">{{next_province}}本日用户量</span>
                        </transition>
                    </h2>
                    <p class="number">
                        <count class="big" :num="uv"></count>
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
                <div style="width:540px;height:385px;"></div>
            </div>
            <ul class="portrait-warp">
                <li v-for="(item,index) in userLists">
                    <span class="point"></span>
                    <span class="point"></span>
                    <div class="top-line">
                        <em v-for="n in 13"></em>
                    </div>
                    <protrait :sex="item.sex+item.userid"></protrait>
                    <div class="map-user-data">
                        <p>
                            <span>性别：</span>
                            <em>{{item.sex}}</em>
                            <span>年龄：</span>
                            <em>{{item.age}}</em>
                        </p>
                        <div class="tag">
                            <strong v-for="tag in item.tags1" style="color:rgba(0,255,255,1)" title="tag">{{tag}}</strong>
                            <strong v-for="tag in item.tags2" style="color:rgba(0,255,255,0.5)" title="tag">{{tag}}</strong>
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
    import count from 'components/utils/count'
    import protrait from 'components/utils/protrait'

    echarts.registerMap('china', china)

    export default {
        data() {
            return {
                type: 1,
                data: {},
                provinces: [],     //所有有数据的省份拼音集合
                cur_province: '',  //当前省份
                pre_province: '',
                next_province: '',
                userLists: [],      //显示的用户列表
                pv: 0,
                uv: 0,
                timer: {
                    type: null,
                    province: null
                },
                map: null,
                pv_animate1: true,
                pv_animate2: false
            }
        },
        components: {
            count,
            protrait
        },
        watch: {
            type(newVal, oldVal) {
                //切换tab
                this.getData()
            },
            cur_province(newVal, oldVal) {
                //切换省份
                this.changeUsers()
                this.changeTitle()
                this.changeMap()
            }
        },
        methods: {
            getData() {
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
                        let index = 0
                        this.cur_province = this.provinces[index]

                        this.timer.province = setInterval(() => {
                            if (index < this.provinces.length - 1) {
                                index++
                            } else {
                                index = 0
                            }
                            this.cur_province = this.provinces[index]
                        }, 5000)
                    }
                })
            },
            getProvinceName(pinyin) {
                for (let i = 0; i < province.length; i++) {
                    if (province[i].value == pinyin) {
                        return province[i].name
                    }
                }
                return false
            },
            changeUsers() {
                let users = this.data[this.cur_province].users
                let man = [], woman = []
                let rand1 = Math.random()
                users.forEach(el => {
                    if (el.sex == '女') {
                        woman.push(el)
                    } else {
                        man.push(el)
                    }
                })
                if (rand1 > 0.5) {
                    this.userLists = [woman[0], man[0], man[1], woman[1]]
                } else {
                    this.userLists = [man[0], woman[0], woman[1], man[1]]
                }
            },
            changeTitle() {

                this.next_province = this.getProvinceName(this.cur_province)
                this.pv_animate1 = false
                this.pv_animate2 = true
                this.pv = this.data[this.cur_province].pv
                this.uv = this.data[this.cur_province].uv
            },
            changeMap() {
                let name = this.getProvinceName(this.cur_province)
                this.map.setOption({
                    series: {
                        data: [
                            { name: name, value: 2134, selected: true }
                        ]
                    }
                })
            },
            aniend() {
                this.pre_province = this.getProvinceName(this.cur_province)
                this.pv_animate2 = false
                this.pv_animate1 = true
            }
        },
        mounted() {
            let mapCont = document.querySelector('.map-user-chart>div')
            this.map = echarts.init(mapCont)
            this.map.setOption({
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
                        data: province,
                        zlevel: 20
                    }
                ]
            })
            this.getData()
        }
    }

</script>