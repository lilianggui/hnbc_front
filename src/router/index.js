import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import QuestionsAnswers from '@/components/MoQuestionAnswer/QuestionsAnswers'
import QuestionAnswerDetail from '@/components/MoQuestionAnswer/QuestionAnswerDetail'
import BgHomePage from '@/components/BgHomePage'
import BgQuestionsAnswers from '@/components/MoQuestionAnswer/BgQuestionsAnswers'
import CalligraphyIndex from '@/components/MoCalligraphy/CalligraphyIndex'
import CalligraphyDetail from '@/components/MoCalligraphy/CalligraphyDetail'
import BgCalligraphy from '@/components/MoCalligraphy/BgCalligraphy'
import BgCalligraphyDetail from '@/components/MoCalligraphy/BgCalligraphyDetail'
import ShortVideo from '@/components/MoShortVideo/ShortVideo'
import PlayVideo from '@/components/MoShortVideo/PlayVideo'
import BgIndex from '@/components/BgIndex'
import BgShortVideo from '@/components/MoShortVideo/BgShortVideo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/questionsAnswers',
      name: 'QuestionsAnswers',
      component: QuestionsAnswers
    },
    {
      path: '/questionAnswerDetail',
      name: 'QuestionAnswerDetail',
      component: QuestionAnswerDetail
    },
    {
      path: '/calligraphyIndex',
      name: 'CalligraphyIndex',
      component: CalligraphyIndex
    },
    {
      path: '/calligraphyDetail',
      name: 'CalligraphyDetail',
      component: CalligraphyDetail
    },
    {
      path: '/shortVideo',
      name: 'ShortVideo',
      component: ShortVideo
    },
    {
      path: '/playVideo',
      name: 'PlayVideo',
      component: PlayVideo
    },
    {
      path: '/bg',
      name: 'BgHomePage',
      component: BgHomePage,
      children: [
        {
          path: 'bgIndex',
          name: 'BgIndex',
          component: BgIndex
        },
        {
          path: 'bgQuestionsAnswers',
          name: 'BgQuestionsAnswers',
          component: BgQuestionsAnswers
        },
        {
          path: 'bgCalligraphy',
          name: 'BgCalligraphy',
          component: BgCalligraphy
        },
        {
          path: 'bgCalligraphyDetail',
          name: 'BgCalligraphyDetail',
          component: BgCalligraphyDetail
        },
        {
          path: 'bgShortVideo',
          name: 'BgShortVideo',
          component: BgShortVideo
        }
      ]
    }
  ]
})
