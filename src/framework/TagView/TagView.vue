<template>
  <div ref="tagviewContainer" class="tagview-container" :class="isScroll?'scrolling':''" @resize="checkScroll">
    <span @click="transLeft" v-if="isScroll" class="trans-icon trans-left"><i class="iconfont icon-xiazai6"></i></span>
    <div class="tags-container" ref="tags">
      <li
        v-for="tag in tags"
        @click="handleClick(tag)"
        @contextmenu="showContextMenu(tag, $event)"
        :class="[tag[tagValueField] == activeTagId?tagActiveClassName:'', 'tag-item']"
        :id="'_tag_'+tag[tagValueField]">
        <slot v-bind:tag="tag">{{tag[tagTextField]}}</slot>
      </li>
    </div>
    <span @click="transRight" v-if="isScroll" class="trans-icon trans-right"><i class="iconfont icon-jiantou"></i></span>
  </div>
</template>
<script>
import ContextMenu from './ContextMenu'
import Vue from 'vue'
export default {
  data () {
    return {
      isScroll: false,
      transDis: 0,           // 整个tags容器水平位移的距离
      activeTagId: this.defaultActiveTagId,
      optionTag: null
    }
  },
  props: {
    tags: {
      type: Array,
      default: []
    },
    transStepDis: {
      type: Number,
      default: 125
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
    const ContextMenuConstructor = Vue.extend(ContextMenu)
    if (!this.contextMenuInstance) {
      this.contextMenuInstance = new ContextMenuConstructor({
        el: document.createElement('div')
      })
    }
    this.contextMenuInstance.tagRef = this;
    this.$on('closeTag', function (type) {
      this.deleteView(this.optionTag[this.tagValueField], type);
      this.contextMenuInstance.$el.style.display = 'none'
    })
   },
  methods: {
    showContextMenu (tag, event) {
      this.optionTag = tag
      event.preventDefault();
      const tagDom = document.getElementById(`_tag_${tag[this.tagValueField]}`)
      if (tagDom) {
        const rect = tagDom.getBoundingClientRect();
        if (document.body.offsetWidth - rect.left > 220) {
          this.contextMenuInstance.$el.style.left = rect.left + 'px'
        } else {
          this.contextMenuInstance.$el.style.left = document.body.offsetWidth - 225 + 'px'
        }
        this.contextMenuInstance.$el.style.top = rect.top + 40 + 'px'
        this.contextMenuInstance.$el.style.display = 'block'
        document.body.appendChild(this.contextMenuInstance.$el);
      }
    },
    transLeft () {
      // TODO 处理左箭头点击， 实际是向右移动
      if (this.transDis + this.transStepDis >= 0) {
        this.transDis = 0
      } else {
        this.transDis += this.transStepDis
      }
    },
    transRight () {
      // TODO 处理右箭头点击, 实际是向左移动
      const {tagsWidth, containerWidth} = this.getDistanceInfo();
      if (Math.abs(this.transDis - this.transStepDis) + containerWidth>= tagsWidth) {
        this.transDis = containerWidth - tagsWidth
      } else {
        this.transDis -= this.transStepDis
      }
    },
    handleClick (tag) {
      this.activeTagId = tag[this.tagValueField];
      this.checkVisualStatus(tag[this.tagValueField])
      this.$emit('tagActive', tag)
    },
    getDistanceInfo () {
      return {
        tagsWidth: this.$refs.tags.offsetWidth,
        containerWidth: this.$refs.tagviewContainer.offsetWidth - (this.isScroll?34:0)
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
    // 增删改放到内部的原因是，如果tags数据完全依赖外部传进来，去感知tags具体新增了哪个，删除了哪个，重新选了哪个，都要和上一状态进行对比。而且当前选中项不仅外部可以变更，tagViews里面的方法也是
    // 可以变更的,
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
    },
    // 根据value字段删除对应的tagView,
    deleteView (tagValue, type) {
      const deleteIndex = this.tags.findIndex(item => item[this.tagValueField] === tagValue)
      const deleteView = deleteIndex > -1 ?this.tags[deleteIndex]:null
      if (!deleteView) return
      switch (type) {
        case 'other': {
          this.tags = [deleteView]
          this.activeTagId = deleteView[this.tagValueField]
        };break;
        case 'all': {
          this.tags = []
          this.activeTagId = -1
        };break;
        case 'left': {
          if (deleteIndex > 0) {
            this.tags.splice(0, deleteIndex)
          }
        };break;
        case 'right': {
          if (deleteIndex < this.tags.length -1) {
            this.tags.splice(deleteIndex + 1, this.tags.length - 1 - deleteIndex)
          }
        };break;
        case 'now':
        default: {
          this.tags.splice(deleteIndex, 1);
          if (deleteIndex === 0 && this.tags.length) {
            this.activeTagId = this.tags[0][this.tagValueField]
          }
          if (this.tags.length > 1 && deleteIndex !== 0) {
            this.activeTagId = this.tags[deleteIndex-1][this.tagValueField]
          }
          if (!this.tags.length) {
            this.activeTagId = -1
          }
        }
      }
      this.checkVisualStatus(this.activeTagId)
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
    height: 36px;
    width: 100%;
    overflow: hidden;
    background-color: #e2e2e2ff;
    padding: 3px 0;
    position: relative;
    box-sizing: border-box;
  }
  .trans-icon {
    position: absolute;
    top: 0;
    height: 100%;
    width: 15px;
    background-color: #ebebeb;
    cursor: pointer;
    z-index: 10;
    display: flex;
    align-items: center;
  }
  .trans-left {
    left: 0;
  }
  .trans-right {
    right: 0;
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
  .scrolling {
    padding-left: 17px;
    padding-right: 17px;
  }
</style>
