<template lang="html">
<div>

  <h3>Issue new prescription</h3>

  <form @submit.prevent="issueScript">
    <label>Patient Name:</label>
    <input type="text" v-model="patientName">
    <label>Patient Medicare Number:</label>
    <input type="text" v-model="patientMedicareNumber">
    <label>Patient Address:</label>
    <input type="text" v-model="patientAddress">
    <label>Item Name:</label>
    <input type="text" v-model="itemName">
    <label>Dosage Instructions:</label>
    <input type="text" v-model="dosageInstructions">
    <label>Quantity:</label>
    <input type="number" v-model="quantity">

    <br>
    <button>Issue Script</button>
  </form>

</div>
</template>

<script>

import axios from 'axios'

import {PRESCRIPTIONS_URL} from '../constants'

export default {

  props: ['currentUser'],

  data(){
    return {
      // currentUser: {},
      patientName: '',
      patientMedicareNumber: '',
      patientAddress: '',
      itemName: '',
      dosageInstructions: '',
      quantity: '',
      issuedByDoctor: ''
    }
  },

  methods: {
    issueScript(){
      axios.post(PRESCRIPTIONS_URL, {
        patientName: this.patientName,
        patientMedicareNumber: this.patientMedicareNumber,
        patientAddress: this.patientAddress,
        itemName: this.itemName,
        dosageInstructions: this.dosageInstructions,
        quantity: this.quantity,
        issuedByDoctor: this.issuedByDoctor
      })
      .then(res => {
        console.log('Form submitted:', res.data);
        this.$router.push({name: 'PrescriptionHistory'});
      })
      .catch(err => {
        console.log(err);
      })
    } // issueScript()
  } // methods

}

</script>

<style lang="css" scoped>

form {
  display: grid;
  max-width: 35vw;
  margin: 0 auto;
  grid-template-columns: 4fr 6fr;
}

form > * {
  margin-top: 10px;
}

label {
  text-align: right;
  padding-right: 10px;
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
