<script setup lang="ts">
  import { useRolesAll } from '@/api/system/role/query';
  import { useStaffRoleMutation } from '@/api/system/staff/query';
  import type { StaffRecord, StaffRoleRequest } from '@/api/system/staff/type';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { reactive, ref } from 'vue';
  import Rules from './rules';

  // Props
  const props = defineProps<{
    record: Partial<StaffRecord>;
  }>();

  const formModel = reactive<StaffRoleRequest>({ staff_id: '', role_ids: [] });
  const title = ref<string>('');
  const visible = ref<boolean>(false);
  const formRef = ref<FormInstance | null>(null);

  const openDrawer = () => (visible.value = true);
  const closeDrawer = () => (visible.value = false);

  // 开启后
  const afterOpen = () => {
    formModel.staff_id = props.record.id || '';
    formModel.role_ids = props.record.role_ids || [];
    title.value = `分配角色给 ${props.record.name}`;
  };
  // 关闭后
  const afterClose = () => {
    formModel.staff_id = '';
    formModel.role_ids = [];
  };

  const { data: roleData, isLoading: roleLoading } = useRolesAll(ref({}), {
    enabled: visible
  });

  const staffRoleMutation = useStaffRoleMutation();

  // Mutation操作
  const handleOk = async () => {
    const err = await formRef.value?.validate();
    if (!err) {
      staffRoleMutation.mutate(formModel, {
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
    :okLoading="staffRoleMutation.isLoading.value"
    :title="title"
  >
    <a-card :bordered="false">
      <a-form
        ref="formRef"
        :model="formModel"
        layout="vertical"
        :rules="Rules"
        initValue="RoleData"
      >
        <a-form-item label="角色" field="role_ids">
          <a-select
            v-model="formModel.role_ids"
            placeholder="请选择角色"
            allow-clear
            :loading="roleLoading"
            multiple
          >
            <a-option v-for="item of roleData" :value="item.id">
              {{ item.name }}
            </a-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-card>
  </a-drawer>
</template>
