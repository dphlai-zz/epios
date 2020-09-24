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
    <!-- <label>Issued By:</label>
    <input disabled type="text" :value="currentUser.id"> -->

    <br>
    <button>Issue Script</button>
  </form>

</div>
</template>

<script>

import axios from 'axios'

const PRESCRIPTIONS_URL = 'http://localhost:2854/prescriptions'

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
        this.$router.push({name: 'PrescriptionsIndex'});
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

</style>
