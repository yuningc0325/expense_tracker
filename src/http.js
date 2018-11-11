import axios from "axios";
import { Message,Loading } from 'element-ui';

var loading;

function startLoading(){
    loading=Loading.service({
        lock:true,
        text:'loading',
        background:'rgba(0,0,0,0.7)'
    });
}

function endLoading(){
    loading.close();
}


// request
axios.interceptors.request.use(confing=>{
    // loading animation
    startLoading();
    return confing;
},error=>{
    return Promise.reject(err);
})
// response
axios.interceptors.response.use(response=>{
    // end loading animation
    endLoading();
    return response;
},error=>{
    endLoading();
    Message.error(error.response.data);
    return Promise.reject(err);
})


export default axios;