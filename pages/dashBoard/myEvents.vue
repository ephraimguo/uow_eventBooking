<template>
  <section>
    <Divider orientation="left">My Events</Divider>
    <Row>
      <Col v-for="(item, index) of myEventList" :key="'myEvent'+index" class="my-event-card" span="8" offset="2">
        <Card>
          <p>Title: {{item.title}}</p>
          <p>Dept: {{item.department}}</p>
          <p>Coordinator: {{item.coordinator}}</p>
          <p>Contact Email: {{item.contactEmail}}</p>
          <p>Company: {{item.company}}</p>
          <p>Type: {{item.type}}</p>
          <p>Time Start: {{$moment(item.startTimeRaw).format('DD-MM-YYYY HH:mm')}}</p>
          <p>Dressing Code: {{item.dressCode}}</p>
          <p>Address: {{item.venue}} {{item.roomId}}</p>
          <p>Seat Left: {{item.capacity - item.seatTaken}}</p>
          <p>Price: {{item.eventPrice}}</p>
          <div>
            <Button @click="cancelEvent(item)">cancel event</Button>
          </div>
        </Card>
      </Col>

    </Row>


    <p>
      this is my event list page
    </p>
  </section>

</template>

<script>
  import axios from '@/plugins/axios'

  export default {
    name: "MyEvents",
    layout:'dashBoard',
    data() {
      return {
        myEventList: []
      }
    },
    async fetch ({ store, redirect }) {
      if(!store.state.authUser){
        return redirect('/');
      }
    },
    async mounted() {
      for(let eventId of this.$store.state.authUserManager.bookedEvents) {
        const event = (await axios.post('/event/queryByEventId', {eventId})).data;
        this.myEventList.push(event);
      }
      console.log('\n\n ======= this.MyEventList ======\n',
        this.myEventList, '\n -------------------');
    },
    async updated() {
      const managerId = 'evtmanager' + this.$store.state.authUser.id;
      const {userEventManager} = (await axios.post('/userEventManager/queryById', {managerId})).data;
      console.log('\n\n ====== home Page <|-- After LogIn get current Manager ====== \n', userEventManager, '\n -----------');
      this.$store.commit('setAuthUserManager', {userEventManager});
    },
    methods: {
      async cancelEvent(event) {
        const eventId = event.id;
        console.log('\n\n ======== myEvent <|-- cancelEvent() ========\n',
          eventId, '\n-------------------');
        const cancelInfo = (await axios.post('/userEventManager/unBookEvent', {eventId,
            userActorId: this.$store.state.authUser.id,
            adminActorId: this.$store.state.authUser.id})).data;
        console.log('\n\n ======== myEvent <|-- cancelEvent() cancelInfo ========\n',
          cancelInfo, '\n-------------------');

        // window.location.reload(true);
        let tmpEventList = new Set(this.myEventList);
        tmpEventList.delete(event);
        this.myEventList = [...tmpEventList];

        const managerId = 'evtmanager' + this.$store.state.authUser.id;
        const {userEventManager} = (await axios.post('/userEventManager/queryById', {managerId})).data;
        console.log('\n\n ====== home Page <|-- After LogIn get current Manager ====== \n', userEventManager, '\n -----------');
        this.$store.commit('setAuthUserManager', {userEventManager});
      }
    }
  }
</script>

<style scoped>
  .my-event-card {
    margin: 20px;
  }
</style>