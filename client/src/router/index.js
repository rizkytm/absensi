import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Home from '@/components/Home'
import ListAbsen from '@/components/ListAbsen'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/all',
      name: 'ListAbsen',
      component: ListAbsen
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
