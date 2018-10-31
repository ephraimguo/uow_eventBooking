<template>
  <Row>
    <Col span="18" offset="3">
      <div style="background:#eee;padding: 20px">
        <Card
            v-for="(item, index) of $store.state.calEventList"
            class="eventCard"
            :key="'calevt'+index"
            :bordered="false">
          <p slot="title">{{item.title}}</p>
          <Card>
            <p class="eventContent">Time: {{item.startTimeRaw}} </p>
            <p class="eventContent">Department: {{item.department}} </p>
            <p class="eventContent">Coordinator: {{item.coordinator}} </p>
            <p class="eventContent">Contact No: {{item.contactNo}} </p>
            <p class="eventContent">Contact Email: {{item.contactEmail}} </p>
            <p class="eventContent">Event Type: {{item.type}} </p>
            <p class="eventContent">Event Duration: {{item.duration}} </p>
            <p class="eventContent">Dressing Code: {{item.dressCode}} </p>
            <p class="eventContent">Address: {{item.venue}} - {{item.roomId}} </p>
            <p class="eventContent">Capacity: {{item.capacity}} </p>
            <p class="eventContent">Event SeatLeft: {{item.capacity - item.seatTaken}} </p>
            <p class="eventContent">Price: {{item.eventPrice}} / pax</p>
            <div class="eventContent" style="width:100%">
              <p>
                <Button type="primary" class="cal-event-btn">Register This Event</Button>
              </p>
              <ButtonGroup v-if="$store.state.authUser.role == 'staff' || $store.state.authUser.role == 'cio'"
                           size="small"
                           shape="circle">
                <Button type="success" class="cal-event-btn">Register for others</Button>
                <Button type="warning" class="cal-event-btn">Edit This Event</Button>
                <Button type="error" class="cal-event-btn">Remove This Event</Button>
              </ButtonGroup>
            </div>
          </Card>
        </Card>

        <hr>

        <!--<Card class="eventCard" :bordered="false">-->
          <!--<p slot="title">Event Title</p>-->
          <!--<Card>-->
            <!--<p class="eventContent">Time: DD - MM - YYYY hh:mm </p>-->
            <!--<p class="eventContent">Event Capacity: 50 pax </p>-->
            <!--<p class="eventContent">Event Organiser: Ephraim </p>-->
            <!--<p class="eventContent">Price: $1,000,000 / pax</p>-->
            <!--<p class="eventContent">-->
              <!--<Button>Register This Event</Button>-->
              <!--<Button>Edit This Event</Button>-->
              <!--<Button>Remove This Event</Button>-->
            <!--</p>-->
          <!--</Card>-->
        <!--</Card>-->

        <!--<hr>-->

        <!--<Card class="eventCard" :bordered="false">-->
          <!--<p slot="title">Event Title</p>-->
          <!--<Card>-->
            <!--<p class="eventContent">Time: DD - MM - YYYY hh:mm </p>-->
            <!--<p class="eventContent">Event Capacity: 50 pax </p>-->
            <!--<p class="eventContent">Event Organiser: Ephraim </p>-->
            <!--<p class="eventContent">Price: $1,000,000 / pax</p>-->
            <!--<p class="eventContent">-->
              <!--<Button>Register This Event</Button>-->
              <!--<Button>Edit This Event</Button>-->
              <!--<Button>Remove This Event</Button>-->
            <!--</p>-->
          <!--</Card>-->
        <!--</Card>-->
      </div>
    </Col>
  </Row>

</template>

<script>
  export default {
    name: "EventList",
    data() {
      return {
        eventList: this.$store.state.calEventList
      }
    },
    async fetch({store}){

    },
    // mounted() {
    //   this.$store.commit('setCalEventList', )
    // },
    methods: {
      initEventList() {

      }
    }
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

  .cal-event-btn {
    margin: 5px 0;
  }

</style>