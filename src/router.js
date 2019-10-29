import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Main',
      component: () => import('./views/Main'),
      hidden: true,
      redirect: '/index',//首页
      children:[
        /**
         *  首页
         */
        {path: '/index', name: 'index', component: ()=>import('@/views/index/index')}, 
         /**
         *  基础数据
         */
        {path: '/Company', name: 'BasicData-Company', component: ()=>import('@/views/BasicData/Company')},//单位管理 
        {path: '/Meter', name: 'BasicData-Meter', component: ()=>import('@/views/BasicData/Meter')},//表具管理 
        {path: '/Concentrator', name: 'BasicData-Concentrator', component: ()=>import('@/views/BasicData/Concentrator')},//集中器管理 
        {path: '/Unified', name: 'BasicData-Unified', component: ()=>import('@/views/BasicData/Unified')},//统一调价 
        {path: '/Univalence', name: 'BasicData-Univalence', component: ()=>import('@/views/BasicData/Univalence')},//单价管理 
        {path: '/Recovery', name: 'BasicData-Recovery', component: ()=>import('@/views/BasicData/Recovery')},//表具回收站
        /**
         *  业务管理首页
         */
        {path: '/Business', name: 'Business', component: ()=>import('@/views/Business/index')}, 
        /**
         *  能源缴费首页
         */
        {path: '/EnergyPayment', name: 'EnergyPayment', component: ()=>import('@/views/EnergyPayment/index')}, 
        /**
         *  报表管理首页
         */
        {path: '/ReportManagement', name: 'ReportManagement', component: ()=>import('@/views/ReportManagement/index')}, 
        /**
         *  统计分析首页
         */
        {path: '/StatisticalAnalysis', name: 'StatisticalAnalysis', component: ()=>import('@/views/StatisticalAnalysis/index')},
         /**
         *  告警管理
         */
        {path: '/fault', name: 'warning-fault', component: ()=>import('@/views/warning/fault')}, 
        {path: '/gate', name: 'warning-gate', component: ()=>import('@/views/warning/gate')}, 
         /**
         *  通知公告首页
         */
        {path: '/Notice', name: 'Notice', component: ()=>import('@/views/Notice/index')},  
       ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login')
    }
  ]
})
