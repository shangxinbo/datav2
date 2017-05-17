<template>
    <div class="system-warp">
        <div class="system">
            <img class="bg" :src="bg" />
            <div class="system-content">
                <h2>集奥聚合产品体系</h2>
                <img class="planet-line" :src="planetLine1" />
                <div class="system-planet-warp">
                    <iframe class="planet-iframe" allowtransparency="true" src="/static/planet/planet-middle.html"></iframe>
                    <div class="satellite">
                        <span></span>
                    </div>
                    <div class="system-icon">
                        <img :src="systemIcon1" />
                    </div>
                </div>
                <div class="planet-left">
                    <iframe class="planet-iframe" allowtransparency="true" src="/static/planet/planet-left.html"></iframe>
                    <h3>营销产品</h3>
                    <div class="system-icon">
                        <img :src="systemIcon2" />
                    </div>
                </div>
                <div class="planet-right">
                    <iframe class="planet-iframe" allowtransparency="true" src="/static/planet/planet-right.html"></iframe>
                    <h3>风控产品</h3>
                    <div class="system-icon">
                        <img :src="systemIcon3" />
                    </div>
                </div>
                <div class="system-left">
                    <img class="line" :src="planetLine2" />
                    <div class="small-planet-warp">
                        <strong>画像描述</strong>
                        <div class="small-planet">
                            <span></span>
                        </div>
                        <div class="system-icon">
                            <img :src="systemIcon4" />
                        </div>
                    </div>
                    <div class="small-planet-warp">
                        <strong>方舟</strong>
                        <div class="small-planet">
                            <span></span>
                        </div>
                        <div class="system-icon">
                            <img :src="systemIcon5" />
                        </div>
                    </div>
                    <div class="small-planet-warp">
                        <strong>易获客</strong>
                        <div class="small-planet">
                            <span></span>
                        </div>
                        <div class="system-icon">
                            <img style="margin: -3px -4px 0 0;" :src="systemIcon6" />
                        </div>
                    </div>
                    <div class="small-planet-warp">
                        <strong>网络广告投放</strong>
                        <div class="small-planet">
                            <span></span>
                        </div>
                        <div class="system-icon">
                            <img style="margin: 0 -4px -6px 0;" :src="systemIcon7" />
                        </div>
                    </div>
                </div>
                <div class="system-right">
                    <img class="line" :src="planetLine3" />
                    <div class="small-planet-warp">
                        <strong>反欺诈</strong>
                        <div class="small-planet">
                            <span></span>
                        </div>
                        <div class="system-icon">
                            <img :src="systemIcon8" />
                        </div>
                    </div>
                    <div class="small-planet-warp">
                        <strong>贷前信用评估</strong>
                        <div class="small-planet">
                            <span></span>
                        </div>
                        <div class="system-icon">
                            <img style="margin: 0 -5px -4px 0;" :src="systemIcon9" />
                        </div>
                    </div>
                    <div class="small-planet-warp">
                        <strong>贷后风险监控</strong>
                        <div class="small-planet">
                            <span></span>
                        </div>
                        <div class="system-icon">
                            <img :src="systemIcon10" />
                        </div>
                    </div>
                    <div class="small-planet-warp">
                        <strong>逾期风险管理</strong>
                        <div class="small-planet">
                            <span></span>
                        </div>
                        <div class="system-icon">
                            <img style="margin: 0 0 0 -5px;" :src="systemIcon11" />
                        </div>
                    </div>
                    <div class="small-planet-warp">
                        <strong>风险规则建设</strong>
                        <div class="small-planet">
                            <span></span>
                        </div>
                        <div class="system-icon">
                            <img :src="systemIcon12" />
                        </div>
                    </div>
                </div>
                <div class="system-number left">
                    <h3>近7天风控产品调用量</h3>
                    <p>
                        <span class="num7"></span>
                        <span class="num0"></span>
                        <span class="num7"></span>
                        <em>,</em>
                        <span class="num7"></span>
                        <span class="num0"></span>
                        <span class="num7"></span>
                        <em>,</em>
                        <span class="num7">7</span>
                        <span class="num0">0</span>
                        <span class="num7">7</span>
                    </p>
                </div>
                <div class="system-number right">
                    <h3>近7天风控产品调用量</h3>
                    <p>
                        <span class="num7"></span>
                        <span class="num0"></span>
                        <span class="num7"></span>
                        <em>,</em>
                        <span class="num7"></span>
                        <span class="num0"></span>
                        <span class="num7"></span>
                        <em>,</em>
                        <span class="num7"></span>
                        <span class="num0"></span>
                        <span class="num7"></span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import bg from 'assets/img/good-chart.png'
    import planetLine1 from 'assets/img/planet-line01.png'
    import planetLine2 from 'assets/img/planet-line02.png'
    import planetLine3 from 'assets/img/planet-line03.png'
    import systemIcon1 from 'assets/img/system-icon01.png'
    import systemIcon2 from 'assets/img/system-icon02.png'
    import systemIcon3 from 'assets/img/system-icon03.png'
    import systemIcon4 from 'assets/img/system-icon04.png'
    import systemIcon5 from 'assets/img/system-icon05.png'
    import systemIcon6 from 'assets/img/system-icon06.png'
    import systemIcon7 from 'assets/img/system-icon07.png'
    import systemIcon8 from 'assets/img/system-icon08.png'
    import systemIcon9 from 'assets/img/system-icon09.png'
    import systemIcon10 from 'assets/img/system-icon10.png'
    import systemIcon11 from 'assets/img/system-icon11.png'
    import systemIcon12 from 'assets/img/system-icon12.png'
    export default {
        data() {
            return {
                bg,
                planetLine1,
                planetLine2,
                planetLine3,
                systemIcon1,
                systemIcon2,
                systemIcon3,
                systemIcon4,
                systemIcon5,
                systemIcon6,
                systemIcon7,
                systemIcon8,
                systemIcon9,
                systemIcon10,
                systemIcon11,
                systemIcon12,
            }
        }
    }

</script>