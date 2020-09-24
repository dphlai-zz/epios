<template lang="html">
<div>

  <div v-if="isDoctor">
    <h3>My Prescription History</h3>

    <div class="container header">
      <div>Patient name</div>
      <div>Patient Medicare No.</div>
      <div>Item name</div>
      <div>Quantity</div>
      <div>Dosage directions</div>
      <div>Issue date</div>
    </div>

    <div
    class="container result"
    v-for="prescription in prescriptions"
    >
      <div>{{prescription.patientName}}</div>
      <div>{{prescription.patientMedicareNumber}}</div>
      <div>{{prescription.itemName}}</div>
      <div>{{prescription.quantity}}</div>
      <div>{{prescription.dosageInstructions}}</div>
      <div>{{prescription.createdAt | formatDate}}</div>
    </div>

  </div>

  <div v-else>
    <h3>Access restricted. You do not have permission to view this content.</h3>
  </div>

</div>
</template>

<script>

import axios from 'axios'

const PRESCRIPTION_HISTORY_URL = 'http://localhost:2854/prescription-history'

export default {

  props: ['currentUser'],

  data(){
    return {
      prescriptions: [],
    };
  }, // data()

  created(){
    axios.get(PRESCRIPTION_HISTORY_URL)
    .then(res => {
      this.prescriptions = res.data;
    })
    .catch(err => console.warn(err));
  }, // created()

  computed: {
    isDoctor(){
      return this.currentUser.type === 'doctor'
    } // isDoctor()
  },

  filters: {
    formatDate(unformattedDate){
      return new Date(unformattedDate).toLocaleDateString('en-AU', {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
    } // formatDate()
  }

} // export default
</script>

<style lang="css" scoped>

  .container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 0.5fr 2fr 1fr;
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .header {
    background-color: rgb(5, 172, 147);
    color: white;
  }

  .result:hover {
    background-color: rgba(204, 255, 247, 0.20);
    font-weight: bold;
  }

</style>

<!-- Created new PrescriptionHistory template for doctors -->
