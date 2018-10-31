<template>
  <section class="container">
    <Card class="cal-panel" >
      <no-ssr>
        <vue-ctk-date-time-picker
            color="#00bca0"
            v-model="currentDateRaw"
            format="YYYY-MM-DD"
            label="Choose date"
            without-input
            disable-time/>
      </no-ssr>
    </Card>
    <EventList/>
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
        currentDateRaw: String(new Date())
      }
    },
    async fetch({store, redirect}) {
      if(!store.state.authUser){
        return redirect('/');
      }
    },
    async mounted() {
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