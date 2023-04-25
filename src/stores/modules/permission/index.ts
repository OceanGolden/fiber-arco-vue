import { defineStore, storeToRefs } from 'pinia';

import { filterRoutesFromMenus } from '@/hooks/usePermission';
import { computed } from 'vue';
import useUserStore from '../user';

const usePermissionStore = defineStore('permission', () => {
  const userStore = useUserStore();
  const { menuState, permissionState } = storeToRefs(userStore);
  const routerState = computed(() => filterRoutesFromMenus(menuState.value));

  // const fetchMenu = async () => {
  //   try {
  //     const res = await MenuService.queryTree();
  //     menuState.value = res;
  //     routerState.value = filterRoutesFromMenus(res);
  //   } catch {
  //     menuState.value = [];
  //   }
  // };

  return {
    // menuState,
    routerState,
    permissionState
    // fetchMenu
  };
});

export default usePermissionStore;
