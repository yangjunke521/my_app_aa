import Vue from 'vue'
import App from './App.vue'
import router from './router'
import $ from 'jquery'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import echarts from 'echarts'
import Vuex from 'vuex'//引入vuex
import store from './store/store'
import axios from 'axios'
import 'babel-polyfill'             // 引入babel-polyfill
import Print from 'vue-print-nb'

import 'element-ui/lib/theme-chalk/index.css';
import elementUi from 'element-ui'
import Vuelidate from 'vuelidate'
import infiniteScroll from 'vue-infinite-scroll'

Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(iView)
Vue.use(elementUi)
Vue.use(Vuelidate)
Vue.use(infiniteScroll)
Vue.use(Print)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
