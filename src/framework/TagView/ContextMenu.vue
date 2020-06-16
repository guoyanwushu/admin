<template>
  <div class="context-menu">
    <span @click="pushEvent('now')">关闭当前</span>
    <span @click="pushEvent('other')">关闭其他</span>
    <span @click="pushEvent('all')">关闭所有</span>
    <span @click="pushEvent('left')">关闭左边</span>
    <span @click="pushEvent('right')">关闭右边</span>
  </div>
</template>
<script>
export default {
  prop: {
    tagRef: Object
  },
  methods: {
    pushEvent (type) {
      this.tagRef.$emit('closeTag', type)
    }
  }
}
</script>
<style lang="scss" scoped>
  .context-menu {
    padding: 2px 0;
    position: fixed;
    width: 220px;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 3px #ccc;
    border-radius: 3px;
    z-index: 9999;
    span {
      display: block;
      height: 34px;
      line-height: 34px;
      color: #666;
      font-size: 12px;
      padding-left: 12px;
      cursor: pointer;
      &:hover {
        background-color: #e6e6e6;
      }
    }
    span + span {
      border-top: 1px solid #f6f6f6;
    }
  }
</style>
