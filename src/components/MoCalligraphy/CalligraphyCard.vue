<template>
    <div id="calligraphy-card">
      <img class="calligraphy-main-img" :src="getIpHost() + '/getPicture?filePath=' + calligraphy.coverImgPath">
      <div class="title">{{calligraphy.title}}</div>
      <div class="author-dynasty">作者：{{calligraphy.author}}&nbsp;&nbsp;&nbsp;朝代：{{calligraphy.dynasty}}</div>
    </div>
</template>

<script>
export default {
  name: 'CalligraphyCard',
  props: ['calligraphy']
}
</script>

<style scoped>
  #calligraphy-card{
    /*background-color: #2c4e60;*/
    margin-right: 15px;
    margin-bottom: 20px;
    width: 240px;
    float: left;
    cursor: pointer;
  }
  .calligraphy-main-img{
    width: 240px;
    height: 150px;
  }
  .title{
    font-weight: bold;
  }
  .author-dynasty{
    font-size: 12px;
    color: #555;
  }
</style>
