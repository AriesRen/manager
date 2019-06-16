<template>
  <div class="navbar">
    <Menu mode="horizontal" theme="light">
      <i-col span="4">
        <div class="logo">
          <el-button type="text" icon="el-icon-menu" @click="goHome">
            京淘管理系统
          </el-button>
        </div>
      </i-col>
      <i-col span="16" class="menu-assistant">
        <!-- <Menu-item name="1">
          内容管理
        </Menu-item>
        <Menu-item name="2">
          用户管理
        </Menu-item>
        <Submenu name="3">
          <template slot="title">
            统计分析
          </template>
          <Menu-group title="使用">
            <Menu-item name="3-1">新增和启动</Menu-item>
            <Menu-item name="3-2">活跃分析</Menu-item>
            <Menu-item name="3-3">时段分析</Menu-item>
          </Menu-group>
          <Menu-group title="留存">
            <Menu-item name="3-4">用户留存</Menu-item>
            <Menu-item name="3-5">流失用户</Menu-item>
          </Menu-group>
        </Submenu>
        <Menu-item name="4">
          综合设置
        </Menu-item> -->
      </i-col>
      <i-col span="4" class="avatar-container">
        <el-dropdown placement="bottom">
          <div class="avatar">
            <img :src="avatar">
            {{ username }}
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-news">
              <el-button type="text" @click="goMe">个人中心</el-button>
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-edit-outline">
              <el-button type="text"  @click="goChangePW">修改密码</el-button>
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-back">
              <el-button type="text" @click="logout">退出</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </i-col>
    </Menu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'avatar',
      'username'
    ])
  },
  methods: {
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
<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  width: 100%;
}

.el-button {
  color: #505050;
}

.menu-assistant {
  margin: 0 auto;
  height: inherit;
}

.logo {
  width: 180px;
  margin: 2px auto;
  text-align: center;
  height: 40px;

  .el-button {
    color: #505050;
    font-size: 17px;
    // background: #f5f5f5;
    height: 40px;
    width: 180px;
  }

}

.avatar-container {
  color: #505050;
  height: 40px;
  width: 150px;
  text-align: center;

  .avatar {
    color: #505050;
    cursor: pointer;

    img {
      width: 30px;
      height: 30px;
      border-radius: 15px;
      vertical-align: middle;
      margin-right: 8px;
    }
  }

}

</style>
