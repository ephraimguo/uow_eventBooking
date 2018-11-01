<template>
  <p>this is management page</p>
</template>

<script>
  export default {
    name: "management",
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