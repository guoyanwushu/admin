<template>
  <div class="home">
    home page
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  created () {
    console.log('Lifecycle is runing');
  }
}
</script>
