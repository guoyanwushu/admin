<template>
  <div ref="tagviewContainer" class="tagview-container">
    <span @click="transLeft" v-if="isScroll" class="trans-left"> < </span>
    <div class="tags-container" ref="tags">
      <li
        v-for="tag in tags"
        @click="handleClick(tag)"
        :class="[tag[tagValueField] == activeTagId?tagActiveClassName:'', 'tag-item']"
        :id="'_tag_'+tag[tagValueField]">
        <slot v-bind:tag="tag">{{tag[tagTextField]}}</slot>
      </li>
    </div>
    <span @click="transRight" v-if="isScroll" class="trans-right"> > </span>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isScroll: false,
      transDis: 0,           // 整个tags容器水平位移的距离
      activeTagId: this.defaultActiveTagId
    }
  },
  props: {
    tags: {
      type: Array,
      default: []
    },
    transStepDis: {
      type: Number,
      default: 250
    },
    tagActiveClassName: {
      type: String,
      default: '_tag_active_'
    },
    tagValueField: {
      type: String,
      default: 'id'
    },
    tagTextField: {
      type: String,
      default: 'name'
    },
    defaultActiveTagId: {
      type: String
    }
  },
  mounted () {
    // TODO 监听resize事件, 判断是否要显示向左及向右的滚动条
    window.addEventListener('resize', () => {
      this.checkScroll()
    })
  },
  methods: {
    transLeft () {
      // TODO 处理左箭头点击， 实际是向右移动
      if (this.transDis + this.transDis >= 0) {
        this.transDis = 0
      } else {
        this.transDis += this.transDis
      }
    },
    transRight () {
      // TODO 处理右箭头点击, 实际是向左移动
      const {tagsWidth, containerWidth} = this.getDistanceInfo();
      if (Math.abs(this.transDis - this.transStepDis) + containerWidth>= tagsWidth) {
        this.transDis = containerWidth - tagsWidth
      } else {
        this.transDis -= this.transDis
      }
    },
    handleClick (tag) {
      this.activeTagId = tag[this.tagValueField];
      this.checkVisualStatus(tag[this.tagValueField])
      this.$emit('tagActive', tag)
    },
    handleCloseNow () {
      // TODO 处理关闭当前tag
    },
    handleCloseAll () {
      // TODO 处理关闭所有tag
    },
    handleCloseOthers () {
      // TODO 处理关闭其他tag
    },
    handleCloseRight () {
      // TODO 处理关闭右侧tag

    },
    handleCloseLeft () {
      // TODO 处理关闭左侧tag
      this.transDis += this.transStepDis
    },
    getDistanceInfo () {
      return {
        tagsWidth: this.$refs.tags.offsetWidth,
        containerWidth: this.$refs.tagviewContainer.offsetWidth
      }
    },
    checkScroll () {
      const {tagsWidth, containerWidth} = this.getDistanceInfo();
      this.isScroll =  tagsWidth > containerWidth
    },
    checkVisualStatus (tagId) {
      const tagNow = document.getElementById(`_tag_${tagId}`);
      const {containerWidth} = this.getDistanceInfo();
      if (tagNow.offsetLeft + this.transDis < 0) {
        this.transDis = -tagNow.offsetLeft
      }
      if (tagNow.offsetLeft + tagNow.offsetWidth + this.transDis > containerWidth) {
        this.transDis = -(tagNow.offsetLeft - containerWidth + tagNow.offsetWidth)
      }
    },
    addView (view) {
      if (this.tags.find(tag => tag[this.tagValueField] === view[this.tagValueField])) {
        this.activeTagId = view[this.tagValueField]
      } else {
        this.tags.push(view)
        this.activeTagId = view[this.tagValueField]
      }
      this.$nextTick(() => {
        this.checkScroll();
        this.checkVisualStatus(this.activeTagId)
      })
    }
  },
  watch: {
    transDis (newVal, oldVal) {
      if (newVal === oldVal) return
      this.$refs.tags.style.transform = `translate(${newVal}px, 0)`
    }
  }
}
</script>
<style lang="scss" scoped>
  .tagview-container {
    line-height: 30px;
    height: 30px;
    width: 100%;
    overflow: hidden;
    background-color: #e2e2e2ff;
    padding: 3px 0;
    position: relative;
  }
  .trans-left {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 15px;
    background-color: #ccc;
    cursor: pointer;
  }
  .trans-right {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 15px;
    background-color: #ccc;
    cursor: pointer;
  }
  .tags-container {
    transition: all .1s ease;
    white-space: nowrap;
    display: inline-block;
  }
  .tag-item {
    display: inline-block;
    padding: 0 10px;
    background-color: #fff;
    border-radius: 2px;
    color: #666;
    font-size: 14px;
    cursor: pointer;
    & + .tag-item {
      margin-left: 8px;
    }
  }
  ._tag_active_ {
    color: #3172ff;
    border-bottom: 2px solid #2c6cc3;
  }
</style>
