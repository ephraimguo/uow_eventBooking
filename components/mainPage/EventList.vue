<template>
  <Row>



    <Col span="18" offset="3">
      <div style="background:#eee;padding: 20px">

        <Collapse v-for="(item, index) of $store.state.calEventList" :key="'accordion'+index">

          <Panel>
            <span>
              {{item.title}} | Time: {{$moment(item.startTimeRaw).format('DD-MM-YYYY HH:mm')}}
            </span>
            <span v-if="item.createdBy == $store.state.authUser.id"
                  style="color:#00bca0">
              [MY event]
            </span>
            <span v-else
                  style="color:#ff0066">
              [NOT my event]
            </span>
            <div slot="content">


        <Card
            class="eventCard"
            :key="'calevt'+index"
            :bordered="false">
          <h2 slot="title">
            <span v-if="item.createdBy == $store.state.authUser.id" style="color:#00bca0">{{item.title}} [my event]</span>
            <span v-else>{{item.title}}</span>
          </h2>
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
            <p class="eventContent">Attendance: {{item.seatTaken}} / {{item.capacity}}</p>
            <p class="eventContent">Price: {{item.eventPrice}} / pax</p>
            <div class="eventContent" style="width:100%">
              <Input v-if="(!!item.promoCode && $store.state.authUser.role == 'student')"
                     placeholder="enter the promo code"
                     :disabled="$store.state.authUserManager.bookedEvents.includes(item.id)"
                     ref="promoCodeTag"
                     @on-enter="checkPromocode(item, $event.target, 'promoCodeTag')"/>
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
                         @click="bookingEvent(item)">
                  Register This Event <span v-if="item.eventPrice==0">(Free Event)</span>
                </Button>

                <!--<Button v-else-->
                        <!--class="cal-event-btn"-->
                        <!--type="primary"-->
                        <!--@click="showPaymentPanel = true">-->
                  <!--Register This Event-->
                <!--</Button>-->
              </p>
              <ButtonGroup v-if="!!$store.state.authUser &&
                                 ($store.state.authUser.role == 'staff' || $store.state.authUser.role == 'cio')"
                           size="small"
                           shape="circle">
                <Button type="warning"
                        @click="onEditEventModalPop(item)"
                        class="cal-event-btn">
                  Edit This Event
                </Button>
                <Button type="error"
                        @click=""
                        class="cal-event-btn" >
                  Remove This Event
                </Button>
              </ButtonGroup>
            </div>
          </Card>
        </Card>
            </div>
          </Panel>
        </Collapse>

        <hr>
      </div>

    </Col>


    <!-- on-ok / on-cancel, these two are modal events -->

    <Modal title="Yay! You are help others register"
        v-model="showRegForOthersModal"
        ok-text="woow it's done"
        cancel-text="no, not for them..."
        :mask-closable="false"
        :closable="false">
      <p>Reg for other</p>
      <p>Reg for other</p>
      <p>Reg for other</p>
    </Modal>

    <Modal title="Hey, please edit the content carefully"
        v-model="showEditCurrentEventModal"
        footer-hide
        :mask-closable="false">
      <EditEventPanel @updateEventInfo="updateEventInfo()"/>
    </Modal>

    <Modal title="Oh no, are you sure?"
        v-model="showRemoveEventModal"
        ok-text="remove it"
        cancel-text="cancel remove"
        :mask-closable="false"
        :closable="false">
      <p>Key In the title of the event to remove</p>
      <p>Key In the title of the event to remove</p>
      <p>Key In the title of the event to remove</p>
    </Modal>

    <!--<Modal title="No worries, you will be registered after payment"-->
           <!--ok-text="Confirm booking and make payment"-->
           <!--footer-hide-->
           <!--v-model="showPaymentPanel">-->
      <!--<Input number placeholder="Pay & Book" @on-enter="checkPayment" v-model="paymentAmount"></Input>-->
    <!--</Modal>-->

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
        tempPromoCode: '',
        showRegForOthersModal: false,
        showEditCurrentEventModal: false,
        showRemoveEventModal: false,
        showPaymentPanel: false,
        paymentAmount: 0
      }
    },
    async fetch({store}){

    },
    // mounted() {
    //   this.$store.commit('setCalEventList', )
    // },
    methods: {
      async bookingEvent(event) {
        // const eventId = event.id;
        if(!!event.promoCode){
          if(event.promoCode == this.tempPromoCode){

            console.log('\n\n ========= EventList <|-- bookingEvent() this.tempPromoCode ======= \n',
              this.tempPromoCode,'\n -------------------');
            this.tempPromoCode = '';
            console.log('\n\n ========= EventList <|-- bookingEvent() this.tempPromoCode ======= \n',
              this.tempPromoCode,'\n -------------------');
            this.$emit('bookingEvent', event.id);

            const {eventId, hasPromocode} = (await axios.post('/event/updateEventRevenue', {eventId: event.id, hasPromocode: true})).data;
            console.log('\n\n ====== homePage <|-- bookingEvent update revenue ====== \n',
              eventId, hasPromocode, '\n ---------------------------------');
          }
          else{
            console.log('\n\n ======== EventList <|-- bookingEvent() NO promocode \n');
            this.$emit('bookingEvent', event.id);

            const {eventId, hasPromocode} = (await axios.post('/event/updateEventRevenue', {eventId: event.id, hasPromocode: false})).data;
            console.log('\n\n ====== homePage <|-- bookingEvent update revenue ====== \n',
              eventId, hasPromocode, '\n ---------------------------------');
          }


        }
        else {

          console.log('\n\n ======== EventList <|-- bookingEvent() NO promocode \n');
          this.$emit('bookingEvent', event.id);

          const {eventId, hasPromocode} = (await axios.post('/event/updateEventRevenue', {eventId: event.id, hasPromocode: false})).data;
          console.log('\n\n ====== homePage <|-- bookingEvent update revenue ====== \n',
            eventId, hasPromocode, '\n ---------------------------------');

        }
      },

      // ======== On Edit Event Modal Popup ========
      onEditEventModalPop(item) {
        this.$store.commit('setEditingEvent', item);
        console.log('\n\n ======== EventList <|-- onEditEventModalPop() $store editingEvent======== \n',
          this.$store.state.editingEvent, '\n -------------------');
        this.showEditCurrentEventModal = true;
      },

      async updateEventInfo(editingEventInfo) {
        console.log('\n\n ======== EventList <|-- updateEventInfo() ======= \n',
          editingEventInfo, '\n ------------------');
        const updateInfo = (await axios.post('/event/updateEventInfo',
                           {editingEventInfo, eventId: this.$store.state.editingEvent.id})).data;
        console.log('\n\n ======== EventList <|-- updateEventInfo() ======= \n',
          updateInfo, '\n ------------------');

        if(updateInfo.hasOwnProperty('data')){
          this.$Message.success('Update Successful');
          this.$emit('updateEventInfo', null);
        }
        else if(updateInfo.hasOwnProperty('error')){
          this.$Message.error('Update failed');
        }
      },

      checkPromocode(event, inputTag, refName) {
        if(inputTag.value == event.promoCode){
          console.log('\n ===== successfully verified promo code =====');
          this.$Message.success('Yay, promocode verified successfully');

          this.tempPromoCode = event.promoCode;
          console.log('\n\n ====== this.$refs.refName.disabled ===== \n', this.$refs[refName].disabled, '\n ------');
          inputTag.disabled = true;
        }
        else {
          console.log('\n\n ===== EvenList <|-- checkPromocode =====\n event:',
            event,'\n input:',
            inputTag.value,
            this.tempPromoCode,'\n --------------------');

          this.tempPromoCode = event.promoCode;
          this.$Message.error('Sorry, this is not the promo code');
        }
      },
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