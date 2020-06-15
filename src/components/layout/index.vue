<template>
  <div class="layout-container">
    <header class="layout-head">
      <v-header></v-header>
    </header>
    <div class="layout-content">
      <div class="panel-left">
        <main-nav :menus-data="menus" @choosemenu="handleMenuChoose" :text-key="'text'" :index-key="'id'">
        </main-nav>
      </div>
      <div class="panel-right">
        <tag-nav
          :tags="tags"
          ref="tagView"
          tag-value-field="id"
          tag-text-field="text"
          ></tag-nav>
        <div class="router-view-wrapper">
          <keep-alive :include="cachedViews">
            <router-view />
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VHeader from '../Header/index'
import MainNav from '../Menu/menu.vue'
import TagNav from '../../framework/TagView/TagView'
import menus from '../../mock/permission'
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
      menus: menus,
      tags: [{
        id: 1,
        text: '通知公告'
      }, {
        id: 2,
        text: '党风廉政建设'
      }]
    }
  },
  computed: {
    cachedViews () {
      return this.$store.state.tagView.cachedViews
    }
  },
  methods: {
    handleMenuChoose (item) {
      this.$refs.tagView.addView(item)
    }
  },
  mounted () {

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
