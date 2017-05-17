<template>
    <span>{{show|format}}</span>
</template>
<script>
    export default {
        props: ['num'],
        data() {
            return {
                show: 0,
                during: 500
            }
        },
        watch: {
            num(newVal, oldVal) {
                let _this = this
                if (newVal > oldVal) {
                    let diff = newVal - _this.show
                    let ww = setInterval(() => {
                        let add = _this.show + Math.round(diff * 50 / _this.during)
                        if (newVal > add) {
                            _this.show = add
                        } else {
                            _this.show = newVal
                            clearInterval(ww)
                        }
                    }, _this.during / 50)
                } else {
                    let diff = _this.show - newVal
                    let ww = setInterval(() => {
                        let add = _this.show - Math.round(diff * 50 / _this.during)
                        if (newVal < add) {
                            _this.show = add
                        } else {
                            _this.show = newVal
                            clearInterval(ww)
                        }
                    }, _this.during / 50)
                }
            }
        },
        filters: {
            format(num) {
                return num.toString().split('').reverse().join('')
                    .replace(/(\d{3})/g, '$1,')
                    .replace(/\,$/, '')
                    .split('').reverse().join('')
            }
        }
    }

</script>