<template lang="html">
<div>
  <h3>Prescriptions Index</h3>

  <div class="container header">
    <div>Patient Name</div>
    <div>Patient Medicare No.</div>
    <div>Item Name</div>
    <div>Quantity</div>
    <div>Issued by</div>
    <div>Filled by</div>
  </div>

  <div
    class="container result"
    v-for="prescription in prescriptions"
  >
    <div>{{prescription.patientName}}</div>
    <div>{{prescription.patientMedicareNumber}}</div>
    <div>{{prescription.itemName}}</div>
    <div>{{prescription.quantity}}</div>
    <div>Doctor name</div>
    <div>Pharmacist name</div>
  </div>

</div>
</template>

<script>

import axios from 'axios';

const PRESCRIPTION_INDEX_URL = 'http://localhost:2854/prescriptions'

export default {

  data(){
    return {
      prescriptions: [],
    };
  }, // data()

  created(){
    axios.get(PRESCRIPTION_INDEX_URL)
    .then(res => {
      this.prescriptions = res.data;
    })
    .catch(err => console.warn(err));
  }, // created()

}
</script>

<style lang="css" scoped>

  .container {
    display: grid;
    grid-template-columns: 2fr 1fr 2fr 0.5fr 1fr 1fr;
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .header {
    background-color: rgb(5, 172, 147);
    color: white;
  }

  .result {
    cursor: pointer;
  }

  .result:hover {
    background-color: rgba(204, 255, 247, 0.20);
    font-weight: bold;
  }
</style>
