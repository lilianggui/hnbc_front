<template>
  <div class="calligraphy-img-li">
    <img class="calligraphy-img" :src="imageSrc(calligraphyImag.filePath)">
  </div>
</template>

<script>
export default {
  name: 'CalligraphyImagLi',
  props: ['calligraphyImag']
}
</script>

<style scoped>
  .calligraphy-img{
    width: 328px;
    height: 220px;
  }
  .calligraphy-img-li{
    width: 328px;
    margin: 0 10px 5px 0;
    float: left;
  }
</style>
