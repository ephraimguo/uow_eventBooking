<template>

  <Row>
    <Col span="18" offset="3">
      <div style="background:#eee;padding: 20px">
        <Card class="eventCard" :bordered="false">
          <p slot="title">Event Title</p>
          <Card>
            <p class="eventContent">Time: DD - MM - YYYY hh:mm </p>
            <p class="eventContent">Event Capacity: 50 pax </p>
            <p class="eventContent">Event Organiser: Ephraim </p>
            <p class="eventContent">Price: $1,000,000 / pax</p>
            <p class="eventContent">
              <Button>Register This Event</Button>
              <Button>Edit This Event</Button>
              <Button>Remove This Event</Button>
            </p>
          </Card>
        </Card>

        <hr>

        <Card class="eventCard" :bordered="false">
          <p slot="title">Event Title</p>
          <Card>
            <p class="eventContent">Time: DD - MM - YYYY hh:mm </p>
            <p class="eventContent">Event Capacity: 50 pax </p>
            <p class="eventContent">Event Organiser: Ephraim </p>
            <p class="eventContent">Price: $1,000,000 / pax</p>
            <p class="eventContent">
              <Button>Register This Event</Button>
              <Button>Edit This Event</Button>
              <Button>Remove This Event</Button>
            </p>
          </Card>
        </Card>

        <hr>

        <Card class="eventCard" :bordered="false">
          <p slot="title">Event Title</p>
          <Card>
            <p class="eventContent">Time: DD - MM - YYYY hh:mm </p>
            <p class="eventContent">Event Capacity: 50 pax </p>
            <p class="eventContent">Event Organiser: Ephraim </p>
            <p class="eventContent">Price: $1,000,000 / pax</p>
            <p class="eventContent">
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
  .eventContent{
    text-align: left;
  }

  .eventCard{
    margin: 20px 0;
  }

  .eventDivider{
    color: #fff;
  }

</style>