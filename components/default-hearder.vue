<template>
  <section>
    <Menu mode="horizontal" theme="dark" active-name="1">
      <MenuItem>
        <Icon type="ios-paper" />
        Event List
      </MenuItem>
      <MenuItem>
        <Icon type="ios-construct" />
        Dash Board
      </MenuItem>
      <!--<Row>-->
        <Col span="18">
          <div >
            <Avatar icon="ios-person" />
          </div>
        </Col>
      <!--</Row>-->
    </Menu>
  </section>
</template>

<script>
  export default {
    name: "default-hearder",
    layout: 'default'
  }
</script>

<style scoped>

</style>