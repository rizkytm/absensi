// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as firebase from 'firebase'
import store from './store'
require('../node_modules/bootstrap/dist/css/bootstrap.css')

Vue.config.productionTip = false

const configOptions = {
  apiKey: 'AIzaSyCZ2dkU4ejEZtI69JhPeyaqtU_JYZGOHkU',
  authDomain: 'vuejs-auth-8b816.firebaseapp.com',
  databaseURL: 'https://vuejs-auth-8b816.firebaseio.com',
  projectId: 'vuejs-auth-8b816',
  storageBucket: 'vuejs-auth-8b816.appspot.com',
  messagingSenderId: '267647407976',
  appId: '1:267647407976:web:62bcdcda82aa88edce68dd'
}

firebase.initializeApp(configOptions)

firebase.auth().onAuthStateChanged(user => {
  store.dispatch('fetchUser', user)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
