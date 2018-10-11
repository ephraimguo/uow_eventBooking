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
  </section>
</template>

<script>
  export default {
    name: "homePage"
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