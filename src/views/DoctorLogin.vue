<template lang="html">
<div>
  <h3>Medical Practitioner Login</h3>
  <p>Sign in below.</p>
  <p> If you are experiencing any issues, please reach out to us at admin@epios.com.</p>

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
        this.$router.push({name: 'PrescriptionsIndex'});
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

form {
  display: grid;
  max-width: 20vw;
  margin: 0 auto;
  grid-template-columns: 1fr 2fr;
}

form > * {
  margin-top: 10px;
}

label {
  text-align: right;
  padding-right: 10px;
}

</style>
