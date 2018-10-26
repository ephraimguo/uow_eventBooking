<template>
  <div>
    <!-- this is layout dashBoard -->
    <DefaultHeader/>
    <DashboardNavigation/>
    <nuxt/>
  </div>
</template>

<script>
  import DefaultHeader from '@/components/default-hearder.vue'
  import DashboardNavigation from '@/components/dashBoard/DashboardNavigation.vue'
  export default {
    name: "dashBoard",
    components: {
      DefaultHeader,
      DashboardNavigation
    }
  }
</script>

<style scoped>
  .left {
    float: left;
    display: inline-block;
    border: 1px solid red;
  }

</style>