<template>
  <div>
    <el-submenu v-if="menuItem.children && menuItem.children.length>0" :index="menuItem.id">
      <span slot="title">{{menuItem.text}}</span>
      <menu-item v-for="item in menuItem.children" :menuItem="item"></menu-item>
    </el-submenu>
    <el-menu-item v-else :index="menuItem.id">
      <span slot="title">{{menuItem.text}}</span>
    </el-menu-item>
  </div>
</template>
<script>
  export  default {
    name: 'MenuItem',
    props: {
      menuItem: Object
    }
  }
</script>
