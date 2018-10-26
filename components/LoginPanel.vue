<template>
  <section>
    <Divider orientation="left">Sign In</Divider>
    <Row class="bg-row">
      <Col class='login-reg-box' span="12" offset="6">
        <Card class="bg-card">
          <!--<Alert type="success">-->
          <h3 class="form-title">Welcome to BACK</h3>
          <Form ref="formInline" :model="userInfo" :rules="ruleInline" >
            <FormItem prop="username">
              <Input type="text" placeholder="username" v-model="userInfo.username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem  prop="password">
              <Input type="password"  placeholder="Password" v-model="userInfo.password">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem >
              <Row>
                <Col span="8" offset="8">
                  <Button type="success" @click="userLogin()" long>Sign In</Button>
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
    name: "loginPanel",
    data() {
      return {
        userInfo: {
          username: '',
          password: ''
        },
        ruleInline: {
          username: [
            { required: true, message: 'Please fill in the user name', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Please fill in the password.', trigger: 'blur' },
            // { type: 'string', message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
          ]
        },
      }
    },
    methods: {
      userLogin() {
        if(this.userInfo.username=='' || this.userInfo.password==''){
          alert('Please enter user name and password');
        }
        else{
          this.$emit('userLogin', this.userInfo);
        }
      }
    }
  }
</script>

<style scoped>

</style>