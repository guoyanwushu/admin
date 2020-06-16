<template>
  <div>
    <el-submenu v-if="menuItem.children && menuItem.children.length>0" :index="menuItem[indexKey]">
      <span slot="title">{{menuItem[textKey]}}</span>
      <menu-item v-for="item in menuItem.children" :menuItem="item" :index-key="indexKey" :text-key="textKey" :key="item[indexKey]"></menu-item>
    </el-submenu>
    <el-menu-item v-else :index="menuItem[indexKey]" @click="chooseMenuItem">
      <span slot="title">{{menuItem[textKey]}}</span>
    </el-menu-item>
  </div>
</template>
<script>
  /* 从后端请求回来的菜单数据，要同时构建菜单和路由 */
  export  default {
    name: 'MenuItem',
    props: {
      menuItem: Object,
      indexKey: {
        type: String,
        required: true,
        default: 'id'
      },
      textKey: {
        type: String,
        required: true,
        default: 'name'
      }
    },
    methods: {
      chooseMenuItem () {
        /*this.$store.dispatch('tagView/addVisitedView', {title: this.menuItem.title, path: this.menuItem.path, name: this.menuItem.name, meta: this.menuItem.meta});
        this.$router.push(this.menuItem.path);*/
        console.log('chooseing menu')
        this.$emit('choose', this.menuItem)
      }
    }
  }
</script>
