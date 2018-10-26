<template>
  <section class="container">
    <Card class="cal-panel" >
      <no-ssr>
        <vue-ctk-date-time-picker
            color="#96bf31"
            without-input
            disable-time/>
      </no-ssr>
    </Card>
    <EventList/>
  </section>
</template>

<script>
  import EventList from '@/components/mainPage/EventList.vue'

  export default {
    name: "homePage",
    components:{
      EventList
    },
    async fetch({store, redirect}){
      if(!store.state.authUser){
        return redirect('/');
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