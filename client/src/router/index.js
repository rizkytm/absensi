import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Home from '@/components/Home'

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
    }
  ]
})
