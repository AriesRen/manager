<template>
  <a-layout :style="{ height: '100%', borderRight: 0 }">
    <side-nav></side-nav>
    <a-layout :style="{ height: '100%' }">
      <nav-bar></nav-bar>
      <a-layout-content :style="{ margin: '16px 16px', background: '#fff'}">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import NavBar from './layout/NavBar'
import SideNav from './layout/SideNav'
export default {
  name: 'Layout',
  components: {
    NavBar,
    SideNav
  },
  data () {
    return {

    }
  }
}

</script>
