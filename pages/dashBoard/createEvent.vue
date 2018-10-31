<template>
  <section>
    <CreateNewEventPanel @createNewEvent="createNewEvent"/>
  </section>
</template>

<script>
  import axios from '@/plugins/axios'
  import domain from '@/plugins/domain'

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
      async createNewEvent(newEventInfo){
        const newEvent = (await axios.post('/domain/Event/create', newEventInfo)).data;

        if(newEvent.hasOwnProperty('error')){
          console.log('\n\n ====== createEvent page <|-- createNewEvent() \n ====== ',
            newEvent, '\n ----------------------');
          this.$Message.error(newEvent.error.dupTimeAndVenue);
        }
        else{
          console.log('\n\n ====== createEvent page <|-- createNewEvent() \n ====== ',
            newEvent, '\n ----------------------');
          this.$Message.success('Successfully created');
        }
      }
    }
  }
</script>

<style scoped>

</style>