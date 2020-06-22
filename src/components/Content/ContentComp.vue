<template>
  <div class="content-wrapper">
    <iframe src="" frameborder="0" v-for="page in pages" :src="page.url" height="100%" :key="page.id" width="100%" v-show="page.id == activePageId"></iframe>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activePageId: ''
    }
  },
  props: {
    pages: Array
  },
  methods: {
    addPage (page) {
      let _page = this.pages.find(item => item.id === page.id)
      !_page ? this.pages.push(page) : ''
      this.activePageId = page.id
    }
  }
}
</script>
<style lang="scss" scoped>
  .content-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
