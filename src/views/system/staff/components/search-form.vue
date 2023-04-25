<script setup lang="ts">
  import { StaffParams } from '@/api/system/staff/type';
  import useCollapsed from '@/hooks/useCollapsed';
  import useOptions from '@/hooks/useOptions';
  import type { FormInstance } from '@arco-design/web-vue';
  import { ref } from 'vue';

  const emit = defineEmits<{
    (e: 'onSearch', value: Partial<StaffParams>): void;
  }>();

  const { collapsed, toggle } = useCollapsed(true);
  const formModel = ref<Partial<StaffParams>>({});
  const form = ref<FormInstance>();

  const handleSubmit = () => emit('onSearch', formModel.value);
  const handleReset = () => {
    form.value?.resetFields();
    emit('onSearch', {});
  };
  const workOptions = useOptions('staff_work_status');
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
          <a-form-item field="username" label="名称">
            <a-input
              v-model="formModel.username"
              allowclear
              placeholder="请输入用户名称"
            />
          </a-form-item>
        </a-grid-item>
        <a-grid-item>
          <a-form-item field="name" label="姓名">
            <a-input
              v-model="formModel.name"
              allowclear
              placeholder="请输入用户姓名"
            />
          </a-form-item>
        </a-grid-item>
        <a-grid-item>
          <a-form-item field="email" label="邮件">
            <a-input
              v-model="formModel.email"
              allowclear
              placeholder="请输入邮件地址"
            />
          </a-form-item>
        </a-grid-item>
        <a-grid-item>
          <a-form-item field="mobile" label="手机">
            <a-input
              v-model="formModel.mobile"
              allowclear
              placeholder="请输入手机号码"
            />
          </a-form-item>
        </a-grid-item>
        <a-grid-item>
          <a-form-item field="work_status" label="在职">
            <a-select
              v-model="formModel.work_status"
              allowclear
              placeholder="请选择在职状态"
              :options="workOptions"
            />
          </a-form-item>
        </a-grid-item>
        <!-- <a-grid-item>
          <a-form-item field="mobile" label="电话号码">
            <a-input
              v-model="formModel.mobile"
              allowclear
              placeholder="请输入电话号码"
            />
          </a-form-item>
        </a-grid-item>  -->
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
