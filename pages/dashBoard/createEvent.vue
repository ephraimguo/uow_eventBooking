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
        // try {
        //   // const newEvent = await domain.create('Event', newEventInfo);
        //   console.log('\n\n ======  createEvent page <|-- createNewEvent() success \n ====== \n',
        //     newEvent,'\n----------------');
        //   this.$Message.success('Successfully created \n ' + JSON.stringify(newEvent));
        // }
        // catch(err) {
        //   console.log('\n\n ====== createEvent page <|-- createNewEvent() ERR \n ====== ',
        //     err, '\n ------------------------');
        //   this.$Message.error("Error - time conflicts");
        // }

      }
    }
  }
</script>

<style scoped>

</style>