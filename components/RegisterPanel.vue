<template>
  <section>
    <Divider orientation="left">Registration</Divider>

    <Row class="bg-row" >
      <Col class='login-reg-box' span="12" offset="6">
        <Card class="bg-card">
          <h3 class="form-title">Become our MEMBER</h3>

          <Form ref="registrationForm" :model='userRegInfo' :rules="registrationFormRule" >

            <!-- user name input, prop=username -->
            <FormItem label="User Name" prop="username">
              <Input v-model="userRegInfo.username" placeholder="Enter your user name"></Input>
            </FormItem>
            <!-- prop = perEmail -->
            <FormItem label="E-mail" prop="perEmail">
              <Input v-model="userRegInfo.perEmail" placeholder="Enter your e-mail"></Input>
            </FormItem>

            <!-- prop = password -->
            <FormItem label="Password" prop="password">
              <Input type='password' v-model="userRegInfo.password" placeholder="Enter your password"></Input>
            </FormItem>

            <!-- prop = confirmPassword -->
            <FormItem label="Confirm Password" prop="confirmPassword">
              <Input type='password' v-model="userRegInfo.confirmPassword" placeholder="Confirm your password"></Input>
            </FormItem>

            <!-- prop = fullName -->
            <FormItem label="Full Name" prop="fullName">
              <Input v-model="userRegInfo.fullName" placeholder="Enter your name"></Input>
            </FormItem>

            <FormItem label="Role" prop="role">
              <RadioGroup v-model="userRegInfo.role">
                <Radio label="cio">CIO</Radio>
                <Radio label="staff">Staff</Radio>
                <Radio label="student">Student</Radio>
              </RadioGroup>
            </FormItem>

            <!-- prop = phoneNo -->
            <FormItem label="Phone Number" prop="phoneNo">
              <Input v-model="userRegInfo.phoneNo" placeholder="Please enter your phone number"></Input>
            </FormItem>

            <FormItem >
              <Row>
                <Col span="8" offset="8">
                  <Button type="primary" @click="userRegistration('registrationForm')" long>Register</Button>
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
  export default {
    name: "registerPanel",
    data() {
      const validatePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error('Please enter your password'));
        }
        else {
          if (!!this.userRegInfo.confirmPassword) {
            // 对第二个密码框单独验证
            console.log('\n\n ====  this.$ref.registrationForm === \n', this.$refs.registrationForm, '\n ------');
            this.$refs.registrationForm.validateField('confirmPassword');
          }
          callback();
        }
      };

      const validateConfirmPass = (rule, value, callback) => {
        if (!value) {
          callback(new Error('Please enter your password again'));
        }
        else if (value !== this.userRegInfo.password) {
          callback(new Error('The two input passwords do not match!'));
        }
        else {
          callback();
        }
      };

      return {
        userRegInfo: {
          username:'',
          fullName:'',
          password:'',
          confirmPassword:'',
          perEmail:'',
          phoneNo:'',
          role:''
        },
        registrationFormRule: {
          username:[
            { required: true, message: 'Please fill in the user name', trigger: 'blur'}
          ],
          fullName:[
            { required: true, message: 'Please fill in your name', trigger: 'blur'}
          ],
          password:[
            { validator: validatePass, required:true ,trigger: 'blur'}
          ],
          confirmPassword:[
            { validator: validateConfirmPass, required:true , trigger: 'blur'},
          ],
          perEmail:[
            { required: true, message: 'Please enter your e-mail', trigger: 'blur'},
          ],
          role: [
            { required: true, message: 'X', trigger: 'blur'},
          ],
          phoneNo:[
            { required: false}
          ],
        }
      }
    },
    methods: {
      userRegistration(refName) {
        this.$refs[refName].validate((valid) => {
          if(valid) {
            this.$emit('userRegistration', this.userRegInfo);
          }
          else{
            this.$Message.error('Fail!');
          }
        });
      },
    }
  }
</script>

<style scoped>

</style>