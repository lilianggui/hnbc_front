<template>
  <div id="questions-answers">
    <router-link v-for="item in questionList" :key="item.id"
                 :to="{path: '/questionAnswerDetail', query: {id: item.id}}">
      <question-answer-li :heading="item.title"/>
    </router-link>
    <div id="page-div">
      <el-pagination v-show="total > 0"
                     background
                     layout="prev, pager, next"
                     :total="total"
                     :page-size="pageSize"
                     @current-change="changePage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import QuestionAnswerLi from '@/components/MoQuestionAnswer/QuestionAnswerLi'
export default {
  name: 'QuestionsAnswers',
  components: {
    QuestionAnswerLi
  },
  data () {
    return {
      questionList: [],
      pages: 0,
      total: 0,
      pageSize: 15,
      queryFormData: {
      }
    }
  },
  created () {
    this.queryFormData.pageSize = this.pageSize
    this.queryQuestion()
  },
  methods: {
    changePage (currentPage) {
      this.queryFormData.pageNum = currentPage
      this.queryQuestion()
    },
    queryQuestion () {
      let that = this
      this.callAjax('/listQuestion', this.queryFormData, 'GET', function (res) {
        that.total = parseInt(res.data.total)
        that.pages = parseInt(res.data.pages)
        that.questionList = res.data.list
      })
    }
  }
}
</script>

<style scoped>
  #page-div{
    position: absolute;
    top: 800px;
  }
  #questions-answers{
    width: 800px;
    min-height: 800px;
    /*border: solid 1px #42b983;*/
    background-color: #f5f6f7;
    display: inline-block;
    margin-bottom: 20px;
  }
  a{
    text-decoration:none;
  }
</style>
