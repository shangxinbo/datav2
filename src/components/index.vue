<template>
    <div class="warp-content">
        <ul class="warp-content-right">
            <rightPiece1></rightPiece1>
            <rightPiece2></rightPiece2>
        </ul>
        <ul class="warp-content-middle">
            <midTop></midTop>
            <midAccount></midAccount>
            <midMobile></midMobile>
        </ul>
        <ul class="warp-content-left">
            <li>
                <div class="main">
                    <h1>标签体系</h1>
                    <div id="force-button" class="force-button">
                        <a data-id="1" class="active" href="javascript:void(0);">新闻资讯</a>
                        <a data-id="2" href="javascript:void(0);">金融|投资</a>
                        <a data-id="12" href="javascript:void(0);">金融|理财</a>
                        <a data-id="11" href="javascript:void(0);">金融|保险</a>
                        <a data-id="9" href="javascript:void(0);">金融|贷款</a>
                        <a data-id="10" href="javascript:void(0);">金融|银行</a>
                        <a data-id="3" href="javascript:void(0);">金融|信用卡</a>
                        <a data-id="4" href="javascript:void(0);">电商</a>
                        <a data-id="5" href="javascript:void(0);">汽车</a>
                        <a data-id="6" href="javascript:void(0);">教育</a>
                        <a data-id="7" href="javascript:void(0);">房产家居</a>
                        <a data-id="8" href="javascript:void(0);">社交</a>
                    </div>
                    <div id="force" class="force-chart">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"></svg>
                    </div>
                </div>
            </li>
            <li id="piece4">
                <div class="main" style="display:none;">
                    <h1>各省投资消费占比</h1>
                    <div class="scatter-chart-warp">
                        <div id="scatter"></div>
                    </div>
                    <div class="scatter-right">
                        <div class="title">
                            <h5>
                                <span>贷款/信用卡消费</span>(日均占比)</h5>
                            <h5>
                                <span>投资理财</span>(日均占比)</h5>
                        </div>
                        <ul class="scatter-data">
                        </ul>
                    </div>
                </div>
                <iframe src="http://www.geotmt.com/index.php?m=content&c=index&a=lists&catid=52"></iframe>
            </li>
        </ul>
    </div>
</template>
<script>
    import rightPiece2 from 'components/pieces/right_total'
    import rightPiece1 from 'components/pieces/right_chord'
    import midTop from 'components/pieces/mid_top'
    import midAccount from 'components/pieces/mid_account'
    import midMobile from 'components/pieces/mid_mobile'
    export default {
        components:{
            rightPiece1,
            rightPiece2,
            midTop,
            midAccount,
            midMobile
        }
    }
</script>