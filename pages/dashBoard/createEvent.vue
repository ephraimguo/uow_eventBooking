<template>
  <section>
    <CreateNewEventPanel @createNewEvent="createNewEvent"/>
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
    },
    async fetch ({ store, redirect }) {
      if(!store.state.authUser){
        return redirect('/');
      }
    },
    methods: {
      createNewEvent(newEventInfo){
        console.log('\n\n ====== createEvent page <|-- createNewEvent() \n ====== ',
          newEventInfo, '\n ----------------------');
      }
    }
  }
</script>

<style scoped>

</style>