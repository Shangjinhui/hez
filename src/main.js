import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('@/assets/img/loading.gif')
})

// import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/js/element'
import '@/assets/css/public.css'
import '@/assets/css/index.scss'
// Vue.use(Element)
// import './untils/filter'
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts;
import {fetch} from '@/untils/fetch'
Vue.prototype.$fetch = fetch;

Vue.prototype.$EventBus = new Vue();
// router.beforeEach((to, from, next) => {
//   //判断是否登录
//   let token = store.state.userInfo.token || window.localStorage.getItem('token');
//   if(!token&&to.name!='login'){
//     next('/login');
//   }else{
//     next();
//   }
// })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
