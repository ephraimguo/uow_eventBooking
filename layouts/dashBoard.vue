<template>
  <div>
    <!-- this is layout dashBoard -->
    <DefaultHeader/>
    <DashboardNavigation/>
    <nuxt class="left main"/>
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
  }
  .main{
    display: inline-block;
    width: 100%;
    min-height: 150px;
    border: 1px solid #ccc;
  }

</style>