<template>
  <a-layout-sider
    breakpoint="xl"
    :collapsible="true"
    :width="220"
    :hide-trigger="true"
    :collapsed="collapsed"
  >
    <a-menu
      class="h-full"
      :show-collapse-button="true"
      breakpoint="xl"
      :accordion="true"
      :default-collapsed="collapsed"
      :collapsed="collapsed"
      @collapse="toggle"
      :level-indent="34"
      :selected-keys="selectedKeys"
      :open-keys="openKeys"
      :auto-open-selected="true"
      :auto-scroll-into-view="true"
      @menu-item-click="onMenuItemClick"
      @sub-menu-click="onSubMenuClick"
    >
      <SidebarMenu :menus="menuState" />
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts" setup>
  import { useUserStore } from '@/stores';
  import { useToggle } from '@vueuse/core';
  import { storeToRefs } from 'pinia';
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import SidebarMenu from './components/sidebar-menu/index.vue';

  const [collapsed, toggle] = useToggle(false);
  const route = useRoute();
  const router = useRouter();
  const pathnames = route.fullPath
    .split('/')
    .filter((x) => x)
    .map((e) => `/${e}`);

  const openKeys = ref<string[]>(pathnames.slice(0, -1));
  const selectedKeys = ref<string[]>([route.path]);
  // const selectedKeys = computed(() => [route.path]);
  const { menuState } = storeToRefs(useUserStore());

  const onMenuItemClick = (key: string) => {
    selectedKeys.value = [key];
    router.push({ path: key });
  };

  const onSubMenuClick = (_key: string, keys: string[]) => {
    openKeys.value = keys;
  };
</script>

<style scoped lang="less"></style>
