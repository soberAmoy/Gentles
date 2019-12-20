import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import MainPage from '../components/MainPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import BackendPage from '../components/BackendPage.vue'
import FinallPage from '../components/FinallPage.vue'
import MemberCenter from '../components/MemberCenter.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: LoginPage
    },
    {
      path: '/home',
      component: MainPage
    },
    {
      path: '/register',
      component: RegisterPage
    },
    {
      path: '/backend',
      component: BackendPage
    },
    {
      path: '/finalPage',
      component: FinallPage
    },
    {
      path: '/MemberCenter',
      component: MemberCenter
    }
  ]
})
