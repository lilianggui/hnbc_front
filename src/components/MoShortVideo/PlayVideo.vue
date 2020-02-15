<template>
  <div id="video-div">
    <div class="video-title">{{video.title}}</div>
    <div class="video-description">简介：{{video.description}}</div>
    <div>
      <video id="my-video" controls v-if="video.videoFilePath">
        <source :src="videoSrc(video.videoFilePath)" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayVideo',
  data () {
    return {
      videoId: 0,
      video: {}
    }
  },
  created () {
    this.videoId = this.$route.query.id
    this.getVideoById(this.videoId)
  },
  methods: {
    getVideoById (videoId) {
      let that = this
      this.callAjax('/listShortVideo', {id: videoId}, 'GET', function (res) {
        that.video = res.data.list[0]
      })
    }
  }
}
</script>

<style scoped>
  .video-title{
    text-align: left;
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 10px;
  }
  .video-description{
    text-align: left;
    font-size: 14px;
    margin-bottom: 10px;
  }
  #video-div{
    display: inline-block;
  }
  #my-video{
    width: 800px;
    height: 500px;
    background-color: black;
  }
</style>
