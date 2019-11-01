<template>
  <div class="layout-container">
    <header class="layout-head">
      <v-header></v-header>
    </header>
    <div class="layout-content">
      <div class="panel-left">
        <main-nav :menusData="menus"></main-nav>
      </div>
      <div class="panel-right">
        <tag-nav></tag-nav>
        <div class="router-view-wrapper">
          <keep-alive>
            <router-view />
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VHeader from '../Header/index'
import MainNav from '../menu'
import TagNav from '../TagNav/TagNav'
import inst from '../../apis/index'
export default {
  name: 'layout',
  components: {
    TagNav,
    MainNav,
    VHeader
  },
  data () {
    return {
      menus: []
    }
  },
  computed: {
    cachedViews () {
      return this.$store.state.tagView
    }
  },
  mounted () {
    inst.get('/permissions').then(res => {
      console.log(res);
      this.menus = res
    })
  },
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
      overflow-y: auto;
      float: left;
    }
    .panel-right {
      width: calc(100% - 240px);
      height: 100%;
      float: left;
    }
  }
  .router-view-wrapper {
    width: 100%;
    height: calc(100% - 40px);

  }
</style>
