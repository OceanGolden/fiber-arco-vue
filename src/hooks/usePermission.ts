import { intersection, isArray } from 'lodash';
import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';

import { MenuRecord } from '@/api/system/menu/type';
import { DEFAULT_LAYOUT } from '@/router/constants';
import { usePermissionStore } from '@/stores';

export const filterRoutesFromMenus = (
  menus: MenuRecord[]
): RouteRecordRaw[] => {
  const aysncRoutes: RouteRecordRaw[] = [];
  menus.forEach((menu) => {
    let component;
    if (!menu.component) {
      component = DEFAULT_LAYOUT;
    } else {
      const modules = import.meta.glob('../views/**/*/index.vue');
      component = modules[`../views/${menu.component}/index.vue`];
      // component = () => import(`/src/views/${menu.component}/index.vue`);
    }
    const route: RouteRecordRaw = {
      path: menu.path,
      name: menu.name,
      component: component,
      redirect: menu.redirect,
      children: [],
      meta: {
        // requiresAuth: true,
        title: menu.name,
        icon: menu.icon
        // id: menu.id,
        // ignoreCache: true,
        // breadcrumb: []
      }
    };
    if (menu.children && menu.children.length > 0) {
      route.children?.push(...filterRoutesFromMenus(menu.children));
    }
    aysncRoutes.push(route);
  });
  return aysncRoutes;
};

export default function usePermission() {
  const { permissionState } = usePermissionStore();
  const checkPermission = (value: string | string[]) => {
    if (!value) {
      return true;
    }
    if (!isArray(value)) {
      return permissionState.includes(value);
    }
    return (intersection(value, permissionState) as string[]).length > 0;
  };

  const accessRouter = (route: RouteLocationNormalized | RouteRecordRaw) => {
    return !route.meta?.requiresAuth;
  };
  const findFirstPermissionRoute = (_routers: any) => {
    const cloneRouters = [..._routers];
    while (cloneRouters.length) {
      const firstElement = cloneRouters.shift();

      if (firstElement?.children) {
        cloneRouters.push(...firstElement.children);
      }
    }
    return null;
  };

  return { checkPermission, accessRouter, findFirstPermissionRoute };
}
