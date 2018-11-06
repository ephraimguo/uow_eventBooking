<template>
  <section>

    <Divider orientation="left"
             v-if="!!$store.state.authUser && $store.state.authUser.role=='cio' || $store.state.authUser.role=='staff'">
      Event Revenue
    </Divider>

    <Row>
      <!--<Col v-for="">-->

      <!--</Col>-->
    </Row>

    <p>this is management page</p>
  </section>
</template>

<script>
  export default {
    name: "management",
    layout:'dashBoard',
    async fetch ({ store, redirect }) {
      if(!store.state.authUser){
        return redirect('/');
      }
    }
  }
</script>

<style scoped>

</style>