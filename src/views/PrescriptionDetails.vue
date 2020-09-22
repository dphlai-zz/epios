<template lang="html">
<div>

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
    <strong>Issue Date:</strong> {{prescription.createdAt}}
    <br>
    <strong>Filled by:</strong> {{prescription.filledByPharmacist.name}}
    <br>
  </div>
  <div v-else>
    <p>Loading prescription details...</p>
  </div>

</div>
</template>

<script>

import axios from 'axios';

const PRESCRIPTIONS_BASE_URL = 'http://localhost:2854/prescriptions'

export default {

  props: ['id'],

  data(){
    return {
      prescription: {}
    }
  }, // data()

  created(){
    const url = `${PRESCRIPTIONS_BASE_URL}/${this.id}`

    axios.get(url)
    .then(res => {
      this.prescription = res.data;
    })
    .catch(err => console.warn(err));
  } // created()

}
</script>

<style lang="css" scoped>

.container {
  text-align: center;
}

</style>
