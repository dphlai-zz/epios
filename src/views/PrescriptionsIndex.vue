<template lang="html">
<div>
  <div v-if="isPharmacist">
    <h3>Prescriptions Index</h3>

    <div class="container header">
      <div>Patient name</div>
      <div>Patient Medicare No.</div>
      <div>Item name</div>
      <div>Quantity</div>
      <div>Issued by</div>
      <div>Issue date</div>
      <div>Filled by</div>
      <div>Filled date</div>
    </div>

    <div
    class="container result"
    v-for="prescription in prescriptions"
    @click="goToPrescriptionDetails(prescription._id)"
    >
    <div>{{prescription.patientName}}</div>
    <div>{{prescription.patientMedicareNumber}}</div>
    <div>{{prescription.itemName}}</div>
    <div>{{prescription.quantity}}</div>
    <div>{{prescription.issuedByDoctor.name}}</div>
    <div>{{prescription.createdAt | formatDate}}</div>
    <div>{{prescription | filledBy}}</div>
    <div>
      <span v-if="'filledByPharmacist' in prescription">{{prescription.updatedAt | formatDate}}</span>
      <span v-else>Script not filled</span>
    </div>
  </div>

  </div>

  <div v-else>
    <h3>Access restricted. You do not have permission to view this content.</h3>
  </div>

</div>
</template>

<script>

import axios from 'axios';

const PRESCRIPTION_INDEX_URL = 'http://localhost:2854/prescriptions'

export default {

  props: ['currentUser'],

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

  computed: {
    isDoctor(){
      return this.currentUser.type === 'doctor'
    }, // isDoctor()

    isPharmacist(){
      return this.currentUser.type === 'pharmacist'
    },

    isLoggedIn(){
      return this.currentUser.name !== undefined
    } // isLoggedIn()
  },

  methods: {
    goToPrescriptionDetails(prescriptionId){
      this.$router.push({
        name: 'PrescriptionDetails',
        params: {
          id: prescriptionId
        }
      });
    } // goToPrescriptionDetails()
  }, // methods

  filters: {
    filledBy(prescription){
      if(prescription.filledByPharmacist){
        return prescription.filledByPharmacist.name
      } else {
        // return '<span class="notFilled">Not filled</span>'
        return 'Script not filled'
      } // if else
    }, // filledBy()

    formatDate(unformattedDate){
      return new Date(unformattedDate).toLocaleDateString('en-AU', {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
    } // formatDate()
  }

}
</script>

<style lang="css" scoped>

  .container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 0.5fr 1fr 1fr 1fr 1fr;
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
