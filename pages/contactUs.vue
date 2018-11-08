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

    <Row>
      <Col  span="20" offset="2">
        <Card>
          <a href="http://www.sim.edu.sg/Discover-SIM/Documents/SIM-Campuses-Map.pdf"> Download map link </a>
          <p>IT department: Support Services</p>
          <p>Phone:+65 6248 9746</p>
          <p>Email: uow.events@sim.edu.sg</p>
          <p>Working Hours: 09:00 - 18:00</p>
          <p>Address : 461 Clementi Road, Singapore 599491</p>


          <p>Directions:</p>
          <p>Buses:</p>
          <p>52, 61, 74, 75, 151,
            154, 184</p>

          <p>Nearest MRT stations:</p>
          <p>Clementi, Dover,</p>
          <p>King Albert Park</p>

        </Card>

      </Col>
    </Row>

    <br>
    <br>
    <br>
    <br>
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