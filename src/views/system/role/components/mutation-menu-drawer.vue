<script setup lang="ts">
  import { useMenus } from '@/api/system/menu/query';
  import { useGrantMenus, useRoleMenuMutation } from '@/api/system/role/query';
  import type {
    RoleMenuParams,
    RoleMenuRequest,
    RoleRecord
  } from '@/api/system/role/type';
  import { FormInstance } from '@arco-design/web-vue';
  import { ref } from 'vue';
  import Rules from './rules';

  // Props
  const props = defineProps<{
    record: Partial<RoleRecord>;
  }>();

  const formModel = ref<Partial<RoleMenuRequest>>({});
  const searchFormParams = ref<Partial<RoleMenuParams>>({});
  const title = ref<string>('');
  const visible = ref<boolean>(false);
  const queryHandler = ref<boolean>(false);
  const formRef = ref<FormInstance | null>(null);

  const openDrawer = () => (visible.value = true);
  const closeDrawer = () => (visible.value = false);

  // 请求所有菜单权限
  const { treeData } = useMenus(ref({}), {
    enabled: visible
  });
  // 请求该角色的菜单权限
  const {} = useGrantMenus(searchFormParams, {
    enabled: queryHandler,
    onSuccess: (data) =>
      (formModel.value.menu_ids = data.map((item) => item.menu_id))
  });

  // 开启后
  const afterOpen = () => {
    formModel.value.role_id = props.record.id;
    searchFormParams.value.role_id = props.record.id;
    queryHandler.value = true;
    title.value = `更新 ${props.record.name} 菜单权限`;
  };
  // 关闭后
  const afterClose = () => {
    formModel.value = {};
    searchFormParams.value = {};
    queryHandler.value = false;
    closeDrawer();
  };

  // Mutation操作
  const roleMenuMutation = useRoleMenuMutation();
  const handleOk = async () => {
    const err = await formRef.value?.validate();
    if (!err) {
      roleMenuMutation.mutate(formModel.value, {
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
    :okLoading="roleMenuMutation.isLoading.value"
    :title="title"
  >
    <a-card :bordered="false">
      <a-form ref="formRef" :model="formModel" layout="vertical" :rules="Rules">
        <a-form-item field="menu_ids">
          <a-tree
            v-model:checked-keys="formModel.menu_ids"
            default-expand-all
            multiple
            checkable
            :data="treeData"
          />
        </a-form-item>
      </a-form>
    </a-card>
  </a-drawer>
</template>
