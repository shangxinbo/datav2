<style lang="less">
    @import 'assets/less/common.less';
</style>
<template>
    <div style="height:100%;width:100%;">
        <div class="warp">
            <!--<welcome :class="{active:page==1}"></welcome>-->
            <index :class="{active:page==1}"></index>
            <pic1 :class="{active:page==3}"></pic1>
            <pic2 :class="{active:page==4}"></pic2>
            <pic3 :class="{active:page==5}"></pic3>
        </div>
        <back-video></back-video>
    </div>
</template>
<script>
    import welcome from 'src/components/welcome'
    import index from 'src/components/index'
    import backVideo from 'src/components/backVideo'
    import pic1 from 'src/components/pic1'
    import pic2 from 'src/components/pic2'
    import pic3 from 'src/components/pic3'

    export default {
        data() {
            return {
                page: 1
            }
        },
        mounted() {
            document.addEventListener('keyup', evt => {
                let totalPage = document.querySelectorAll('.warp>div').length
                if (evt.keyCode == 37 || evt.keyCode == 38) {
                    if (this.page <= 1) {
                        this.page = totalPage
                    } else {
                        this.page--
                    }
                    event.stopPropagation()
                    event.preventDefault()
                }
                if (evt.keyCode == 39 || evt.keyCode == 40) {
                    if (this.page >= totalPage) {
                        this.page = 1
                    } else {
                        this.page++
                    }
                    event.stopPropagation()
                    event.preventDefault()
                }
            })
        },
        components: {
            welcome,
            index,
            backVideo,
            pic1,
            pic2,
            pic3
        }
    }

</script>