<template>
    <div class="container pt50 pb45 flex-top-center">
        <div class="main-out flex-top">
            <my-side></my-side>
            <div class="main rel">
                <p class="fsize18 colfff pt23 lh30 center">学生成绩</p>
                <div class="pt25 pl70 pr70">
                    <div class="mb20 rel">
                        <p class="base-title h30 lh30 wid365 fsize18 pl17 mb10">最近两次考试学科对比图</p>
                        <div class="chart wid100p h224 pt20" ref="echarts1"></div>
                        <div class="select wid167 h26 abs r50 t60">
                            <el-dropdown trigger="click" @command="ChooseSelect1" v-if="selectList1.length>0">
                                <div class="el-dropdown-link">
                                    <p class="wid167 lh26 pl10 fsize12 col29564c">{{selectList1[select1].name}}</p>
                                </div>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item v-for="(item,index) in selectList1" :key="index" :command="index">{{item.name}}</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>
                    <div class="rel">
                        <p class="base-title h30 lh30 wid365 fsize18 pl17 mb10">单科变化趋势图</p>
                        <div class="chart wid100p h224" ref="echarts2"></div>
                        <div class="select wid167 h26 abs r50 t60">
                            <el-dropdown trigger="click" @command="ChooseSelect2" v-if="selectList2.length>0">
                                <div class="el-dropdown-link">
                                    <p class="wid167 lh26 pl10 fsize12 col29564c">{{selectList2[select2].name}}</p>
                                </div>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item v-for="(item,index) in selectList2" :key="index" :command="index">{{item.name}}</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
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
            select1:0,
            selectList1:[],
            select2:0,
            selectList2:[],
            options1: {
                legend: {
                    x:'left',
                    y:'top',
                    padding:[0,0,0,100],
                    itemWidth: 14,
                    itemHeight: 14,
                },
                // tooltip: {},
                dataset: {
                    source: [
                        ['product', '期末成绩', '期中成绩'],
                    ]
                },
                xAxis: {
                    type: 'category',
                    name:'科目',
                    axisLine: {//x轴线
                        show: true,
                        lineStyle: {
                            color: "#0b8066",
                            fontFamily:'stlibian',
                        },
                    },
                },
                yAxis: {
                    type: 'value',
                    name: '等级',
                    min:0,
                    max:100,
                    splitNumber:5,
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
                        formatter: function (value, index) {
                            // if(value>=100) return 'A';
                            // if(value<100&&value>=80) return 'B';
                            // if(value<80&&value>=60) return 'C';
                            // if(value<60&&value>=50) return 'D';
                            // if(value<50) return 'E';
                            // D,E的分界线本来是50.但因为不均分导致D显示不出来所以在获取数据时处理
                            if(value>=100) return 'A';
                            if(value<100&&value>=80) return 'B';
                            if(value<80&&value>=60) return 'C';
                            if(value<60&&value>=40) return 'D';
                            if(value<40&&value>0) return 'E';
                        }
                    }
                },
                color:['#0b8066','#d3a653'],
                series: [
                    {
                        type: 'bar',
                        barGap:'0%',              //间距
                        barWidth:22,
                    },
                    {
                        type: 'bar',
                        barWidth:22,
                    },
                ],
                grid: {   
                    left:'6%',
                    bottom: '10%',  
                    containLabel: true  
                } 
            },
            options2:{
                tooltip : {
                    // trigger: 'axis',
                    axisPointer: {
                        type: '',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    },
                    backgroundColor:'#e6ece2',
                    borderColor:'#b0c1ae',
                    color:'#0b8066',
                    formatter:res=>{
                        //console.log(res,'---------')
                        let value = res.value,level;
                        if(value>=100) level = 'A';
                        if(value<100&&value>=80) level = 'B';
                        if(value<80&&value>=60) level = 'C';
                        if(value<60&&value>=50) level = 'D';
                        if(value<50&&value>0) level = 'E';
                        return `<span>${res.name},${this.selectList2[this.select2].name}${level}</span>`
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
                    data: [],
                },
                yAxis: [
                {
                    type: "value",
                    name: '等级',
                    min:0,
                    max:100,
                    splitNumber:5,
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
                        formatter: function (value, index) {
                            // if(value>=100) return 'A';
                            // if(value<100&&value>=80) return 'B';
                            // if(value<80&&value>=60) return 'C';
                            // if(value<60&&value>=50) return 'D';
                            // if(value<50) return 'E';
                            // D,E的分界线本来是50.但因为不均分导致D显示不出来所以在获取数据时处理
                            if(value>=100) return 'A';
                            if(value<100&&value>=80) return 'B';
                            if(value<80&&value>=60) return 'C';
                            if(value<60&&value>=40) return 'D';
                            if(value<40&&value>0) return 'E';
                        }
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
                    data: [],
                    type: "line",
                    smooth: false,
                    
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
        this.id = this.$route.query.id;
        this.getData1();
        this.getData2();
        // this.initEcharts1();
        
        
    },
    methods:{
        // 最近两次考试学科
        getData1(){
            let data = {
                stuId:this.id
            }
            if(this.selectList1.length>0){
                data.stuYear = this.selectList1[this.select1].time;
                data.stuTerm = this.selectList1[this.select1].term;
            }
            this.$fetch({
                url:'api/studentScore/getCompareStatisticsByStuId',
                data
            }).then(res=>{
                if(res.flag){
                    this.selectList1 = res.data.yearAndTerm;
                    let options1 = this.options1,list = res.data.data;
                    // 初始化options1
                    options1.dataset.source = [
                        ['product', '期末成绩', '期中成绩'],
                        ['语文', 0, 0],
                        ['数学', 0, 0],
                        ['英语', 0, 0],
                        ['物理', 0, 0],
                        ['化学', 0, 0],
                        ['生物', 0, 0],
                        ['政治', 0, 0],
                        ['历史', 0, 0],
                        ['地理', 0, 0],
                        ['技术', 0, 0],
                        // ['通用技术', 0, 0],
                        // ['信息技术', 0, 0],
                    ]
                    list.forEach(item=>{
                        let score = item.score;
                        if(score>=50&&score<60){
                            score = 40;
                        }else if(score>0&&score<50){
                            score = 20;
                        }
                        options1.dataset.source[item.type][parseInt(item.oldFlag)+1] = score
                    })
                    //console.log(options1)
                    this.options1 = options1;
                    this.initEcharts1();
                    // 初始情况学期是最新一次考试，并不是第一个select，所以需要判断
                    if(list.length>0){
                        this.selectList1.forEach((item,index)=>{
                            if(item.time==list[0].stuYear&&item.term==list[0].stuTerm) this.select1 = index;
                        })
                    }
                }
            })
        },
        //单科变化趋势
        getData2(){
            let data = {
                stuId:this.id
            }
            if(this.selectList2.length>0){
                data.subject = this.selectList2[this.select2].id;
            }
            this.$fetch({
                url:'api/studentScore/getChangeStatisticsByStuId',
                data
            }).then(res=>{
                if(res.flag){
                    this.selectList2 = res.data.subject;
                    let options2 = this.options2,list = res.data.data;
                    options2.xAxis.data = [],options2.series[0].data = [];
                    list.forEach(item=>{
                        let score = item.score;
                        if(score>=50&&score<60){
                            score = 40;
                        }else if(score>0&&score<50){
                            score = 20;
                        }
                        options2.xAxis.data.push(`${item.stuYear}${item.stuTerm==1?'第一学期':'第二学期'}${item.examType==1?'中':'末'}`);
                        options2.series[0].data.push(score);
                    })
                    this.initEcharts2();
                }
            })
        },
        initEcharts1(){
            let dom = this.$refs['echarts1'];
            let myChart = this.$echarts.init(dom);
            myChart.setOption(this.options1);
        },
        initEcharts2(){
            let dom = this.$refs['echarts2'];
            let myChart = this.$echarts.init(dom);
            myChart.setOption(this.options2);
        },
        ChooseSelect1(val){
            //console.log(val)
            this.select1 = val;
            this.getData1();
        },
        ChooseSelect2(val){
            //console.log(val)
            this.select2 = val;
            this.getData2();
        }
    }
}
</script>
<style lang="scss" scoped>
.chart{
    background:url('../assets/img/chart-bg.png') 0 0/100% 100% no-repeat;
}
.select{
    background:url('../assets/img/select-bg.png') 0 0/100% 100% no-repeat;
}
</style>