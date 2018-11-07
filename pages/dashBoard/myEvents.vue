<template>
  <section>
    <Divider orientation="left"
             v-if="!!$store.state.authUser && $store.state.authUser.role=='cio' || $store.state.authUser.role=='staff'">
      Events created by you
    </Divider>

    <Divider orientation="left"
             v-if="!!$store.state.authUser && $store.state.authUser.role=='student'">
      Registered events
    </Divider>
    <Row v-if="!!myEventList">
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
          <p>Attendance: {{item.seatTaken}} / {{item.capacity}}</p>
          <p>Price: {{item.eventPrice}}</p>
          <p v-if="$store.state.authUser.role=='cio' || $store.state.authUser.role=='staff'">Revenue: {{item.revenue.toFixed(2)}}</p>
          <div>
            <Button v-if="$store.state.authUser.role=='student'" @click="cancelEvent(item)">cancel booking</Button>
            <!--<Button v-if="$store.state.authUser.role=='cio' || $store.state.authUser.role=='staff'"-->
                    <!--@click="removeEvent(item)">-->
              <!--remove event-->
            <!--</Button>-->

            <ButtonGroup v-if="!!$store.state.authUser &&
                                 ($store.state.authUser.role == 'staff' || $store.state.authUser.role == 'cio')"
                         size="small">
              <Button type="warning"
                      @click="onEditEventModalPop(item)"
                      class="cal-event-btn">
                Edit This Event
              </Button>
              <Button type="error"
                      @click="removeEvent(item)"
                      class="cal-event-btn" >
                Remove This Event
              </Button>
            </ButtonGroup>

          </div>
        </Card>
      </Col>

    </Row>


    <Modal title="Hey, please edit the content carefully"
           v-model="showEditCurrentEventModal"
           footer-hide
           :mask-closable="false">
      <EditEventPanel @updateEventInfo="updateEventInfo"/>
    </Modal>


    <p>
      this is my event list page
    </p>
  </section>

</template>

<script>
  import EditEventPanel from '@/components/mainPage/EditEventPanel.vue'

  import axios from '@/plugins/axios'

  export default {
    name: "MyEvents",
    components: {
      EditEventPanel
    },
    layout:'dashBoard',
    data() {
      return {
        myEventList: [],
        showEditCurrentEventModal: false
      }
    },
    async fetch ({ store, redirect }) {
      if(!store.state.authUser){
        return redirect('/');
      }
    },

    async mounted() {
      // student role
      if(this.$store.state.authUser.role =='student'){
        console.log('\n\n ====== MyEvent Page <|-- user role is student ===== \n');
        const managerId = 'evtmanager' + this.$store.state.authUser.id;
        const {userEventManager} = (await axios.post('/userEventManager/queryById', {managerId})).data;
        console.log('\n\n ====== MyEvent Page <|-- After LogIn get current Manager ====== \n', userEventManager, '\n -----------');
        this.$store.commit('setAuthUserManager', {userEventManager});

        for(let eventId of this.$store.state.authUserManager.bookedEvents) {
          const event = (await axios.post('/event/queryByEventId', {eventId})).data;
          this.myEventList.push(event);
        }
        console.log('\n\n ======= this.MyEventList ======\n',
          this.myEventList, '\n -------------------');
      }

      // cio and staff role
      else if(this.$store.state.authUser.role =='cio' || this.$store.state.authUser.role =='staff'){
        const eventsCreated = (await axios.post('/event/queryByCreatedBy', {createdBy:this.$store.state.authUser.id})).data;
        console.log('\n\n ======= MyEvent Page <|-- Admin Created event =======\n',
          eventsCreated, '\n ----------------------------');
        this.myEventList = eventsCreated;
      }


    },

    async updated() {
      const managerId = 'evtmanager' + this.$store.state.authUser.id;
      const {userEventManager} = (await axios.post('/userEventManager/queryById', {managerId})).data;
      console.log('\n\n ====== home Page <|-- After LogIn get current Manager ====== \n', userEventManager, '\n -----------');
      this.$store.commit('setAuthUserManager', {userEventManager});
    },
    methods: {

      async initMyEvents() {
        // student role
        if(this.$store.state.authUser.role =='student'){
          console.log('\n\n ====== MyEvent Page <|-- user role is student ===== \n');
          const managerId = 'evtmanager' + this.$store.state.authUser.id;
          const {userEventManager} = (await axios.post('/userEventManager/queryById', {managerId})).data;
          console.log('\n\n ====== MyEvent Page <|-- After LogIn get current Manager ====== \n', userEventManager, '\n -----------');
          this.$store.commit('setAuthUserManager', {userEventManager});

          for(let eventId of this.$store.state.authUserManager.bookedEvents) {
            const event = (await axios.post('/event/queryByEventId', {eventId})).data;
            this.myEventList.push(event);
          }
          console.log('\n\n ======= this.MyEventList ======\n',
            this.myEventList, '\n -------------------');
        }

        // cio and staff role
        else if(this.$store.state.authUser.role =='cio' || this.$store.state.authUser.role =='staff'){
          const eventsCreated = (await axios.post('/event/queryByCreatedBy', {createdBy:this.$store.state.authUser.id})).data;
          console.log('\n\n ======= MyEvent Page <|-- Admin Created event =======\n',
            eventsCreated, '\n ----------------------------');
          this.myEventList = eventsCreated;
        }

      },

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
      },

      async removeEvent(event){
        console.log('\n\n ====== myEvent <|-- removeEvent() ===== \n', event, '\n -----------------');
        const eventReturn = (await axios.post('/event/removeEvent', {event})).data;
        console.log('\n\n ====== myEvent <|-- removeEvent() event Return===== \n', eventReturn, '\n -----------------');
        this.initMyEvents();
      },

      async onEditEventModalPop(item) {
        this.$store.commit('setEditingEvent', item);
        console.log('\n\n ======== myEvent <|-- onEditEventModalPop() $store editingEvent======== \n',
          this.$store.state.editingEvent, '\n -------------------');
        this.showEditCurrentEventModal = true;
      },

      async updateEventInfo(editingEventInfo) {

        console.log('\n\n===== myEvent <|-- updateEventInfo ===== \n',
          editingEventInfo, '\n ------------------');
        const updateInfo = (await axios.post('/event/updateEventInfo',
          {editingEventInfo, eventId: this.$store.state.editingEvent.id})).data;
        console.log('\n\n===== myEvent <|-- updateEventInfo ===== \n',
          updateInfo, '\n ------------------');

        if(updateInfo.hasOwnProperty('data')){
          this.$Message.success('Update Successful');
          this.$emit('updateEventInfo', null);
        }
        else if(updateInfo.hasOwnProperty('error')){
          this.$Message.error('Update failed');
        }
        this.initMyEvents();
      }
    }
  }
</script>

<style scoped>
  .my-event-card {
    margin: 20px;
  }
</style>