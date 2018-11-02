<template>
  <Row>
    <Col span="18" offset="3">
      <div style="background:#eee;padding: 20px">
        <Card
            v-for="(item, index) of $store.state.calEventList"
            class="eventCard"
            :key="'calevt'+index"
            :bordered="false">
          <h2 slot="title">{{item.title}}</h2>
          <Card>
            <p class="eventContent">Time: {{$moment(item.startTimeRaw).format('DD-MM-YYYY HH:mm')}} </p>
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
              <p v-if="!!$store.state.authUser && $store.state.authUser.role == 'student'">
                <Button v-if="$store.state.authUserManager.bookedEvents.includes(item.id)"
                        type="error"
                        class="cal-event-btn"
                        disabled>
                  Already Booked
                </Button>

                <Button  v-else
                         type="primary"
                         class="cal-event-btn"
                         @click="bookingEvent(item.id)">
                  Register This Event
                </Button>
              </p>
              <ButtonGroup v-if="!!$store.state.authUser &&
                                 ($store.state.authUser.role == 'staff' || $store.state.authUser.role == 'cio')"
                           size="small"
                           shape="circle">
                <Button type="success"
                        @click="showRegForOthersModal = true"
                        class="cal-event-btn" >
                  Register for others
                </Button>
                <Button type="warning"
                        @click="onEditEventModalPop(item)"
                        class="cal-event-btn">
                  Edit This Event
                </Button>
                <Button type="error"
                        @click="showRemoveEventModal = true"
                        class="cal-event-btn" >
                  Remove This Event
                </Button>
              </ButtonGroup>
            </div>
          </Card>
        </Card>
        <hr>
      </div>
    </Col>

    <!-- on-ok / on-cancel, these two are modal events -->

    <Modal
        title="Yay! You are help others register"
        v-model="showRegForOthersModal"
        ok-text="woow it's done"
        cancel-text="no, not for them..."
        :mask-closable="false"
        :closable="false">
      <p>Reg for other</p>
      <p>Reg for other</p>
      <p>Reg for other</p>
    </Modal>

    <Modal
        title="Hey, please edit the content carefully"
        v-model="showEditCurrentEventModal"
        footer-hide
        :mask-closable="false">
      <EditEventPanel @updateEventInfo="updateEventInfo"/>
    </Modal>

    <Modal
        title="Oh no, are you sure?"
        v-model="showRemoveEventModal"
        ok-text="remove it"
        cancel-text="cancel remove"
        :mask-closable="false"
        :closable="false">
      <p>Key In the title of the event to remove</p>
      <p>Key In the title of the event to remove</p>
      <p>Key In the title of the event to remove</p>
    </Modal>


  </Row>

</template>

<script>
  import EditEventPanel from '@/components/mainPage/EditEventPanel.vue'

  import axios from '@/plugins/axios'

  export default {
    name: "EventList",
    components: {
      EditEventPanel
    },
    data() {
      return {
        eventList: this.$store.state.calEventList,
        showRegForOthersModal: false,
        showEditCurrentEventModal: false,
        showRemoveEventModal: false
      }
    },
    async fetch({store}){

    },
    // mounted() {
    //   this.$store.commit('setCalEventList', )
    // },
    methods: {
      bookingEvent(eventId) {
        console.log('\n\n ========= EventList <|-- bookingEvent() ======= \n',
          eventId,'\n -------------------');
        this.$emit('bookingEvent', eventId);
      },
      onEditEventModalPop(item) {
        this.showEditCurrentEventModal = true;
        this.$store.commit('setEditingEvent', item);

        console.log('\n\n ======== EventList <|-- onEditEventModalPop() ======== \n',
          this.$store.state.editingEvent, '\n -------------------');
      },
      async updateEventInfo(editingEventInfo) {
        console.log('\n\n ======== EventList <|-- updateEventInfo() ======= \n',
          editingEventInfo, '\n ------------------');
        const updateInfo = (await axios.post('/event/updateEventInfo', {editingEventInfo,
                                                                        eventId: this.$store.state.editingEvent.id})).data;
        console.log('\n\n ======== EventList <|-- updateEventInfo() ======= \n',
          updateInfo, '\n ------------------');
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