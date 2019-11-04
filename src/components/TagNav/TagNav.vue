<template>
  <div class="tag-wrapper">
    <tag-nav-item
      v-for="tag in visitedViews"
      :class="[tag.isActive?'active':'']"
      :tag="tag"
      @contextmenu.prevent.native="openMenu(tag, $event)"
      ref="tag"
    ></tag-nav-item>
    <ul
      v-show="showTextMenu"
      class="text-menu"
      :style="{left: left+'px', top: top+'px'}"
      @mouseleave="showTextMenu=false"
    >
      <li @click="refreshTag()">refresh</li>
      <li @click="closeNowTag()">close now</li>
      <li @click="closeOtherTag()">cloae others</li>
      <li @click="closeAllTag()">close all</li>
    </ul>
  </div>
</template>
<script>
  /**
   * 标签导航应该是一个全局维护的对象， 包含以下几个属性: 当前打开的导航列表数组， 上一次打开的导航(方便关闭之后回退), 来源可能来自于左边的导航栏，或者页面里面的一些业务逻辑
   */
  import TagNavItem from './TagNavItem'

  export default {
    data() {
      return {
        showTextMenu: false,
        left: 0,
        top: 0,
        selectTag: {}
      }
    },
    props: {
      navs: Array
    },
    computed: {
      visitedViews() {
        return this.$store.state.tagView.visitedViews
      }
    },
    methods: {
      openMenu(tag, event) {
        this.showTextMenu = true
        const minMenuWidth = 150
        const offsetLeft = this.$el.getBoundingClientRect().left
        const offsetWidth = this.$el.offsetWidth
        const maxLeft = offsetWidth - minMenuWidth
        const left = event.clientX - offsetLeft
        if (left > maxLeft) {
          this.left = maxLeft
        } else {
          this.left = left
        }
        this.top = 40
        this.selectTag = tag
      },
      refreshTag() {
        this.$store.dispatch('tagView/delCachedView', this.selectTag)
        this.$nextTick(function () {
          this.$router.replace({
            path: '/redirect',
            query: {
              t: Date.now()
            }
          })
        })
        this.showTextMenu = false
      }
    },
    components: {
      TagNavItem
    }
  }
</script>
<style lang="scss" scoped>
  .tag-wrapper {
    width: 100%;
    position: relative;
    padding: 0 15px;
    height: 40px;
    border-bottom: 1px solid #ccc;
  }

  .text-menu {
    color: #666;
    position: absolute;
    top: 40px;
    background-color: #fff;
    width: 180px;
    border: 1px solid #e5e5e5;
    li {
      line-height: 40px;
      cursor: pointer;
      padding: 0 12px;
      font-size: 14px;
      &:not(:last-child) {
        border-bottom: 1px solid #e6e6e6;
      }
      &:hover {
        background-color: #e0f9eb;
      }
    }
  }
</style>
