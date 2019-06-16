<script>
export default {
  beforeCreate () {
    this.$store.dispatch('FedLogout').then((res) => {
      console.log(res)
      this.$router.push('/login')
    })
  },
  render: function (h) {
    return h()
  }
}

</script>
