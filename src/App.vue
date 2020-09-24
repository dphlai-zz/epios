<template>
  <div id="app">
    <h1>Welcome to Epios</h1>
    <nav>

      <span v-if="!isLoggedIn">
        <router-link to="/login/doctors">Medical Practitioner Login</router-link>
        |
        <router-link to="/login/pharmacists">Pharmacist Login</router-link>
      </span>

      <span v-else>

        <a href="#" @click.prevent="doLogout">Logout</a>

        <span v-if="isDoctor">
          |
          <router-link to="/prescription-history">My prescription history</router-link>
          |
          <router-link to="/prescription/new">Issue new prescription</router-link>
        </span>

        <span v-if="isPharmacist">
          |
          <router-link to="/prescriptions">View prescriptions</router-link>
        </span>

      </span>

    </nav>
    <hr/>

    <router-view @loginSuccess="setUser" :currentUser="currentUser"/>

  </div>
</template>

<script>

import axios from 'axios';

export default {

  name: 'App',

  data(){
    return {
      currentUser: {}
    }
  },

  created(){
    const token = localStorage.getItem("jwt")
    const user = localStorage.getItem("user")
    if(token !== null && user !== null) {
      this.setUser(JSON.parse(user), token, false);
    } // if
  }, // created()

  computed: {
    isDoctor(){
      return this.currentUser.type === 'doctor'
    }, // isDoctor()

    isPharmacist(){
      return this.currentUser.type === 'pharmacist'
    }, // isPharmacist()

    isLoggedIn(){
      return this.currentUser.name !== undefined
    } // isLoggedIn()
  },

  methods: {
    setUser(user, token, save = true) {
      console.log('setUser() successfully ran:', user, token);
      this.currentUser = user;
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      if(save) {
        localStorage.setItem("jwt", token)
        localStorage.setItem("user", JSON.stringify(user))
        // Only need to save token and user when function is called from login component's $emit, not from created() above
      }
    }, // setUser()

    doLogout(){
      delete axios.defaults.headers.common.Authorization
      localStorage.removeItem("jwt")
      localStorage.removeItem("user")
      this.currentUser = {}
      this.$router.push({name: 'Home'})
    } // doLogout()
  }

} // export default
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
