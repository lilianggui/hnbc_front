<template>
  <div id="app">
    <heading></heading>
    <router-view/>
  </div>
</template>

<script>
import Heading from '@/components/Heading'
export default {
  name: 'App',
  components: {
    Heading
  },
  watch: {
    $route (to, from) {
      if (to.path === '/bg') {
        this.$router.push({path: '/bg/bgIndex'})
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
