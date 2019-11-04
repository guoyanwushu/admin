<template>
  <div
    class="tag-item"
    @mouseenter="showClose=true"
    @mouseleave="showClose=false">
    <router-link
      tag="span"
      :to="{path: tag.path}"
    >{{tag.title}}<i class="close" v-show="!tag.fix && showClose" @click="closeTag">X</i></router-link>
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
    closeTag () {
      this.$store.dispatch('tagView/delVisitedView', this.tag)
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
      padding: 0 20px;
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
