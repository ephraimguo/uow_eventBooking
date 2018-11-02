<template>
  <section>
    <Divider orientation="left">Hey it's your personal profle</Divider>

    <Row style="background:#eee;padding:20px">
      <Col span="6">
        <Card :bordered="false">
          <p slot="title">
            Look at here
          </p>

          <p>Username: {{$store.state.authUser.username}}</p>
          <p>Full Name: {{$store.state.authUser.fullName}}</p>
          <p>Email: {{$store.state.authUser.perEmail}}</p>
          <p>Phone: {{$store.state.authUser.phoneNo || '⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄'}}</p>
          <p>Role: {{$store.state.authUser.role}}</p>

          <div style="text-align:right">
            <Button type="dashed" @click="showEditPanel()">edit profile</Button>
          </div>
        </Card>
      </Col>
      <Col span="12" offset="2" v-if="$store.state.showEditProfilePanel">
        <EditProfilePanel @updateUserInfo="updateUserInfo"/>
      </Col>
    </Row>
  </section>
</template>

<script>
  import axios from '@/plugins/axios.js'

  import EditProfilePanel from '@/components/dashBoard/EditProfilePanel.vue'

  export default {
    name: "index",
    layout:'dashBoard',
    components: {
      EditProfilePanel
    },
    data() {
      return {
        showEditPanelFlag: false
      }
    },
    async fetch ({ store, redirect }) {
      if(!store.state.authUser){
        return redirect('/');
      }
    },
    computed: {

    },
    methods: {
      showEditPanel() {
        // this.showEditPanelFlag = true;
        this.$store.commit('showEditProfilePanel', true);
      },
      async updateUserInfo(userProfile) {
        console.log('\n\n ======= /dashBoard/index/ <|-- updateUserInfo =======\n',
          userProfile ,'\n ----------------------');
        const updateInfo = (await axios.post('/users/updateUserInfo', userProfile)).data;

        console.log('\n\n ======= /dashBoard/index/ <|-- updateUserInfo RETURNED ======\n',
          updateInfo, '\n -----------------');

        const authUser = (await axios.get('/users/'+this.$store.state.authUser.id)).data;
        this.$store.commit('setAuthUser', authUser);
      }
    }

  }
</script>

<style scoped>

</style>