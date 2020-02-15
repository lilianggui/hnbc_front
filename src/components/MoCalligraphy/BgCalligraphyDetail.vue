<template>
  <div id="bg-calligraphy-detail">
    <div class="detail-head">
      <div class="head-left">
        <div class="detail-title">
          {{detailTitle}}
        </div>
        <div class="description">
          简介：{{calligraphy.description}}
        </div>
      </div>
      <div class="upload-batch">
        <el-upload
          class="upload-demo"
          :action="getIpHost() + '/uploadCalligraphyImgBatch'"
          :before-upload="batchBeforeUpload"
          :on-success="handleBatchSuccess"
          :data="batchUploadParam"
          :multiple="true"
          :limit="10">
          <el-button size="mini" type="primary">批量上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传zip文件，且不超过10M</div>
        </el-upload>
      </div>
    </div>
    <div class="detail-content">
      <el-upload
        :action="getIpHost() + '/upload'"
        list-type="picture-card"
        :before-upload="oneBeforeUpload"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleOneSuccess"
        :before-remove="handleBeforeRemove"
        :file-list="calligraphyImagList"
        :data="oneUploadParam">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BgCalligraphyDetail',
  data () {
    return {
      detailTitle: '',
      id: 0,
      calligraphy: {},
      dialogImageUrl: '',
      dialogVisible: false,
      oneUploadParam: {
        module: this.DICT().SYSTEM_FILE_MODULE_KV.CALLIGRAPHY_IMG,
        moduleName: this.getDictLabel('SYSTEM_FILE_MODULE', this.DICT().SYSTEM_FILE_MODULE_KV.CALLIGRAPHY_IMG)
      },
      batchUploadParam: {
        module: this.DICT().SYSTEM_FILE_MODULE_KV.CALLIGRAPHY_BATCH_ZIP,
        moduleName: this.getDictLabel('SYSTEM_FILE_MODULE', this.DICT().SYSTEM_FILE_MODULE_KV.CALLIGRAPHY_BATCH_ZIP)
      },
      calligraphyImagList: []
    }
  },
  created () {
    let query = this.$route.query
    this.id = query.id
    this.detailTitle = query.title + '详情'
    this.oneUploadParam.businessId = this.id
    this.batchUploadParam.businessId = this.id
    let that = this
    this.callAjax('/listCalligraphy', {id: this.id}, 'GET', function (res) {
      that.calligraphy = res.data.list[0]
    })
    this.queryImgList()
  },
  methods: {
    queryImgList () {
      let that = this
      this.callAjax('/getSystemFileList', {businessId: this.id, module: this.DICT().SYSTEM_FILE_MODULE_KV.CALLIGRAPHY_IMG}, 'GET', function (res) {
        let imgList = res.data
        if (imgList.length > 0) {
          imgList.forEach(function (item) {
            item.name = item.fileOriginName
            item.url = that.getIpHost() + '/getPicture?filePath=' + item.filePath
          })
          that.calligraphyImagList = imgList
        }
      })
    },
    batchBeforeUpload (file) {
      const isFileTypeOk = file.type === 'application/zip'
      const isFileSizeOk = file.size / 1024 / 1024 < 10
      if (!isFileTypeOk) {
        this.$message.error('文件只能上传zip 格式!')
      }
      if (!isFileSizeOk) {
        this.$message.error('文件大小不能超过 10MB!')
      }
      return isFileTypeOk && isFileSizeOk
    },
    oneBeforeUpload (file) {
      const isFileTypeOk = (file.type === 'image/jpeg' || file.type === 'image/png')
      const isFileSizeOk = file.size / 1024 / 1024 < 2
      if (!isFileTypeOk) {
        this.$message.error('图片只能上传jpg、jpeg、png 格式!')
      }
      if (!isFileSizeOk) {
        this.$message.error('图片大小不能超过 2MB!')
      }
      return isFileTypeOk && isFileSizeOk
    },
    handleRemove (file, fileList) {
    },
    handleOneSuccess (response, file, fileList) {
      fileList[fileList.length - 1].id = response.data.id
    },
    handleBatchSuccess (response, file, fileList) {
      if (response.code !== 0) {
        this.$message({message: response.msg, type: 'error'})
        return
      }
      this.queryImgList()
    },
    handleBeforeRemove (file, fileList) {
      let isSuccess = false
      this.callAjax('/deleteSystemFile', {id: file.id}, 'POST', function (res) {
        if (res.code === 0) {
          isSuccess = true
        }
      }, false)
      if (!isSuccess) {
        debugger
        this.$message({message: '未知错误', type: 'error'})
        return false
      }
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }

  }
}
</script>

<style scoped>
  #bg-calligraphy-detail{
    width: 100%;
    min-height: 800px;
    display: inline-block;
    /*margin-bottom: 20px;*/
  }
  .detail-title{
    font-size: 16px;
    font-weight: bold;
  }
  .description{
    font-size: 12px;
    color: #555;
    margin-top: 10px;
    height: 82px;
    overflow-y: auto;
  }
  .upload-batch{
    /*margin-top: 10px;*/
    float: left;
    padding-left: 10px;
    width: 45%;
    height: 112px;
    overflow-y: auto;
  }
  .head-left{
    float: left;
    width: 45%;
    height: 112px;
    border-right: #cccccc solid 1px;
  }
  .detail-head{
    background-color: #ffffff;
    padding: 10px 0 0 10px;
    height: 120px;
  }
  .detail-content{
    margin-top: 5px;
    min-height: 680px;
    background-color: white;
    padding: 5px 0 0 5px;
  }
</style>
