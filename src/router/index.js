import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import DoctorLogin from '@/views/DoctorLogin'
import PharmacistLogin from '@/views/PharmacistLogin'
import PrescriptionsIndex from '@/views/PrescriptionsIndex'
import PrescriptionDetails from '@/views/PrescriptionDetails'

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
      path: '/prescriptions',
      name: 'PrescriptionsIndex',
      component: PrescriptionsIndex
    },
    {
      path: '/prescriptions/:id',
      name: 'PrescriptionDetails',
      component: PrescriptionDetails,
      props: true
    }
  ]
})
