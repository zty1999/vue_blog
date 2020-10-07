import Vue from 'vue'
import App from './App.vue'
import router from './router'
import request from './axios/request'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$request = request
Vue.use(ElementUI) 

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
