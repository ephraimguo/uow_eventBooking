<template>
  <section>
    <Divider orientation="left">Sign In</Divider>
    <Row class="bg-row">
      <Col class='login-reg-box' span="12" offset="6">
        <Card class="bg-card">
          <Alert type="Content">
            <h3 class="form-title">Welcome to BACK</h3>
            <Form ref="formInline" :rules="ruleInline" >
              <FormItem prop="user">
                <Input type="text" placeholder="Username">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
              </FormItem>
              <FormItem  prop="password">
                <Input type="password"  placeholder="Password">
                  <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
              </FormItem>
              <FormItem >
                <Row>
                  <Col span="8" offset="8">
                    <Button type="success" long>Sign In</Button>
                  </Col>
                </Row>
              </FormItem>
            </Form>
          </Alert>
        </Card>

      </Col>
    </Row>

    <Divider orientation="left">Registration</Divider>

    <Row class="bg-row" >
        <Col class='login-reg-box' span="12" offset="6">
          <Card class="bg-card">

          <Alert type="Content">
            <h3 class="form-title">Become our MEMBER</h3>
            <Form ref="formInline" :rules="ruleInline" >
              <FormItem prop="user">
                <Input type="text" placeholder="Username">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
              </FormItem>
              <FormItem  prop="password">
                <Input type="password"  placeholder="Password">
                  <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
              </FormItem>
              <FormItem  prop="password">
                <Input type="password"  placeholder="Confirm Password">
                  <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
              </FormItem>
              <FormItem label="Register as">
                <RadioGroup>
                  <Radio label="superAdmin">CIO</Radio>
                  <Radio label="admin">Staff</Radio>
                  <Radio label="student">Student</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem >
                <Row>
                  <Col span="8" offset="8">
                    <Button type="primary" long>Register</Button>
                  </Col>
                </Row>
              </FormItem>
            </Form>
          </Alert>
          </Card>
        </Col>
    </Row>
  </section>

</template>

<script>
  export default {
    data () {
      return {
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
            { required: true, message: 'Please fill in the user name', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Please fill in the password.', trigger: 'blur' },
            { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
          ]
        }
      }
    }
  }
</script>

<style scoped>
  .bg-row{
    background: linear-gradient(to right, #fff, #ddd);
    padding: 20px;
  }

  .bg-card{
    background: #ddd;
    padding:10px;
  }

  .login-reg-box{
    margin-top: 20px;
    margin-bottom: 20px;

  }

  .form-title{
    display: inline-block;
    margin: 15px auto;
  }

</style>