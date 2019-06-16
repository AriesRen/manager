<template>
  <div class="container">
    <a-layout-sider :trigger="null" breakpoint="lg" collapsible v-model="collapsed" class="sidenav">
      <div class="logo" />
      <a-menu mode="inline" theme="dark">
        <a-menu-item>
          <router-link :to="'/welcome'">
            <a-icon type="home" />
            <span>系统首页</span>
          </router-link>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title">
            <a-icon type="setting" />
            <span>系统管理</span>
          </span>
          <a-menu-item key="1">
            <router-link :to="'/user/index'">用户管理</router-link>
          </a-menu-item>
          <a-menu-item key="2">
            <router-link :to="'/role/index'">角色管理</router-link>
          </a-menu-item>
          <a-menu-item key="3">
            <router-link :to="'/permission/index'">权限管理</router-link>
          </a-menu-item>
          <a-menu-item key="4">
            <router-link :to="'/menu/index'">菜单管理</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title">
            <a-icon type="laptop" />
            <span>监控管理</span>
          </span>
          <a-menu-item key="5">
            性能监控
          </a-menu-item>
          <a-menu-item key="6">
            系统日志
          </a-menu-item>
          <a-menu-item key="7">
            Redis监控
          </a-menu-item>
          <a-menu-item key="8">
            系统信息
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <span slot="title">
            <a-icon type="notification" />
            <span>任务调度</span>
          </span>
          <a-menu-item key="9">定时任务</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub4">
          <span slot="title">
            <a-icon type="dollar" />
            <span>商品管理</span>
          </span>
          <a-menu-item key="10">订单管理</a-menu-item>
          <a-menu-item key="11">库存管理</a-menu-item>
          <a-menu-item key="12">商品列表</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'collapsed'
    ])
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.sidenav {
  height: 100%;
  width: 100%;
}

.logo {
  height: 32px;
  background: rgba(255, 255, 255, .2);
  margin: 16px;
}

</style>
