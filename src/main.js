import Vue from 'vue'
import App from './App.vue'
import router from './permission.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Component from './components'
import axios from './utils/axios.config'
// Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Component)
Vue.use(axios)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
