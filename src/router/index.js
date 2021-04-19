import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },

  {
    path: '/agreement',
    component: Layout,
    redirect: '/agreement/create',
    name: 'Agreement',
    meta: { title: '用户协议', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'create',
        name: 'CreateAgreement',
        component: () => import('@/views/agreement/create'),
        meta: { title: '添加协议', icon: 'tree' },
        hidden: true
      },
      {
        path: 'list',
        name: 'AgreementList',
        component: () => import('@/views/agreement/list'),
        meta: { title: '协议列表', icon: 'table' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/agreement/edit'),
        name: 'EditAgreement',
        meta: { title: '编辑协议', noCache: true, activeMenu: '/agreement/list' },
        hidden: true
      },
    ]
  },

  {
    path: '/tab-color',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'TabColorList',
        component: () => import('@/views/tab-color/list'),
        meta: { title: '标记管理', icon: 'el-icon-s-unfold' },
        hidden: true
      },
      {
        path: 'create',
        name: 'CreateTabColor',
        component: () => import('@/views/tab-color/create'),
        meta: { title: '添加标记', icon: 'tree' },
        hidden: true
      },

      {
        path: 'edit/:id(\\d+)',
        name: 'EditTabColor',
        component: () => import('@/views/tab-color/edit'),
        meta: { title: '编辑标记', icon: 'tree' },
        hidden: true
      },
    ]
  },

  {
    path: '/consult',
    component: Layout,
    redirect: '/consult/list',
    name: 'Consult',
    meta: { title: '参考', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'create-type',
        name: 'CreateConsultType',
        component: () => import('@/views/consult/create-type'),
        meta: { title: '添加分类' },
        hidden: true
      },
      {
        path: 'type-list',
        name: 'ConsultTypeList',
        component: () => import('@/views/consult/type-list'),
        meta: { title: '分类列表', icon: 'table' }
      },
      {
        path: 'edit-type/:id(\\d+)',
        component: () => import('@/views/consult/edit-type'),
        name: 'EditConsultType',
        meta: { title: '编辑分类', noCache: true, activeMenu: '/consult/type-list' },
        hidden: true
      },
      {
        path: 'create',
        name: 'CreateConsult',
        component: () => import('@/views/consult/create'),
        meta: { title: '添加参考', icon: 'tree' },
        hidden: true
      },
      {
        path: 'list',
        name: 'ConsultList',
        component: () => import('@/views/consult/list'),
        meta: { title: '参考列表', icon: 'table' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/consult/edit'),
        name: 'EditConsult',
        meta: { title: '编辑参考', noCache: true, activeMenu: '/consult/list' },
        hidden: true
      },
    ]
  },

  {
    path: '/contact',
    component: Layout,
    children: [
      {
        path: 'contact',
        name: 'Contact',
        component: () => import('@/views/contact/index'),
        meta: { title: '联系我们', icon: 'el-icon-phone' }
      }
    ]
  },

  {
    path: '/admin',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'AdminList',
        component: () => import('@/views/admin/index'),
        meta: { title: '后台帐号', icon: 'el-icon-user-solid' }
      },
      {
        path: 'create',
        name: 'CreateAdmin',
        component: () => import('@/views/admin/create'),
        meta: { title: '添加后台帐号', icon: 'tree' },
        hidden: true
      },

      {
        path: 'edit',
        name: 'EditAdmin',
        component: () => import('@/views/admin/edit'),
        meta: { title: '编辑后台帐号', icon: 'tree' },
        hidden: true
      },
    ]
  },

  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'UserList',
        component: () => import('@/views/user/index'),
        meta: { title: '用户列表', icon: 'el-icon-user' }
      },

    ]
  },

  {
    path: '/team',
    component: Layout,
    meta: { title: '团队', icon: 'el-icon-s-check' },
    children: [
      {
        path: 'list',
        name: 'Team',
        component: () => import('@/views/team/index'),
        meta: { title: '组织团队',}
      },

      {
        path: 'plist',
        name: 'PrivacyList',
        component: () => import('@/views/team/plist'),
        meta: { title: '团队隐私', },
      },

      {
        path: 'create-privacy',
        name: 'CreatePrivacy',
        component: () => import('@/views/team/create-privacy'),
        meta: { title: '创建团队隐私', },
        hidden:true
      },

      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/team/edit-privacy'),
        name: 'EditPrivacy',
        meta: { title: '编辑团队隐私', noCache: true,  },
        hidden: true
      },
    ]
  },

  {
    path: '/position',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'Position',
        component: () => import('@/views/position/index'),
        meta: { title: '位置列表', icon: 'el-icon-map-location' }
      }
    ]
  },

  {
    path: '/notepad',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'Notepad',
        component: () => import('@/views/notepad/index'),
        meta: { title: '记事本', icon: 'el-icon-wallet' }
      }
    ]
  },

  {
    path: '/triage',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'Triage',
        component: () => import('@/views/triage/index'),
        meta: { title: '检伤分类', icon: 'el-icon-plus' }
      }
    ]
  },

  {
    path: '/user-guide',
    component: Layout,
    children: [
      {
        path: 'content',
        name: 'UserGuide',
        component: () => import('@/views/user-guide/index'),
        meta: { title: '用户指南', icon: 'el-icon-male' }
      }
    ]
  },


  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'TabList',
        component: () => import('@/views/tab/index'),
        meta: { title: '标记', icon: 'table' },
        hidden: true
      },
      {
        path: 'create',
        name: 'CreateTab',
        component: () => import('@/views/tab/create'),
        hidden: true
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/tab/edit'),
        name: 'EditTab',
        meta: { title: '编辑标记', noCache: true, activeMenu: '/tab/index' },
        hidden: true
      },
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
