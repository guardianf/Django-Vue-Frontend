import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/1',
    component: Layout,
    redirect: '/robot/index',
    alwaysShow: true, // will always show the root menu
    name: 'Robot Service',
    meta: {
      title: 'Robot',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'arm',
        component: () => import('@/views/permission/page'),
        name: 'Arm',
        meta: {
          title: 'Arm',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'joint',
        component: () => import('@/views/permission/directive'),
        name: 'Joint',
        meta: {
          title: 'Joint'
          // if do not set roles, means: this page does not require permission
        }
      },
    ]
  },

  {
    path: '/interface',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Interface',
        meta: { title: 'Interface', icon: 'icon', noCache: true }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
 // componentsRouter,
 // chartsRouter,
 // nestedRouter,
 // tableRouter,

  {
    path: '/download',
    component: Layout,
    redirect: '/example/list',
    name: 'download',
    meta: {
      title: 'Software Service',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'downloadcenter',
        component: () => import('@/views/example/create'),
        name: 'DownloadCenter',
        meta: { title: 'Download Center', icon: 'edit' }
      }
    ]
  },

  {
    path: '/management',
    component: Layout,
    meta: { title: 'Management Service', icon: 'edit' },
    children: [
      {
        path: 'user',
        component: () => import('@/views/tab/index'),
        name: 'User',
        meta: { title: 'User', icon: 'tab' }
      }, {
        path: 'role',
        component: () => import('@/views/tab/index'),
        name: 'Role',
        meta: { title: 'Role', icon: 'tab' }
      }, {
        path: 'permission',
        component: () => import('@/views/tab/index'),
        name: 'Permission',
        meta: { title: 'Permission', icon: 'tab' }
      }, {
        path: 'group',
        component: () => import('@/views/tab/index'),
        name: 'Group',
        meta: { title: 'Group', icon: 'tab' }
      }, {
        path: 'menu',
        component: () => import('@/views/tab/index'),
        name: 'Menu',
        meta: { title: 'Menu', icon: 'tab' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
