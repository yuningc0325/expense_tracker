import axios from "axios";
import { Message,Loading } from 'element-ui';
import router from './router';

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

    if(localStorage.eletoken){
        // header setting
        confing.headers.Authorization=localStorage.eletoken;
    }
    return confing;
},error=>{
    return Promise.reject(error);
})
// response
axios.interceptors.response.use(response=>{
    // end loading animation
    endLoading();
    return response;
},error=>{
    endLoading();
    Message.error(error.response.data);

    // Get the error status (process token expiration)
    const {errStatus}= error.response;
    if(errStatus==401){
        Message.error('token expire, please login again');
        // clean token
        localStorage.removeItem('eletoken');
        // jump to login page
        router.push('/login');
    }

    return Promise.reject(error);
})


export default axios;