<template>
    <div id="bg-short-video">
      <div class="table-headline">
        <manage-title>短视频管理</manage-title>
        <el-form :inline="true" :model="queryFormData" class="query-form" size="mini">
          <el-form-item label="标题">
            <el-input v-model="queryFormData.title" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="queryFormData.videoType">
              <el-option
                v-for="item in shortVideoTypeDict"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleQuery">查询</el-button>
            <el-button type="primary" plain @click="handleReset">重置</el-button>
          </el-form-item>
        </el-form>
        <table-btn>
          <el-button type="primary" size="mini" @click="handleAdd">新增</el-button>
          <el-button type="primary" size="mini" @click="handleUpdate">修改</el-button>
          <el-button type="danger" size="mini" @click="handleDelete">删除</el-button>
          <el-button type="primary" size="mini" plain @click="toDetail">详情</el-button>
        </table-btn>
      </div>
      <el-table
        :data="tableData"
        @current-change="handleCurrentChange"
        highlight-current-row
        height="600"
        border
        style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="videoType"
          label="类型"
          :formatter="formatVideoType">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createBy"
          label="创建人">
        </el-table-column>
      </el-table>
      <div style="background-color: white">
        <el-pagination v-show="total > 0"
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="changePage">
        </el-pagination>
      </div>
      <el-dialog :title="addFormTitle" :visible.sync="addFormVisible" width="40%">
        <el-form :model="addForm" size="mini" :rules="rules" ref="manageForm" :disabled="addFormTitle==='短视频详情'">
          <el-form-item label="标题" label-width="80px" prop="title">
            <el-input v-model="addForm.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型" label-width="80px" prop="videoType">
            <el-select v-model="addForm.videoType" autocomplete="off">
              <el-option
                v-for="item in shortVideoTypeDict"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述" label-width="80px" prop="description">
            <el-input type="textarea" :rows="3" v-model="addForm.description" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="视频文件" label-width="80px">
            <el-upload
              class="upload-demo"
              :action="getIpHost() + '/upload'"
              :on-remove="handleVideoFileRemove"
              :before-upload="beforeVideoFileUpload"
              :file-list="videoFileList"
              :multiple="false"
              :limit="1"
              :on-success="handleVideoFileSuccess"
              :data="uploadVideoFileParam"
              ref="videoFileUpload"
              v-if="addFormVisible"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传mp4文件，且不超过100M</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="封面" label-width="80px">
            <el-upload style="border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden; width: 278px; height: 178px"
              class="cover-uploader"
              :action="getIpHost() + '/upload'"
              :show-file-list="false"
              :on-success="handleCoverSuccess"
              :before-upload="beforeCoverUpload"
              :data="uploadCoverParam">
              <img v-if="coverImageUrl" :src="coverImageUrl" class="cover" alt="未上传封面">
              <i v-else class="el-icon-plus cover-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addFormVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="addOrUpdate" size="mini">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'BgShortVideo',
  data () {
    return {
      tableData: [],
      queryFormData: {
      },
      addForm: this.initAddForm(),
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 1, max: 1000, message: '长度在 1 到 1000 个字符之间', trigger: 'blur' }
        ],
        videoType: [
          { required: true, message: '请选择种类', trigger: 'change' }
        ],
        description: [
          { min: 1, max: 1024, message: '长度在 1 到 1024 个字符之间', trigger: 'blur' }
        ]
      },
      addFormVisible: false,
      addFormTitle: '新增短视频',
      shortVideoTypeDict: this.DICT().SHORT_VIDEO_TYPE,
      total: 0,
      pages: 0,
      currentRow: {},
      coverImageUrl: '',
      uploadCoverParam: {
        module: '21',
        moduleName: this.getDictLabel('SYSTEM_FILE_MODULE', '21')
      },
      uploadVideoFileParam: {
        module: '2',
        moduleName: this.getDictLabel('SYSTEM_FILE_MODULE', '2')
      },
      videoFileList: [],
      interfaces: {
        add: '/addShortVideo',
        list: '/listShortVideo',
        update: '/updateShortVideo',
        delete: '/deleteShortVideo'
      }
    }
  },
  created () {
    this.queryTableData()
  },
  methods: {
    handleCoverSuccess (res, file) {
      if (res.code === 0) {
        this.coverImageUrl = URL.createObjectURL(file.raw)
        this.addForm.coverImgId = res.data.id
        this.addForm.coverImgPath = res.data.filePath
      } else {
        this.$message({message: '未知错误', type: 'error'})
      }
    },
    handleVideoFileSuccess (res, file) {
      if (res.code === 0) {
        this.addForm.videoFileId = res.data.id
        this.addForm.videoFilePath = res.data.filePath
      } else {
        this.$message({message: '未知错误', type: 'error'})
      }
    },
    beforeCoverUpload (file) {
      const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG、JPEG、PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleVideoFileRemove () {
    },
    beforeVideoFileUpload (file) {
      const fileTypeOk = (file.type === 'video/mp4')
      const fileSizeOk = file.size / 1024 / 1024 < 100
      if (!fileTypeOk) {
        this.$message.error('上传文件只能是 mp4 格式!')
      }
      if (!fileSizeOk) {
        this.$message.error('上传文件大小不能超过 100MB!')
      }
      return fileTypeOk && fileSizeOk
    },
    formatVideoType (row, column, cellValue) {
      return this.getDictLabel('SHORT_VIDEO_TYPE', cellValue)
    },
    initAddForm () {
      return {
        id: '',
        title: '',
        videoType: '',
        description: '',
        coverImgId: '',
        coverImgPath: '',
        videoFileId: '',
        videoFilePath: ''
      }
    },
    queryTableData () {
      let that = this
      this.callAjax(this.interfaces.list, this.queryFormData, 'GET', function (res) {
        that.total = parseInt(res.data.total)
        that.pages = parseInt(res.data.pages)
        that.tableData = res.data.list
      })
    },
    handleQuery () {
      this.queryTableData()
    },
    handleReset () {
      this.queryFormData = {}
    },
    handleAdd () {
      this.addForm = this.initAddForm()
      this.videoFileList = []
      this.coverImageUrl = ''
      this.addFormVisible = true
      this.addFormTitle = '新增短视频'
    },
    handleUpdate () {
      if (!this.currentRow.id) {
        this.$message({
          message: '请选择一条记录！',
          type: 'warning'
        })
        return
      }
      debugger
      this.addFormTitle = '修改短视频'
      this.addForm = this.shallowCopy(this.currentRow)
      this.coverImageUrl = this.getIpHost() + '/getPicture?filePath=' + this.addForm.coverImgPath
      if (this.addForm.videoFilePath) {
        this.videoFileList[0] = {name: this.addForm.videoFileOriginName, url: this.videoSrc(this.addForm.videoFilePath)}
      }
      this.addFormVisible = true
    },
    toDetail () {
      this.handleUpdate()
      this.addFormTitle = '短视频详情'
    },
    handleDelete () {
      if (!this.currentRow.id) {
        this.$message({
          message: '请选择一条记录！',
          type: 'warning'
        })
        return
      }
      let that = this
      let param = {
        id: this.currentRow.id
      }
      this.$confirm('此操作将永久删除该问题, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.callAjax(that.interfaces.delete, param, 'POST', function (res) {
          that.queryTableData()
          that.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        // 取消
      })
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    changePage (currentPage) {
      if (currentPage > this.pages) {
        return
      }
      this.queryFormData.pageNum = currentPage
      this.queryTableData()
    },
    addOrUpdate () {
      let that = this
      let isValid = true
      this.$refs['manageForm'].validate((valid) => {
        isValid = valid
      })
      if (!isValid) {
        that.$message({
          type: 'error',
          message: '请按要求填写各项'
        })
        return false
      }
      let [url, message] = ''
      if (this.addForm.id) {
        // 修改
        url = this.interfaces.update
        message = '修改成功！'
      } else {
        url = this.interfaces.add
        message = '新增成功！'
      }
      this.callAjax(url, this.addForm, 'POST', function (res) {
        that.queryTableData()
        that.$message({
          type: 'success',
          message: message
        })
        that.addFormVisible = false
      })
    }
  }
}
</script>

<style scoped>
  .cover-uploader .el-upload {
  }
  .cover-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .cover-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 278px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .cover {
    width: 278px;
    height: 178px;
    display: block;
  }
</style>
