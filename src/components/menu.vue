<template>
  <el-menu
    background-color="#545c64"
    text-color="#fff">
    <menu-item v-for="item in menusData" :menuItem="item"></menu-item>
  </el-menu>
</template>
<script>
import MenuItem from './menu-item'
import inst from '../apis/index'
export default {
  props: {
    menusData: Array
  },
  components: {
    MenuItem
  },
  methods: {
    handleClickMenu (menu) {
      this.$router.push({path: menu.page})
    }
  }
}
</script>
<style lang="less">
</style>
