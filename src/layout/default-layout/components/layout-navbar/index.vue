<template>
  <a-layout-header
    class="z-100 inset-0 sticky h-15 w-full flex justify-between bg-arco-bg-2 shadow"
  >
    <div class="flex items-center pl-6">
      <a-space>
        <img
          alt="logo"
          src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image"
        />
        <a-typography-title class="m-0" :heading="6">
          Fiber Arco Pro
        </a-typography-title>
      </a-space>
    </div>
    <a-space size="large" class="pr-6">
      <a-tooltip content="搜索">
        <a-button shape="circle">
          <template #icon>
            <icon-search />
          </template>
        </a-button>
      </a-tooltip>
      <a-tooltip :content="themeState === 'light' ? '深色模式' : '亮色模式'">
        <a-button shape="circle" @click="handleToggleTheme">
          <template #icon>
            <icon-moon-fill v-if="themeState === 'dark'" />
            <icon-sun-fill v-else />
          </template>
        </a-button>
      </a-tooltip>
      <UserInfo />
    </a-space>
  </a-layout-header>
</template>

<script setup lang="ts">
  import { useAppStore } from '@/stores';
  import { useDark, useToggle } from '@vueuse/core';
  import { storeToRefs } from 'pinia';
  import UserInfo from './components/user-info.vue';

  const appStore = useAppStore();
  const { themeState } = storeToRefs(appStore);
  const isDark = useDark({
    selector: 'body',
    attribute: 'arco-theme',
    valueDark: 'dark',
    valueLight: 'light',
    storageKey: 'fiber-arco-theme',
    onChanged(dark: boolean) {
      // overridden default behavior
      appStore.toggleTheme(dark);
    }
  });

  const handleToggleTheme = () => useToggle(isDark)();
</script>
