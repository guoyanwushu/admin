<template>
  <div class="context-menu" v-show="show" @mouseleave="show=false">
    <template v-if="pullMenus && pullMenus.length">
      <span v-for="item in pullMenus" @click="pushEvent(item.type)">{{item.name}}</span>
    </template>
    <template v-else>
      <span @click="pushEvent('refresh')" v-if="refresh">刷新</span>
      <span @click="pushEvent('now')">关闭当前</span>
      <span @click="pushEvent('other')">关闭其他</span>
      <span @click="pushEvent('all')">关闭所有</span>
      <span @click="pushEvent('left')">关闭左边</span>
      <span @click="pushEvent('right')">关闭右边</span>
    </template>
    <i class="contexnt-menu_arrow" :style="{left: arrowLeft + 'px'}"></i>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: false,
      arrowLeft: 0
    }
  },
  props: {
    tagRef: Object,
    pullMenus: Array,
    refresh: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    pushEvent (type) {
      if (type == 'refresh') {
        this.tagRef.$emit('refresh')
        return
      }
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
    .contexnt-menu_arrow {
      position: absolute;
      width: 0px;
      height: 0px;
      border-width: 6px;
      border-color: transparent;
      border-bottom-color: #ccc;
      border-top-width: 0;
      border-style: solid;
      top: -7px;
      &:after {
        content: '';
        position: absolute;
        top: 1px;
        display: block;
        width: 0;
        height: 0;
        border-width: 6px;
        left: -6px;
        border-style: solid;
        border-top-width: 0;
        border-color: transparent;
        border-bottom-color: #fff;
      }
    }
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
