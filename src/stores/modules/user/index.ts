import * as AuthService from '@/api/auth/service';

import { StaffRecord } from '@/api/system/staff/type';
import { filterRoutesFromMenus } from '@/hooks/usePermission';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { MenuRecord } from './../../../api/system/menu/type';

// import { removeRouteListener } from '@/utils/route-listener';

const useUserStore = defineStore('user', () => {
  const userState = ref<Partial<StaffRecord>>({});
  const menuState = ref<MenuRecord[]>([]);
  const routerState = ref<RouteRecordRaw[]>([]);
  const permissionState = ref<string[]>([]);

  const fetchInfo = async () => {
    const { staff, menus, permissions } = await AuthService.info();
    userState.value = staff || {};
    menuState.value = menus || [];
    routerState.value = filterRoutesFromMenus(menuState.value);
    permissionState.value = permissions || [];
  };

  // const login = () => {
  //   return useMutation({
  //     mutationFn: (req: Partial<LoginRequest>) => {
  //       const submit = AuthService.login;
  //       return submit(req);
  //     },
  //     onMutate: () => {
  //       Message.loading(`正在登录...`);
  //     },
  //     onSuccess: (data) => {
  //       Message.clear();
  //       Message.success(`登录成功`);
  //       Storage.set(TokenEnum.Access, data.access);
  //     },
  //     onError: () => {
  //       Message.clear();
  //       Message.error(`登录失败`);
  //       Storage.remove(TokenEnum.Access);
  //     }
  //   });
  // };

  // const logout = async () => {
  //   Modal.confirm({
  //     title: '温馨提示',
  //     content: '确认要注销当前用户吗?',
  //     okButtonProps: { status: 'warning' },
  //     onOk: () => {
  //       Storage.remove(TokenEnum.Access);
  //       userState.value = {};
  //     }
  //   });
  // };

  // const logout = () => {
  //   return Modal.confirm({
  //     title: '温馨提示',
  //     content: `确认注销当前用户?`,
  //     okButtonProps: { status: 'warning' },
  //     onOk: () => useLogoutMutation().mutate()
  //   });
  // };

  return { userState, menuState, routerState, permissionState, fetchInfo };
});

export default useUserStore;
