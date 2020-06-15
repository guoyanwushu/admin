<template>
  <el-menu default-active="1" @select="handleSelect">
    <menu-item v-for="item in menusData" :menuItem="item" :index-key="indexKey" :text-key="textKey"></menu-item>
  </el-menu>
</template>
<script>
import MenuItem from './menu-item'
import inst from '../../apis/index'
export default {
  data () {
    return {
      // menusData: [],
      // flatterMenuObj: {}
    }
  },
  created: function () {
    // 将可点击节点的index，转换为数据对象
  },
  props: {
    menusData: {
      type: Array,
      required: true
    },
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
  components: {
    MenuItem
  },
  methods: {
    handleSelect (index) {
      console.log(this.flatterMenuObj)
      this.$emit('choosemenu', this.flatterMenuObj[index])
    },
    flatterMenu (menus) {
      menus.map(menuItem => {
        if (!menuItem.children || !menuItem.children.length) {
          this.flatterMenuObj[menuItem[this.indexKey]] = Object.assign({}, menuItem)
        } else {
          this.flatterMenu(menuItem.children)
        }
      })

    }
  },
  mounted () {
    this.flatterMenuObj = Object.create(null)
    this.flatterMenu(this.menusData)
  }
}
</script>
<style lang="scss">
  .el-menu {
    height: 100%;
  }
</style>
