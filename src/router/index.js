import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/index'

Vue.use(Router);

const constantRouterList = [
    {
        path: '/',
        redirect: '/index',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('../views')
            }
        ]
    }
];

export default new Router({
    mode: 'history',
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRouterList
})