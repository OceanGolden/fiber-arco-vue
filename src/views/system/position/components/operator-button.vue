<script setup lang="ts">
  // Emit
  const emit = defineEmits<{
    (e: 'onCreate'): void;
  }>();
</script>

<template>
  <a-row style="margin-bottom: 16px">
    <a-col :span="16">
      <a-space>
        <a-button
          v-auth="'/system/positions:POST'"
          type="primary"
          @click="emit('onCreate')"
        >
          <template #icon><icon-plus /></template>
          <template #default>新建</template>
        </a-button>
      </a-space>
    </a-col>
    <a-col :span="8" style="text-align: right">
      <a-button v-auth="'/system/positions/download:POST'">
        <template #icon>
          <icon-download />
        </template>
        <template #default>下载</template>
      </a-button>
    </a-col>
  </a-row>
</template>
