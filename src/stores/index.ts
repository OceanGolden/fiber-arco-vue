import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import { useDictionaryStore } from './modules/dictionary';
import usePermissionStore from './modules/permission';
import useUserStore from './modules/user';

const pinia = createPinia();

export { useAppStore, useDictionaryStore, usePermissionStore, useUserStore };
export default pinia;
