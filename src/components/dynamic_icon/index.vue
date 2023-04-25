<template>
  <component v-if="icon" :is="icon" />
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  interface Props {
    icon: string;
  }

  const props = defineProps<Props>();
  const icon = computed(() => props.icon);
</script>
