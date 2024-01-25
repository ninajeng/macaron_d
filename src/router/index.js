import { createRouter, createWebHashHistory } from 'vue-router'
const webName = 'macarOn 頂級法式馬卡龍'
const routes = [
  {
    path: '/',
    name: 'layout',
    redirect: {
      name: 'home'
    },
    component: () => import('../views/WebLayout.vue'),
    meta: {
      title: webName
    },
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/WebHome.vue')
      },
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/WebProductList.vue'),
        meta: {
          title: `${webName} - 產品列表`
        }
      },
      {
        path: 'product/:id',
        name: 'product',
        component: () => import('../views/WebProductItem.vue')
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('../views/WebCartView.vue'),
        meta: {
          title: `${webName} - 購物車清單`
        }
      },
      {
        path: 'collect',
        name: 'collect',
        component: () => import('../views/WebCollectView.vue'),
        meta: {
          title: `${webName} - 我的收藏`
        }
      },
      {
        path: 'order',
        name: 'order',
        component: () => import('../views/Order/WebOrderView.vue'),
        children: [
          {
            path: 'check',
            name: 'check',
            component: () => import('../views/Order/WebOrderCheck.vue'),
            meta: {
              title: `${webName} - 結帳：訂單確認`
            }
          },
          {
            path: 'purchaserData',
            name: 'purchaserData',
            component: () => import('../views/Order/WebOrderPurchaser.vue'),
            meta: {
              title: `${webName} - 結帳：填寫資料`
            }
          },
          {
            path: 'payment/:id',
            name: 'payment',
            component: () => import('../views/Order/WebOrderPayment.vue'),
            meta: {
              title: `${webName} - 結帳：付款`
            }
          },
          {
            path: 'complete/:id',
            name: 'complete',
            component: () => import('../views/Order/WebOrderComplete.vue'),
            meta: {
              title: `${webName} - 訂單資料`
            }
          },
          {
            path: '/order/:pathMatch(.*)*',
            redirect: {
              name: 'cart'
            }
          }
        ]
      },
      {
        path: 'orderSearch',
        name: 'orderSearch',
        component: () => import('../views/WebOrderSearch.vue'),
        meta: {
          title: `${webName} - 訂單查詢`
        }
      },
      {
        path: '/:pathMatch(.*)*',
        redirect: {
          name: 'home'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/DashBoard/LoginView.vue'),
    meta: {
      title: 'macarOn - 後台登入'
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: {
      path: '/dashboard/salesReport'
    },
    component: () => import('../views/DashBoard/DashBoard.vue'),
    meta: {
      title: 'macarOn - 後台管理'
    },
    children: [
      {
        path: 'products',
        component: () => import('../views/DashBoard/ProductList.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/DashBoard/OrderList.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/DashBoard/CouponList.vue')
      },
      {
        path: 'salesReport',
        component: () => import('../views/DashBoard/SalesReport.vue')
      },
      {
        path: '/dashboard/:pathMatch(.*)*',
        redirect: {
          path: '/dashboard/salesReport'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
