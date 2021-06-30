<template>
    <div class="container pt50 pb45 flex-top-center">
        <div class="main-out flex-top">
            <my-side></my-side>
            <div class="main rel">
                <p class="fsize18 colfff pt23 lh30 center">考 勤</p>
                <div class="pt25 pl70 pr70">
                    <div class="">
                        <p class="base-title h30 lh30 wid365 fsize18 pl17 mb10">考勤统计</p>
                        <div class="chart wid100p h496 pl30 pr30 pt23 rel">
                            <div class="flex-sp col366157 mr10 mb5">
                                <div class="flex">
                                    <p class="fsize14 mr30">{{name}}{{checkon_time}}考勤记录</p>
                                    <ul class="flex fsize12">
                                        <li class="flex mr30"><span class="wid14 h14 b-rad4 bg5a716b mr10"></span><span>正常</span></li>
                                        <li class="flex mr30"><span class="wid14 h14 b-rad4 bgbe7a01 mr10"></span><span>请假</span></li>
                                        <li class="flex mr30"><span class="wid14 h14 b-rad4 bg0b8066 mr10"></span><span>免签</span></li>
                                        <li class="flex mr30"><span class="wid14 h14 b-rad4 bgcd3c49 mr10"></span><span>未到</span></li>
                                    </ul>
                                </div>
                                <div class="wid106 h26 over-hid rel">
                                    <div class="date-bg wid106 lh26 pl10 fsize12">{{checkon_time}}</div>
                                    <el-date-picker
                                    class="wid106 h26 col366157 abs l0 t0 opacity0"
                                    v-model="checkon_time"
                                    value-format="yyyy-MM"
                                    type="month"
                                    placeholder="选择月份"
                                    :picker-options="pickerOptions"
                                    @change="changeDate">
                                    </el-date-picker>
                                </div>
                            </div>
                            <div class="wid100p pl20 pr10 col366157 fsize12 center mb30">
                                <ul class="flex h30">
                                    <li class="flex-son">周一</li>
                                    <li class="flex-son">周二</li>
                                    <li class="flex-son">周三</li>
                                    <li class="flex-son">周四</li>
                                    <li class="flex-son">周五</li>
                                    <li class="flex-son">周六</li>
                                    <li class="flex-son">周日</li>
                                </ul>
                                <ul class="flex flex-wrap b-bbc2b6 month-list">
                                    <li class="wid14-28p h50 bb-bbc2b6 br-bbc2b6" :class="[{'weekend':item.weekend}]" v-for="(item,index) in weekList" :key="index">
                                        <p class="lh18 left pl5">{{item.date}}</p>
                                        <p v-if="item.weekend&&!item.status">休</p>
                                        <div class="flex lh30 colfff" v-else-if="item.status">
                                            <div class="flex-son bt2-5a716b" v-if="item.status['zc']>0"><p class="bg5a716b opacity8">{{item.status['zc']}}</p></div>
                                            <div class="flex-son bt2-be7a01" v-if="item.status['qj']>0"><p class="bgbe7a01 opacity8">{{item.status['qj']}}</p></div>
                                            <div class="flex-son bt2-0b8066" v-if="item.status['mq']>0"><p class="bg0b8066 opacity8">{{item.status['mq']}}</p></div>
                                            <div class="flex-son bt2-cd3c49" v-if="item.status['wd']>0"><p class="bgcd3c49 opacity8">{{item.status['wd']}}</p></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="block wid100p h70 flex-center fsize14" v-if="wdData>=3">本月总评：本月共未到<span class="colbe7a01">{{wdData}}</span>次，请假<span class="colbe7a01">{{qjData}}</span>次，需要了解实际情况，可适当时机找学生谈谈心。</div>
                            <div class="block wid100p h70 flex-center fsize14" v-else-if="qjData>=3">本月总评：本月共未到<span class="colbe7a01">{{wdData}}</span>次，请假<span class="colbe7a01">{{qjData}}</span>次，需要多关注学生生活与身体健康。</div>
                            <div class="block wid100p h70 flex-center fsize14" v-else>本月总评：有很强的时间观念，很棒！</div>
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
export default {
    components:{myBack,mySide},
    data(){
        return {
            id:'',
            name:'',
            checkon_time:'',        //2021-01
            weekList:[],           //渲染数据
            list:[],               //后台数据
            qjData:0,              //当前月请假次数
            wdData:0,              //当前月未到次数
            pickerOptions:{
                disabledDate: (time) => {
                    return time.getTime() > Date.now();
                }
            },
        }
    },
    mounted(){
        this.id = this.$route.query.id;
        this.name = decodeURI(this.$route.query.name);
        this.initDate();
        
    },
    methods:{
        getData(){
            this.$fetch({
                url:'api/studentSign/getStatisticsByStuId',
                data:{
                    stuId:this.id,
                    signDate:this.checkon_time
                }
            }).then(res=>{
                if(res.flag){
                    this.list = res.data.data;
                    this.qjData = res.data.qjData;
                    this.wdData = res.data.wdData;

                    let date = new Date(this.checkon_time);
                    this.getEveryDay(date,date.getMonth());
                }
            })
        },
        initDate(){
            let date = new Date();
            let year = date.getFullYear(),month = date.getMonth()+1;
            this.checkon_time = year+'-'+(month>9?month:'0'+month);
            // console.log(this.checkon_time)
            // this.getEveryDay(date,date.getMonth());
            this.getData();
        },
        changeDate(val){
            //console.log(val)
            // let date = new Date(val);
            // this.getEveryDay(date,date.getMonth());
            this.getData();
        },
        getEveryDay(date, month) {
            const nYear = date.getFullYear(),nMonth = month+1;
            let list = this.list;
            //console.log(nYear,nMonth,'------');

            date.setMonth(month + 1);
            date.setDate(0);
            let dayArry = [];
            let day = date.getDate();
            for (let i = 1; i <= day; i++) {
                date.setDate(i);
                //let status = {a:parseInt(Math.random()*4),b:parseInt(Math.random()*4),c:parseInt(Math.random()*4),d:parseInt(Math.random()*4)};       //a正常b未到c请假d免签
                let weekend = date.getDay()==0||date.getDay()==6?true:false;
                //dayArry.push({date:i,day:date.getDay(),weekend,status})
                
                let obj = {date:i,day:date.getDay(),weekend};
                for(let j=0;j<list.length;j++){
                    const sp_arr = list[j].signTime.split('-');
                    const y = sp_arr[0],m = sp_arr[1],d = sp_arr[2];  
                    //console.log(y,parseInt(m),parseInt(d))
                    if(nYear==y&&nMonth==m&&i==d){
                        obj.status = list[j];
                    }
                }
                dayArry.push(obj)
            }
            let sartDay = dayArry[0].day,unshiftWeek = sartDay == 0?new Array(6).fill({}):new Array(sartDay-1).fill({});
            dayArry.unshift(...unshiftWeek)
            let remainder = dayArry.length%7,endweek = new Array(remainder==0?0:7-remainder).fill({});
            dayArry.push(...endweek)
            //console.log(dayArry,'-----')
            this.weekList = dayArry;
        },
    }
}
</script>
<style lang="scss" scoped>
.chart{
    background:url('../assets/img/chart-bg2.png') 0 0/100% 100% no-repeat;
}
.block{
    background:url('../assets/img/tishi-bg.png') 0 0/100% 100% no-repeat;
}
.date-bg{
    background:url('../assets/img/date-bg.png') 0 0/100% 100% no-repeat;
}

.month-list{
    li{
        &.weekend{color:#999;}
    }
}
</style>