<template>
  <div class="menu-left">
    <!--  <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
      <template v-for="item in routes">
        <Submenu :name="item.name" :key="item.key" v-if="!item.hidden&&item.children">
          <template slot="title">
            <Icon :type="item.meta.icon"></Icon>
            <span class="layout-text">{{item.name}}</span>
          </template>
          <template v-for="child in item.children">
            <MenuItem :name="child.name" :to="child.path" :key="child.key">
            <Icon :type="child.meta.icon"></Icon>
            <span class="layout-text" :key="child.key">{{child.name}}</span>
            </MenuItem>
          </template>
        </Submenu>
      </template>
    </Menu> -->
    <Menu theme="dark" width="auto">
      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-navigate"></Icon>
          用户管理
        </template>
        <Menu-item name="2-2" :to="'/user/add'">添加用户</Menu-item>
        <Menu-item name="2-3" :to="'/user/index'">管理用户</Menu-item>
      </Submenu>
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-paper"></Icon>
          菜单管理
        </template>
        <Menu-item name="3-1">选项 1</Menu-item>
        <Menu-item name="3-2">选项 2</Menu-item>
      </Submenu>
      <Submenu name="4">
        <template slot="title">
          <Icon type="ios-people"></Icon>
          权限管理
        </template>
        <Menu-item name="4-1">选项 1</Menu-item>
        <Menu-item name="4-2">选项 2</Menu-item>
      </Submenu>
      <Submenu name="5">
        <template slot="title">
          <Icon type="ios-settings"></Icon>
          系统设置
        </template>
        <Menu-item name="5-1">选项 1</Menu-item>
        <Menu-item name="5-2">选项 2</Menu-item>
      </Submenu>
    </Menu>
  </div>
</template>
<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.menu-left {
  background: #464c5b;
  position: relative;
  min-height: 600px;
}

</style>
