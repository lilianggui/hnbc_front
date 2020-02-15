<template>
    <div id="bg-qa">
      <div class="table-headline">
        <manage-title>问答管理</manage-title>
        <el-form :inline="true" :model="queryFormData" class="query-form" size="mini">
          <el-form-item label="标题">
            <el-input v-model="queryFormData.title" placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item label="创建人">
            <el-input v-model="queryFormData.createBy" placeholder="创建人"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleQuery">查询</el-button>
            <el-button type="primary" plain @click="handleReset">重置</el-button>
          </el-form-item>
        </el-form>
        <table-btn>
          <el-button type="primary" size="mini" @click="handleAddQuestionAnswer">新增</el-button>
          <el-button type="primary" size="mini" @click="handleUpdateQuestionAnswer">修改</el-button>
          <el-button type="danger" size="mini" @click="handleDeleteQuestionAnswer">删除</el-button>
        </table-btn>
      </div>
      <el-table
        ref="questionTable"
        :data="questionList"
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
          prop="createTime"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
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
      <el-dialog title="新增问答" :visible.sync="addFormVisible" width="40%">
        <el-form :model="addForm" size="mini" :rules="rules" ref="questManageForm">
          <el-form-item label="问题" label-width="80px" prop="title">
            <el-input type="textarea" :rows="2" v-model="addForm.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="选项A" label-width="80px" prop="optionA">
            <el-input v-model="addForm.optionA" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="选项B" label-width="80px" prop="optionB">
            <el-input v-model="addForm.optionB" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="选项C" label-width="80px" prop="optionC">
            <el-input v-model="addForm.optionC" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="选项D" label-width="80px" prop="optionD">
            <el-input v-model="addForm.optionD" autocomplete="off"></el-input>
          </el-form-item>
            <el-form-item label="正确答案" label-width="80px" prop="answer">
            <el-select v-model="addForm.answer" autocomplete="off">
              <el-option
                v-for="item in answerOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="解释" label-width="80px" prop="questExplain">
            <el-input type="textarea" :rows="3" v-model="addForm.questExplain" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addFormVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="addOrUpdateQuestionAnswer" size="mini">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'BgQuestionsAnswers',
  data () {
    return {
      questionList: [],
      queryFormData: {
      },
      addForm: this.initAddForm(),
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 1, max: 1000, message: '长度在 1 到 1000 个字符之间', trigger: 'blur' }
        ],
        optionA: [
          { required: true, message: '请输入选项A', trigger: 'blur' },
          { min: 1, max: 1000, message: '长度在 1 到 1000 个字符之间', trigger: 'blur' }
        ],
        optionB: [
          { required: true, message: '请输入选项B', trigger: 'blur' },
          { min: 1, max: 1000, message: '长度在 1 到 1000 个字符之间', trigger: 'blur' }
        ],
        optionC: [
          { required: true, message: '请输入选项C', trigger: 'blur' },
          { min: 1, max: 1000, message: '长度在 1 到 1000 个字符之间', trigger: 'blur' }
        ],
        optionD: [
          { required: true, message: '请输入选项D', trigger: 'blur' },
          { min: 1, max: 1000, message: '长度在 1 到 1000 个字符之间', trigger: 'blur' }
        ],
        answer: [
          { required: true, message: '请选择正确答案', trigger: 'change' }
        ],
        questExplain: [
          { min: 1, max: 1000, message: '长度在 1 到 1000 个字符之间', trigger: 'blur' }
        ]
      },
      addFormVisible: false,
      answerOptions: [
        {label: 'A', value: 'A'},
        {label: 'B', value: 'B'},
        {label: 'C', value: 'C'},
        {label: 'D', value: 'D'}
      ],
      total: 0,
      pages: 0,
      currentRow: {}
    }
  },
  created () {
    this.queryQuestion()
  },
  methods: {
    initAddForm () {
      return {
        id: '',
        title: '',
        answer: '',
        questExplain: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: ''
      }
    },
    queryQuestion () {
      let that = this
      this.callAjax('/listQuestion', this.queryFormData, 'GET', function (res) {
        that.total = parseInt(res.data.total)
        that.pages = parseInt(res.data.pages)
        that.questionList = res.data.list
      })
    },
    handleQuery () {
      this.queryQuestion()
    },
    handleReset () {
      this.queryFormData = {}
    },
    handleAddQuestionAnswer () {
      this.addForm = this.initAddForm()
      this.addFormVisible = true
    },
    handleUpdateQuestionAnswer () {
      if (!this.currentRow.id) {
        this.$message({
          message: '请选择一条记录！',
          type: 'warning'
        })
        return
      }
      this.addForm = this.shallowCopy(this.currentRow)
      this.addFormVisible = true
    },
    handleDeleteQuestionAnswer () {
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
        this.callAjax('/deleteQuestion', param, 'POST', function (res) {
          that.queryQuestion()
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
      this.queryQuestion()
    },
    addOrUpdateQuestionAnswer () {
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
        url = '/updateQuestion'
        message = '修改成功！'
      } else {
        url = '/addQuestion'
        message = '新增成功！'
      }
      this.callAjax(url, this.addForm, 'POST', function (res) {
        that.queryQuestion()
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

</style>
