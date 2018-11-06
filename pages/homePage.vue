<template>
  <section class="container">
    <Card class="cal-panel" >
      <no-ssr>
        <vue-ctk-date-time-picker
            color="#00bca0"
            v-model="currentDateRaw"
            format="YYYY-MM-DD"
            formatted="DD-MM-YYYY HH:mm"
            label="Choose date"
            enable-button-validate
            disable-time/>
      </no-ssr>
    </Card>
    <EventList @bookingEvent="bookingEvent"
               @updateEventInfo="initEvenListOfDay"/>


  </section>
</template>

<script>
  import axios from '@/plugins/axios'

  import EventList from '@/components/mainPage/EventList.vue'

  export default {
    name: "homePage",
    components:{
      EventList
    },
    data() {
      return {
        currentDateRaw: this.$moment(Date.now()).format('YYYY-MM-DD').toString()
      }
    },
    async fetch({store, redirect}) {
      if(!store.state.authUser){
        return redirect('/');
      }
    },
    async mounted() {
      const managerId = 'evtmanager' + this.$store.state.authUser.id;
      const {userEventManager} = (await axios.post('/userEventManager/queryById', {managerId})).data;
      console.log('\n\n ====== home Page <|-- After LogIn get current Manager ====== \n', userEventManager, '\n -----------');
      this.$store.commit('setAuthUserManager', {userEventManager});

      await this.initEvenListOfDay();
    },
    async updated(){
      console.log('\n\n ===== homePage <|-- main calendar ===== \n',
        this.currentDateRaw, '\n ---------------');
      this.initEvenListOfDay();
    },
    methods: {
      async initEvenListOfDay(){
        const events = (await axios.post('/event/queryByDate',
                                {currentDateRaw: this.currentDateRaw})).data;
        console.log('\n\n ===== homePage <|-- initEventListOfDay =====\n',
          events, '\n ---------------');
        this.$store.commit('setCalEventList', events);
      },

      async bookingEvent(eventId) {
        console.log('\n\n ======== homePage <|-- bookEvent() ======== \n',
          eventId, '\n ----------------------');
        const evtInfo = (await axios.post('/userEventManager/bookEvent', {eventId: eventId,
            userActorId: this.$store.state.authUser.id,
            adminActorId:this.$store.state.authUser.id})).data;
        console.log('\n\n ======== homePage <|-- bookEvent() booked event returned ======== \n',
          evtInfo, '\n ----------------------');

        const managerId = 'evtmanager' + this.$store.state.authUser.id;
        const {userEventManager} = (await axios.post('/userEventManager/queryById', {managerId})).data;
        console.log('\n\n ====== home Page <|-- After LogIn get current Manager ====== \n', userEventManager, '\n -----------');
        this.$store.commit('setAuthUserManager', {userEventManager});
        this.initEvenListOfDay();
      }
    }
  }
</script>

<style scoped>
  .cal-panel{
    margin: 0 30px;
  }

  .container{
    background:#eee;
    padding: 20px;
  }

</style>