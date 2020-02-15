<template>
    <div id="home-page">
      <router-link v-for="item in moduleCards" :to='item.path'  :key="item.title">
        <module-card :title="item.title" :bg-color="item.bgColor"></module-card>
      </router-link>
    </div>
</template>

<script>
import ModuleCard from '@/components/ModuleCard'
export default {
  name: 'HomePage',
  data () {
    return {
      //  背景图 待优化 //todo
      moduleCards: [
        {title: '问答', path: '/questionsAnswers', bgColor: '#FFC0CB'},
        {title: '书法', path: '/calligraphyIndex', bgColor: 'RGB(135,206,235)'},
        {title: '短视频', path: '/shortVideo', bgColor: 'RGB(220,0,255)'},
        {title: '经验', path: '/questionsAnswers', bgColor: 'RGB(255,0,255)'},
        {title: '诗词', path: '/questionsAnswers', bgColor: 'RGB(123,104,238)'},
        {title: '成语', path: '/questionsAnswers', bgColor: 'RGB(106,90,205)'},
        {title: '歇后语', path: '/questionsAnswers', bgColor: 'RGB(95,158,160)'},
        {title: '名将榜', path: '/questionsAnswers', bgColor: 'RGB(0,191,255)'},
        {title: '名句', path: '/questionsAnswers', bgColor: 'RGB(220,20,60)'},
        {title: '名', path: '/questionsAnswers', bgColor: 'RGB(220,20,60)'}
      ]
    }
  },
  components: {
    ModuleCard
  }
}
</script>

<style scoped>
  #home-page{
    width: 1200px;
    display: inline-block;
  }
</style>
