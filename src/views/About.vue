<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{amount}} <button @click="amount++">ADD</button>
  </div>
</template>
<script>
  export default {
    name: 'about',
    data () {
      return {
        amount: 1
      }
    }
  }
</script>
