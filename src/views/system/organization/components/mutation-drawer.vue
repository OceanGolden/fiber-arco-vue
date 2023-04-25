import { buildTree } from '@/utils/buildTree';
<script setup lang="ts">
  import {
    useOrganizationMutation,
    useOrganizations
  } from '@/api/system/organization/query';
  import { OrganizationRecord } from '@/api/system/organization/type';
  import useOptions from '@/hooks/useOptions';
  import type { FormInstance } from '@arco-design/web-vue';
  import { ref } from 'vue';
  import Rules from './rules';

  // Props
  const props = defineProps<{
    record: Partial<OrganizationRecord>;
  }>();
  // Emit
  const emit = defineEmits<{
    (e: 'onMutations'): void;
  }>();

  const formModel = ref<Partial<OrganizationRecord>>({});
  const title = ref<string>('');
  const visible = ref<boolean>(false);
  const formRef = ref<FormInstance | null>(null);

  const statusOptions = useOptions('system_status');

  const openDrawer = () => (visible.value = true);
  const closeDrawer = () => (visible.value = false);

  const { treeData, isLoading } = useOrganizations(ref({}), {
    enabled: visible
  });

  // 开启后
  const afterOpen = () => {
    if (!!props.record.id) {
      formModel.value = { ...props.record };
      title.value = `更新 ${props.record.name}`;
    } else {
      formModel.value = { sort: 1000 };
      title.value = '新建组织';
    }
  };
  // 关闭后
  const afterClose = () => (formModel.value = {});

  // Mutation操作
  const organizationMutation = useOrganizationMutation();
  const handleOk = async () => {
    const err = await formRef.value?.validate();
    if (!err) {
      organizationMutation.mutate(formModel.value, {
        onSuccess: () => {
          closeDrawer();
        }
      });
    }
  };

  // 暴露 的属性
  defineExpose({ openDrawer });
</script>

<template>
  <a-drawer
    :visible="visible"
    @open="afterOpen"
    @close="afterClose"
    @ok="handleOk"
    @cancel="closeDrawer"
    width="33%"
    :unmountOnClose="true"
    :okLoading="organizationMutation.isLoading.value"
    :title="title"
  >
    <a-card :bordered="false">
      <a-form ref="formRef" :model="formModel" layout="vertical" :rules="Rules">
        <a-form-item label="上级组织" field="parent_id">
          <a-tree-select
            v-model="formModel.parent_id"
            :data="treeData"
            :loading="isLoading"
            :fieldNames="{ key: 'id', title: 'name' }"
            allowClear
            placeholder="请选择上级组织"
          />
        </a-form-item>
        <a-form-item label="组织名称" field="name">
          <a-input v-model="formModel.name" placeholder="请输入名称" />
        </a-form-item>
        <a-form-item label="组织编码" field="code">
          <a-input v-model="formModel.code" placeholder="请输入数据" />
        </a-form-item>
        <a-form-item label="状态" field="status">
          <a-select
            v-model="formModel.status"
            allowclear
            placeholder="请选择状态"
            :options="statusOptions"
          />
        </a-form-item>
        <a-form-item label="排序" field="sort">
          <a-input-number
            v-model="formModel.sort"
            placeholder="请输入排序数值"
          />
        </a-form-item>
        <a-form-item label="备注" field="remark">
          <a-textarea v-model="formModel.remark" placeholder="请输入备注" />
        </a-form-item>
      </a-form>
    </a-card>
  </a-drawer>
</template>
