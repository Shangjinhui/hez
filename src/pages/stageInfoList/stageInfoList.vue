<template>
    <div class="container pt50 pb45 flex-top-center">
        <div class="main-out flex-top">
            <my-side></my-side>
            <div class="main rel">
                <p class="fsize18 colfff pt23 lh30 center">录入信息</p>
                <div class="pt25 pl70 pr70">
                    <div class="flex-center">
                        <img class="wid1 flex-son h8 mr16" src="@/assets/img/icon-left.png" alt="">
                        <div class="btn wid111 lh36 center fsize14 col503925 cursor" :class="[{'on':tab==index},{'mr16':index!=tabList.length-1}]" v-for="(item,index) in tabList" :key="index" @click="changeNav(index)">{{item.name}}</div>
                        <img class="wid1 flex-son h8 ml16" src="@/assets/img/icon-right.png" alt="">
                    </div>
                    <!-- <keep-alive> -->
                        <!-- 基本信息 -->
                        <info-list  v-if="tab==0"></info-list>
                        <!-- 竞赛录入 -->
                        <race-list v-if="tab==1"></race-list>
                        <!-- 社会实践 -->
                        <practice-list v-if="tab==2"></practice-list>
                        <!-- 学科成绩 -->
                        <subject-list v-if="tab==3"></subject-list>
                        <!-- 体育成绩 -->
                        <sports-list v-if="tab==4"></sports-list>
                        <!-- 生理健康 -->
                        <physiology-list v-if="tab==5"></physiology-list>
                    <!-- </keep-alive> -->
                    
                </div>

                <my-back></my-back>
            </div>
        </div>
    </div>
</template>
<script>
import myBack from '@/components/back'
import mySide from '@/components/side'

import infoList from './components/infoList'
import raceList from './components/raceList'
import practiceList from './components/practiceList'
import subjectList from './components/subjectList'
import sportsList from './components/sportsList'
import physiologyList from './components/physiologyList'
export default {
    components:{myBack,mySide,infoList,raceList,practiceList,subjectList,sportsList,physiologyList},
    data(){
        return {
            tabList:[{name:'基本信息'},{name:'竞赛录入'},{name:'社会实践'},{name:'学科成绩'},{name:'体育成绩'},{name:'生理健康'}],
            tab:-1
        }
    },
    mounted(){
        this.tab = window.sessionStorage.getItem('input_nav')||0;
    },
    methods:{
        changeNav(ind){
            this.tab=ind;
            window.sessionStorage.setItem('input_nav',ind)
        }
    }
}
</script>
<style lang="scss" scoped>
.btn{
    background:url('../../assets/img/btn-bg2.png') 0 0/100% 100% no-repeat;
    &.on{
        background-image: url('../../assets/img/btns-bg2.png');
    }
}
// .block{
//     background:url('../assets/img/tishi-bg.png') 0 0/100% 100% no-repeat;
// }
</style>