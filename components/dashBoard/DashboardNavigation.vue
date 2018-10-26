<template>
  <div>
    <!-- fake menu for call the drawer out -->
    <Menu class="drawer-trigger">
      <MenuItem>
        <Icon type="ios-apps"
              class="drawer-trigger"
              style="float:left"
              size="30"
              @click="showMenu = true"/>
      </MenuItem>
    </Menu>
    <Drawer title="Hey What's going on"
            :style="styles"
            placement="left"
            width="255"
            :closable="false"
            v-model="showMenu">

      <!-- Real menu -->
      <Menu theme="light" active-name="1">
        <MenuGroup title="Self">
          <MenuItem name="1">
            <Icon type="md-document" />
            My Profile
          </MenuItem>
          <MenuItem name="2">
            <Icon type="md-chatbubbles" />
            My Events
          </MenuItem>
        </MenuGroup>
        <MenuGroup title="Public">
          <MenuItem name="3">
            <Icon type="md-heart" />
            Create New Events
          </MenuItem>
          <MenuItem name="4">
            <Icon type="md-leaf" />
            Manage Events
          </MenuItem>
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
    }
  }
</script>

<style scoped>
  .drawer-trigger{
    /*border: 1px solid red;*/
  }
</style>