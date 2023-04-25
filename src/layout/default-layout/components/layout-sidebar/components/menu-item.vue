<template>
  <a-menu-item :key="menu.id">
    <template #icon v-if="menu.icon">
      <component :is="menu.icon" />
    </template>
    {{ menu.name }}
  </a-menu-item>
</template>

<script setup lang="ts">
  import { toRef } from 'vue';

  const props = defineProps({
    menu: {
      type: Object,
      required: true
    }
  });
  const menu = toRef(props, 'menu');
</script>
<style scoped lang="less"></style>
