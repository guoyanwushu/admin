<template>
  <div>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo">
      <menu-item v-for="item in menuData" :menu-item="item" :key="item[valueKey]" :value-key="valueKey" :label-key="labelKey">
        <template v-slot:default="{itemData}">
          <p slot="title">
            <i>{{itemData.iconCls.substring(0,3)}}</i>
            <strong>{{itemData[labelKey]}}</strong>
          </p>
        </template>
      </menu-item>
      <!--<template v-for="menuItem in menuData">
        <el-submenu v-if="menuItem.children && menuItem.children.length>0" :index="menuItem[valueKey]">
          <slot v-bind:menuItemData="menuItem" name="menuItem">
            <span slot="title">{{menuItem[labelKey]}}</span>
          </slot>
          <main-menu :menu-data="menuItem.children" :value-key="valueKey" :label-key="labelKey"></main-menu>
        </el-submenu>
        <el-menu-item v-else :index="menuItem[valueKey]">
          <slot v-bind:menuItemData="menuItem" name="menuItem">
            <span>{{menuItem[labelKey]}}</span>
          </slot>
        </el-menu-item>
      </template>-->
    </el-menu>
  </div>
</template>
<script>
  import MenuItem from './menu-item'
  export default {
    name: 'MainMenu',
    props: {
      menuData: {
        type: [Object, Array],
        required: true
      },
      valueKey: {
        type: String,
        required: true,
        default: 'id'
      },
      labelKey: {
        type: String,
        required: true,
        default: 'text'
      }
    },
    components: {
      MainMenu: () => import('./TestMenu.vue'),
      MenuItem
    }
  }
</script>
<style lang="less">
</style>
