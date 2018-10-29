<template>
  <section class="container">
    <Card class="cal-panel" >
      <no-ssr>
        <vue-ctk-date-time-picker
            color="#96bf31"
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
    async updated(){
      console.log('\n\n ===== homePage <|-- main calendar ===== \n',
        this.currentDateRaw, '\n ---------------');
      this.initEvenListOfDay();
    },
    methods: {
      async initEvenListOfDay(){
        const eventListOfDay = (await axios.post('/event/queryByDate', this.currentDateRaw)).data;
        console.log('\n\n ===== homePage <|-- initEventListOfDay =====\n',
          eventListOfDay, '\n ---------------');

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