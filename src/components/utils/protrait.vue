<template>
    <img :src="src" />
</template>
<script>
    import boy1 from 'assets/img/boy01.png'
    import boy2 from 'assets/img/boy02.png'
    import boy3 from 'assets/img/boy03.png'
    import boy4 from 'assets/img/boy04.png'
    import boy5 from 'assets/img/boy05.png'
    import boy6 from 'assets/img/boy06.png'
    import girl1 from 'assets/img/girl01.png'
    import girl2 from 'assets/img/girl02.png'
    import girl3 from 'assets/img/girl03.png'
    import girl4 from 'assets/img/girl04.png'
    import girl5 from 'assets/img/girl05.png'
    import girl6 from 'assets/img/girl06.png'
    export default {
        props: ['sex'],
        computed: {
            src() {
                let boysPic = [boy1, boy2, boy3, boy4, boy5, boy6]
                let girlsPic = [girl1, girl2, girl3, girl4, girl5, girl6]
                if (this.sex.indexOf('女') >= 0) {
                    return girlsPic[Math.floor(Math.random() * 6)]
                } else {
                    return boysPic[Math.floor(Math.random() * 6)]
                }
            }
        }
    }

</script>