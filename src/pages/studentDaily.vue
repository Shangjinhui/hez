<template>
    <div class="container pt50 pb45 flex-top-center">
        <div class="main-out flex-top">
            <my-side></my-side>
            <div class="main rel">
                <p class="fsize18 colfff pt23 lh30 center">日常行为</p>
                <div class="pt25 pl70 pr70">
                    <div class="mb20">
                        <p class="base-title h30 lh30 wid365 fsize18 pl17 mb10">图书借阅情况</p>
                        <div class="chart wid100p h205 pl35 pr35 pt10">
                            <div class="flex-sp fsize14 col366157">
                                <p></p>
                                <div class="wid106 h26 over-hid rel">
                                    <div class="date-bg wid106 lh26 pl10 fsize12">{{book_time}}</div>
                                    <el-date-picker
                                    class="wid106 h26 col366157 abs l0 t0 opacity0"
                                    v-model="book_time"
                                    value-format="yyyy-MM"
                                    type="month"
                                    placeholder="选择月份"
                                    :picker-options="pickerOptions"
                                    @change="changeBookDate">
                                    </el-date-picker>
                                </div>
                            </div>
                            <div v-if="book.length>0">
                                <div class="flex-top flex-wrap fsize14 col366157 h88 over-auto">
                                    <p class="wid365 mb10" v-for="(item,index) in book" :key="index">{{item.className}}：{{item.count}}次</p>
                                </div>
                                <div class="block wid100p h70 flex-center fsize14">总评：该学生借阅最多的图书类别为{{book_msg}}。</div>
                            </div>
                            <my-empty v-else></my-empty>
                        </div>
                    </div>
                    <div class="">
                        <p class="base-title h30 lh30 wid365 fsize18 pl17 mb10">食堂消费情况</p>
                        <div class="chart wid100p h205 pl35 pr35 pt35">
                            <div class="flex-sp fsize14 col366157 mb15">
                                <p>食堂消费金额：{{canteen_money}}元</p>
                                <div class="wid106 h26 over-hid rel">
                                    <div class="date-bg wid106 lh26 pl10 fsize12">{{canteen_time}}</div>
                                    <el-date-picker
                                    class="wid106 h26 col366157 abs l0 t0 opacity0"
                                    v-model="canteen_time"
                                    value-format="yyyy-MM"
                                    type="month"
                                    placeholder="选择月份"
                                    :picker-options="pickerOptions"
                                    @change="changeDate">
                                    </el-date-picker>
                                </div>

                            </div>
                            <div class="block wid100p h70 flex-center fsize14">总评：{{canteen_msg}}</div>
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
            id:'',
            book_time:'',
            book_msg:'',
            book:[],
            canteen_time:'',
            canteen_money:0,
            canteen_msg:'',
            pickerOptions:{
                disabledDate: (time) => {
                    return time.getTime() > Date.now();
                }
            },
        }
    },
    mounted(){
        this.id = this.$route.query.id;

        this.initDate()
    },
    methods:{
        initDate(){
            let date = new Date();
            let year = date.getFullYear(),month = date.getMonth()+1;
            this.canteen_time = year+'-'+(month>9?month:'0'+month);
            this.book_time = year+'-'+(month>9?month:'0'+month);
            this.getBook();
            this.getPay();
        },
        getBook(){
            this.$fetch({
                url:'api/studentAction/getBookDetailByStuId',
                data:{
                    stuId:this.id,
                    date:this.book_time
                }
            }).then(res=>{
                if(res.flag){
                    this.book = res.data.data;
                    this.book_msg = res.data.maxClassName;
                }
            })
        },
        getPay(){
            this.$fetch({
                url:'api/studentAction/getPayDetailByStuId',
                data:{
                    stuId:this.id,
                    date:this.canteen_time
                }
            }).then(res=>{
                //console.log(res);
                if(res.flag){
                    this.canteen_money = res.data.money;
                    this.canteen_msg = res.data.msg;
                }
            })
        },
        changeBookDate(val){
            this.getBook();
        },
        changeDate(val){
            this.getPay();
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