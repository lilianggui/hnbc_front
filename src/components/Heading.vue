<template>
    <div id="heading">
      <div class="logo">
        <router-link to="/"><img src="../../static/img/logo.png" width="80" height="50"></router-link>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Heading'
}
</script>

<style scoped>
  #heading{
    margin-bottom: 10px;
    height: 50px;
    line-height: 50px;
    background: #fff;
    border-bottom: 1px solid;
    border-image: -webkit-linear-gradient( red, blue) 30 30;
    border-image: -moz-linear-gradient( red, blue) 30 30;
    border-image: linear-gradient( red, blue) 30 30;
  }
  .logo{
    width: 100px;
    margin-left: 50px;
  }
</style>
