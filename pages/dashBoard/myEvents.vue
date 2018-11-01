<template>
  <p>
    this is my event list page
  </p>
</template>

<script>
  export default {
    name: "MyEvents",
    layout:'dashBoard',
    async fetch ({ store, redirect }) {
      if(!store.state.authUser){
        return redirect('/');
      }
    }
  }
</script>

<style scoped>

</style>