<template>
  <div class="layout-container">
    <header class="layout-head"></header>
    <div class="layout-content">
      <div class="panel-left"></div>
      <div class="panel-right">
        <tag-nav></tag-nav>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import TagNav from '../TagNav'
export default {
  name: 'layout',
  components: {
    TagNav
  }
}
</script>
<style lang="scss" scoped>
  * {
    margin: 0;
    padding: 0;
  }
  .layout-container {
    height: 100%;
  }
  header {
    position: relative;
    height: 60px;
  }
  .layout-content {
    height: calc(100% - 60px);
    .panel-left {
      width: 240px;
      height: 100%;
      float: left;
    }
    .panel-right {
      width: calc(100% - 240px);
      height: 100%;
      float: left;
    }
  }
</style>
