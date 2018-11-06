<template>
  <section>
        <Card class="bg-card">
          <Form ref="registrationForm" :model='userProfile' :rules="editProfilePanelRule" >

            <!-- prop = perEmail -->
            <FormItem label="E-mail" prop="perEmail">
              <Input v-model="userProfile.perEmail" placeholder="Enter your e-mail"></Input>
            </FormItem>

            <!-- prop = fullName -->
            <FormItem label="Full Name" prop="fullName">
              <Input v-model="userProfile.fullName" placeholder="Enter your name"></Input>
            </FormItem>

            <!-- prop = phoneNo -->
            <FormItem label="Phone Number" prop="phoneNo">
              <Input v-model="userProfile.phoneNo" placeholder="Please enter your phone number"></Input>
            </FormItem>

            <!-- prop = role -->
            <!--
            <FormItem label="Role" prop="role">
              <RadioGroup v-model="userProfile.role">
                <Radio label="cio">CIO</Radio>
                <Radio label="staff">Staff</Radio>
                <Radio label="student">Student</Radio>
              </RadioGroup>
            </FormItem> -->

            <FormItem >
              <Row>
                <Col span="10" offset="8">
                  <ButtonGroup shape="circle">
                    <Button type="warning" @click="unShowEditPanel()">Cancel</Button>
                    <Button type="success" @click="updateUserProfile()">update profile</Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </FormItem>

          </Form>
        </Card>
  </section>
</template>

<script>
  export default {
    name: "EditProfilePanel",
    data() {
      return {
        userProfile: {
          // username: this.$store.state.authUser.username,
          fullName: this.$store.state.authUser.fullName,
          perEmail: this.$store.state.authUser.perEmail,
          phoneNo: this.$store.state.authUser.phoneNo,
          // role: this.$store.state.authUser.role
        },
        editProfilePanelRule: {
          username:[
            { required: true, message: 'Please fill in the user name', trigger: 'blur'}
          ],
          fullName:[
            { required: true, message: 'Please fill in your name', trigger: 'blur'}
          ],
          perEmail:[
            { required: true, message: 'Please enter your e-mail', trigger: 'blur'},
          ],
          // role: [
          //   { required: true, message: 'X', trigger: 'blur'},
          // ],
          uniqueId: [
            {required: true, message:'Please enter your student/admin ID'}
          ],
          phoneNo:[
            { required: false}
          ],
        }
      }
    },
    methods: {
      unShowEditPanel() {
        // this.showEditPanelFlag = false;
        this.$store.commit('showEditProfilePanel', false);
      },
      updateUserProfile() {
        this.$emit('updateUserInfo', this.userProfile);
      }
    }
  }
</script>

<style scoped>

</style>