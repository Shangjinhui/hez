<template>
    <div class="side">
        <div class="scroll-out">
            <ul class="fsize16 colfff" :style="{'top':pos*-74+'px'}">
                <li :id="index==0?'step1':null" class="cursor" :class="[{'on':selected==index}]" v-for="(item,index) in allList[grade]" :key="index" @click="changeNav(index)">高{{grade}}({{item}})班</li>
            </ul>
        </div>
        <div class="up cursor" @click="Prev"></div>
        <div class="down cursor" @click="Next"></div>
    </div>
</template>
<script>
import {IsStage} from '@/untils/until.js'
export default {
    data(){
        return {
            allList:{'一':[''],'二':[''],'三':['']},      //所有年级  (给以操作指引第一步位置)
            //list:[],         //某年级下的所有班级
            selected:-1,      //选中的班级
            pos:0,     //上翻个数
        }
    },
    computed:{
        grade(){   //当前年级
            return this.$store.state.until.grade;
        },
        keyword(){
            return this.$store.state.until.keyword;
        },
    },
    watch:{
        //年级变化（选中的班级初始化）
        grade(){
            this.selected = 0;
            this.pos = 0;
            window.sessionStorage.setItem('side',0)
            window.sessionStorage.setItem('pos',0)
            this.$store.commit('until/SET_STUCLASS',this.allList[this.grade][this.selected]);
            this.$store.commit('until/SET_KEYWORD','');
            // this.$store.commit('until/SET_CONTROL',true); 
        },
        pos(val){
            window.sessionStorage.setItem('pos',val)
        },
        //当有关键词时说明在搜索，搜索不分班级，所以有搜索词时置为-1，没有时设置回来
        keyword(val){
            if(val){
                this.selected = -1;
            }else{
                this.selected = window.sessionStorage.getItem('side')||0;
                this.pos = window.sessionStorage.getItem('pos')||0;
            }
        },

    },
    mounted(){
        this.getData();
    },
    beforeUpdate(){
        //实时改变第一步指南的内容
        let Class = this.allList[this.grade][this.pos];
        this.$store.commit('until/SET_STEP1',`高${this.grade}(${Class})班`)
    },
    methods:{
        //所有年级列表
        getData(){
            let allList = this.$store.state.until.allStuClass;
            if(allList){
                this.allList = allList;
                //console.log(this.keyword,'-------------')
                if(this.keyword) return;
                this.selected = window.sessionStorage.getItem('side')||0;
                this.pos = window.sessionStorage.getItem('pos')||0;
                this.$store.commit('until/SET_STUCLASS',this.allList[this.grade][this.selected]);
                return;
            }
            this.$fetch({
                url:'api/index/getStuClass',
            }).then(res=>{
                //console.log(res)
                if(res.flag){
                    this.allList = res.data;
                    this.$store.commit('until/SET_ALLSTUCLASS',res.data);
                    if(this.keyword) return;
                    this.selected = window.sessionStorage.getItem('side')||0;
                    this.pos = window.sessionStorage.getItem('pos')||0;
                    this.$store.commit('until/SET_STUCLASS',this.allList[this.grade][this.selected]);
                }
            })
        },
        changeNav(ind){
            this.selected = ind;
            window.sessionStorage.setItem('side',ind);  
            this.$store.commit('until/SET_STUCLASS',this.allList[this.grade][this.selected]); 
            this.$store.commit('until/SET_KEYWORD',''); 
            IsStage(this);  
            // this.$store.commit('until/SET_CONTROL',true); 
        },
        Prev(){
            if(this.pos > 0) this.pos--;
        },
        Next(){
            if(this.pos + 6 < this.allList[this.grade].length) this.pos++;
        },
    }
}
</script>
<style lang="scss" scoped>
.side{
    margin-right: -36px;
    padding-top: 96px;
    z-index: 9;
    .scroll-out{
        width:118px;
        height:432px;
        overflow: hidden;
        ul{
            position: relative;
            top:0;
            transition: all .3s ease;
            li{
                width:125px;
                height: 62px;
                padding-left: 30px;
                padding-top: 22px;
                margin-bottom:12px;
                background: url('../assets/img/side.png') no-repeat;
                text-shadow: 0px 0px 5px #0b8066;
                &.on{
                    background: url('../assets/img/sides.png') no-repeat;
                }
            }
        }
    }
    .up,.down{
        width:51px;
        height:27px;
        position: relative;
        right: -68px;
        &:hover{opacity: .6;}
    }
    .up{
        background: url('../assets/img/up.png') no-repeat;
        margin-top:20px;
    }
    .down{
        background: url('../assets/img/down.png') no-repeat;
        margin-top:10px;
    }
}

</style>