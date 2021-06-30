<template>
    <div class="container pt50 pb45 flex-top-center">
        <div class="main-out flex-top">
            <my-side></my-side>
            <div class="main rel">
                <p class="fsize18 colfff pt23 lh30 center">学生详情</p>
                <div class="pt25 pl70 pr70">
                    <div class="flex-top  mb20">
                        <div class="avatar-out p21 mr16 rel">
                            <div class="img h285" :style="{'background':`url(${infoDetail.photo}) center/auto 100% no-repeat`}"></div>
                            <!-- <img class="wid285 h285 cover" src="@/assets/img/avatar.png" alt=""> -->
                            <p class="username fsize18 colfff center abs l-center b30">{{infoDetail.name}}</p>
                        </div>

                        <div class="mr16 flex-son">
                            <p class="base-title h30 lh30 wid365 fsize18 pl17 mb5">基本信息</p>
                            <div class="block h288 pt15 pb15 pl20 pr20">
                                <div class="fsize12 col366157 pb15 bb-ccd3c7">
                                    <div class="flex mb15">
                                        <p class="wid200"><span class="wid50 inline justify">所属班级</span>：高{{infoDetail.grade}}（{{infoDetail.stuClass}}）班</p>
                                        <p>学号：{{infoDetail.stuId}}</p>
                                    </div>
                                    <div class="flex mb15">
                                        <p class="wid200"><span class="wid50 inline justify">家庭情况</span>：{{infoDetail.familyInfo}}</p>
                                        <p>职业性格：{{infoDetail.nature}}</p>
                                    </div>
                                    <div class="flex mb15">
                                        <p><span class="wid50 inline justify">操行等第</span>：{{infoDetail.actionLevel}}</p>
                                    </div>
                                    <div class="flex">
                                        <p><span class="wid50 inline justify">爱 好</span>：{{infoDetail.special}}</p>
                                    </div>
                                </div>
                                <div class="pt25 fsize12 flex-top">
                                    <p class="wid60 lh24">标签：</p>
                                    <ul class="flex flex-wrap" v-if="infoDetail.tags">
                                        <li class="tag pl10 pr10 mwid77 lh24 center mr12 mb10" v-for="(item,index) in JSON.parse(infoDetail.tags)" :key="index">{{item.name}}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div id="step4">
                            <p class="base-title h30 lh30 wid274 fsize18 pl17 mb5">行为分析</p>
                            <div class="block wid274 h288 pt10" ref="echarts-radar"></div>
                        </div>
                    </div>

                    <div>
                        <ul class="base-title h30 lh30 wid100p fsize18 pl17 mb10 flex">
                            <li class="mr26 cursor" :class="nav==index?'col011d17 b':'col5a716b'" v-for="(item,index) in exper" :key="index" @click="nav=index">{{item.title}}</li>
                        </ul>
                        <div class="table h148 pl18 pr18" v-if="nav==0">
                            <div class="flex fsize12 lh38">
                                <p class="wid230 pl36">时间</p>
                                <p class="wid350">竞赛名称</p>
                                <p class="wid200">级别</p>
                                <p class="wid170">获奖等级</p>
                            </div>
                            <div class="h100 over-auto" v-if="infoDetail.competitionAwardList&&infoDetail.competitionAwardList.length>0">
                                <div class="b-e1eae2 mb8 fsize12 pt10 pb10 col366157 flex" v-for="(item,index) in infoDetail.competitionAwardList" :key="index">
                                    <p class="wid230 pl36">{{item.awardTime}}</p>
                                    <p class="wid350">{{item.name}}</p>
                                    <p class="wid200">{{item.level}}</p>
                                    <p class="wid170">{{item.grade}}</p>
                                </div>
                            </div>
                            <my-empty text="" v-else></my-empty>
                            
                        </div>
                        <div class="table wid1002 h148 pl18 pr18" v-if="nav==1">
                            <div class="flex fsize12 lh38">
                                <p class="wid274 pl36">时间</p>
                                <p class="wid415">实践名称</p>
                                <p class="wid270">表现情况</p>
                            </div>
                            <div class="h100 over-auto" v-if="infoDetail.socialPracticeList&&infoDetail.socialPracticeList.length>0">
                                <div class="b-e1eae2 mb8 fsize12 pt10 pb10 col366157 flex" v-for="(item,index) in infoDetail.socialPracticeList" :key="index">
                                    <p class="wid274 pl36">{{item.practiceTime}}</p>
                                    <p class="wid415">{{item.name}}</p>
                                    <p class="wid270">{{item.performance}}</p>
                                </div>
                            </div>
                            <my-empty text="" v-else></my-empty>
                        </div>
                    </div>
                </div>

                <my-back></my-back>
            </div>
        </div>
    </div>
</template>
<script>
import myBack from '@/components/back'
import mySide from '@/components/side'
import myEmpty from '@/components/empty'
export default {
    components:{myBack,mySide,myEmpty},
    data(){
        return {
            id:'',                  //190101500190
            infoDetail:{},
            exper:[{title:'参与竞赛'},{title:'社会实践'}],
            nav:0,

            options:{
                color:['#d4a851','#078266'],
                legend:{
                    data:['平均水平','个人表现'],
                    itemWidth: 14,
                    itemHeight: 14,
                },
                radar:[
                    {
                        nameGap:3,                                //标题距图的距离
                        name:{                                    //标题换行
                            formatter: (text) => {
                                let index = text.search(/\d/);
                                return text.slice(0,index)+'\n'+text.slice(index)
                            },
                            textStyle: {
                                color: '#366157',
                                fontFamily:'楷体',
                                fontWeight:'bold',
                            }
                        },
                        indicator: [
                            { text: '成绩70', max: 100 },
                            { text: '体育健康70', max: 100 },
                            { text: '生理健康90', max: 100 },
                            { text: '日常表现80', max: 100 },
                            { text: '考勤80', max: 100 },
                        ],
                        radius: 80,                     //大小
                        triggerEvent: true,             //开启边角，将边角文字添加到点击事件范围内
                    }
                ],
                series:[
                    {
                        symbol: "none",               //去掉点
                        name: '成绩单',
                        type: 'radar',
                        radarIndex: 0,
                        data: [
                            {
                                value: [60, 80, 95, 90, 90],
                                name: '平均水平',
                                areaStyle: {
                                    opacity: 0.3,
                                    color: '#d4a851'
                                }
                            },
                            {
                                value: [70, 70, 90, 30, 40],
                                name: '个人表现',
                                areaStyle: {
                                    opacity: 0.3,
                                    color: '#078266'
                                }
                            }
                        ]
                    }
                ]
            }
        }
    },
    mounted(){
        this.id = this.$route.query.id;
        this.getData();

        // this.initEcharts();
        // this.$EventBus.$emit('loadCom',this.options)
    },
    methods:{
        getData(){
            this.$fetch({
                url:'api/student/detail',
                data:{
                    stuId:this.id
                }
            }).then(res=>{

                if(res.flag){
                    this.infoDetail = res.data;
                    this.initEcharts();
                }
            })
        },
        initEcharts(){
            //处理options
            let options = this.options,analysisList = this.infoDetail.analysisList||[],indicator=[],average=[],score=[];
            analysisList.forEach(item=>{
                indicator.push({text:item.title+item.score,max:item.max});
                average.push(item.average);
                score.push(item.score);
            })
            options.radar[0].indicator = indicator;
            options.series[0].data[0].value = average;
            options.series[0].data[1].value = score;
            this.options = options;
            this.$EventBus.$emit('loadCom',options)

            let dom = this.$refs['echarts-radar'];
            let myChart = this.$echarts.init(dom);
            myChart.setOption(options);
            // 设置点击事件
            myChart.on('click',val=>{
                //console.log(val.name)
                let arr = [
                    {name:'成绩',path:'/studentAchievement',query:{id:this.id}},
                    {name:'体育健康',path:'/studentSports',query:{id:this.id}},
                    {name:'生理健康',path:'/studentPhysiology',query:{id:this.id}},
                    {name:'日常表现',path:'/studentDaily',query:{id:this.id}},
                    {name:'考勤',path:'/studentCheckon',query:{id:this.id,name:encodeURI(this.infoDetail.name)}}
                ]
                arr.forEach(item=>{
                    if(val.name.indexOf(item.name)!=-1){
                        this.$router.push({path:item.path,query:item.query});
                        return;
                    }
                })
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.avatar-out{
    width:293px;
    height: 328px;
    background:url('../assets/img/avatar-bg.jpg') center/100% 100% no-repeat;
    // overflow: hidden;
    .img{
        transition: all .3s ease;
        &:hover{
            background-size: auto 120%!important;
        }
    }
    .username{
        width:202px;
        height:44px;
        line-height: 44px;
        background:url('../assets/img/name-bg.png') no-repeat;
    }
}
.base-title{
    li:hover{opacity: .5;}
}

.block{
    background:url('../assets/img/block.png') center/100% 100% no-repeat;
}
.tag{
    background:url('../assets/img/tag-bg.png') center/100% 100% no-repeat;
    transition: all .3s ease;
    &:hover{
        opacity: .8;
    }
}
.table{
    background:url('../assets/img/table.png') center/100% 100% no-repeat;
}
</style>