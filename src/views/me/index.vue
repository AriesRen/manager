<template>
  <div class="me">
    <a-card style="width:100%; height: 100%" :tabList="tabList" :activeTabKey="key" @tabChange="key => onTabChange(key, 'key')">
      <div v-if="key === 'index'" class="card-content">
        <p>账号 :  {{ username }}</p>
        <p>昵称 :  {{ nickname }}</p>
        <p>角色 :  <span v-for="(role, i) in roles">
          <a-tag color="green">{{ role.name }}</a-tag>
        </span></p>
      </div>
      <div v-else="key === 'chpw'" class="card-content">
        adsasdf
      </div>
    </a-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      tabList: [{
        key: 'index',
        tab: '个人中心'
      }, {
        key: 'chpw',
        tab: '修改密码'
      }],
      key: 'index'
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'nickname',
      'avatar',
      'roles'
    ])
  },
  methods: {
    onTabChange (key, type) {
      this[type] = key
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.me {
  width: 100%;
  height: 100%;
}

.card-content {
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-weight: bold;
}

</style>
