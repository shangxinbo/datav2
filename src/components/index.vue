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
            <leftTags></leftTags>
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
    import leftTags from 'components/pieces/left_tags'
    export default {
        components:{
            rightPiece1,
            rightPiece2,
            midTop,
            midAccount,
            midMobile,
            leftTags
        }
    }
</script>