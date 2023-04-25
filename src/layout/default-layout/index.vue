<template>
  <a-layout class="h-screen w-screen flex flex-col">
    <LayoutNavbar />
    <a-layout class="flex flex-row">
      <LayoutSidebar />
      <a-layout class="flex flex-col">
        <LayoutContent />
        <LayoutFooter />
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
  import LayoutContent from './components/layout-content/index.vue';
  import LayoutFooter from './components/layout-footer/index.vue';
  import LayoutNavbar from './components/layout-navbar/index.vue';
  import LayoutSidebar from './components/layout-sidebar/index.vue';
</script>
<style lang="less"></style>
