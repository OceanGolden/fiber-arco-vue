<template>
  <a-layout-content
    class="flex bg-arco-neutral-2 flex-col transition duration-200"
  >
    <div className="p-4 min-h-full min-w-full overflow-hidden">
      <LayoutBreadcrumb :items="breadcrumbs" />
      <PageLayout />
    </div>
  </a-layout-content>
</template>
<script setup lang="ts">
  import LayoutBreadcrumb from '@/layout/default-layout/components/layout-breadcrumb/index.vue';
  import PageLayout from '@/layout/page-layout/index.vue';
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const breadcrumbs = computed(() =>
    router.currentRoute.value.matched.map((item) => item.meta.title)
  );
</script>
<style lang="less"></style>
