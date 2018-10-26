<template>
  <section class="main-container">

    <Tabs type="card">
      <TabPane label="Login">
        <LoginPanel @userLogin="userLogin"></LoginPanel>
      </TabPane>
      <TabPane label="Registration">
        <RegisterPanel @userRegistration="userRegistration"></RegisterPanel>
      </TabPane>
    </Tabs>
  </section>

</template>

<script>
  import axios from '@/plugins/axios'

  import LoginPanel from '@/components/LoginPanel.vue'
  import RegisterPanel from '@/components/RegisterPanel.vue'

  export default {
    components: {
      LoginPanel,
      RegisterPanel
    },
    data () {
      return {

      }
    },
    async fetch ({ store, redirect }) {
      if(!store.state.authUser){
        return redirect('/');
      }
      else{
        return redirect('/homePage');
      }
    },
    methods :{
      async userRegistration(userRegInfo){
        console.log(userRegInfo);
        const {data} = await axios.post('/domain/User/create', userRegInfo);
        if(data.hasOwnProperty('error')){
          this.$Message.error('Username is taken, please change another one');
        }
        else{
          this.$Message.success('Registration Successful');
        }
        console.log('\n\n ====== index <|-- data return thru registration ======\n', data, '\n --------------' );
      },
      async userLogin(userInfo){
        console.log('\n\n ====== Index Page <|-- userLogin info ====== \n', userInfo, '\n ----------' );
        const loginInfo = await axios.post('/users/login', userInfo);
        window.location.reload(true);
        console.log('\n\n ====== Index Page <|-- After LogIn ====== \n', loginInfo.data, '\n -----------');
      },
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

  .main-container {
    margin: 50px 80px;
  }

</style>