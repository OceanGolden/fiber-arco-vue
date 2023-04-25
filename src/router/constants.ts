import type { RouteRecordRaw } from 'vue-router';

export const WHITE_LIST = [
  { name: '404', children: [] },
  { name: 'login', children: [] }
];

export const NOT_FOUND = {
  name: '404',
  meta: {
    title: 'Not Found'
  }
};

export const DEFAULT_ROUTE = {
  name: 'home',
  fullPath: '/home',
  meta: {
    title: '首页'
  }
};

export const DEFAULT_LAYOUT = () => import('@/layout/default-layout/index.vue');

// export const REDIRECT_MAIN: RouteRecordRaw = {
//   path: '/redirect',
//   name: 'redirectWrapper',
//   component: DEFAULT_LAYOUT,
//   meta: {
//     requiresAuth: true,
//     hideInMenu: true
//   }
// children: [
//   {
//     path: '/redirect/:path',
//     name: REDIRECT_ROUTE_NAME,
//     component: () => import('@/views/redirect/index.vue'),
//     meta: {
//       requiresAuth: true,
//       hideInMenu: true
//     }
//   }
// ]
// };

export const NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: '404',
  component: () => import('@/views/exceptions/404/index.vue'),
  meta: {
    title: 'Not Found'
  }
};
