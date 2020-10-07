import Vue from 'vue'
import App from './App.vue'
import request from './axios/request'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueEditor from "vue2-editor";

Vue.use(VueEditor);
Vue.prototype.$request = request
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app') 

 