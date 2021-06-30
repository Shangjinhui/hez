<template>
    <div class="container pt50 pb45 flex-top-center">
        <div class="main-out flex-top">
            <my-side></my-side>
            <div class="main rel">
                <p class="fsize18 colfff pt23 lh30 center">添加信息</p>
                <div class="kuang pt25 pl70 pr70 fsize14">
                    <div class="flex-btm mb10">
                        <div class="flex-btm wid420">
                            <p class="lh40"><span class="wid60 inline justify">学生照片</span>：</p>
                            <div class="rel">
                                <img class="wid80 h80 cover b-rad4 cursor" :src="avatar||avatar_z" alt="">
                                <input class="wid80 h80 abs l0 t0 opacity0 cursor" ref="avatar" type="file" accept="image/*">
                            </div>
                            
                        </div>
                        <div class="flex">
                            <p class="lh40"><span class="wid60 inline justify">学生姓名</span>：</p>
                            <input class="input wid285 lh40 pl15 pr15" type="text" v-model="username" :disabled="handle==2">
                        </div>
                    </div>
                    <div class="flex-btm mb10">
                        <div class="flex wid420">
                            <p class="lh40"><span class="wid60 inline justify">学 籍 号</span>：</p>
                            <input class="input wid285 lh40 pl15 pr15" type="text" v-model="stuId" :disabled="handle!=1">
                        </div>
                        <div class="flex">
                            <p class="lh40"><span class="wid60 inline justify">性 格</span>：</p>
                            <!-- <input class="input wid285 lh40 pl15 pr15" type="text" v-model="character" :disabled="handle==2"> -->
                            <div class="select wid285 h40 lh40 pl15 pr15">
                                <el-dropdown trigger="click" @command="ChooseCharacter">
                                    <div class="el-dropdown-link">
                                        <p class="wid285 h40 lh40 fsize12 col29564c">{{character}}</p>
                                    </div>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item v-for="(item,index) in characterList" :key="index" :command="item.name" :disabled="handle==2">{{item.name}}</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                        </div>
                    </div>
                    <div class="flex-btm mb24">
                        <div class="flex wid420">
                            <p class="lh40"><span class="wid60 inline justify">爱 好</span>：</p>
                            <input class="input wid285 lh40 pl15 pr15" type="text" v-model="specialty" :disabled="handle==2">
                        </div>
                        <div class="flex">
                            <p class="lh40"><span class="wid60 inline justify">家庭情况</span>：</p>
                            <input class="input wid285 lh40 pl15 pr15" type="text" v-model="family" :disabled="handle==2">
                        </div>
                    </div>
                    <div class="flex-btm mb24">
                        <div class="flex wid420">
                            <p class="lh40"><span class="wid60 inline justify">操行等第</span>：</p>
                            <!-- <div class="select wid285 h40 lh40 pl15 pr15">
                                <el-dropdown trigger="click" @command="ChooseSelect">
                                    <div class="el-dropdown-link">
                                        <p class="wid285 h40 lh40 fsize12 col29564c">{{select}}</p>
                                    </div>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item v-for="(item,index) in selectList" :key="index" :command="item.name">{{item.name}}</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div> -->
                            <input class="input wid285 lh40 pl15 pr15" type="text" v-model="conduct" :disabled="handle==2">
                        </div>
                    </div>
                    <div class="flex-top">
                        <p class="lh40"><span class="wid60 inline justify">标签</span>：</p>
                        <div class="area-input wid705 h160 pt15 pl30 pr30">
                            <el-checkbox-group v-model="checkList" :disabled="handle==2">
                                <el-checkbox :label="item.id" v-for="(item,index) in tags" :key="index">{{item.name}}</el-checkbox>
                            </el-checkbox-group>

                            <input class="input2 wid484 lh40 pl15 pr15 mt15" type="text" placeholder="可多选默认标签，也可自己输入" v-model="custom" :disabled="handle==2">
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
            handle:'',          //1新增2查看3编辑
            id:'',              //查看和编辑时的id
            avatar:'',          //头像
            avatar_z:require('@/assets/img/avatar-z.png'),
            username:'',
            stuId:'',
            character:'',
            characterList:[],
            specialty:'',
            family:'',
            conduct:'',
            tags:[],              //标签列表
            checkList:[],         //选择的标签
            custom:'',            //总定义标签
            // selectList:[{name:'优秀'},{name:'良好'},{name:'及格'}],
            // select:''
        }
    },
    computed:{
        storeState(){
            const {grade,stuClass,keyword} = this.$store.state.until;
            return {grade,stuClass,keyword};
        }
    },
    mounted(){
        this.handle = this.$route.query.handle||1;
        this.id = this.$route.query.id;
        if(this.id) this.getData();
        this.getTags();
        this.initUpload();
    },
    methods:{
        getTags(){
            this.$fetch({
                url:'api/student/getTags',
            }).then(res=>{
                if(res.flag){
                    this.tags = res.data.tags;
                    this.characterList = res.data.nature;
                }
            })
        },
        getData(){
            this.$fetch({
                url:'api/student/detail',
                data:{
                    stuId:this.id
                }
            }).then(res=>{
                if(res.flag){
                    this.avatar = res.data.photo;
                    this.username = res.data.name;
                    this.stuId = res.data.stuId;
                    this.character = res.data.nature;
                    this.specialty = res.data.special;
                    this.family = res.data.familyInfo;
                    this.conduct = res.data.actionLevel;

                    let tags = res.data.tags;
                    if(tags){
                        tags = JSON.parse(tags);
                        let checkList = [];
                        tags.forEach(item=>{
                            checkList.push(item.id);
                        })
                        this.checkList = checkList;
                        let arr = tags.filter(item=>item.id==-1);
                        if(arr[0]) this.custom = arr[0].name;
                    }
                }
            })
        },
        ChooseCharacter(val){
            this.character = val;
        },
        // ChooseSelect(val){
        //     console.log(val)
        //     this.select = val
        // },
        Confirm(){
            if(!this.avatar||!this.username||!this.stuId||!this.character||!this.specialty||!this.family||!this.conduct){
                this.$message({message:'请填写完整信息',type:'warning'});
                return;
            }
            
            let params = {
                grade:this.storeState.grade,
                stuClass:this.storeState.stuClass,
                type:this.handle==3?2:1,        //1新增2编辑
                photo:this.avatar,
                name:this.username,
                stuId:this.stuId,
                nature:this.character,
                special:this.specialty,
                familyInfo:this.family,
                actionLevel:this.conduct,
            }
            let {checkList,tags} = this,chooseTags = [];
            tags.forEach(item=>{
                if(checkList.indexOf(item.id)!=-1) chooseTags.push(item);
            })
            if(this.custom) chooseTags.push({name:this.custom,id:'-1'});
            //console.log(chooseTags,JSON.stringify(chooseTags));
            params.tags = JSON.stringify(chooseTags);
            this.$fetch({
                url:'api/student/saveOrUpdate',
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
        initUpload(){
            const that = this;
            this.$refs['avatar'].addEventListener('change',function(e){
                let file = this.files[0];
                let fromData = new FormData();
                fromData.append('file',file)
                that.$fetch({
                    url:'api/student/uploadImage',
                    type:'post',
                    data:fromData
                }).then(res=>{
                    e.target.value = '';
                    if(res.flag) that.avatar = res.data;
                })
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.input{
    background:url('../assets/img/input.png') 0 0/100% 100% no-repeat;
}
.area-input{
    background:url('../assets/img/area-input.png') 0 0/100% 100% no-repeat;
}
.el-checkbox{
    margin-bottom: 16px;
    color:#011d17;
    font-weight: bold;
}
.input2{
    background:url('../assets/img/input2.png') 0 0/100% 100% no-repeat;
}
.select{
    background:url('../assets/img/select2-bg.png') 0 0/100% 100% no-repeat;
}

.btn1{
    background:url('../assets/img/btns-bg2.png') 0 0/100% 100% no-repeat;
}
.btn2{
    background:url('../assets/img/btn-bg2.png') 0 0/100% 100% no-repeat;
}
</style>