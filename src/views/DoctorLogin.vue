<template lang="html">
<div>
  <h3>Medical Practitioner Login</h3>
  <p> If you are experiencing any issues, please reach out to us at support@epios.com.</p>

  <div v-if="errorMessage" class="error">
    {{this.errorMessage}}
  </div>

  <form @submit.prevent="doLogin">
    <label>Email:</label>
    <input type="text" v-model="email">
    <label>Password:</label>
    <input type="password" v-model="password">
    <br>
    <button>Login</button>
  </form>
  <br>


</div>
</template>

<script>

import axios from 'axios'

import {DOCTOR_LOGIN_URL} from '../constants'

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
      axios.post(DOCTOR_LOGIN_URL, {
        email: this.email,
        password: this.password
      })
      .then(res => {
        console.log('Login response', res.data);
        this.$emit('loginSuccess', res.data.user, res.data.token);
        this.$router.push({name: 'PrescriptionHistory'});
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

.error {
  color: red;
  font-weight: bold;
}

button {
  background-color: rgb(0, 50, 66);
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: white;
  transition: all 0.3s;
  height: 40px;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
}

button:hover {
  letter-spacing: 1px;
  background-color: rgb(0, 132, 175);
}

</style>
