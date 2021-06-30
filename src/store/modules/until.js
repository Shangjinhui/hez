
const state = {
  grade:window.sessionStorage.getItem('grade')||'一',      //年级
  stuClass:'',                                               //班级
  allStuClass:null,                                          //缓存侧边班级数据
  keyword:'',                                               //搜索关键词
  controller:false,                                         //触发列表获取数据
  step1:'',            //操作指引第一步：班级名
  step3:{},            //操作指引第三步：当前列表第一个学生信息
}

const mutations = {
  SET_ALLSTUCLASS: (state, data) => {
    state.allStuClass = data;
  },
  SET_GRADE: (state, grade) => {
    state.grade = grade;
  },
  SET_STUCLASS: (state, stuClass) => {
    state.stuClass = stuClass;
    state.controller = true;
  },
  SET_KEYWORD: (state, keyword) => {
    state.keyword = keyword;
    //搜索不分班级
    if(keyword){
      state.stuClass = '';
    }else{//清空搜索，班级变为原来的
      let side = window.sessionStorage.getItem('side')||0;
      state.stuClass = state.allStuClass[state.grade][side];
    }

    state.controller = true;
  },
  SET_CONTROL: (state, controller) => {
    state.controller = controller;
  },
  SET_STEP1: (state, name) => {
    state.step1 = name;
  },
  SET_STEP3: (state, name) => {
    state.step3 = name;
  },
}
const actions = {
  
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}