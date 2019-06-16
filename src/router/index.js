import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/welcome'
import Layout from '@/components/index'

Vue.use(Router)

export const constantRoutes = [{
    path: '/',
    name: 'home',
    component: Layout,
    redirect: '/welcome',
    hiddren: true,
    children: [{
      path: '/welcome',
      name: 'welcome',
      hiddren: true,
      component: Welcome
    }]
  },
  {
    path: '/login',
    name: 'login',
    hiddren: true,
    component: () => import( /* webpackChunkName: "about" */ '@/views/Login.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    hiddren: true,
    component: () => import( /* webpackChunkName: "about" */ '@/components/logout')
  },
  {
    path: '/me',
    name: 'me',
    component: Layout,
    redirect: '/me/index',
    hiddren: true,
    children: [{
      path: '/me/index',
      name: 'me_index',
      component: () => import( /* webpackChunkName: "about" */ '@/views/me')
    }]
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404'),
    hiddren: true
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/error/401'),
    hiddren: true
  }
]

export const asyncRoutes = [{
    path: '/user',
    name: '用户管理',
    component: Layout,
    redirect: '/user/index',
    meta: { title: '菜单管理', role: ['admin'] },
    children: [{
      path: '/user/index',
      name: '用户列表',
      component: () => import('@/views/user/index'),
      meta: { title: '用户列表'}
    }]
  },
  {
    path: '/menu',
    name: '菜单管理',
    component: Layout,
    meta: { title: '菜单管理', role: ['admin'] },
    redirect: '/menu/index',
    children: [{
      path: '/menu/index',
      name: '菜单列表',
      component: () => import('@/views/menu/index'),
      meta: { title: '菜单列表' }
    }]
  },
  {
    path: '/role',
    name: '角色管理',
    component: Layout,
    meta: { title: '角色管理', role: ['admin'] },
    redirect: '/role/index',
    children: [{
        path: '/role/index',
        name: '角色列表',
        component: () => import('@/views/role/index'),
        meta: { title: '角色列表', role: ['admin'] }
      },
      {
        path: 'add',
        name: '添加角色',
        component: () => import('@/views/user/addUser'),
        meta: { title: '添加角色', role: ['admin'] }
      }
    ]
  },
  {
    path: '/permission',
    name: 'permission',
    meta: { title: '权限管理' },
    component: Layout,
    redirect: '/permission/index',
    children: [{
        path: '/permission/index',
        name: '权限列表',
        component: () => import('@/views/permission/index'),
        meta: { title: '权限列表' }
      },
      {
        path: 'add',
        name: '添加权限',
        component: () => import('@/views/user/addUser'),
        meta: { title: '添加权限' }
      }
    ]
  }
]

const crateRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = crateRouter()

export function resetRouter() {
  const newRouter = crateRouter()
  router.matcher = newRouter.matcher
}

export default router
