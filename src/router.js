import Vue from 'vue'
import Router from 'vue-router'
// import app from './App.vue'

import Register from './views/register.vue'
import notFound from './views/404.vue'
import Login from './views/login'
import Index from './views/Index.vue'
import Info from './views/info.vue'


Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      name:'home',
      component:Index,
    },
    {
      path:'/home',
      name:'home',
      component:Index,
    },
    {
      path:'/index',
      name:'index',
      component:Index,
      children:[
        {path:'info',name:'info',component:Info}]
    },
    {
      path:'/register',
      name:'register',
      component:Register
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'*',
      name:'404',
      component:notFound
    }
  ]
})
// navagation guard
router.beforeEach((to,from,next)=>{
  const isLogin = localStorage.eletoken ? true :false;
  if(to.path=="/login" || to.path =="/register"){
    next();
  }else{
    isLogin ? next() : next("/login")
  }
})

export default router;