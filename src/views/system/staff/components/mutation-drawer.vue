<script setup lang="ts">
  import { useOrganizations } from '@/api/system/organization/query';
  import { usePositionsAll } from '@/api/system/position/query';
  import { useStaffMutation } from '@/api/system/staff/query';
  import { StaffRecord } from '@/api/system/staff/type';
  import useOptions from '@/hooks/useOptions';
  import type { FormInstance } from '@arco-design/web-vue';
  import { ref } from 'vue';
  import Rules from './rules';
  // Props
  const props = defineProps<{
    record: Partial<StaffRecord>;
  }>();

  // Emit
  // const emit = defineEmits<{
  //   (e: 'onMutations'): void;
  // }>();

  const formModel = ref<Partial<StaffRecord>>({});
  const title = ref<string>('');
  const visible = ref<boolean>(false);
  const formRef = ref<FormInstance | null>(null);

  const genderOptions = useOptions('staff_gender');
  const statusOptions = useOptions('system_status');
  const workOptions = useOptions('staff_work_status');

  const openDrawer = () => (visible.value = true);
  const closeDrawer = () => (visible.value = false);

  const { data: organizationData, isLoading: organizationLoading } =
    useOrganizations(ref({}), { enabled: visible });

  const { data: positionData, isLoading: positionLoading } = usePositionsAll(
    ref({}),
    { enabled: visible }
  );
  // 开启后
  const afterOpen = () => {
    if (!!props.record.id) {
      let { role_ids, ...record } = props.record;
      formModel.value = record;
      title.value = `更新 ${props.record.name}`;
    } else {
      formModel.value = { sort: 1000 };
      title.value = '新建员工';
    }
  };
  // 关闭后
  const afterClose = () => (formModel.value = {});

  // Mutation操作
  const staffMutation = useStaffMutation(title.value);
  const handleOk = async () => {
    const err = await formRef.value?.validate();
    if (!err) {
      staffMutation.mutate(formModel.value, {
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
    :okLoading="staffMutation.isLoading.value"
    :title="title"
  >
    <a-card :bordered="false">
      <a-form ref="formRef" :model="formModel" layout="vertical" :rules="Rules">
        <a-divider orientation="left">基础信息</a-divider>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="用户名称" field="username">
              <a-input v-model="formModel.username" placeholder="请输入名称" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="用户姓名" field="name">
              <a-input v-model="formModel.name" placeholder="请输入编码" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-form-item label="电子邮件" field="email">
            <a-input v-model="formModel.email" placeholder="请输入电子邮件" />
          </a-form-item>
          <a-form-item label="移动电话" field="mobile">
            <a-input v-model="formModel.mobile" placeholder="请输入电话号码" />
          </a-form-item>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="性别" field="gender">
              <a-select
                v-model="formModel.gender"
                allowclear
                placeholder="请选择性别"
                :options="genderOptions"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="状态" field="status">
              <a-select
                v-model="formModel.status"
                allowclear
                placeholder="请选择状态"
                :options="statusOptions"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="工作状态" field="work_status">
              <a-select
                v-model="formModel.work_status"
                allowclear
                placeholder="请选择工作状态"
                :options="workOptions"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="排序" field="sort">
              <a-input-number
                v-model="formModel.sort"
                placeholder="请输入排序数值"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-form-item label="备注" field="remark">
            <a-textarea v-model="formModel.remark" placeholder="请输入备注" />
          </a-form-item>
        </a-row>
        <a-divider orientation="left">员工信息</a-divider>
        <a-row>
          <a-form-item label="归属部门" field="organization_id">
            <a-tree-select
              v-model="formModel.organization_id"
              placeholder="请选择归属部门"
              :data="organizationData"
              :loading="organizationLoading"
              :field-names="{
                key: 'id',
                title: 'name'
              }"
            />
          </a-form-item>
          <a-form-item label="岗位" field="position_id">
            <a-select
              v-model="formModel.position_id"
              placeholder="请选择岗位"
              allow-clear
              allow-search
              :loading="positionLoading"
              :options="positionData"
              :field-names="{
                value: 'id',
                label: 'name'
              }"
            />
          </a-form-item>
        </a-row>
      </a-form>
    </a-card>
  </a-drawer>
</template>
