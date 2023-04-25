import type { LocationQueryRaw, Router } from 'vue-router';
import { DEFAULT_ROUTE, WHITE_LIST } from './../constants';

import { TokenEnum } from '@/common/constants';
import { useUserStore } from '@/stores';
import Storage from '@/utils/storage';
import NProgress from 'nprogress'; // progress bar

export default function setupUserLoginInfoGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const userStore = useUserStore();
    const access = Storage.get(TokenEnum.Access);
    if (!!access) {
      if (to.name === 'login') {
        next(DEFAULT_ROUTE);
      } else {
        if (userStore.userState.id) {
          next();
        } else {
          try {
            await userStore.fetchInfo();
            next();
          } catch (error) {
            Storage.remove(TokenEnum.Access);
            next({
              name: 'login',
              query: {
                redirect: to.name,
                ...to.query
              } as LocationQueryRaw
            });
          }
        }
      }
    } else {
      if (WHITE_LIST.find((el) => el.name === to.name)) {
        next();
        return;
      }
      next({
        name: 'login',
        query: {
          redirect: to.name,
          ...to.query
        } as LocationQueryRaw
      });
    }
  });

  router.afterEach((to, from, failure) => {
    NProgress.done();
    document.title = to.meta.title?.toString() || '';
  });
}
