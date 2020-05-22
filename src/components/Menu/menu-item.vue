<template>
  <div>
    <el-submenu v-if="menuItem.children && menuItem.children.length>0" :index="menuItem[valueKey]">
      <slot v-bind:itemData="menuItem">
        <span slot="title">{{menuItem[labelKey]}}</span>
      </slot>
      <menu-item v-for="item in menuItem.children" :menuItem="item" :value-key="valueKey" :label-key="labelKey">
      </menu-item>
    </el-submenu>
    <el-menu-item v-else :index="menuItem[valueKey]" @click="chooseMenuItem">
      <slot v-bind:itemData="menuItem">
        <span slot="title">{{menuItem[labelKey]}}</span>
      </slot>
    </el-menu-item>
  </div>
</template>
<script>
  /* 从后端请求回来的菜单数据，要同时构建菜单和路由 */
  export default {
    name: 'MenuItem',
    props: {
      menuItem: Object,
      labelKey: String,
      valueKey: String
    },
    methods: {
      chooseMenuItem () {
        // this.$store.dispatch('tagView/addVisitedView', {title: this.menuItem.title, path: this.menuItem.path, name: this.menuItem.name, meta: this.menuItem.meta});
        // this.$router.push(this.menuItem.path);
      }
    }
  }
</script>
