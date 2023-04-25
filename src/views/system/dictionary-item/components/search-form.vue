<script setup lang="ts">
  import { DictionaryItemParams } from '@/api/system/dictionary_item/type';
  import useCollapsed from '@/hooks/useCollapsed';
  import useOptions from '@/hooks/useOptions';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { ref } from 'vue';

  const emit = defineEmits<{
    (e: 'onSearch', value: Partial<DictionaryItemParams>): void;
  }>();

  const { collapsed, toggle } = useCollapsed(true);
  const formModel = ref<Partial<DictionaryItemParams>>({});
  const form = ref<FormInstance>();

  const statusOptions = useOptions('system_status');

  const handleSubmit = () => emit('onSearch', formModel.value);
  const handleReset = () => {
    form.value?.resetFields();
    emit('onSearch', {});
  };
</script>

<template>
  <a-row>
    <a-form
      ref="form"
      :model="formModel"
      :label-col-props="{ span: 6 }"
      :wrapper-col-props="{ span: 18 }"
      label-align="left"
    >
      <a-grid :cols="2" :colGap="12" :rowGap="16" :collapsed="collapsed">
        <a-grid-item>
          <a-form-item field="label" label="名称">
            <a-input
              v-model="formModel.label"
              allowclear
              placeholder="请输入名称"
            />
          </a-form-item>
        </a-grid-item>
        <a-grid-item>
          <a-form-item field="value" label="编码">
            <a-input
              v-model="formModel.value"
              allowclear
              placeholder="请输入编码"
            />
          </a-form-item>
        </a-grid-item>
        <a-grid-item>
          <a-form-item label="状态" field="status">
            <a-select
              v-model="formModel.status"
              allowclear
              placeholder="请选择状态"
              :options="statusOptions"
            />
          </a-form-item>
        </a-grid-item>
        <a-grid-item :span="1" suffix style="text-align: right">
          <a-button-group>
            <a-button title="重置" type="secondary" @click="handleReset">
              <template #icon><icon-refresh /></template>
            </a-button>
            <a-button title="搜索" type="primary" @click="handleSubmit">
              <template #icon><icon-search /></template>
            </a-button>
            <a-button
              type="text"
              @click="toggle"
              :title="collapsed ? '展开' : '收起'"
            >
              <icon-down v-if="collapsed === true" />
              <icon-up v-else="collapsed === false" />
            </a-button>
          </a-button-group>
        </a-grid-item>
      </a-grid>
    </a-form>
    <a-divider />
  </a-row>
</template>
