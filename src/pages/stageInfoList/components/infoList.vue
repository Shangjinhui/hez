<template>
    <div>
        <div class="chart wid100p h426 mt44 pl35 pr35 pt15 fsize12 rel">
            <div class="flex h36 fsize14 col29564c">
                <p class="wid96">学生照片</p>
                <p class="wid111">学生姓名</p>
                <p class="wid96">学号</p>
                <p class="wid130 center">操行等第</p>
                <p class="wid88">性格</p>
                <p class="wid118">爱好</p>
                <p class="wid160">标签</p>
                <p class="wid130 center">操作</p>
            </div>
            <div v-if="list.length>0">
                <div class="table flex fsize12 h56 mb5" v-for="(item,index) in list" :key="index">
                    <div class="wid96 pl5">
                        <div class="wid48 h48 avatar-out">
                            <img v-lazy="item.photo" alt="">
                        </div>
                    </div>
                    <div class="wid111 ellipsis2">{{item.name}}</div>
                    <div class="wid96 ellipsis2">{{item.stuId}}</div>
                    <div class="wid130 center ellipsis2">{{item.actionLevel}}</div>
                    <div class="wid88 ellipsis2">{{item.nature}}</div>
                    <div class="wid118 ellipsis2">{{item.special}}</div>
                    <div class="wid160 ellipsis2"><span v-for="(item2,index2) in JSON.parse(item.tags||'[]')" :key="index2">{{item2.name}}，</span></div>
                    <div class="operation wid130 flex-center cursor">
                        <router-link tag="p" :to="{path:'/stageAddInfo',query:{handle:2,id:item.stuId}}" class="mr10">查看</router-link>
                        <router-link tag="p" :to="{path:'/stageAddInfo',query:{handle:3,id:item.stuId}}" class="mr10">修改</router-link>
                        <p @click="Remove(item.stuId)">删除</p>
                    </div>
                </div>
            </div>
            <div class="pt100" v-else>
                <my-empty text="暂无数据~"></my-empty>
            </div>
            <!-- 按钮 -->
            <router-link tag="div" :to="{path:'/stageAddInfo',query:{handle:1}}" class="add wid100 lh33 fsize14 center abs l0 t-33 cursor">添加</router-link>
            <div class="dao wid100 lh33 fsize14 col29564c center abs l110 t-33 cursor">批量导入
                <input class="wid100 h36 abs l0 t0 opacity0 cursor" ref="batch" type="file" accept=".xls,.xlsx">
            </div>
            <div class="download wid100 lh33 fsize14 col29564c center abs l220 t-33 cursor flex-center"><img class="wid18" src="@/assets/img/download.png" alt="" /><span class="pl5" @click="dTemplate">导入模板</span></div>
        </div>
        <el-pagination
            background
            layout="prev, pager, next"
            :page-size="limit"
            :total="total"
            @current-change="changePage">
        </el-pagination>
    </div>
</template>
<script>
import myEmpty from '@/components/empty'
export default {
    components:{myEmpty},
    data(){
        return {
            page:1,
            limit:6,
            total:0,
            list:[],
        }
    },
    computed:{
        storeState(){
            const {grade,stuClass,keyword} = this.$store.state.until;
            return {grade,stuClass,keyword};
        }
    },
    watch:{
        storeState(val,oldval){
            console.log('infolist');
            this.page = 1;
            this.total = 0;
            this.list = [];
            this.getData();
        }
    },
    mounted(){
        this.getData();
        this.initBatch();
    },
    methods:{
        getData(){
            this.$fetch({
                url:'api/index/data',
                data:{
                    page:this.page,
                    limit:this.limit,
                    stuClass:this.storeState.stuClass,
                    grade:this.storeState.grade,
                    selectName:this.storeState.keyword,
                }
            }).then(res=>{
                //console.log(res)
                if(res.flag){
                    this.list = res.data.data;
                    this.total = res.data.count;
                }
            })
        },
        Remove(stuId){
            this.$confirm('是否删除此条记录?', '提示').then(() => {
                this.$fetch({
                    url:'api/student/delete',
                    type:'delete',
                    data:{stuId}
                }).then(res=>{
                    if(res.flag) this.getData();
                })
            }).catch(()=>{})

        },
        initBatch(){
            const that = this;
            this.$refs['batch'].addEventListener('change',function(e){
                let file = this.files[0];
                let fromData = new FormData();
                fromData.append('file',file)
                that.$fetch({
                    url:'api/student/importExcel',
                    type:'post',
                    data:fromData
                }).then(res=>{
                    e.target.value = '';
                    //console.log(res);
                    if(res.flag){
                        that.$message({message:res.msg,type:'success'});
                        that.getData();
                    }else{
                        that.$message({message:res.msg,type:'error'});
                    }
                })
            })
        },
        changePage(page){
            this.page = page;
            this.getData();
        },
        dTemplate(){
            let a = document.createElement("a");
            let event = new MouseEvent("click");
            a.href = window.hez_baseURL+'api/downLoad/template?type=1';
            a.dispatchEvent(event);
        }
    }
}
</script>
<style lang="scss" scoped>
.chart{
    background:url('../../../assets/img/chart-bg2.png') 0 0/100% 100% no-repeat;
}
.table{
    // background:url('../../../assets/img/table2.png') 0 0/100% 100% no-repeat;
    border-radius: 4px;
    border:1px solid #ddd;
    background-color: rgba(209,220,209,1);
    &:hover{background-color: rgba(209,220,209,.5);}
    .operation p{
        &:hover{color:#be7a01;}
    }
}
.avatar-out{
    background:url('../../../assets/img/ls-bg.png') 0 0/100% 100% no-repeat;
    img{
        width: 100%;
        height:100%;
        object-fit: cover;
        padding: 4px;
        border-radius: 8px;
    }
}
.add{
    background:url('../../../assets/img/btns-bg3.png') 0 0/100% 100% no-repeat;
}
.dao{
    background:url('../../../assets/img/btn-bg3.png') 0 0/100% 100% no-repeat;
}
.download{
    background:url('../../../assets/img/btn-bg4.png') 0 0/100% 100% no-repeat;
}

.el-pagination{
    text-align: right;
    margin-top: 7px;
}
</style>