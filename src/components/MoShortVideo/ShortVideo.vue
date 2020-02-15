<template>
  <div id="video-list-div">
    <video-card v-for="item in videoList" :key="item.id" :video="item"
                      @click.native="goToDetail(item)" ></video-card>
  </div>
</template>

<script>
import VideoCard from '@/components/MoShortVideo/VideoCard'
export default {
  name: 'ShortVideo',
  components: {
    VideoCard
  },
  data () {
    return {
      videoList: [
      ],
      interfaces: {
        list: '/listShortVideo'
      }
    }
  },
  created () {
    this.queryVideoList()
  },
  methods: {
    queryVideoList () {
      let that = this
      this.callAjax(this.interfaces.list, this.queryFormData, 'GET', function (res) {
        that.total = parseInt(res.data.total)
        that.pages = parseInt(res.data.pages)
        that.videoList = res.data.list
      })
    },
    goToDetail (video) {
      this.$router.push({path: '/playVideo', query: {id: video.id}})
    }
  }
}
</script>

<style scoped>
  #video-list-div{
    width: 1020px;
    min-height: 800px;
    background-color: #f6f7f8;
    display: inline-block;
    margin-bottom: 20px;
    padding: 10px 0 0 15px;
  }
</style>
