<template>
  <section>
        <Card class="bg-card">
          <Form ref="registrationForm" :model='userProfile' :rules="editProfilePanelRule" >

            <!-- user name input, prop=username -->
            <!--<FormItem label="User Name" prop="username">-->
              <!--<Input v-model="userProfile.username" placeholder="Enter your user name"></Input>-->
            <!--</FormItem>-->
            <!-- prop = perEmail -->
            <FormItem label="E-mail" prop="perEmail">
              <Input v-model="userProfile.perEmail" placeholder="Enter your e-mail"></Input>
            </FormItem>

            <!-- prop = password
            <FormItem label="Password" prop="password">
              <Input type='password' v-model="userProfile.password" placeholder="Enter your password"></Input>
            </FormItem> -->

            <!-- prop = confirmPassword
            <FormItem label="Confirm Password" prop="confirmPassword">
              <Input type='password' v-model="userProfile.confirmPassword" placeholder="Confirm your password"></Input>
            </FormItem> -->

            <!-- prop = fullName -->
            <FormItem label="Full Name" prop="fullName">
              <Input v-model="userProfile.fullName" placeholder="Enter your name"></Input>
            </FormItem>

            <!-- prop = uniqueId -->
            <!--<FormItem label="Student/Admin ID" prop="uniqueId">-->
              <!--<Input v-model="userProfile.uniqueId" placeholder="Enter your ID No."></Input>-->
            <!--</FormItem>-->


            <FormItem label="Role" prop="role">
              <RadioGroup v-model="userProfile.role">
                <Radio label="cio">CIO</Radio>
                <Radio label="staff">Staff</Radio>
                <Radio label="student">Student</Radio>
              </RadioGroup>
            </FormItem>

            <!-- prop = phoneNo -->
            <FormItem label="Phone Number" prop="phoneNo">
              <Input v-model="userProfile.phoneNo" placeholder="Please enter your phone number"></Input>
            </FormItem>

            <FormItem >
              <Row>
                <Col span="8" offset="8">
                  <Button @click="unShowEditPanel()">Cancel</Button> |
                  <Button type="success">update profile</Button>
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
          role: this.$store.state.authUser.role
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
          role: [
            { required: true, message: 'X', trigger: 'blur'},
          ],
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
      }
    }
  }
</script>

<style scoped>

</style>