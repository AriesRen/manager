<template>
  <a-layout-header style="background: #fff; padding: 0">
    <a-icon class="trigger" :type="collapsed? 'menu-unfold' : 'menu-fold'" @click="toggleCollapsed" />
    <div class="avatar">
      <img :src="avatar">
      <a-dropdown :trigger="['hover']" placement="bottomCenter">
        <a class="ant-dropdown-link" href="#">
          {{ username }}
        </a>
        <a-menu slot="overlay" @click="onClick" class="nav-dropdown-menu">
          <a-menu-item key="/me/index">
            <a-icon type="user" />个人中心</a-menu-item>
          <a-menu-item key="/me/chpw">
            <a-icon type="form" />修改密码</a-menu-item>
          <a-menu-divider />
          <a-menu-item key="/logout">
            <a-icon type="logout" />退出</a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'avatar',
      'username',
      'collapsed'
    ])
  },
  methods: {
    onClick (key) {
      this.$router.push({ path: key.key })
    },
    toggleCollapsed () {
      this.$store.dispatch('ToggleCollapsed')
    },
    goMe (name) {
      this.$router.push('/me')
    },
    goHome (name) {
      console.log(name)
      this.$router.push('/')
    },
    goChangePW () {
      this.$router.push('/chpw')
    },
    logout () {
      this.$store.dispatch('FedLogout').then(() => {
        this.$router.push('/login')
      })
    }
  }
}

</script>
<style scoped rel="stylesheet/scss" lang="scss">
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color .3s;
}

.trigger:hover {
  color: #1890ff;
}

.avatar {
  color: #505050;
  cursor: pointer;
  float: right;
  margin-right: 60px;

  img {
    width: 30px;
    height: 30px;
    border-radius: 15px;
    vertical-align: middle;
    margin-right: 8px;
  }
}

.nav-dropdown-menu {
  min-width: 130px;
  min-height: 100px;
  top: 20px;
  font-size: 20px;
}

</style>
