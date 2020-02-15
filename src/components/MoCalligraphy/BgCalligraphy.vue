<template>
    <div id="bg-calligraphy">
      <div class="table-headline">
        <manage-title>书法管理</manage-title>
        <el-form :inline="true" :model="queryFormData" class="query-form" size="mini">
          <el-form-item label="名称">
            <el-input v-model="queryFormData.title" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item label="种类">
            <el-select v-model="queryFormData.typeface">
              <el-option
                v-for="item in typefaceDict"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作者">
            <el-input v-model="queryFormData.author" placeholder="作者"></el-input>
          </el-form-item>
          <el-form-item label="朝代">
            <el-input v-model="queryFormData.dynasty" placeholder="朝代"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleQuery">查询</el-button>
            <el-button type="primary" plain @click="handleReset">重置</el-button>
          </el-form-item>
        </el-form>
        <table-btn>
          <el-button type="primary" size="mini" @click="handleAddCalligraphy">新增</el-button>
          <el-button type="primary" size="mini" @click="handleUpdateCalligraphy">修改</el-button>
          <el-button type="danger" size="mini" @click="handleDeleteCalligraphy">删除</el-button>
          <el-button type="primary" size="mini" plain @click="toDetail">详情</el-button>
        </table-btn>
      </div>
      <el-table
        :data="calligraphyList"
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
          label="名称">
        </el-table-column>
        <el-table-column
          prop="author"
          label="作者">
        </el-table-column>
        <el-table-column
          prop="dynasty"
          label="朝代">
        </el-table-column>
        <el-table-column
          prop="typeface"
          label="种类"
          :formatter="formatTypeface">
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
        <el-form :model="addForm" size="mini" :rules="rules" ref="questManageForm">
          <el-form-item label="名称" label-width="80px" prop="title">
            <el-input v-model="addForm.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="种类" label-width="80px" prop="typeface">
            <el-select v-model="addForm.typeface" autocomplete="off">
              <el-option
                v-for="item in typefaceDict"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作者" label-width="80px" prop="author">
            <el-input v-model="addForm.author" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="朝代" label-width="80px" prop="dynasty">
            <el-input v-model="addForm.dynasty" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" label-width="80px" prop="description">
            <el-input type="textarea" :rows="3" v-model="addForm.description" autocomplete="off"></el-input>
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
          <el-button type="primary" @click="addOrUpdateCalligraphy" size="mini">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'BgCalligraphy',
  data () {
    return {
      calligraphyList: [],
      queryFormData: {
      },
      addForm: this.initAddForm(),
      addFormTitle: '新增书法',
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 1, max: 1000, message: '长度在 1 到 1000 个字符之间', trigger: 'blur' }
        ],
        typeface: [
          { required: true, message: '请选择种类', trigger: 'change' }
        ],
        author: [
          { required: true, message: '作者', trigger: 'blur' },
          { min: 1, max: 32, message: '长度在 1 到 32 个字符之间', trigger: 'blur' }
        ],
        dynasty: [
          { required: true, message: '请输入朝代', trigger: 'blur' },
          { min: 1, max: 1000, message: '长度在 1 到 8 个字符之间', trigger: 'blur' }
        ],
        description: [
          { min: 1, max: 1024, message: '长度在 1 到 1024 个字符之间', trigger: 'blur' }
        ]
      },
      addFormVisible: false,
      typefaceDict: this.DICT().CALLIGRAPHY_TYPEFACE,
      total: 0,
      pages: 0,
      currentRow: {},
      coverImageUrl: '',
      uploadCoverParam: {
        module: '1',
        moduleName: this.getDictLabel('SYSTEM_FILE_MODULE', '1')
      }
    }
  },
  created () {
    this.queryCalligraphy()
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
    formatTypeface (row, column, cellValue) {
      return this.getDictLabel('CALLIGRAPHY_TYPEFACE', cellValue)
    },
    initAddForm () {
      return {
        id: '',
        title: '',
        author: '',
        dynasty: '',
        description: '',
        typeface: '',
        coverImgId: '',
        coverImgPath: ''
      }
    },
    queryCalligraphy () {
      let that = this
      this.callAjax('/listCalligraphy', this.queryFormData, 'GET', function (res) {
        that.total = parseInt(res.data.total)
        that.pages = parseInt(res.data.pages)
        that.calligraphyList = res.data.list
      })
    },
    handleQuery () {
      this.queryCalligraphy()
    },
    handleReset () {
      this.queryFormData = {}
    },
    handleAddCalligraphy () {
      this.addForm = this.initAddForm()
      this.coverImageUrl = ''
      this.addFormVisible = true
      this.addFormTitle = '新增书法'
    },
    handleUpdateCalligraphy () {
      if (!this.currentRow.id) {
        this.$message({
          message: '请选择一条记录！',
          type: 'warning'
        })
        return
      }
      this.addFormTitle = '修改书法'
      this.addForm = this.shallowCopy(this.currentRow)
      this.coverImageUrl = this.getIpHost() + '/getPicture?filePath=' + this.addForm.coverImgPath
      this.addFormVisible = true
    },
    toDetail () {
      if (!this.currentRow.id) {
        this.$message({
          message: '请选择一条记录！',
          type: 'warning'
        })
        return
      }
      this.$router.push({
        path: '/bg/bgCalligraphyDetail',
        query: {
          id: this.currentRow.id,
          title: this.currentRow.title,
          menuTitle: this.currentRow.title + '详情1',
          menuId: 'calligraphy_detail_' + this.currentRow.id
        }
      })
    },
    handleDeleteCalligraphy () {
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
        this.callAjax('/deleteCalligraphy', param, 'POST', function (res) {
          that.queryCalligraphy()
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
      this.queryCalligraphy()
    },
    addOrUpdateCalligraphy () {
      let that = this
      let isValid = true
      this.$refs['questManageForm'].validate((valid) => {
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
        url = '/updateCalligraphy'
        message = '修改成功！'
      } else {
        url = '/addCalligraphy'
        message = '新增成功！'
      }
      this.callAjax(url, this.addForm, 'POST', function (res) {
        that.queryCalligraphy()
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
