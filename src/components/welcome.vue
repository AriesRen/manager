<template>
  <div id="welcome">
    <h1>
      welcome to 管理后台! {{ username }}
    </h1>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'username'
    ])
  },
  data () {
    return {

    }
  }
}

</script>
<style>
#welcome {
  text-align: center;
  margin: 50px auto;
}

</style>
