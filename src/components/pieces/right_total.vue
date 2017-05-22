<template>
    <li>
        <div class="video-data">
            <video id="video2" loop preload="auto">
                <source :src="video" type="video/mp4" />
            </video>
            <div class="video-data-content" v-if="play">
                <div class="text-number">
                    <h2>总用户量</h2>
                    <p class="number">
                        <span class="big">
                            <i>{{info.account}}</i>亿</span>
                    </p>
                </div>
                <div class="text-number">
                    <h2>标签总数</h2>
                    <p class="number">
                        <span class="big">
                            <i>{{info.tags}}</i>亿</span>
                    </p>
                </div>
                <div class="text-number">
                    <h2>标签体系数</h2>
                    <p class="number">
                        <span class="big">
                            <i>{{info.tagClass}}</i>万</span>
                    </p>
                </div>
                <div class="text-number">
                    <h2>总数据量</h2>
                    <p class="number">
                        <span class="big">
                            <i>{{info.data}}</i>TB</span>
                    </p>
                </div>
                <div class="text-number">
                    <h2>吞吐量</h2>
                    <p class="number">
                        <span class="big">
                            <i>{{info.inoff}}</i>TB</span>
                    </p>
                </div>
                <div class="text-number">
                    <h2>每天计算数据量</h2>
                    <p class="number">
                        <span class="big">
                            <i>{{info.compute}}</i>TB</span>
                    </p>
                </div>
            </div>
        </div>
    </li>
</template>
<script>
    import video from 'assets/video/data.mp4'
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    export default {
        data() {
            return {
                video: video,
                info: {},
                play: false
            }
        },
        mounted() {
            let mp4 = document.querySelector('#video2')
            let _this = this
            mp4.pause()
            mAjax(this, {
                url: API.video_data,
                success: data => {
                    this.info = data
                    this.play = true
                    let mp4 = document.querySelector('#video2')
                    mp4.currentTime = 0
                    mp4.play()
                },
                error: err => {
                    console.log(err)
                }
            }),
            this.$on('restart',this.restart)
        },
        methods:{
            restart(){
                let mp4 = document.querySelector('#video2')
                mp4.currentTime = 0
                this.play = true
            }
        }
    }

</script>