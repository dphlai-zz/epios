<template lang="html">
<div>
  <h3>Medical Practitioner Login</h3>

  <form @submit.prevent="doLogin">
    <label>Email:</label>
    <input type="text" v-model="email">
    <label>Password:</label>
    <input type="password" v-model="password">
    <br>
    <button>Login</button>
  </form>

</div>
</template>

<script>

import axios from 'axios'

const LOGIN_URL = 'http://localhost:2854/login/doctors'

export default {
  name: 'DoctorLogin',

  data(){
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  }, // data()

  methods: {
    doLogin(){
      console.log('Doctor login form submitted.');
      axios.post(LOGIN_URL, {
        email: this.email,
        password: this.password
      })
      .then(res => {
        console.log('Login response', res.data);
        this.$emit('loginSuccess', res.data.user, res.data.token);
        this.$router.push({name: 'Prescriptions'});
      })
      .catch(err => {
        console.log('Login error', err);
        if(err.response.status === 401){
          this.errorMessage = 'Invalid email and/or password.'
        }
      });
    } // doLogin()
  }

} // export default
</script>

<style lang="css" scoped>
</style>
