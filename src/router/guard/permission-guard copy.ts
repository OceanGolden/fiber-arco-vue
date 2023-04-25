// import usePermission from '@/hooks/usePermission';
// import { usePermissionStore } from '@/stores';
// import type { Router } from 'vue-router';
// import { WHITE_LIST } from '../constants';

// export default function setupPermissionGuard(router: Router) {
//   router.beforeEach(async (to, from, next) => {
//     const permissionStore = usePermissionStore();
//     const Permission = usePermission();
//     const permissionsAllow = Permission.accessRouter(to);
//     if (
//       !permissionStore.menuState.length &&
//       !WHITE_LIST.find((el) => el.name === to.name)
//     ) {
//       await permissionStore.fetchMenu();
//     }

//     permissionStore.routerState.forEach((e) => router.addRoute(e));

//     // let exist = permissionStore.menuLoadState;
//     let exist = true;
//     // while (serverMenuConfig.length && !exist) {
//     //   const element = serverMenuConfig.shift();
//     //   if (to.name == element?.name) {
//     //     permissionStore.menuLoadState = true;
//     //   }
//     //   if (element?.children) {
//     //     serverMenuConfig.push(...element.children);
//     //   }
//     // }
//     if (exist && permissionsAllow) {
//       next();
//     } else {
//       next({ name: '404' });
//     }
//   });
// }
