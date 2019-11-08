<template>
  <div
    class="tag-item"
    @mouseenter="showClose=true"
    @mouseleave="showClose=false">
    <router-link
      tag="span"
      :to="{path: tag.path}"
    >{{tag.title}}<i class="close" v-show="!tag.meta.fix && showClose" @click.stop="closeTag(tag)">X</i></router-link>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showClose: false
    }
  },
  props: {
    tag: Object
  },
  methods: {
    closeTag (tag) {
      this.$store.dispatch('tagView/delVisitedView', tag).then(visitedViews => {
        this.toLastView(visitedViews, tag)
      })
    },
    toLastView (visitedViews, view) {
      if (view.path !== this.$route.path) return
      var lastView = visitedViews.slice(-1)[0]
      if (lastView) {
        this.$router.push(lastView.path)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .tag-item {
    float: left;
    cursor: pointer;
    span {
      display: inline-block;
      position: relative;
      height: 40px;
      line-height: 40px;
      text-align: center;
      box-sizing: border-box;
      padding: 0 30px;
      font-size: 14px;
      color: #404040;
      border-bottom: 2px solid transparent;
      &.router-link-active {
        border-bottom-color: #2569ff;
        color: #1890ff
      }
      .close {
        position: absolute;
        right: 5px;
        top: 0px;
        cursor: pointer;
        margin-left: 8px;
        font-size: 12px;
        color: #a7a7a7;
      }
    }



  }
</style>
