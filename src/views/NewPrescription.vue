<template lang="html">
<div>

  <h3>Issue new prescription</h3>

  <div v-if="errors.length" class="errors">
    Please resolve the following error(s):<br><br>
    <div v-for="error in errors">{{error}}</div>
    <br>
  </div>


  <form @submit.prevent="checkForm">
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
      patientName: '',
      patientMedicareNumber: '',
      patientAddress: '',
      itemName: '',
      dosageInstructions: '',
      quantity: '',
      issuedByDoctor: '',
      errors: []
    }
  },

  methods: {

    checkForm(){
      if(!this.patientName) this.errors.push("Patient name required.");
      if(!this.patientMedicareNumber) this.errors.push("Patient medicare number required.");
      if(!this.patientAddress) this.errors.push("Patient address required.");
      if(!this.itemName) this.errors.push("Item name required.");
      if(!this.dosageInstructions) this.errors.push("Dosage instructions required.");
      if(!this.quantity) this.errors.push("Quantity required.");

      if(this.patientName
        && this.patientMedicareNumber
        && this.patientAddress
        && this.itemName
        && this.dosageInstructions
        && this.quantity
      ){
        this.issueScript();
      }
    },

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

.errors {
  display: flex;
  flex-direction: column;
  color: red;
  font-weight: bold;
}

</style>
