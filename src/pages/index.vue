<template>
<!-- 入口 -->
    <div>
        <my-header></my-header>
        <router-view></router-view>
        <my-footer></my-footer>
    </div>
</template>
<script>
import myHeader from '@/components/header.vue'
import myFooter from '@/components/footer.vue'
export default {
    components:{myHeader,myFooter}
}
</script>