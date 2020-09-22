import Vue from 'vue'
import Router from 'vue-router'
import DoctorLogin from '@/views/DoctorLogin'
import PharmacistLogin from '@/views/PharmacistLogin'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login/doctors',
      name: 'DoctorLogin',
      component: DoctorLogin,
      // props: true
    },
    {
      path: '/login/pharmacists',
      name: 'PharmacistLogin',
      component: PharmacistLogin,
      // props: true
    }
  ]
})
