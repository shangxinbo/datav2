<template>
    <div class="warp-background">
        <div class="logo"><img :src="logo" /></div>
        <video id="vid" class="background" autoplay="autoplay" loop>
            <source id="vid_source" :src="video" type="video/mp4" />
        </video>
    </div>
</template>
<script>
    import logo from 'assets/img/logo.png' 
    import video from 'assets/video/background.mp4'
    export default {
        data(){
            return {
                logo,
                video
            }
        }
    }
</script>