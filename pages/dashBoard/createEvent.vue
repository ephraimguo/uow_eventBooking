<template>
  <section>
    <CreateNewEventPanel/>
  </section>
</template>

<script>
  import axios from '@/plugins/axios'

  import CreateNewEventPanel from '@/components/dashBoard/CreateNewEventPanel.vue'

  export default {
    name: "createEvent",
    layout: 'dashBoard',
    components: {
      CreateNewEventPanel
    }
  }
</script>

<style scoped>

</style>