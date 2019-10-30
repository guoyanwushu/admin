<template>
  <div class="tag-wrapper">
    <router-link
      v-for="tag in visitedViews"
      tag="span"
      :class="tag.isActive?'active':''"
      :to="tag.path"
    >{{tag.title}}
    </router-link>
  </div>
</template>
<script>
  /**
   * 标签导航应该是一个全局维护的对象， 包含以下几个属性: 当前打开的导航列表数组， 上一次打开的导航(方便关闭之后回退), 来源可能来自于左边的导航栏，或者页面里面的一些业务逻辑
   */
  export default {
    props: {
      navs: Array
    },
    computed: {
      visitedViews () {
        return this.$store.state.tagView.visitedViews
      }
    },
    methods: {}
  }
</script>
<style lang="scss" scoped>
</style>
