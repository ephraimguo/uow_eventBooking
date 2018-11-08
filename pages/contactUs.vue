<template>
  <section>
    <Divider orientation="left">Contact Us</Divider>

    <Carousel v-model="carouselDefault">
        <CarouselItem >
          <div :style="carouStyle">
            <img src="../static/uowMap.png" alt="" height="900">
          </div>
        </CarouselItem>
        <CarouselItem >
          <div :style="carouStyle">
            <img src="../static/uowPost.jpg" alt="" height="900">
          </div>
        </CarouselItem>
    </Carousel>
  </section>
</template>

<script>
  export default {
    name: "contactUs",
    data() {
      return {
        carouselDefault: 0,
        carouStyle: {
          autoplay: false,
          autoplaySpeed: 2000,
          dots: 'inside',
          radiusDot: false,
          trigger: 'click',
          arrow: 'hover',
          // "width": "100%",
          "margin":"auto",
          "border": "2px solid #333",
          "min-height": "500px"
      }
      }
    }
  }
</script>

<style scoped>

</style>