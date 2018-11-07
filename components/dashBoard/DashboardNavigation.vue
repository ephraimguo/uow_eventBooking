<template>
  <div>
    <!-- fake menu for call the drawer out -->
    <!--<Menu class="drawer-trigger">-->
      <!---->
    <!--</Menu>-->
    <Drawer title="Hey What's going on"
            :style="styles"
            placement="left"
            width="255"
            :mask-closable="false"
            v-model="$store.state.showDashBoardMenu">

      <!-- Real menu -->
      <Menu theme="light" active-name="1">
        <MenuGroup title="Self">

          <MenuItem name="1"
                    :to="{path:'/dashBoard'}"
          >
            <span @click="toggleShow">
              <Icon type="md-document" />
            My Profile
            </span>
          </MenuItem>

          <MenuItem name="2"
                    to="/dashBoard/myEvents">
            <span @click="toggleShow">
              <Icon type="md-chatbubbles" />
            My Events
            </span>
          </MenuItem>

        </MenuGroup>

        <MenuGroup v-if="$store.state.authUser.role=='cio' || $store.state.authUser.role=='staff'"
                   title="Public">

          <MenuItem name="3"
                    to="/dashBoard/createEvent">

            <span @click="toggleShow">
              <Icon type="md-heart" />
              Create New Events
            </span>
          </MenuItem>

          <!--<MenuItem name="4"-->
                    <!--to="/dashBoard/management">-->
            <!--<span @click="toggleShow">-->
              <!--<Icon type="md-leaf" />-->
            <!--Manage Events-->
            <!--</span>-->
          <!--</MenuItem>-->

        </MenuGroup>
      </Menu>
    </Drawer>



  </div>
</template>

<script>
  export default {
    name: "dashboardNavigation",
    data() {

      return {
        showMenu: false,
        styles: {
          height: 'calc(100% - 55px)',
          overflow: 'auto',
          position: 'static'
        }
      }
    },
    methods:{
      toggleShow(){
        console.log('\n\n ==== Dash Board nav <|-- toggleShow b4==== \n',
          this.showMenu, '\n -----------------');
        // this.showMenu = !this.showMenu;
        this.$store.commit('toggleShowDashBoardMenu', null);
        console.log('\n\n ==== Dash Board nav <|-- toggleShow aft==== \n',
          this.showMenu, '\n -----------------');
      }
    }
  }
</script>

<style scoped>
</style>