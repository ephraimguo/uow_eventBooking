<template>

  <Row>
    <Col span="18" offset="3">
      <div style="background:#eee;padding: 20px">
        <Card class="event-card" :bordered="false">
          <p slot="title">Event Title</p>
          <Card>
            <p class="event-ctt">Time: DD - MM - YYYY hh:mm </p>
            <p class="event-ctt">Event Capacity: 50 pax </p>
            <p class="event-ctt">Event Organiser: Ephraim </p>
            <p class="event-ctt">Price: $1,000,000 / pax</p>
            <p class="event-ctt">
              <Button>Register This Event</Button>
              <Button>Edit This Event</Button>
              <Button>Remove This Event</Button>
            </p>
          </Card>
        </Card>

        <hr>

        <Card class="event-card" :bordered="false">
          <p slot="title">Event Title</p>
          <Card>
            <p class="event-ctt">Time: DD - MM - YYYY hh:mm </p>
            <p class="event-ctt">Event Capacity: 50 pax </p>
            <p class="event-ctt">Event Organiser: Ephraim </p>
            <p class="event-ctt">Price: $1,000,000 / pax</p>
            <p class="event-ctt">
              <Button>Register This Event</Button>
              <Button>Edit This Event</Button>
              <Button>Remove This Event</Button>
            </p>
          </Card>
        </Card>

        <hr>

        <Card class="event-card" :bordered="false">
          <p slot="title">Event Title</p>
          <Card>
            <p class="event-ctt">Time: DD - MM - YYYY hh:mm </p>
            <p class="event-ctt">Event Capacity: 50 pax </p>
            <p class="event-ctt">Event Organiser: Ephraim </p>
            <p class="event-ctt">Price: $1,000,000 / pax</p>
            <p class="event-ctt">
              <Button>Register This Event</Button>
              <Button>Edit This Event</Button>
              <Button>Remove This Event</Button>
            </p>
          </Card>
        </Card>
      </div>
    </Col>
  </Row>

</template>

<script>
  export default {
    name: "EventList"
  }
</script>

<style scoped>
  .event-ctt{
    text-align: left;
  }

  .event-card{
    margin: 20px 0;
  }

  .event-dvd{
    color: #fff;
  }

</style>