<template>
  <section>

  </section>
</template>

<script>
  import axios from '@/'

  export default {
    name: "index",
    layout:'dashBoard',
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