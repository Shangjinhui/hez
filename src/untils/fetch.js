import axios from 'axios'
import {Loading} from 'element-ui'

//测试
// const baseURL = process.env.NODE_ENV === 'production'?'http://192.168.1.217:9090/':'/api';
// window.hez_baseURL = 'http://192.168.1.217:9090/';
// const baseURL = process.env.NODE_ENV === 'production'?'http://portraits.ontheway168.cn/':'/api';
// window.hez_baseURL = 'http://portraits.ontheway168.cn/';
const baseURL = process.env.NODE_ENV === 'production'?'/':'/api';
window.hez_baseURL = '/';

export function fetch(options){
    let {url,type,data,loading} = options;
    let config = {
        url,
        method: type || 'GET',
        loading: loading == false ? false : true
    }
    if(type && (type.toUpperCase() == 'POST')){
        config.data = data || {};
    }else{
        config.params = data || {};
    }
    return new Promise((resolve,reject) =>{
        let Load = null;
        config.url += `?ie_cache=${Math.random()}`;
        if(config.loading) Load = Loading.service({text:'Loading',spinner:'el-icon-loading',background:'rgba(0, 0, 0, .3)'})
        const instance = axios.create({
            baseURL: baseURL,
            //定义请求文件类型
            headers:{
            //    'Content-Type': 'application/json',
            //    'Authorization':localStorage.tokenpc?localStorage.tokenpc:'',
            //    'Platform':2
             },
             timeout: 120000,
         });
        //请求成功后执行的函数
         instance(config).then(res =>{
             if(config.loading) Load.close();
             resolve(res.data);
         //失败后执行的函数
         }).catch(err => {
             console.log(err,'error')
             if(config.loading) Load.close();
             reject(err);
         })
     });
}