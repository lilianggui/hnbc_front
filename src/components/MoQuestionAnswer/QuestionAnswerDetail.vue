<template>
    <div id="qa-detail">
      <div class="title">{{question.title}}</div>
      <div>
        <el-radio v-model="answer" label="A" class="answer">A {{question.optionA}}</el-radio>
        <el-radio v-model="answer" label="B" class="answer">B {{question.optionB}}</el-radio>
        <el-radio v-model="answer" label="C" class="answer">C {{question.optionC}}</el-radio>
        <el-radio v-model="answer" label="D" class="answer">D {{question.optionD}}</el-radio>
      </div>
      <div style="margin-top: 20px">
        <el-button size="mini" type="info" plain @click="preQuestion">上一题</el-button>
        <el-button size="mini" type="primary" plain @click="submitAnswer">提交答案</el-button>
        <el-button size="mini" type="primary" plain @click="nextQuestion">下一题</el-button>
        <el-button size="mini" type="info" plain @click="returnQAList">返 回</el-button>
      </div>
      <el-dialog
        title="结果"
        :visible.sync="dialogVisible"
        width="30%">
          <div id="result-div" :class="resultClass">
            {{result}}
          </div>
          <div>
            正确答案为：{{question.answer}}
          </div>
          <div>
            解释：{{question.questExplain ? question.questExplain : '暂无'}}
          </div>
          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="mini" >取 消</el-button>
          <el-button type="primary" @click="nextQuestion" size="mini" >下一题</el-button>
        </span>
      </el-dialog>

    </div>
</template>

<script>
export default {
  name: 'QuestionAnswerDetail',
  data () {
    return {
      question: {},
      dialogVisible: false,
      answer: '',
      result: '',
      resultClass: '',
      questionIdSequence: []
    }
  },
  created () {
    let id = this.$route.query.id
    this.queryQuestion({id: id})
  },
  methods: {
    initStatus () {
      this.answer = ''
      this.dialogVisible = false
    },
    preQuestion () {
      if (this.questionIdSequence.length === 0) {
        this.$message({
          message: '没有上一题',
          type: 'warning'
        })
        return
      }
      let preId = this.questionIdSequence.pop()
      this.queryQuestion({id: preId})
    },
    nextQuestion () {
      this.initStatus()
      this.questionIdSequence.push(this.question.id)
      this.queryQuestion({queryType: 'random'})
    },
    queryQuestion (param) {
      let that = this
      this.callAjax('/listQuestion', param, 'GET', function (res) {
        that.question = res.data.list[0]
      })
    },
    submitAnswer () {
      if (!this.answer) {
        this.$message({
          message: '请选择你的答案',
          type: 'warning'
        })
        return
      }
      if (this.answer === this.question.answer) {
        this.result = '恭喜你，答对了！'
        this.resultClass = 'result-right'
      } else {
        this.result = '很可惜，答错了！'
        this.resultClass = 'result-wrong'
      }
      this.dialogVisible = true
    },
    returnQAList () {
      this.$router.push({path: '/questionsAnswers'})
    }
  }
}
</script>

<style scoped>
  .result-right{
    color: #008B00;
  }
  .result-wrong{
    color: #FF3030;
  }
  #result-div{
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 20px
  }
  .answer{
    display: block;
    line-height: 30px;
    font-size: 20px;
  }
  .title{
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 10px;
  }
  #qa-detail{
    width: 600px;
    display: inline-block;
    text-align: left;
  }
</style>
