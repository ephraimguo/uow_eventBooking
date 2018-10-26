<template>
  <p>
    this is dashboard
  </p>
</template>

<script>
  export default {
    name: "index",
    components: {

    },
    async fetch ({ store, redirect }) {
      if(!store.state.authUser){
        return redirect('/');
      }
    },
  }
</script>

<style scoped>

</style>