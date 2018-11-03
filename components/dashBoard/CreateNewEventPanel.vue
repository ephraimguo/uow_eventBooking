<template>

  <section>
    <Divider orientation="left">Create New Event</Divider>
    <Row>
      <Col span="18" offset="3">
        <Card>
          <Form ref="newEventForm" :model='newEventInfo' :rules="createNewEventRule" >
            <FormItem label="Event Title" prop="title">
              <Input v-model="newEventInfo.title" type="text"/>
            </FormItem>

            <FormItem label="Department" prop="department">
              <Select label="Select Dept" v-model="newEventInfo.department" style="width:100%">
                <Option v-for="(item, index) in department" :value="item" :key="index">
                  {{ item }}
                </Option>
              </Select>
            </FormItem>

            <FormItem label="Contact No" prop="contactNo">
              <Input v-model.number="newEventInfo.contactNo"/>
            </FormItem>

            <FormItem label="Contact Email" prop="contactEmail">
              <Input v-model="newEventInfo.contactEmail" type="email"/>
            </FormItem>

            <FormItem label="Company" prop="company">
              <Input v-model="newEventInfo.company" type="text"/>
            </FormItem>

            <FormItem label="Coordinator" prop="coordinator">
              <Input v-model="newEventInfo.coordinator" type="text"/>
            </FormItem>

            <FormItem label="Promo Code" prop="coordinator">
              <Input v-model="newEventInfo.promoCode" type="text"/>
            </FormItem>

            <FormItem label="Event Type" prop="type">
              <Select label="Select Event Type" v-model="newEventInfo.type" style="width:100%">
                <Option v-for="(item, index) in eventType" :value="item" :key="index">
                  {{ item }}
                </Option>
              </Select>
            </FormItem>

            <FormItem label="Start At" prop="startTimeRaw">
              <no-ssr>
                <vue-ctk-date-time-picker
                  v-model="newEventInfo.startTimeRaw"
                  label=""
                  :minute-interval="10"
                  overlay-background
                  enable-button-validate
                  without-header
                  color="#4d6d7c"
                />
              </no-ssr>
              {{newEventInfo.startTimeRaw}}
            </FormItem>

            <FormItem label="Duration(Hours)" prop="duration">
              <!--<Input v-model="newEventInfo.duration" type="text"/>-->
              <Select label="How long does it take?" v-model="newEventInfo.duration" style="width:100%">
                <Option v-for="(item, index) in duration" :value="item" :key="index">
                  {{ item }}
                </Option>
              </Select>
            </FormItem>

            <FormItem label="dressCode" prop="dressCode">
              <!--<Input v-model="newEventInfo.dressCode" type="text"/>-->
              <!--dressCode-->
              <Select label="How is the dressing code?" v-model="newEventInfo.dressCode" style="width:100%">
                <Option v-for="(item, index) in dressCode" :value="item" :key="index">
                  {{ item }}
                </Option>
              </Select>
            </FormItem>

            <FormItem label="Venue" prop="venue">
              <!--<Input v-model="newEventInfo.venue" type="text"/>-->
              <Select label="Where is the place?" v-model="newEventInfo.venue" style="width:100%">
                <Option v-for="(item, index) in venue" :value="item" :key="index">
                  {{ item }}
                </Option>
              </Select>
            </FormItem>

            <FormItem label="Room ID" prop="roomId">
              <Select label="Which room is to be taken?" v-model="newEventInfo.roomId" style="width:100%">
                <Option v-for="(item, index) in roomId" :value="item" :key="index">
                  {{ item }}
                </Option>
              </Select>
            </FormItem>

            <FormItem label="Event Capacity" prop="capacity">
              <Select label="Which room is to be taken?" v-model="newEventInfo.capacity" style="width:100%">
                <Option
                    v-for="(item, index) in capacity"
                    :value="item" :key="index">
                  {{ item }}
                </Option>
              </Select>
            </FormItem>

            <FormItem label="Ticket Price" prop="eventPrice">
              <Input v-model="newEventInfo.eventPrice" prefix="logo-usd" placeholder="Is it a free($0.00) event?" style="width:100%" />
            </FormItem>

            <FormItem >
              <Row>
                <Col span="8" offset="8">
                  <Button type="primary" @click="createNewEvent('newEventForm')" long>Create New Event</Button>
                </Col>
              </Row>
            </FormItem>
          </Form>
        </Card>
      </Col>
    </Row>
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
    name: "CreateNewEventPanel",
    updated() {
      // console.log(this.newEventInfo.contactNo);
    },
    data() {
      return {
        department: department,
        eventType: eventType,
        dressCode: dressCode,
        venue: venue,
        roomId: roomId,
        duration: duration,
        capacity: capacity,
        newEventInfo: {
          title: '',
          department: '',
          coordinator: '',
          promoCode: '',
          contactNo: '',
          contactEmail: '',
          company: '',
          type: '',
          startTimeRaw: String(new Date()),
          duration: null,
          dressCode: '',
          venue: '',
          roomId: '',
          capacity: '',
          eventPrice: 0,
          poster: '',
          adminActorId: this.$store.state.authUser.id
        },
        createNewEventRule: {
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
    filter: {
      addDollarSign(value){
        return '$'+value;
      }
    },
    methods: {
      createNewEvent(refName){

        this.$refs[refName].validate((valid) => {
          if(valid) {
            console.log('\n\n ==== CreateNewEventPanel <|-- createNewEvent() ===== \n',
              this.newEventInfo, '\n ---------------------');
            this.$emit('createNewEvent', this.newEventInfo);
          }
          else{
            this.$Message.error('Submission Failed');
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>