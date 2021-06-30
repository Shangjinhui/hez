<template>
    <div>
        <img v-if="home" class="icon-dl" src="@/assets/img/lingdang.png" alt="">
        <div v-else class="back cursor" @click="toBack">
            <p class="col011d17 fsize12 center">返回</p>
        </div>
    </div>
    
</template>
<script>
export default {
    data(){
        return {
            home:false
        }
    },
    methods:{
        toBack(){
            this.$router.go(-1);
        }
    },
    created(){
        let white = ['studentList'],name = this.$route.name
        this.home = white.indexOf(name)==-1?false:true
    }
}
</script>
<style lang="scss" scoped>
.icon-dl{
    width:41px;
    height:60px;
    position: absolute;
    right: -12px;
    top: 30px;
}
.back{
    width:42px;
    height:229px;
    background:url('../assets/img/back-bg.png') no-repeat;
    position: absolute;
    right: 0;
    top: 30px;
    p{
        padding-top: 66px;
        writing-mode: vertical-rl;
        margin-left: 10px;
    }
}
</style>