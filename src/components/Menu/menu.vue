<template>
  <el-menu default-active="1">
    <menu-item v-for="item in menusData" :menuItem="item"></menu-item>
  </el-menu>
</template>
<script>
import MenuItem from './menu-item'
import inst from '../../apis/index'
export default {
  data () {
    return {
      menusData: []
    }
  },
  components: {
    MenuItem
  },
  methods: {
    addRoute(routes, menus) {
      menus.map(menu => {
        routes.push({
          id: menu.id,
          name: menu.name,
          title: menu.title,
          path: menu.path,
          component: () => import(`views/${menu.componentPath}`),
          meta: menu.meta
        })
        if (menu.meta.fix) {
          this.$store.dispatch('tagView/addVisitedView', {title: menu.title, name: menu.name, path: menu.path, meta: menu.meta})
        }
        this.$store.dispatch('tagView/addCachedView', {name: menu.name, meta: menu.meta})
        if (menu.children) addRoute(routes, menu.children)
      })
    }
  },
  mounted () {
    inst.get('/permission').then(res=> {
      var asyncRoutes = []
      if (res && res.length) {
        this.addRoute(asyncRoutes, res);
        this.menusData = asyncRoutes
        this.$router.addRoutes(asyncRoutes);
        this.$router.push(this.$store.state.tagView.visitedViews[0].path)
      }
    })
  }
}
</script>
<style lang="scss">
  .el-menu {
    height: 100%;
  }
</style>
