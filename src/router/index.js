import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import DoctorLogin from '@/views/DoctorLogin'
import PharmacistLogin from '@/views/PharmacistLogin'
import PrescriptionsIndex from '@/views/PrescriptionsIndex'

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
      component: DoctorLogin
    },
    {
      path: '/login/pharmacists',
      name: 'PharmacistLogin',
      component: PharmacistLogin
    },
    {
      path: '/Prescriptions',
      name: 'PrescriptionsIndex',
      component: PrescriptionsIndex
    }
  ]
})
