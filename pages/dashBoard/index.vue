<template>
  <section>
    <Divider orientation="left">Hey it's your personal profle</Divider>

    <Row style="background:#eee;padding:20px">
      <Col span="6">
        <Card :bordered="false">
          <p slot="title">
            Look at here
          </p>
          <p v-for="(item, index) of $store.state.authUser">
            {{index}}: {{item}}
          </p>
          <div style="text-align:right">
            <Button type="dashed" @click="showEditPanel()">edit profile</Button>
          </div>
        </Card>
      </Col>
      <Col span="12" offset="2" v-if="$store.state.showEditProfilePanel">
        <EditProfilePanel/>
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

    }

  }
</script>

<style scoped>

</style>