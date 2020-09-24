<template lang="html">
<div>

<div v-if="isPharmacist">
  <div v-if="prescription._id" class="container">

    <h3>Prescription for {{prescription.patientName}}</h3>

    <table>
      <tr>
        <th scope="row">Patient Medicare Number</th>
        <td>{{prescription.patientMedicareNumber}}</td>
      </tr>
      <tr>
        <th scope="row">Patient Address</th>
        <td>{{prescription.patientAddress}}</td>
      </tr>
      <tr>
        <th scope="row">Item Name</th>
        <td>{{prescription.itemName}}</td>
      </tr>
      <tr>
        <th scope="row">Dosage Instructions</th>
        <td>{{prescription.dosageInstructions}}</td>
      </tr>
      <tr>
        <th scope="row">Quantity</th>
        <td>{{prescription.quantity}}</td>
      </tr>
      <tr>
        <th scope="row">Issued by</th>
        <td>{{prescription.issuedByDoctor.name}}</td>
      </tr>
      <tr>
        <th scope="row">Issue Date</th>
        <td>{{prescription.createdAt | formatDate}}</td>
      </tr>
      <tr>
        <th scope=" row">Filled by</th>
        <td>
          <span v-if="prescription.filledByPharmacist && isPharmacist">
            {{prescription.filledByPharmacist.name}}
          </span>
          <span v-else>Script not filled</span>
        </td>
      </tr>
    </table>

    <br>
    <div v-if="prescription.filledByPharmacist && isPharmacist"></div>

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

import {PRESCRIPTIONS_URL} from '../constants'

export default {

  props: ['id', 'currentUser'],

  data(){
    return {
      prescription: {}
    }
  }, // data()

  methods: {
    fillScript(){
      const url = `${PRESCRIPTIONS_URL}/${this.id}/fill`
      axios.patch(url)
      .then(res => {
        console.log('Response:', res.data);
        this.prescription = res.data;
      })
      .catch(err => console.warn(err))
    } // fillScript()
  },

  created(){
    const url = `${PRESCRIPTIONS_URL}/${this.id}`
    axios.get(url)
    .then(res => {
      this.prescription = res.data;
    })
    .catch(err => console.warn(err));
  },

  computed: {
    isPharmacist(){
      return this.currentUser.type === 'pharmacist'
    } // isPharmacist()
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

table, td, th {
  border: 1px solid #ddd;
  text-align: left;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th {
  width: 20%;
  text-align: center;
}

th, td {
  padding: 15px;
}

button {
  background-color: rgb(0, 50, 66);
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 16px;
  color: white;
  transition: all 0.3s;
  height: 45px;
  width: 160px;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
}

button:hover {
  letter-spacing: 1px;
  background-color: rgb(0, 132, 175);
}

</style>
