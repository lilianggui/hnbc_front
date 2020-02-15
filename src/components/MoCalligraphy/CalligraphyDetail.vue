<template>
    <div id="calligraphy-detail">
      <div class="p-detail-title">
        <div style="font-weight: bold">
          {{calligraphy.title}}
        </div>
        <div style="font-size: 12px; color: #555555; margin-top: 10px; height: 60px; overflow-y: auto">
          简介：{{calligraphy.description}}
        </div>
      </div>
      <div class="p-detail-content">
        <calligraphy-imag-li v-for="item in calligraphyImagLi" :key="item.id" :calligraphyImag="item" @click.native="viewerImg"></calligraphy-imag-li>
      </div>
    </div>
</template>

<script>
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'
import CalligraphyImagLi from '@/components/MoCalligraphy/CalligraphyImagLi'
export default {
  name: 'CalligraphyDetail',
  components: {
    CalligraphyImagLi,
    Viewer
  },
  data () {
    return {
      calligraphyImagLi: [],
      calligraphy: {}
    }
  },
  created () {
    let query = this.$route.query
    this.id = query.id
    this.queryImageList()
    this.queryCalligraphy()
  },
  methods: {
    queryCalligraphy () {
      let that = this
      this.callAjax('/listCalligraphy', {id: this.id}, 'GET', function (res) {
        that.calligraphy = res.data.list[0]
      })
    },
    queryImageList () {
      let that = this
      this.callAjax('/getSystemFileList', {businessId: this.id, module: this.DICT().SYSTEM_FILE_MODULE_KV.CALLIGRAPHY_IMG}, 'GET', function (res) {
        that.calligraphyImagLi = res.data
      })
    },
    viewerImg () {
      // $('#calligraphy-detail').viewer()
      const ViewerDom = document.getElementById('calligraphy-detail')
      // eslint-disable-next-line no-new
      new Viewer(ViewerDom, {
        // 相关配置项,详情见下面
        initialViewIndex: 0
      })
    }
  }
}
</script>

<style scoped>
  .p-detail-title{
    text-align: left;
    margin-bottom: 15px;
    margin-right: 15px;
    height: 100px;
    border-bottom: #cccccc solid 1px;
  }
  .p-detail-content{
    /*background-color: white;*/
  }
  #calligraphy-detail{
    width: 1020px;
    min-height: 800px;
    background-color: #f7f8f9;
    display: inline-block;
    margin-bottom: 20px;
    padding: 10px 0 0 15px;
  }
</style>
