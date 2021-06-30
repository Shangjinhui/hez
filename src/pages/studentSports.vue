<template>
    <div class="container pt50 pb45 flex-top-center">
        <div class="main-out flex-top">
            <my-side></my-side>
            <div class="main rel">
                <p class="fsize18 colfff pt23 lh30 center">体育健康</p>
                <div class="pt25 pl70 pr70">
                    <p class="fsize16 center">体侧日期：{{detail.testTime}}</p>
                    <div class="mt55 rel fsize14">
                        <img class="wid225 h300 auto" src="@/assets/img/icon-body.png" alt="">
                        <!-- <div class="index-bg wid148 h40 flex-center abs l260 t20">{{detail.height}}cm</div> -->
                        <div class="index-bg wid148 h40 flex-center abs l260 t20">50米跑：{{detail.runFifty}}秒</div>
                        <div class="index-bg wid194 h40 flex-center abs r210 t20">坐位体前屈：{{detail.sittingForward}}cm</div>
                        <div class="index-bg wid160 h70 flex-center abs l214 t96">
                            800/1000米：{{detail.longDistanceRun}}"
                            <!-- <div>
                                <p>体重：{{detail.weight}}kg</p>
                                <p>【 
                                    <img v-if="detail.weightCompare>0" class="inline" src="@/assets/img/up2.png" alt="">
                                    <img v-if="detail.weightCompare<0" class="inline" src="@/assets/img/down2.png" alt="">
                                     {{detail.weightCompare}}kg 】</p>
                            </div> -->
                        </div>
                        <div class="index-bg wid160 h70 pl10 pr10 flex-center abs r200 t96">
                            引体向上/仰卧起坐：{{detail.pullSitUp}}次
                            <!-- <div>
                                <p>肺活量：{{detail.vitalCapacity}}毫升</p>
                                <p>【 
                                    <img v-if="detail.vitalCapacityCompare>0" class="inline" src="@/assets/img/up2.png" alt="">
                                    <img v-if="detail.vitalCapacityCompare<0" class="inline" src="@/assets/img/down2.png" alt="">
                                     {{detail.vitalCapacityCompare}}毫升 】</p>
                            </div> -->
                        </div>
                        <div class="index-bg wid194 h40 flex-center abs l204 t220">立定跳远：{{detail.jump}}cm</div>
                        <!-- <div class="index-bg wid148 h40 flex-center abs r245 t220">50米跑：{{detail.runFifty}}秒</div> -->
                    </div>
                </div>
                <div class="block wid1002 h100 auto mt36 flex-center fsize14">总体评估：速度<span class="colbe7a01">{{detail.runFiftyLevel}}</span>，耐力<span class="colbe7a01">{{detail.longDistanceRunLevel}}</span>，柔韧<span class="colbe7a01">{{detail.sittingForwardLevel}}</span>，力量<span class="colbe7a01">{{detail.pullSitUpLevel}}</span></div>
                
                <my-back></my-back>
            </div>
        </div>
    </div>
</template>
<script>
import myBack from '@/components/back'
import mySide from '@/components/side'
export default {
    components:{myBack,mySide},
    data(){
        return {
            id:'',
            detail:{}
        }
    },
    mounted(){
        this.id = this.$route.query.id;
        this.getData();
    },
    methods:{
        getData(){
            this.$fetch({
                url:'api/sportsHealth/detailByStuId',
                data:{
                    stuId:this.id
                }
            }).then(res=>{
                if(res.flag){
                    this.detail = res.data;
                }
            })
        },
    }
}
</script>
<style lang="scss" scoped>
.index-bg{
    background:url('../assets/img/tag2-bg.png') 0 0/100% 100% no-repeat;
}
.block{
    background:url('../assets/img/tishi-bg.png') 0 0/100% 100% no-repeat;
}
</style>