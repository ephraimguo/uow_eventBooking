<template>
  <div>
    <Menu theme="dark" active-name="1">
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
  </div>
</template>

<script>
  export default {
    name: "dashboardNavigation"
  }
</script>

<style scoped>

</style>