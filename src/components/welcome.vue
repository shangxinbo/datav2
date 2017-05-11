<template>
    <div class="welcome-warp active">
        <img :src="welcome" />
    </div>
</template>
<script>
    import welcome from 'assets/img/welcome.png'
    export default {
        data(){
            return {
                welcome
            }
        }
    }
</script>