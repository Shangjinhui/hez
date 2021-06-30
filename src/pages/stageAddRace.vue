<template>
    <div class="container pt50 pb45 flex-top-center">
        <div class="main-out flex-top">
            <my-side></my-side>
            <div class="main rel">
                <p class="fsize18 colfff pt23 lh30 center">{{type==1?'添加竞赛':'添加实践'}}</p>
                <div class="kuang pt25 pl70 pr70 fsize14">
                    <div class="flex-btm mb10">
                        <div class="flex wid420">
                            <p class="lh40"><span class="wid60 inline justify">学生姓名</span>：</p>
                            <input class="input wid285 lh40 pl15 pr15" type="text" v-model="stuName" :disabled="handle==2">
                        </div>
                        <div class="flex">
                            <p class="lh40"><span class="wid60 inline justify">学 籍 号</span>：</p>
                            <input class="input wid285 lh40 pl15 pr15" type="text" v-model="stuId" :disabled="handle==2">
                        </div>
                    </div>
                    <div class="flex-btm mb24">
                        <div class="flex wid420">
                            <p class="lh40"><span class="wid60 inline justify">{{type==1?'竞赛名称':'实践内容'}}</span>：</p>
                            <input class="input wid285 lh40 pl15 pr15" type="text" v-model="name" :disabled="handle==2">
                        </div>
                        <div class="flex">
                            <p class="lh40"><span class="wid60 inline justify">{{type==1?'获奖时间':'实践时间'}}</span>：</p>
                            <div class="date wid285 h40 pl15 pr15 over-hid rel">
                                <div class="lh40">{{timer}}</div>
                                <el-date-picker
                                class="wid285 h40 abs l0 t0 opacity0"
                                v-model="timer"
                                value-format="yyyy-MM-dd"
                                type="date"
                                placeholder="选择日期"
                                :disabled="handle==2"
                                :picker-options="pickerOptions"
                                @change="changeDate">
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                    <div class="flex-btm mb10" v-if="type==1">
                        <div class="flex wid420">
                            <p class="lh40"><span class="wid60 inline justify">获奖级别</span>：</p>
                            <div class="select wid285 h40 lh40 pl15 pr15">
                                <el-dropdown trigger="click" @command="ChooseLevel">
                                    <div class="el-dropdown-link">
                                        <p class="wid285 h40 lh40 fsize12 col29564c">{{level}}</p>
                                    </div>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item v-for="(item,index) in levelList" :key="index" :command="item.name" :disabled="handle==2">{{item.name}}</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                        </div>
                        <div class="flex">
                            <p class="lh40"><span class="wid60 inline justify">获奖等级</span>：</p>
                            <div class="select wid285 h40 lh40 pl15 pr15">
                                <el-dropdown trigger="click" @command="ChooseGrade">
                                    <div class="el-dropdown-link">
                                        <p class="wid285 h40 lh40 fsize12 col29564c">{{grade}}</p>
                                    </div>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item v-for="(item,index) in gradeList" :key="index" :command="item.name" :disabled="handle==2">{{item.name}}</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                        </div>
                    </div>
                    <div class="flex-btm mb24" v-else>
                        <div class="flex-top">
                            <p class="lh40"><span class="wid60 inline justify">表现情况</span>：</p>
                            <textarea class="area-input wid705 h100 pl15 pr15 pt15 pb15" v-model="performance" :disabled="handle==2"></textarea>
                        </div>
                    </div>

                    <div class="flex-center mt44" v-if="handle!=2">
                        <div class="btn1 wid111 lh36 center fsize14 col503925 mr16 cursor" @click="Confirm">确定</div>
                        <div class="btn2 wid111 lh36 center fsize14 col503925 cursor" @click="Cancle">取消</div>
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
            timer:'',
            type:'',            //1竞赛2实践
            handle:'',          //1新增2查看3编辑
            id:'',              //查看和编辑时的id
            stuName:'',
            stuId:'',
            name:'',
            level:'',           //获奖级别
            levelList:[{name:'国家级'}],
            grade:'',           //获奖等级
            gradeList:[{name:'特技'}],
            performance:'',
            // 限制不可选今天以后的日期
            pickerOptions:{
                disabledDate: (time) => {
                    return time.getTime() > Date.now();
                }
            },
        }
    },
    computed:{
        storeState(){
            const {grade,stuClass,keyword} = this.$store.state.until;
            return {grade,stuClass,keyword};
        }
    },
    mounted(){
        this.type = this.$route.query.type||1;
        this.handle = this.$route.query.handle||1;
        this.id = this.$route.query.id;
        if(this.id) this.getData();
        if(this.type == 1) this.getTags();
    },
    methods:{
        getTags(){
            this.$fetch({
                url:'api/student/getTags',
            }).then(res=>{
                if(res.flag){
                    this.levelList = res.data.comLevel;
                    this.gradeList = res.data.comGrade;
                }
            })
        },
        getData(){
            this.$fetch({
                url:this.type==1?'api/competitionAward/detail':'api/socialPractice/detail',
                data:{
                    id:this.id
                }
            }).then(res=>{
                if(res.flag){
                    this.timer = this.type==1?res.data.awardTime:res.data.practiceTime;
                    this.stuName = res.data.stuName;
                    this.stuId = res.data.stuId;
                    this.name = res.data.name;
                    this.performance = res.data.performance;
                    this.level = res.data.level;
                    this.grade = res.data.grade;
                }
            })
        },
        changeDate(val){
            //console.log(val)
        },
        Confirm(){
            let params = {};
            if(this.type==1){
                if(!this.stuId||!this.stuName||!this.timer||!this.name||!this.level||!this.grade){
                    this.$message({message:'请填写完整信息',type:'warning'});
                    return;
                }
                params = {
                    grade:this.storeState.grade,
                    stuClass:this.storeState.stuClass,
                    stuId:this.stuId,
                    stuName:this.stuName,
                    awardTime:this.timer,
                    name:this.name,
                    level:this.level,
                    grade:this.grade
                }
            }else{
                if(!this.stuId||!this.stuName||!this.timer||!this.name||!this.performance){
                    this.$message({message:'请填写完整信息',type:'warning'});
                    return;
                }
                params = {
                    grade:this.storeState.grade,
                    stuClass:this.storeState.stuClass,
                    stuId:this.stuId,
                    stuName:this.stuName,
                    practiceTime:this.timer,
                    name:this.name,
                    performance:this.performance
                }
            }
            
            if(this.id) params.id = this.id;
            this.$fetch({
                url:this.type==1?'api/competitionAward/saveOrUpdate':'api/socialPractice/saveOrUpdate',
                type:'post',
                data:params
            }).then(res=>{
                if(res.flag){
                    this.$message({message:this.id?'修改成功':'添加成功',type:'success'});
                    let timer = setTimeout(()=>{
                        clearTimeout(timer);
                        this.$router.go(-1);
                    },800)
                }
            })
        },
        Cancle(){
            this.$router.go(-1);
        },
        ChooseGrade(val){
            this.grade = val;
        },
        ChooseLevel(val){
            this.level = val;
        }
    }
}
</script>
<style lang="scss" scoped>
.input{
    background:url('../assets/img/input.png') 0 0/100% 100% no-repeat;
}
.date{
    background:url('../assets/img/date-bg2.png') 0 0/100% 100% no-repeat;
}
.btn1{
    background:url('../assets/img/btns-bg2.png') 0 0/100% 100% no-repeat;
}
.btn2{
    background:url('../assets/img/btn-bg2.png') 0 0/100% 100% no-repeat;
}
.area-input{
    background:url('../assets/img/area-input.png') 0 0/100% 100% no-repeat;
}
.select{
    background:url('../assets/img/select2-bg.png') 0 0/100% 100% no-repeat;
}
</style>