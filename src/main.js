import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/index'
import store from '@/store/index'
import filters from 'common/filters/index'

// 注入全局过滤器
Object.keys(filters).forEach(item => {
    Vue.filter(item, filters[item])
})

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
