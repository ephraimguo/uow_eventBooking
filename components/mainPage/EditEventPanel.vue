<template>
  <section>
    <Form ref="editEventPanel" :model='editingEventInfo' :rules="editEventRule" >
      <FormItem label="Event Title" prop="title">
        <Input v-model="editingEventInfo.title" type="text"></Input>
      </FormItem>

      <FormItem label="Department" prop="department">
        <Select label="Select Dept" v-model="editingEventInfo.department" style="width:100%">
          <Option v-for="(item, index) in department" :value="item" :key="index">
            {{ item }}
          </Option>
        </Select>
      </FormItem>

      <FormItem label="Contact No" prop="contactNo">
        <Input v-model.number="editingEventInfo.contactNo"/>
      </FormItem>

      <FormItem label="Contact Email" prop="contactEmail">
        <Input v-model="editingEventInfo.contactEmail" type="email"/>
      </FormItem>

      <FormItem label="Company" prop="company">
        <Input v-model="editingEventInfo.company" type="text"/>
      </FormItem>

      <FormItem label="Coordinator" prop="coordinator">
        <Input v-model="editingEventInfo.coordinator" type="text"/>
      </FormItem>

      <FormItem label="Promo Code" prop="promoCode">
        <Input v-model="editingEventInfo.promoCode" type="text"/>
      </FormItem>

      <FormItem label="Event Type" prop="type">
        <Select label="Select Event Type" v-model="editingEventInfo.type" style="width:100%">
          <Option v-for="(item, index) in eventType" :value="item" :key="index">
            {{ item }}
          </Option>
        </Select>
      </FormItem>

      <FormItem label="Start At" prop="startTimeRaw">
        <no-ssr>
          <vue-ctk-date-time-picker
              v-model="editingEventInfo.startTimeRaw"
              label=""
              :minute-interval="10"
              overlay-background
              enable-button-validate
              without-header
              color="#4d6d7c"
          />
        </no-ssr>
        {{editingEventInfo.startTimeRaw}}
      </FormItem>

      <FormItem label="Duration(Hours)" prop="duration">
        <Select label="How long does it take?" v-model="editingEventInfo.duration" style="width:100%">
          <Option v-for="(item, index) in duration" :value="item" :key="index">
            {{ item }}
          </Option>
        </Select>
      </FormItem>

      <FormItem label="dressCode" prop="dressCode">
        <Select label="How is the dressing code?" v-model="editingEventInfo.dressCode" style="width:100%">
          <Option v-for="(item, index) in dressCode" :value="item" :key="index">
            {{ item }}
          </Option>
        </Select>
      </FormItem>

      <FormItem label="Venue" prop="venue">
        <Select label="Where is the place?" v-model="editingEventInfo.venue" style="width:100%">
          <Option v-for="(item, index) in venue" :value="item" :key="index">
            {{ item }}
          </Option>
        </Select>
      </FormItem>

      <FormItem label="Room ID" prop="roomId">
        <Select label="Which room is to be taken?" v-model="editingEventInfo.roomId" style="width:100%">
          <Option v-for="(item, index) in roomId" :value="item" :key="index">
            {{ item }}
          </Option>
        </Select>
      </FormItem>

      <FormItem label="Event Capacity" prop="capacity">
        <Select label="How many people will be there roughly?" v-model="editingEventInfo.capacity" style="width:100%">
          <Option
              v-for="(item, index) in capacity"
              :value="item" :key="index">
            {{ item }}
          </Option>
        </Select>
      </FormItem>

      <FormItem label="Ticket Price" prop="eventPrice">
        <!--<Input v-model="editingEventInfo.eventPrice" type="text"/>-->
        <Input v-model="editingEventInfo.eventPrice" prefix="logo-usd" placeholder="Is it a free($0.00) event?" style="width:100%" />
      </FormItem>

      <FormItem >
        <Row>
          <Col span="8" offset="8">
            <Button type="primary" @click="updateEventInfo('editEventPanel')" long>Update Event Information</Button>
          </Col>
        </Row>
      </FormItem>
    </Form>
    <p>this is EditEventPanel comp</p>
  </section>
</template>

<script>
  import department from '@/static/eventData/department.json'
  import eventType from '@/static/eventData/eventType.json'
  import dressCode from '@/static/eventData/dressCode.json'
  import venue from '@/static/eventData/venue.json'
  import roomId from '@/static/eventData/roomId.json'
  import duration from '@/static/eventData/duration.json'
  import capacity from '@/static/eventData/capacity.json'
  
  export default {
    name: "EditEventPanel",
    data() {

      // let editingEventInfo = null;
      // for(let evt of this.$store.state.calEventList){
      //   if(evt.id === this.$store.state.editingEvent.id){
      //     editingEventInfo = evt;
      //   }
      // }
      // this.$nextTick(()=>{
      //   this.editingEventInfo = this.$store.state.editingEvent || null;
      // });

      return {
        department: department,
        eventType: eventType,
        dressCode: dressCode,
        venue: venue,
        roomId: roomId,
        duration: duration,
        capacity: capacity,
        editingEventInfo:{
          title: '',//!!this.$store.state.editingEvent?this.$store.state.editingEvent.title : '',
          department:  '',
          coordinator:  '',
          contactNo:  '',
          contactEmail:  '',
          company: '',
          promoCode: '',
          type: '',
          startTimeRaw:  String(new Date()),
          duration:  null,
          dressCode:  '',
          venue:  '',
          roomId:  '',
          capacity:  '',
          eventPrice:  0,
          poster:  '',
          adminActorId: this.$store.state.authUser.id
        },
        //   !!this.$store.state.editingEvent?
        // {
        //   title: this.$store.state.editingEvent.title || '',
        //   department: this.$store.state.editingEvent.department ,
        //   coordinator: this.$store.state.editingEvent.coordinator ,
        //   contactNo: this.$store.state.editingEvent.contactNo ,
        //   contactEmail: this.$store.state.editingEvent.contactEmail ,
        //   company: this.$store.state.editingEvent.company,
        //   type: this.$store.state.editingEvent.type ,
        //   startTimeRaw: this.$store.state.editingEvent.startTimeRaw ,
        //   duration: this.$store.state.editingEvent.duration ,
        //   dressCode: this.$store.state.editingEvent.dressCode ,
        //   venue: this.$store.state.editingEvent.venue ,
        //   roomId: this.$store.state.editingEvent.roomId ,
        //   capacity: this.$store.state.editingEvent.capacity ,
        //   eventPrice: this.$store.state.editingEvent.eventPrice ,
        //   poster: this.$store.state.editingEvent.poster ,
        //   adminActorId: this.$store.state.editingEvent.adminActorId
        // }:

        // }{
        //   title: !!this.$store.state.editingEvent?this.$store.state.editingEvent.title : '',
        //   department: !!this.$store.state.editingEvent?this.$store.state.editingEvent.department : '',
        //   coordinator: !!this.$store.state.editingEvent?this.$store.state.editingEvent.coordinator : '',
        //   contactNo: !!this.$store.state.editingEvent?this.$store.state.editingEvent.contactNo : '',
        //   contactEmail: !!this.$store.state.editingEvent?this.$store.state.editingEvent.contactEmail : '',
        //   company:!!this.$store.state.editingEvent?this.$store.state.editingEvent.company :  '',
        //   type: !!this.$store.state.editingEvent?this.$store.state.editingEvent.type : '',
        //   startTimeRaw: !!this.$store.state.editingEvent?this.$store.state.editingEvent.startTimeRaw : String(new Date()),
        //   duration: !!this.$store.state.editingEvent?this.$store.state.editingEvent.duration : null,
        //   dressCode: !!this.$store.state.editingEvent?this.$store.state.editingEvent.dressCode : '',
        //   venue: !!this.$store.state.editingEvent?this.$store.state.editingEvent.venue : '',
        //   roomId: !!this.$store.state.editingEvent?this.$store.state.editingEvent.roomId : '',
        //   capacity: !!this.$store.state.editingEvent?this.$store.state.editingEvent.capacity : '',
        //   eventPrice: !!this.$store.state.editingEvent?this.$store.state.editingEvent.eventPrice :  0,
        //   poster: !!this.$store.state.editingEvent?this.$store.state.editingEvent.poster : '',
        //   adminActorId: this.$store.state.authUser.id
        // },
        editEventRule: {
          title: [
            {required: true, message: 'Event title is needed', trigger: 'blur'}
          ],
          department: [{
            required: true, message: 'Department is needed', trigger: 'change'
          }],
          coordinator: [{
            required: true, message: 'Coordinator is needed', trigger: 'blur'
          }],
          contactNo: [
            {type: 'number', message: 'Incorrect phone number format', trigger: 'blur'},
          ],
          contactEmail: [
            {required: true, message: 'Contact e-mail is needed', trigger: 'blur'},
            {type: 'email', message: 'Incorrect email format', trigger: 'blur'}
          ],
          company: [{
            required: true, message: 'Organised Company is needed', trigger: 'blur'
          }],
          type: [{
            required: true, message: 'Event type is needed', trigger: 'change'
          }],
          startTimeRaw: [{
            required: true, message: 'Event start time is needed', trigger: 'change'
          }],
          duration: [{
            required: true, type: 'number', message: 'Event duration is needed', trigger: 'change'
          }],
          dressCode: [{
            required: true, message: 'Dressing code is needed', trigger: 'change'
          }],
          venue: [{
            required: true, message: 'Venue is needed', trigger: 'change'
          }],
          roomId: [{
            required: true, message: 'Room is needed', trigger: 'change'
          }],
          capacity: [{
            required: true, type: 'number', message: 'Event cap. is needed', trigger: 'change'
          }],
          eventPrice: [{
            required: true, message: 'Ticket is needed', trigger: 'blur'
          }],
        }
      }
    },
    asyncData({store}) {
      console.log('\n\n ======== EditEventPanel <|-- asyncData() ======== \n', store.state.editingEvent);
    },
    mounted() {
      // this.editingEventInfo = this.$store.state.editingEvent;
      console.log('\n\n ======== EditEventPanel <|-- mounted() ======== \n', this.$store.state.editingEvent);

      // this.editingEvent = {};
      this.$nextTick(() => {
        this.editingEventInfo = !!this.$store.state.editingEvent? this.$store.state.editingEventInfo:{}
      });
    },
    beforeUpdate() {
      console.log('\n\n ======== EditEventPanel <|-- beforeUqdate() ======== \n', this.$store.state.editingEvent);
    },
    updated() {
      console.log('\n\n ======== EditEventPanel <|-- updated() ======== \n', this.$store.state.editingEvent);
    },
    methods: {
      updateEventInfo(refName) {
        this.$refs[refName].validate((valid) => {
          if(valid) {
            console.log('\n\n ========= EditEventPanel comp<|-- updateEventInfo() ==========\n',
              this.editingEventInfo,'\n');
            this.$Message.success('Updating');
            this.$emit('updateEventInfo', this.editingEventInfo);
          }
          else {
            this.$Message.error('Please fill up properly');
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>