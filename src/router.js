import Vue from 'vue'
import Router from 'vue-router'
import Page from '@/views/PC/Page'
import Login from '@/views/PC/Login'

// page 0
import page0_0 from './views/PC/data0/data0-0'
import page0_1 from './views/PC/data0/data0-1'
import page0_2 from './views/PC/data0/data0-2'
import page0_3 from './views/PC/data0/data0-3'
// page1
import page1_0 from './views/PC/data1/data1-0'
// page2
import page2_0 from './views/PC/data2/data2-0'
import page2_1 from './views/PC/data2/data2-1'
// page3
import page3_0 from './views/PC/data3/data3-0'
import page3_1 from './views/PC/data3/data3-1'
import page3_2 from './views/PC/data3/data3-2'
// page4
import page4_0 from './views/PC/data4/data4-0'
import page4_1 from './views/PC/data4/data4-1'
// page5
import page5_0 from './views/PC/data5/data5-0'
import page5_1 from './views/PC/data5/data5-1'
// page6
import page6_0 from './views/PC/data6/data6-0'
import page6_1 from './views/PC/data6/data6-1'
// page7
import page7_0 from './views/PC/data7/data7-0'

// 移动端
import m_home from '@/views/Mob/Home'
import m_login from '@/views/Mob/Login'
import add_order from '@/views/Mob/AddOrder'
import register from '@/views/Mob/Register'
import my_order from '@/views/Mob/MyOrder'
import order_detal from '@/views/Mob/OrderDetal'
import test from '@/views/Mob/test'

Vue.use(Router)
const router = new Router({
  mode: 'hash',
  routes: [{
      path: '/',
      redirect: '/page'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/m/register',
      component: register
    },
    {
      path: "/m/login",
      component: m_login
    },
    {
      path: '/m',
      redirect: '/m/home'
    },
    {
      path: '/works',
      redirect: '/works/production',
      component: () => import('@/views/Mob/works/Works'),
      children: [{
          path: '/works/production',
          component: () => import('@/views/Mob/works/Production')
        },
        {
          path: '/works/OrderAdmin',
          component: () => import('@/views/Mob/works/OrderAdmin')
        },
        {
          path: '/works/UnitAdmin',
          component: () => import('@/views/Mob/works/UnitAdmin')
        },
        {
          path: '/works/About',
          component: () => import('@/views/Mob/works/About')
        },
        {
          path: '/works/OrderDetal',
          component: () => import('@/views/Mob/works/OrderDetal')
        },
      ]
    },
    {
      path: "/m/home",
      component: m_home,
      redirect: '/m/home/add_order',
      children: [{
          path: "/m/home/add_order",
          component: add_order
        },
        {
          path: '/m/home/my_order',
          component: my_order
        },
        {
          path: '/m/home/order_detal',
          component: order_detal
        },
        {
          path: '/m/home/test',
          component: test
        }
      ]
    },
    {
      path: '/page',
      name: 'page',
      redirect: "/page/data0-0",
      component: Page,
      children: [
        // page0        
        {
          path: '/page/data0-0',
          component: page0_0
        },
        {
          path: '/page/data0-1',
          component: page0_1
        },
        {
          path: '/page/data0-2',
          component: page0_2
        },
        {
          path: '/page/data0-3',
          component: page0_3
        },
        // page1
        {
          path: '/page/data1-0',
          component: page1_0
        },
        // page2
        {
          path: '/page/data2-0',
          component: page2_0
        },
        {
          path: '/page/data2-1',
          component: page2_1
        },
        // page3
        {
          path: '/page/data3-0',
          component: page3_0
        },
        {
          path: '/page/data3-1',
          component: page3_1
        },
        {
          path: '/page/data3-2',
          component: page3_2
        },
        // page4
        {
          path: '/page/data4-0',
          component: page4_0
        },
        {
          path: '/page/data4-1',
          component: page4_1
        },
        // page5
        {
          path: '/page/data5-0',
          component: page5_0
        },
        {
          path: '/page/data5-1',
          component: page5_1
        },
        // page6
        {
          path: '/page/data6-0',
          component: page6_0
        },
        {
          path: '/page/data6-1',
          component: page6_1
        },
        // page7
        {
          path: '/page/data7-0',
          component: page7_0
        }
      ]
    }

  ]
})

export default router