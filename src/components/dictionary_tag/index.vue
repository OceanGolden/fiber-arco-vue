<template>
  <a-tag
    :key="current?.value"
    :color="current?.color"
    :loading="props.loading?.value"
  >
    {{ current?.label }}
  </a-tag>
</template>

<script setup lang="ts">
  import type { DictionaryItemRecord } from '@/api/system/dictionary_item/type';
  import { Ref, computed } from 'vue';

  interface Props {
    status: string;
    options?: DictionaryItemRecord[];
    loading?: Ref<boolean>;
  }

  const props = defineProps<Props>();

  const current = computed(() => {
    return props.options?.find((tag) => tag.value == props.status);
  });
</script>
