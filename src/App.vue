<template>
  <div id="app">
    <h1>Welcome to Epios</h1>
    <nav>
      <router-link to="/login/doctors">Medical Practitioner Login</router-link>
      |
      <router-link to="/login/pharmacists">Pharmacist Login</router-link>
    </nav>
    <hr/>

    <router-view/>

  </div>
</template>

<script>
export default {
  name: 'App'
}
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

<!-- <nav>

  <span v-if="currentUser._id">
    Hello, {{currentUser.name}}
    |
    <a @onclick.prevent="doLogout" href="">Logout</a>
  </span>
  <span v-else>
  <router-link to="/login/doctors">Medical Practitioner Login</router-link>
  |
  <router-link to="/login/pharmacists">Pharmacist Login</router-link>
  </span>
  |
  <router-link to="/prescriptions">Prescriptions</router-link>
</nav>
<hr/>

<router-view @loginSuccess="onLoginSuccess" :currentUser="currentUser"/>  -->

<!-- import axios from 'axios';

export default {
  name: 'App',

  data(){
    return {
      currentUser: {}
    }
  },

  methods: {
    onLoginSuccess(user, token){
      this.currentUser = user;
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } // onLoginSuccess
  },
} -->
