<template>
    <div class="h56 bg0b8066 flex-center rel">
        <div class="btn center pl15 pr15 flex-center cursor" :class="[{'on':item.id==nav}]" v-for="(item,index) in list" :key="index" @click="changeNav(item.id)">
            <img v-if="item.id==nav" src="@/assets/img/icons.png" alt="" srcset="">
            <img v-else src="@/assets/img/icon.png" alt="" srcset="">
            <span class="pl5 pr5">{{item.title}}</span>
            <img v-if="item.id==nav" src="@/assets/img/icons.png" alt="" srcset="">
            <img v-else src="@/assets/img/icon.png" alt="" srcset="">
        </div>

        <div class="abs-left pl15 flex abs l0 t0">
            <img src="@/assets/img/logo.png" alt="">
            <p class="fsize18 colfff ml10">杭州二中钱江学校学生画像系统</p>
        </div>

        <div class="abs-right flex h56 abs r22 t0">
            <img class="mr10 cursor" src="@/assets/img/zhinan.png" alt="" @click="openGuide">
            <div class="search-out pl15 pr15 flex" id="step2">
                <input class="wid100p h100p fsize12 col011d17 pr5 flex-son" type="text" v-model="keyWord" @change="Search" placeholder="根据学号、姓名搜索">
                <img class="cursor" src="@/assets/img/search.png" alt="">
            </div>
        </div>
        <!-- 引导遮罩 -->
        <div class="mask" v-if="showGuide">
            <!-- 第一部 -->
            <div v-if="step==0" class="step1 fixed colfff" :style="{'top':guideLoc[0].t+'px','left':guideLoc[0].l+'px'}">{{step1Name}}</div>
            <!-- 第二部 -->
            <div v-else-if="step==1" class="step2 fixed" :style="{'top':guideLoc[1].t+'px','left':guideLoc[1].l+'px'}">
                <div class="search-out pl15 pr15 flex">
                    <input class="wid100p h100p fsize12 col011d17 pr5 flex-son" type="text" disabled placeholder="根据学号、姓名搜索">
                    <img class="cursor" src="@/assets/img/search.png" alt="">
                </div>
            </div>
            <!-- 第三部 -->
            <div v-else-if="step==2" class="step3 fixed" :style="{'top':guideLoc[2].t+'px','left':guideLoc[2].l+'px'}">
                <div class="wid88 list">
                    <div class="wid100p h88 cursor avatar-out">
                        <img :src="step3Data.photo" alt="">
                    </div>
                    <p class="fsize12 mt8 center ellipsis1">{{step3Data.name||'姓名'}}</p>
                </div>
            </div>
            <!-- 第四部 -->
            <div v-show="step==3" class="step4 fixed" :style="{'top':guideLoc[3].t+'px','left':guideLoc[3].l+'px'}">
                <div>
                    <p class="base-title h30 lh30 wid274 fsize18 pl17 mb5">行为分析</p>
                    <div class="block wid274 h288 pt10" ref="guide-echarts-radar"></div>
                </div>
            </div>
            <!-- 提示 -->
            <div class="guide-toast abs loc-center col503925 pt44">
                <div class="wid30 h30 abs r80 t34 cursor" @click="closeGuide"></div>
                <img v-if="step==guideLoc.length-1" class="wid111 h36 abs l256 b50 cursor" src="@/assets/img/use-btn.png" alt="" @click="nextGuide">
                <img v-else class="wid111 h36 abs l256 b50 cursor" src="@/assets/img/next-btn.png" alt="" @click="nextGuide">

                <p class="fsize14 center pl32">操作指引</p>
                <p class="wid300 auto fsize14 mt20" v-if="step==0">进入页面后，页面左侧方展示的是学校下的所有年级班级：<br>
                    （1）点击选择不同的班级，则可查找出对应班级下的学生信息;</p>
                <p class="wid300 auto fsize14 mt20" v-else-if="step==1">（2）或者直接在搜索框内，直接输入某个学生的姓名和学号，可快算查找到对应的学生。
                    <br><br>可快算查找到对应的学生;</p>
                <p class="wid300 auto fsize14 mt20" v-else-if="step==2">进入页面后，页面左侧方展示的是学校下的所有年级班级：<br>
                    （3）找到想要查看的学生，选中某个学生进入学生档案详情页面，即可查看当前学生的基本信息、竞赛获奖情况、各维度行为分析信息</p>
                <p class="wid300 auto fsize14 mt20" v-else-if="step==3">进入学生详情页面后，该页面展示的是当前学生的基本信息、获得竞赛记录信息、多维度行为分析等；点击

行为分析不同的维度，可查看详细的分析情况</p>
            </div>

            <!-- 指示箭头 -->
            <img class="animation wid111 fixed" v-if="guideLoc[step]" :style="{'top':guideLoc[step].t+guideLoc[step].h+'px','left':guideLoc[step].l-30+'px'}" src="@/assets/img/guide.png" alt="">
        </div>
    </div>
</template>
<script>
import {IsStage} from '@/untils/until.js'
export default {
    data(){
        return {
            showGuide:false,
            step:0,                        //第n部
            guideLoc:[{l:'',t:'',h:''},{l:'',t:'',h:''},{l:'',t:'',h:''},{l:'',t:'',h:''}],       //引导区域位置
            list:[{title:'高一',id:'一'},{title:'高二',id:'二'},{title:'高三',id:'三'}],
            nav:'一',
            keyWord:'',

            options:{},          //第四部涉及到详情中的雷达图，重绘数据
        }
    },
    mounted(){
        this.nav = window.sessionStorage.getItem('grade')||'一';
        let white = ['/stageInfoList','/stageAddInfo','/stageAddRace'];
        if(white.indexOf(this.$route.path)==-1){
            this.showGuide = window.sessionStorage.getItem('guide')=='no'?false:true;
            if(this.showGuide&&this.$route.path!='/studentList') this.$router.push('/');
        }
        
        //
        // let timer = setTimeout(()=>{
        //     clearTimeout(timer);
        //     this.getGuideLoc();
        // },1000)
        this.getGuideLoc();
        window.addEventListener('resize',this.getGuideLoc)

        //第三部学生信息
        // this.$EventBus.$on('firstStudent',res=>{
        //     console.log(res,'EventBus传值监听')
        // })
    },
    computed:{
        step1Name(){
            return this.$store.state.until.step1;
        },
        stateKeyword(){
            return this.$store.state.until.keyword;
        },
        step3Data(){
            return this.$store.state.until.step3;
        }
    },
    watch:{
        stateKeyword(val){
            this.keyWord = val;
        }
    },
    methods:{
        //切换年级
        changeNav(ind){
            this.nav = ind;
            window.sessionStorage.setItem('grade',ind);
            this.$store.commit('until/SET_GRADE',ind);
            // this.$store.commit('until/SET_KEYWORD','');
            IsStage(this);
        },
        //搜索
        Search(){
            this.$store.commit('until/SET_KEYWORD',this.keyWord);
            IsStage(this);
            // this.$store.commit('until/SET_CONTROL',true); 
        },
        openGuide(){
            if(this.$route.path!='/studentList') this.$router.push('/');
            this.showGuide=true;
        },
        closeGuide(){
            this.showGuide = false;
            this.step = 0;
            window.sessionStorage.setItem('guide','no');
            // 销毁$EventBus
            this.$EventBus.$off('loadCom');
        },
        nextGuide(){
            if(this.guideLoc.length>this.step+1){
                if(this.step==2){   //第四部引导在详情页
                    this.step = -1;
                    this.$router.push({path:'/studentDetail',query:{id:this.step3Data.stuId}})
                    //等待详情页加载完成(等待过程step置为-1)
                    this.$EventBus.$on('loadCom',res=>{
                        if(res){
                            //console.log(res,'第四部雷达图重绘')
                            this.options = res;
                             // 第四部雷达图
                            this.initEcharts();

                            this.step = 3;
                            this.getGuideLoc();
                        }
                    })
                }else{
                    this.step++;
                    this.getGuideLoc();
                }
            }else{
                this.closeGuide();
                this.$router.push('/');
            }
        },
        // 获取指导高亮位置
        getGuideLoc(){
            let index = this.step+1
            let step = document.getElementById('step'+index);
            if(!step) return;
            let l = this.getLeft(step);
            let t = this.getTop(step);
            let h = step.offsetHeight;
            //console.log(step,l,t,h)
            this.$set(this.guideLoc,this.step,{l,t,h});
            //console.log(this.guideLoc)
        },
        getTop(e){
            let offset=e.offsetTop;
            if(e.offsetParent!=null) offset+=this.getTop(e.offsetParent);
            return offset;
        },
        getLeft(e){
            let offset=e.offsetLeft;
            if(e.offsetParent!=null) offset+=this.getLeft(e.offsetParent);
            return offset;
        },
        initEcharts(){
            let dom = this.$refs['guide-echarts-radar'];
            let myChart = this.$echarts.init(dom);
            myChart.setOption(this.options);
        }
    }
}
</script>
<style lang="scss" scoped>
.btn{
    min-width:112px;
    height:37px;
    background:url('../assets/img/btn-bg.png') center/100% 100% no-repeat;
    margin-left:32px;
    &:nth-of-type(1){margin-left: 0;}
    &.on{color:#4f390d;background-image:url('../assets/img/btns-bg.png');}
}
.abs-left{
    width: 26.4vw;
    min-width: 378px;
    height:71px;
    background:url('../assets/img/bg-back.png') right top/cover no-repeat;
}
.search-out{
    width: 15.1vw;
    min-width: 182px;
    height:30px;
    background:url('../assets/img/search-bg.png') center/100% 100% no-repeat;
}


.guide-toast{
    width:600px;
    height:314px;
    background:url('../assets/img/toast-bg.png') no-repeat;
}
.animation{
    animation: shak 2s infinite;
}
.step1{
    width:125px;
    height: 62px;
    padding-left: 30px;
    padding-top: 22px;
    text-shadow: 0px 0px 5px #0b8066;
    background: url('../assets/img/kuang.png') center/130px 74px no-repeat,url('../assets/img/sides.png') no-repeat;
}
.step2{
    background-color:#fff;
}
.step3{
    background:#fff url('../assets/img/kuang.png') center/100px 143px no-repeat;
    .list{
        .avatar-out{
            background:url('../assets/img/ls-bg.png') 0 0/100% 100% no-repeat;
            img{
                width: 100%;
                height:100%;
                object-fit: cover;
                padding: 8px;
                border-radius: 16px;
            }
        }
    }
}
.step4{
    background:#fff url('../assets/img/kuang.png') center/314px 418px no-repeat;
}
@keyframes shak{
    0%{
        transform: translate(0,0);
    }
    50%{
        transform: translate(10px,-10px);
    }
    100%{
        transform: translate(0,0);
    }
}
</style>