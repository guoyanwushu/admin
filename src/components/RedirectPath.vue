<script>
  export default {
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$router.replace(from.path)
      })
    },
    render: function (h) {
      return h()
    }
  }
</script>

