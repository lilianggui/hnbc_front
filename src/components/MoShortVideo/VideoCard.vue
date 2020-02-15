<template>
  <div id="video-card">
    <img class="video-cover-img" :src="imageSrc(video.coverImgPath)">
    <div class="title">{{video.title}}</div>
  </div>
</template>

<script>
export default {
  name: 'VideoCard',
  props: ['video']
}
</script>

<style scoped>
  #video-card{
    margin-right: 15px;
    margin-bottom: 20px;
    width: 240px;
    float: left;
    cursor: pointer;
  }
  .video-cover-img{
    width: 240px;
    height: 150px;
  }
  .title{
    font-weight: bold;
  }
</style>
