// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './assets/css/public.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import commonPlugins from './components/common/index'
import commonUtil from './assets/js/utils'
import GLB_DEFINED from './assets/js/commonConst'
import Video from 'video.js'
import 'video.js/dist/video-js.css'

Vue.use(ElementUI)
Vue.use(commonPlugins)
Vue.use(commonUtil)
Vue.use(GLB_DEFINED)

Vue.prototype.$video = Video

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
