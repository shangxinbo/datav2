<template>
    <div class="system-warp">
        <div class="system">
            <img class="bg" src="img/good-chart.png" />
            <div class="system-content">
                <h2>集奥聚合产品体系</h2>
                <img class="planet-line" src="img/planet-line01.png" />
                <div class="system-planet-warp">
                    <iframe class="planet-iframe" allowtransparency="true" src="planet/planet-middle.html"></iframe>
                    <div class="satellite">
                        <span></span>
                    </div>
                    <div class="system-icon">
                        <img src="img/system-icon01.png" />
                    </div>
                </div>
                <div class="planet-left">
                    <iframe class="planet-iframe" allowtransparency="true" src="planet/planet-left.html"></iframe>
                    <h3>营销产品</h3>
                    <div class="system-icon">
                        <img src="img/system-icon02.png" />
                    </div>
                </div>
                <div class="planet-right">
                    <iframe class="planet-iframe" allowtransparency="true" src="planet/planet-right.html"></iframe>
                    <h3>风控产品</h3>
                    <div class="system-icon">
                        <img src="img/system-icon03.png" />
                    </div>
                </div>
                <div class="system-left">
                    <img class="line" src="img/planet-line02.png" />
                    <div class="small-planet-warp">
                        <strong>画像描述</strong>
                        <div class="small-planet">
                            <span></span>
                        </div>
                        <div class="system-icon">
                            <img src="img/system-icon04.png" />
                        </div>
                    </div>
                    <div class="small-planet-warp">
                        <strong>方舟</strong>
                        <div class="small-planet">
                            <span></span>
                        </div>
                        <div class="system-icon">
                            <img src="img/system-icon05.png" />
                        </div>
                    </div>
                    <div class="small-planet-warp">
                        <strong>易获客</strong>
                        <div class="small-planet">
                            <span></span>
                        </div>
                        <div class="system-icon">
                            <img style="margin: -3px -4px 0 0;" src="img/system-icon06.png" />
                        </div>
                    </div>
                    <div class="small-planet-warp">
                        <strong>网络广告投放</strong>
                        <div class="small-planet">
                            <span></span>
                        </div>
                        <div class="system-icon">
                            <img style="margin: 0 -4px -6px 0;" src="img/system-icon07.png" />
                        </div>
                    </div>
                </div>
                <div class="system-right">
                    <img class="line" src="img/planet-line03.png" />
                    <div class="small-planet-warp">
                        <strong>反欺诈</strong>
                        <div class="small-planet">
                            <span></span>
                        </div>
                        <div class="system-icon">
                            <img src="img/system-icon08.png" />
                        </div>
                    </div>
                    <div class="small-planet-warp">
                        <strong>贷前信用评估</strong>
                        <div class="small-planet">
                            <span></span>
                        </div>
                        <div class="system-icon">
                            <img style="margin: 0 -5px -4px 0;" src="img/system-icon09.png" />
                        </div>
                    </div>
                    <div class="small-planet-warp">
                        <strong>贷后风险监控</strong>
                        <div class="small-planet">
                            <span></span>
                        </div>
                        <div class="system-icon">
                            <img src="img/system-icon10.png" />
                        </div>
                    </div>
                    <div class="small-planet-warp">
                        <strong>逾期风险管理</strong>
                        <div class="small-planet">
                            <span></span>
                        </div>
                        <div class="system-icon">
                            <img style="margin: 0 0 0 -5px;" src="img/system-icon11.png" />
                        </div>
                    </div>
                    <div class="small-planet-warp">
                        <strong>风险规则建设</strong>
                        <div class="small-planet">
                            <span></span>
                        </div>
                        <div class="system-icon">
                            <img src="img/system-icon12.png" />
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
    import welcome from 'assets/img/welcome.png'
    export default {
        data() {
            return {
                welcome
            }
        }
    }

</script>
