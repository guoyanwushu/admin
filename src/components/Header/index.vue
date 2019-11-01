<template>
  <el-row class="wrapper">
    <el-col :span="12">
      <span class="logo-icon"></span>
      <p class="system-title">后台管理系统</p>
    </el-col>
    <el-col :span="12">
    </el-col>
  </el-row>
</template>
<script>
  export default {
    name: 'VHeader'
  }
</script>
<style lang="scss">
  .wrapper {
    height: 100%;
    background: #1890ff url(./header_right.png) no-repeat right
  }
  .system-title {
    float: left;
    height: 60px;
    line-height: 60px;
    color: #e7eff6;
    font-size: 24px;
  }
  .logo-icon {
    margin: 10px 0 0 5px;
    float: left;
    width: 45px;
    height: 45px;
    background: url(./logo_dark.png) no-repeat;
  }
</style>
