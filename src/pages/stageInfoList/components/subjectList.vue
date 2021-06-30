<template>
    <div>
        <div class="chart wid100p h426 mt44 pl35 pr35 pt15 fsize12 center rel">
            <div class="flex h36 fsize14 col29564c">
                <p class="flex-son">学生姓名</p>
                <p class="flex-son">学期</p>
                <p class="flex-son">语文</p>
                <p class="flex-son">数学</p>
                <p class="flex-son">英语</p>
                <p class="flex-son">物理</p>
                <p class="flex-son">化学</p>
                <p class="flex-son">生物</p>
                <p class="flex-son">政治</p>
                <p class="flex-son">历史</p>
                <p class="flex-son">地理</p>
                <p class="flex-son">技术</p>
            </div>
            <div v-if="list.length>0">
                <div class="table flex fsize12 h56 mb5" v-for="(item,index) in list" :key="index">
                    <div class="flex-son ellipsis2">{{item.name}}</div>
                    <div class="flex-son ellipsis2">{{item.term}}</div>
                    <div class="flex-son ellipsis2">{{item.ywrank}}</div>
                    <div class="flex-son ellipsis2">{{item.sxrank}}</div>
                    <div class="flex-son ellipsis2">{{item.yyrank}}</div>
                    <div class="flex-son ellipsis2">{{item.wlrank}}</div>
                    <div class="flex-son ellipsis2">{{item.hxrank}}</div>
                    <div class="flex-son ellipsis2">{{item.swrank}}</div>
                    <div class="flex-son ellipsis2">{{item.zzrank}}</div>
                    <div class="flex-son ellipsis2">{{item.lsrank}}</div>
                    <div class="flex-son ellipsis2">{{item.dlrank}}</div>
                    <div class="flex-son ellipsis2">{{item.jsrank}}</div>
                </div>
            </div>
            <div class="pt100" v-else>
                <my-empty text="暂无数据~"></my-empty>
            </div>
            <!-- 按钮 -->
            <div class="dao wid100 lh33 fsize14 col29564c center abs l0 t-33 cursor rel">批量导入
                <input class="wid100 h36 abs l0 t0 opacity0 cursor" ref="batch" type="file" accept=".xls,.xlsx">
            </div>
            <div class="download wid100 lh33 fsize14 col29564c center abs l110 t-33 cursor flex-center" @click="dTemplate"><img class="wid18" src="@/assets/img/download.png" alt="" /><span class="pl5">导入模板</span></div>
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
            list:[]
        }
    },
    computed:{
        storeState(){
            const {grade,stuClass,keyword} = this.$store.state.until;
            return {grade,stuClass,keyword};
        },
        controller(){
            return this.$store.state.until.controller;
        }
    },
    watch:{
        storeState(val,oldval){
            //console.log(val,oldval,'2222222')
            this.page = 1;
            this.total = 0;
            this.list = [];
            this.getData();
        },
    },
    mounted(){
        this.getData();
        this.initBatch();
    },
    methods:{
        getData(){
            this.$fetch({
                url:'api/studentScore/list',
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
        initBatch(){
            const that = this;
            this.$refs['batch'].addEventListener('change',function(e){
                let file = this.files[0];
                let fromData = new FormData();
                fromData.append('file',file)
                that.$fetch({
                    url:'/api/studentScore/importExcel',
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
            this.$confirm('请导入全年级学生的学科排名，学期名称若与已有数据相同时，会删除已有数据。', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let a = document.createElement("a");
                let event = new MouseEvent("click");
                a.href = window.hez_baseURL+'api/downLoad/template?type=4';
                a.dispatchEvent(event);
            }).catch(() => {});
            
        }
    }
}
</script>
<style lang="scss" scoped>
.chart{
    background:url('../../../assets/img/chart-bg2.png') 0 0/100% 100% no-repeat;
}
.table{
    //background:url('../../../assets/img/table2.png') 0 0/100% 100% no-repeat;
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