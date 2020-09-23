<template lang="html">
<div>

<div v-if="isPharmacist">
  <div v-if="prescription._id" class="container">

    <h2>Prescription for {{prescription.patientName}}</h2>

    <strong>Patient Medicare Number:</strong> {{prescription.patientMedicareNumber}}
    <br>
    <strong>Patient Address:</strong> {{prescription.patientAddress}}
    <br>
    <strong>Item Name:</strong> {{prescription.itemName}}
    <br>
    <strong>Dosage Instructions:</strong> {{prescription.dosageInstructions}}
    <br>
    <strong>Quantity:</strong> {{prescription.quantity}}
    <br>
    <strong>Issued by:</strong> {{prescription.issuedByDoctor.name}}
    <br>
    <strong>Issue Date:</strong> {{prescription.createdAt | formatDate}}
    <br>

    <div v-if="prescription.filledByPharmacist && isPharmacist">
      <strong>Filled by:</strong> {{prescription.filledByPharmacist.name}}
    </div>

    <div v-else>
      <button @click="fillScript">Fill script</button>
    </div>

  </div>

  <div v-else>
    <p>Loading prescription details...</p>
  </div>

</div>

<div v-else>
  <h3>Access restricted. You do not have permission to view this content.</h3>
</div>

</div>
</template>

<script>

import axios from 'axios';

const PRESCRIPTIONS_BASE_URL = 'http://localhost:2854/prescriptions'

export default {

  props: ['id', 'currentUser'],

  data(){
    return {
      prescription: {}
    }
  }, // data()

  methods: {
    fillScript(){
      const url = `${PRESCRIPTIONS_BASE_URL}/${this.id}/fill`
      axios.patch(url)
      .then(res => {
        console.log('Response:', res.data);
        this.prescription = res.data;
      })
      .catch(err => console.warn(err))
    } // fillScript()
  },

  created(){
    const url = `${PRESCRIPTIONS_BASE_URL}/${this.id}`
    axios.get(url)
    .then(res => {
      this.prescription = res.data;
    })
    .catch(err => console.warn(err));
  },

  computed: {
    isDoctor(){
      return this.currentUser.type === 'doctor'
    }, // isDoctor()

    isPharmacist(){
      return this.currentUser.type === 'pharmacist'
    },
  },

  filters: {
    formatDate(createdAt){
      return new Date(createdAt).toLocaleDateString('en-AU', {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
    } // formatDate()
  } // created()

}
</script>

<style lang="css" scoped>

.container {
  text-align: center;
}

</style>
