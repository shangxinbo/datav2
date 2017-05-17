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
            <leftScatter></leftScatter>
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
    import leftScatter from 'components/pieces/left_scatter'
    export default {
        components:{
            rightPiece1,
            rightPiece2,
            midTop,
            midAccount,
            midMobile,
            leftTags,
            leftScatter
        }
    }
</script>