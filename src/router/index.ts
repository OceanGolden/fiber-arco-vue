import 'nprogress/nprogress.css';

import { createRouter, createWebHistory } from 'vue-router';
import { DEFAULT_LAYOUT, NOT_FOUND_ROUTE } from './constants';

import NProgress from 'nprogress';
import { RouteRecordRaw } from 'vue-router';
import createRouteGuard from './guard';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/login/index.vue'),
    meta: {
      title: '登录页'
    }
  },
  {
    path: '/home',
    name: 'root',
    component: DEFAULT_LAYOUT,
    redirect: 'home',
    children: [
      {
        path: 'index',
        name: 'home',
        component: () => import('../views/home/index.vue')
      }
    ],
    meta: {
      title: 'Home'
    }
  },
  // REDIRECT_MAIN,
  NOT_FOUND_ROUTE
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

createRouteGuard(router);

export default router;
