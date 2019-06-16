<template>
  <Breadcrumb>
    <Breadcrumb-item :to="'/'">Home</Breadcrumb-item>
    <Breadcrumb-item>Breadcrumb</Breadcrumb-item>
  </Breadcrumb>
</template>
<script>
export default {
  created () {
    this.getBreadcrumb()
  },
  data () {
    return {
      levelList: null
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && first.name !== 'welcome') {
        matched = [
          { path: '/welcome', meta: { title: 'welcome' } }
        ].concat(matched)
      }
      this.levelList = matched
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}

</style>
