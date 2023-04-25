<template>
  <template v-for="menu in menus">
    <template v-if="menu?.children && menu?.children.length > 0">
      <a-sub-menu :key="menu.path">
        <template #icon v-if="menu.icon">
          <DynamicIcon :icon="menu.icon" class="text-lg" />
        </template>
        <template #title>
          {{ menu.name }}
        </template>
        <SidebarMenu :menus="menu.children" />
      </a-sub-menu>
    </template>
    <template v-else>
      <a-menu-item :key="menu.path">
        <template #icon v-if="menu.icon">
          <DynamicIcon :icon="menu.icon" />
        </template>
        {{ menu.name }}
      </a-menu-item>
    </template>
  </template>
</template>

<script setup lang="ts">
  import type { MenuRecord } from '@/api/system/menu/type';
  import DynamicIcon from '@/components/dynamic_icon/index.vue';
  import { PropType, defineAsyncComponent } from 'vue';

  defineProps({
    menus: {
      type: Array as PropType<MenuRecord[]>,
      required: true
    }
  });

  const SidebarMenu = defineAsyncComponent({
    loader: () =>
      import(
        '@/layout/default-layout/components/layout-sidebar/components/sidebar-menu/index.vue'
      )
  });
</script>
<style scoped lang="less"></style>
