<template lang="html">
<div>

  <div v-if="isDoctor">
    <p>Hi</p>
  </div>

  <div v-else>
    <h3>Access restricted. You do not have permission to view this content.</h3>
  </div>

</div>
</template>

<script>
export default {

  props: ['currentUser'],

  computed: {
    isDoctor(){
      return this.currentUser.type === 'doctor'
    } // isDoctor()
  },

}
</script>

<style lang="css" scoped>
</style>

<!-- Created new PrescriptionHistory template for doctors -->
