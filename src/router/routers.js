/**
 * 路由定义
 */
export default [
    {
        path: '/',
        name: 'home',
        meta: {
            // 是否需要登录
            auth: false,
            // 是否缓存组件
            keepAlive: false,
            // 是否重设标题
            title: '控制台',
        },
        component: () => import('view/Home.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('view/About.vue')
    }
]