<template>
    <div class="container pt50 pb45 flex-top-center">
        <div class="main-out flex-top">
            <my-side></my-side>
            <div class="main rel">
                <p class="fsize18 colfff pt23 lh30 center">生理健康</p>
                <div class="pt25 pl70 pr70">
                    <p class="fsize16 center">测量日期：{{detail.testTime}}</p>
                    <div class="wid978 auto mt55 rel fsize14">
                        <img class="wid225 h300 auto" src="@/assets/img/icon-body.png" alt="">
                        <!-- <div class="index-bg wid148 h40 flex-center abs l244 t-18">听力：{{detail.hearing==1?'不正常':'正常'}}</div> -->
                        <div class="index-bg wid148 h40 flex-center abs l244 t-18">身高：{{detail.height}}cm</div>
                        <div class="line1 wid85 h18 abs l390 t0">
                            <img class="wid18 h18 abs r-10 b-10" src="@/assets/img/point.png" alt="">
                        </div>
                        <div class="index-bg wid194 h70 flex-center abs r210 t2"><p>视力：左眼{{detail.visionLeft}}，右眼{{detail.visionRight}}<br>色弱：<span class="colbe7a01">{{detail.achromatism==1?'是':'否'}}</span></p></div>
                        <div class="line2 wid75 h18 abs r405 t10">
                            <img class="wid18 h18 abs l-10 t-5" src="@/assets/img/point.png" alt="">
                        </div>

                        <!-- <div class="index-bg wid160 h40 flex-center abs l190 t160">胸围：{{detail.bust}}cm</div> -->
                        <div class="index-bg wid194 h70 flex-center abs l156 t160">
                            <div>
                                <p>肺活量：{{detail.vitalCapacity}}毫升</p>
                                <p>【 
                                    <img v-if="detail.vitalCapacityCompare>0" class="inline" src="@/assets/img/up2.png" alt="">
                                    <img v-if="detail.vitalCapacityCompare<0" class="inline" src="@/assets/img/down2.png" alt="">
                                     {{detail.vitalCapacityCompare}}毫升 】</p>
                            </div>
                        </div>
                        <div class="line3 wid124 h120 abs l350 t60">
                            <img class="wid18 h18 abs r-10 t0" src="@/assets/img/point.png" alt="">
                        </div>
                        <!-- <div class="index-bg wid130 h40 flex-center abs r255 t145">腹围：{{detail.ac}}cm</div> -->
                        <div class="index-bg wid194 h70 flex-center abs r190 t145">
                            <div>
                                <p>体重：{{detail.weight}}kg</p>
                                <p>【 
                                    <img v-if="detail.weightCompare>0" class="inline" src="@/assets/img/up2.png" alt="">
                                    <img v-if="detail.weightCompare<0" class="inline" src="@/assets/img/down2.png" alt="">
                                     {{detail.weightCompare}}kg 】</p>
                            </div>
                        </div>
                        <div class="line4 wid102 h70 abs r370 t110">
                            <img class="wid18 h18 abs l-10 t-5" src="@/assets/img/point.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="block wid1002 h100 auto mt36 flex-center fsize14" v-if="detail.bmiType==1">总体评估：身体状况属于【<span class="colbe7a01">偏瘦</span>】，注意增加食物品种，均衡饮食，样样都吃，保证营养充足。</div>
                <div class="block wid1002 h100 auto mt36 flex-center fsize14" v-else-if="detail.bmiType==2">总体评估：身体状况属于【<span class="colbe7a01">正常</span>】，身体状况非常好，继续健康饮食保持身材！</div>
                <div class="block wid1002 h100 auto mt36 flex-center fsize14" v-else-if="detail.bmiType==3">总体评估：身体状况属于【<span class="colbe7a01">过重</span>】，从现在开始，必须要多运动消耗热量，控制睡前不要吃东西，早睡早起。</div>
                <div class="block wid1002 h100 auto mt36 flex-center fsize14" v-else-if="detail.bmiType==4">总体评估：身体状况属于【<span class="colbe7a01">肥胖</span>】，建议先到医院检查一下，多喝水多运动，配合医生进行减肥，坚持下去，相信很快就能摆脱肥胖走向健康的。</div>
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
                url:'api/bodyHealth/detailByStuId',
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
.line1,.line2,.line3,.line4{
    img{
        animation: myScale 1.5s infinite;
    }
}
.line1{
    background:url('../assets/img/line1.png') no-repeat;
}
.line2{
    background:url('../assets/img/line2.png') no-repeat;
}
.line3{
    background:url('../assets/img/line3.png') no-repeat;
}
.line4{
    background:url('../assets/img/line4.png') no-repeat;
}
@keyframes myScale{
    0%{
        transform: scale(1);
    }
    50%{
        transform: scale(1.2);
    }
    100%{
        transform: scale(1);
    }
}
</style>