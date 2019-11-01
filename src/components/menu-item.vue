<template>
  <div>
    <el-submenu v-if="menuItem.children && menuItem.children.length>0" :index="menuItem.id">
      <span slot="title">{{menuItem.name}}</span>
      <menu-item v-for="item in menuItem.children" :menuItem="item"></menu-item>
    </el-submenu>
    <el-menu-item v-else :index="menuItem.id" @click="chooseMenuItem">
      <span slot="title">{{menuItem.name}}</span>
    </el-menu-item>
  </div>
</template>
<script>
  export  default {
    name: 'MenuItem',
    props: {
      menuItem: Object
    },
    methods: {
      chooseMenuItem () {
        this.$store.dispatch('tagView/addVisitedView', {title: this.menuItem.name, path: this.menuItem.path, name: this.menuItem.name, meta: this.menuItem.meta});
        this.$router.push(this.menuItem.path);
      }
    }
  }
</script>
