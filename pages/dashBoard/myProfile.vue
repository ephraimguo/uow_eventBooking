<template>
  <p>
    this is my profile page
  </p>
</template>

<script>
  export default {
    name: "myProfile",
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