<template>
  <div class="container pt50 pb45 flex-top-center">
    <div class="main-out flex-top">
      <my-side></my-side>
      <div class="main rel">
        <p class="fsize18 colfff pt23 lh30 center">添加生理健康</p>
        <div class="kuang pt25 pl70 pr70 fsize14">
          <div class="flex-btm mb24">
            <div class="flex">
              <p class="lh40">
                <span class="wid75 inline justify">时间</span>：
              </p>
              <div class="date wid285 h40 pl15 pr15 over-hid rel">
                <div class="lh40">{{ timer }}</div>
                <el-date-picker
                  class="wid285 h40 abs l0 t0 opacity0"
                  v-model="timer"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                  :disabled="handle == 2"
                  :picker-options="pickerOptions"
                  @change="changeDate"
                >
                </el-date-picker>
              </div>
            </div>
          </div>
          <div class="flex-btm mb10">
            <div class="flex wid420">
              <p class="lh40">
                <span class="wid75 inline justify">身高</span>：
              </p>
              <input
                class="input wid285 lh40 pl15 pr15"
                type="text"
                v-model="height"
                :disabled="handle == 2"
              />
            </div>
            <div class="flex">
              <p class="lh40">
                <span class="wid75 inline justify">体重</span>：
              </p>
              <input
                class="input wid285 lh40 pl15 pr15"
                type="text"
                v-model="weight"
                :disabled="handle == 2"
              />
            </div>
          </div>
          <div class="flex-btm mb10">
            <div class="flex wid420">
              <p class="lh40">
                <span class="wid75 inline justify">肺活量</span>：
              </p>
              <input
                class="input wid285 lh40 pl15 pr15"
                type="text"
                v-model="vitalCapacity"
                :disabled="handle == 2"
              />
            </div>
            <div class="flex">
              <p class="lh40">
                <span class="wid75 inline justify">左眼视力</span>：
              </p>
              <input
                class="input wid285 lh40 pl15 pr15"
                type="text"
                v-model="visionLeft"
                :disabled="handle == 2"
              />
            </div>
          </div>
          <div class="flex-btm mb10">
            <div class="flex wid420">
              <p class="lh40">
                <span class="wid75 inline justify">右眼视力</span>：
              </p>
              <input
                class="input wid285 lh40 pl15 pr15"
                type="text"
                v-model="visionRight"
                :disabled="handle == 2"
              />
            </div>

          </div>

          <div class="flex-center mt44" v-if="handle != 2">
            <div
              class="btn1 wid111 lh36 center fsize14 col503925 mr16 cursor"
              @click="Confirm"
            >
              确定
            </div>
            <div
              class="btn2 wid111 lh36 center fsize14 col503925 cursor"
              @click="Cancle"
            >
              取消
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
            handle:'',          //1新增2查看3编辑
            id:'',              //查看和编辑时的id
            // avatar:'',          //头像
            // avatar_z:require('@/assets/img/avatar-z.png'),
            // username:'',
            // stuId:'',
            // character:'',
            // characterList:[],
            // specialty:'',
            // family:'',
            // conduct:'',
            // tags:[],              //标签列表
            // checkList:[],         //选择的标签
            // custom:'',            //总定义标签
            // selectList:[{name:'优秀'},{name:'良好'},{name:'及格'}],
            // select:''
            timer:'',
            // 限制不可选今天以后的日期
            pickerOptions:{
                disabledDate: (time) => {
                    return time.getTime() > Date.now();
                }
            },
            height:'',
            weight:'',
            vitalCapacity:'',
            visionLeft:'',
            visionRight:'',
        }
    },
    computed:{
        // storeState(){
        //     const {grade,stuClass,keyword} = this.$store.state.until;
        //     return {grade,stuClass,keyword};
        // }
    },
    mounted(){
        this.handle = this.$route.query.handle||1;
        this.id = this.$route.query.id;
        if(this.id) this.getData();
    },
    methods:{
        getData(){
            this.$fetch({
                url:'api/sportsHealth/detailById',
                data:{
                    id:this.id
                }
            }).then(res=>{
                if(res.flag){
                    this.timer = res.data.testTime;
                    this.height = res.data.height;
                    this.weight = res.data.weight;
                    this.vitalCapacity = res.data.vitalCapacity;
                    this.visionLeft = res.data.visionLeft;
                    this.visionRight = res.data.visionRight;
                }
            })
        },
        changeDate(val){
            //console.log(val)
        },
        Confirm(){
            // if(!this.avatar||!this.username||!this.stuId||!this.character||!this.specialty||!this.family||!this.conduct){
            //     this.$message({message:'请填写完整信息',type:'warning'});
            //     return;
            // }
            let params = {
                id:this.id,
                timer:this.timer,
                height:this.height,
                weight:this.weight,
                vitalCapacity:this.vitalCapacity,
                visionLeft:this.visionLeft,
                visionRight:this.visionRight,
            }
            // console.log(params);
            // return;
            this.$fetch({
                url:'api/sportsHealth/sportsHealthSaveOrUpdate',
                type:'post',
                data:params
            }).then(res=>{
                if(res.flag){
                    this.$message({message:'修改成功',type:'success'});
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
    }
}
</script>
<style lang="scss" scoped>
.input {
  background: url("../assets/img/input.png") 0 0/100% 100% no-repeat;
}
.area-input {
  background: url("../assets/img/area-input.png") 0 0/100% 100% no-repeat;
}
.date {
  background: url("../assets/img/date-bg2.png") 0 0/100% 100% no-repeat;
}
.el-checkbox {
  margin-bottom: 16px;
  color: #011d17;
  font-weight: bold;
}
.input2 {
  background: url("../assets/img/input2.png") 0 0/100% 100% no-repeat;
}
.select {
  background: url("../assets/img/select2-bg.png") 0 0/100% 100% no-repeat;
}

.btn1 {
  background: url("../assets/img/btns-bg2.png") 0 0/100% 100% no-repeat;
}
.btn2 {
  background: url("../assets/img/btn-bg2.png") 0 0/100% 100% no-repeat;
}
</style>