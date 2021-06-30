<template>
    <div class="container pt50 pb45 flex-top-center">
        <div class="main-out flex-top">
            <my-side></my-side>
            <div class="main rel">
                <p class="fsize18 colfff pt23 lh30 center">考 勤</p>
                <div class="pt25 pl70 pr70">
                    <div class="">
                        <p class="base-title h30 lh30 wid365 fsize18 pl17 mb10">考勤统计</p>
                        <div class="chart wid100p h496 pl35 pr35 pt35 rel">
                            <div class="wid100p h370" ref="echarts">

                            </div>
                            <div class="flex abs r35 t30">
                                <div class="wid106 h26 over-hid rel">
                                    <div class="date-bg wid106 lh26 pl10 fsize12">{{start}}</div>
                                    <el-date-picker
                                    class="wid106 h26 abs l0 t0 opacity0"
                                    v-model="start"
                                    value-format="yyyy-MM-dd"
                                    type="date"
                                    placeholder="选择日期"
                                    @change="changeDate">
                                    </el-date-picker>
                                </div>
                                <span class="pl5 pr5">至</span>
                                <div class="wid106 h26 over-hid rel">
                                    <div class="date-bg wid106 lh26 pl10 fsize12">{{start}}</div>
                                    <el-date-picker
                                    class="wid106 h26 abs l0 t0 opacity0"
                                    v-model="start"
                                    value-format="yyyy-MM-dd"
                                    type="date"
                                    placeholder="选择日期"
                                    @change="changeDate">
                                    </el-date-picker>
                                </div>
                            </div>
                            <div class="block wid100p h70 flex-center fsize14">本月总评：本月共迟到<span class="colbe7a01">5</span>次，已超过标准迟到次数，请关注！</div>
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
            start:'2020-01-01',
            options:{
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                xAxis: {
                    type: "category",
                    name: '日期',
                    axisLine: {//x轴线
                        show: true,
                        lineStyle: {
                            color: "#0b8066",
                            fontFamily:'stlibian',
                        },
                    },
                    data: ['01-25','01-26','01-27','01-28','01-29','02-01','02-02','02-03','02-04','02-05',],
                },
                yAxis: [
                {
                    type: "value",
                    name: '迟到次数',
                    splitLine: {//分割线
                        show:true,
                        lineStyle: {
                            color: "#ccd3c7",
                        }
                    },
                    axisLine: {//y轴线
                        show: true,
                        lineStyle: {
                            color: "#0b8066",
                            fontFamily:'stlibian',
                        },
                    },
                    axisLabel: {
                        // formatter: function (value, index) {
                        //     if(value>=100) return 'A';
                        //     if(value<100&&value>=80) return 'B';
                        //     if(value<80&&value>=60) return 'C';
                        //     if(value<60&&value>=40) return 'D';
                        //     if(value<40&&value>=20) return 'E';
                        // }
                    },
                    show: true,
                },
                ],
                grid: {   
                    left:'6%',
                    bottom: '10%',  
                    containLabel: true  
                },
                series: [
                {
                    data: [1,3,4,5,5,5,6,7,8,8],
                    type: "line",
                    smooth: false,
                    symbol: 'none',  //取消折点圆圈
                    label:{
                        // formatter:params=>{
                        //     return params.data+'%'
                        // }
                    },
                    areaStyle: {
                    normal: {
                        color: {
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                            offset: 0,
                            color: "#9bc1b0", // 0% 处的颜色
                            },
                            {
                            offset: 0.7,
                            color: "#dde5d8", // 100% 处的颜色
                            },
                        ],
                        globalCoord: false, // 缺省为 false
                        },
                    },
                    },
                    itemStyle:{
                        normal : { 
                            color:'#ffffff', //改变折线点的颜色
                            lineStyle:{ 
                                color:'#0b8066' //改变折线颜色
                            } 
                        } 
                    }
                },
                ],
            },
        }
    },
    mounted(){

        this.initEcharts();
    },
    methods:{
        initEcharts(){
            let dom = this.$refs['echarts'];
            let myChart = this.$echarts.init(dom);
            myChart.setOption(this.options);
        },
        changeDate(val){
            //console.log(val)
        }
    }
}
</script>
<style lang="scss" scoped>
.chart{
    background:url('../assets/img/chart-bg.png') 0 0/100% 100% no-repeat;
}
.block{
    background:url('../assets/img/tishi-bg.png') 0 0/100% 100% no-repeat;
}
.date-bg{
    background:url('../assets/img/date-bg.png') 0 0/100% 100% no-repeat;
}
</style>