<script setup lang="ts">
  import { RoleParams } from '@/api/system/role/type';
  import useCollapsed from '@/hooks/useCollapsed';
  import type { FormInstance } from '@arco-design/web-vue';
  import { ref } from 'vue';

  const emit = defineEmits<{
    (e: 'onSearch', value: Partial<RoleParams>): void;
  }>();

  const { collapsed, toggle } = useCollapsed(true);
  const formModel = ref<Partial<RoleParams>>({});
  const form = ref<FormInstance>();

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
      <a-grid :cols="3" :colGap="12" :rowGap="16" :collapsed="collapsed">
        <a-grid-item>
          <a-form-item field="name" label="名称">
            <a-input
              v-model="formModel.name"
              allowclear
              placeholder="请输入角色名称"
            />
          </a-form-item>
        </a-grid-item>
        <a-grid-item>
          <a-form-item field="code" label="编码">
            <a-input
              v-model="formModel.code"
              allowclear
              placeholder="请输入角色编码"
            />
          </a-form-item>
        </a-grid-item>
        <a-grid-item>
          <a-form-item field="remark" label="备注">
            <a-input
              v-model="formModel.remark"
              allowclear
              placeholder="请输入备注"
            />
          </a-form-item>
        </a-grid-item>
        <a-grid-item :span="1" suffix style="text-align: right">
          <a-button-group>
            <a-button type="secondary" @click="handleReset">
              <template #icon><icon-refresh /></template>
              <template #default>重置</template>
            </a-button>
            <a-button type="primary" @click="handleSubmit">
              <template #icon><icon-search /></template>
              <template #default>搜索</template>
            </a-button>
            <a-button type="text" @click="toggle">
              {{ collapsed ? '展开' : '收起' }}
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
