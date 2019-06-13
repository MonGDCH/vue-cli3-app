import Vue from 'vue'
import Router from 'vue-router'
import routers from './routers'
import store from '../store/index'
import util from 'common/util'
import LoadingBar from 'components/loadingbar';
Vue.use(Router)

// 引入404错误路由
routers.push({
    path: '/*',
    name: '404',
    meta: {
        title: '404'
    },
    component: () => import('components/jump/page/404.vue')
})

// 注册路由
const router = new Router({
    routes: routers
})

// 路由前置
router.beforeEach((to, from, next) => {
    let auth = to.meta.auth
    let token = store.getters['login/token'];

    LoadingBar.start()
    util.documentTitle(to.meta.title)
    // 验证登录
    if(auth){
        // 需要登录
        if(token){
            // 已登录
            next()
        }
        else{
            // 未登录，跳转到登录页
            next({name: 'login'})
        }
    }
    else{
        next()
    }
})

// 路由后置
router.afterEach(to => {
    LoadingBar.finish()
    window.scrollTo(0, 0)
})

export default router