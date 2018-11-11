import Vue from 'vue'
import Router from 'vue-router'
import app from './App.vue'
import Register from './views/register.vue'
import notFound from './views/404.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      name:'home',
      componemt:app
    },
    {
      path:'/register',
      name:'register',
      component:Register
    },
    {
      path:'*',
      name:'404',
      component:notFound
    }
  ]
})
