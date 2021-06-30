import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('@/pages/index'),
            redirect:'studentList',
            children:[
                {
                    path: '/studentList',
                    name: 'studentList',
                    component: () => import('@/pages/studentList'),
                },
                {
                    path: '/studentDetail',
                    name: 'studentDetail',
                    component: () => import('@/pages/studentDetail'),
                },
                {
                    path: '/studentAchievement',
                    name: 'studentAchievement',
                    component: () => import('@/pages/studentAchievement'),
                },
                {
                    path: '/studentSports',
                    name: 'studentSports',
                    component: () => import('@/pages/studentSports'),
                },
                {
                    path: '/studentPhysiology',
                    name: 'studentPhysiology',
                    component: () => import('@/pages/studentPhysiology'),
                },
                {
                    path: '/studentDaily',
                    name: 'studentDaily',
                    component: () => import('@/pages/studentDaily'),
                },
                {
                    path: '/studentCheckon',
                    name: 'studentCheckon',
                    component: () => import('@/pages/studentCheckon'),
                },
                {
                    path: '/stageInfoList',
                    name: 'stageInfoList',
                    component: () => import('@/pages/stageInfoList/stageInfoList'),
                },
                {
                    path: '/stageAddInfo',
                    name: 'stageAddInfo',
                    component: () => import('@/pages/stageAddInfo'),
                },
                {
                    path: '/stageAddRace',
                    name: 'stageAddRace',
                    component: () => import('@/pages/stageAddRace'),
                },
                {
                    path: '/stageAddSports',
                    name: 'stageAddSports',
                    component: () => import('@/pages/stageAddSports'),
                },
                {
                    path: '/stageAddPhy',
                    name: 'stageAddPhy',
                    component: () => import('@/pages/stageAddPhy'),
                },
            ]
        }
    ]
})
export default router