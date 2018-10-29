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

            <FormItem label="Event Type" prop="type">
              <Select label="Select Event Type" v-model="newEventInfo.type" style="width:100%">
                <Option v-for="(item, index) in eventType" :value="item" :key="index">
                  {{ item }}
                </Option>
              </Select>
            </FormItem>

            <FormItem label="Start At" prop="startTimeRaw">
              <!--<Input v-model="newEventInfo.startTimeRaw" type="text"/>-->
              <DatePicker type="date"
                          format="dd-MM-yyyy"
                          v-model="newEventInfo.startDate"
                          placeholder="Select date"
                          style="width: 200px"/> |
              <TimePicker
                  format="HH:mm"
                  v-model="newEventInfo.startTiming"
                  placeholder="Select time"
                  style="width: 112px"/>
            </FormItem>

            <FormItem label="Duration" prop="duration">
              <Input v-model="newEventInfo.duration" type="text"/>
            </FormItem>

            <FormItem label="dressCode" prop="dressCode">
              <Input v-model="newEventInfo.dressCode" type="text"/>
            </FormItem>

            <FormItem label="Venue" prop="venue">
              <Input v-model="newEventInfo.venue" type="text"/>
            </FormItem>

            <FormItem label="Room ID" prop="roomId">
              <Input v-model="newEventInfo.roomId" type="text"/>
            </FormItem>

            <FormItem label="Event Capacity" prop="capacity">
              <Input v-model="newEventInfo.capacity" type="text"/>
            </FormItem>

            <FormItem label="Ticket Price" prop="eventPrice">
              <Input v-model="newEventInfo.eventPrice" type="text"/>
            </FormItem>

            <FormItem >
              <Row>
                <Col span="8" offset="8">
                  <Button type="primary" @click="createNewEvent(newEventInfo)" long>Create</Button>
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

  export default {
    name: "CreateNewEventPanel",
    updated() {
      console.log(this.newEventInfo.contactNo);
    },
    data() {
      return {
        department: department,
        eventType: eventType,
        newEventInfo: {
          title: '',
          department: '',
          coordinator: '',
          contactNo: '',
          contactEmail: '',
          company: '',
          type: '',
          startDate: null,
          startTiming: null,
          startTimeRaw: (!!this.startDate && !!this.startTiming)?String(this.startDate.getFullYear()+''+this.startDate.getMonth()+''+this.startDate.getDate()) + ' ' + String(this.startTiming): null,
          duration: null,
          dressCode: '',
          venue: '',
          roomId: '',
          capacity: '',
          eventPrice: null,
          poster: '',
          adminActorId: this.$store.state.authUser.id
        },
        createNewEventRule: {
          title: [
            {required: true, message: 'Event title is needed', trigger: 'blur'}
          ],
          department: [{
            required: true, message: 'Department is needed', trigger: 'blur'
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
            required: true, message: 'Event type is needed', trigger: 'blur'
          }],
          startTimeRaw: [{
            required: true, message: 'Event start time is needed', trigger: 'blur'
          }],
          duration: [{
            required: true, message: 'Event duration is needed', trigger: 'blur'
          }],
          dressCode: [{
            required: true, message: 'Dressing code is needed', trigger: 'blur'
          }],
          venue: [{
            required: true, message: 'Venue is needed', trigger: 'blur'
          }],
          roomId: [{
            required: true, message: 'Room is needed', trigger: 'blur'
          }],
          capacity: [{
            required: true, message: 'Event cap. is needed', trigger: 'blur'
          }],
          eventPrice: [{
            required: true, message: 'Ticket is needed', trigger: 'blur'
          }],

        }
      }
    },
    methods: {
      createNewEvent(newEventInfo){
        console.log('\n\n ==== CreateNewEventPanel <|-- createNewEvent() ===== \n', newEventInfo, '\n ---------------------');
        this.$emit('createNewEvent', newEventInfo);
      }
    }
  }
</script>

<style scoped>

</style>