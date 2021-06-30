<template>
    <div class="container pt50 pb45 flex-top-center">
        <div class="main-out flex-top">
            <keep-alive>
                <my-side></my-side>
            </keep-alive>
            
            <div class="main rel">
                <p class="fsize18 colfff pt23 lh30 center">学生列表</p>
                <div class="pt25 pl70 pr70">
                    <div class="mh520" v-if="list.length>0">
                        <div class="flex flex-wrap">
                            <router-link tag="div" :to="{path:'/studentDetail',query:{id:item.stuId}}" class="wid8-8p mr2-5p mb20 list" :id="index==0?'step3':null" v-for="(item,index) in list" :key="index">
                                <div class="wid100p h88 cursor avatar-out">
                                    <img v-lazy="item.photo" alt="">
                                </div>
                                <p class="fsize12 lh14 mt8 center ellipsis1">{{item.name}}</p>
                            </router-link>
                        </div>
                          
                    </div>
                    <div class="mh520 flex-center" v-else>
                        <my-empty text="暂无学生数据~"></my-empty>
                    </div>
                    

                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :page-size="limit"
                        :total="total"
                        @current-change="changePage">
                    </el-pagination>
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
            list:[],
            page:1,
            limit:36,
            total:0
        }
    },
    computed:{
        // grade(){   //当前年级
        //     return this.$store.state.until.grade;
        // },
        // stuClass(){   //当前班级
        //     return this.$store.state.until.stuClass;
        // },
        // keyword(){
        //     return this.$store.state.until.keyword;
        // },
        storeState(){
            const {grade,stuClass,keyword} = this.$store.state.until;
            return {grade,stuClass,keyword};
        },
        controller(){
            return this.$store.state.until.controller;
        }
    },
    watch:{
        // storeState(val,oldval){
        //     console.log(val,'storeState')
        //     // this.page = 1;
        //     // this.total = 0;
        //     // this.list = [];
        //     // this.getData();
        // },
        controller(val){
            // console.log(val,'controller')
            if(val){
                this.page = 1;
                this.total = 0;
                this.list = [];
                this.getData();
            }
        }
    },
    mounted(){
        // this.$EventBus.$emit('firstStudent','引导第三部学生数据');
        this.getData();
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
                    //引导第三部学生信息
                    this.$store.commit('until/SET_STEP3',res.data.data[0]||{})
                }
                this.$store.commit('until/SET_CONTROL',false);
            })
        },
        changePage(page){
            this.page = page;
            this.getData();
        }
    }
}
</script>
<style lang="scss" scoped>
.list{
    &:nth-of-type(9n+9){margin-right:0;}
    .avatar-out{
        background:url('../assets/img/ls-bg.png') 0 0/100% 100% no-repeat;
        img{
            width: 100%;
            height:100%;
            object-fit: cover;
            padding: 8px;
            border-radius: 16px;
        }
    }
}
.el-pagination{
    text-align: right;
}
</style>