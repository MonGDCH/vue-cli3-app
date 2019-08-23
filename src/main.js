import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/index'
import store from '@/store/index'
import filters from 'common/filters/index'

Vue.config.productionTip = false

// 注入全局过滤器
Object.keys(filters).forEach(item => {
    Vue.filter(item, filters[item])
})

// 加载mock数据
if (process.env.NODE_ENV != 'production') {
    require('./mock/index.js')
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
