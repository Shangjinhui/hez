<template>
    <div>
        <img class="auto" src="@/assets/img/empty.png" alt="">
        <p class="col366157 fsize14 center mt15">{{text}}</p>
    </div>
</template>
<script>
export default {
    props:{
        text:{
            type:String,
            default:'暂无相关数据，趁年轻要多读书哦～'
        }
    }
}
</script>
