<template>
  <section>
    <Menu mode="horizontal" theme="dark" active-name="1">
      <MenuItem to="/homePage" name="headerLogo">
        <img src="../static/uowlogo.png" alt="" width="60" >
      </MenuItem>
      <MenuItem v-if="!$store.state.authUser" name="advertisement">
        Welcome to UOW Event Booking {{version}}
      </MenuItem>
      <MenuItem v-if="!!$store.state.authUser" name="mainEventList" to="/homePage">
        <Icon type="ios-paper" />
        Event List
      </MenuItem>
      <MenuItem v-if="!!$store.state.authUser" name="dashBoard" to="/dashBoard">
        <Icon type="ios-construct" />
        Dash Board
      </MenuItem>
      <MenuItem  v-if="!!$store.state.authUser" name="userAvatar">
        <Dropdown placement="bottom-start" trigger="click">
          <a href="javascript:void(0)">
            <Avatar icon="ios-person" />
          </a>
          <DropdownMenu slot="list">
            <DropdownItem>
              <Button >Profile</Button>
            </DropdownItem>
            <DropdownItem>
              <Button @click="userLogout">Log Out</Button>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </MenuItem>
    </Menu>
  </section>
</template>

<script>
  import packageJson from '@/package'
  import axios from '@/plugins/axios'

  export default {
    name: "default-hearder",
    layout: 'default',
    data() {
      return {
        version: packageJson.version
      }
    },
    methods: {
      async userLogout(){
        // this.$emit('userLogout', this.$store.state.authUser);
        console.log('logoutlogout=sdfadf');
        console.log('\n\n ===== defaultHeader <|-- userLogout =====\n',
          this.$store.state.authUser, '\n ------------------');
        const logoutInfo = (await axios.post('/users/logout', null)).data;
        this.$store.commit('setAuthUser', null);
        window.location.reload(true);
      }
    }
  }
</script>

<style scoped>

</style>