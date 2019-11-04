<template>
  <el-menu default-active="1">
    <menu-item v-for="item in menusData" :menuItem="item"></menu-item>
  </el-menu>
</template>
<script>
import MenuItem from './menu-item'
import inst from '../apis/index'
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
    handleClickMenu (menu) {
      this.$router.push({path: menu.page})
    },
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
        console.log(asyncRoutes);
        this.$router.addRoutes(asyncRoutes);
        console.log(this.$router)
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
