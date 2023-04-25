<script setup lang="ts">
  import { useMenus } from '@/api/system/menu/query';
  import type { MenuRecord } from '@/api/system/menu/type';
  import { useRoleMenuMutation } from '@/api/system/role/query';
  import type { RoleMenuRequest, RoleRecord } from '@/api/system/role/type';
  import DynamicIcon from '@/components/dynamic_icon/index.vue';
  import { FormInstance, TreeNodeData } from '@arco-design/web-vue';
  import { h, ref } from 'vue';
  import Rules from './rules';

  // Props
  const props = defineProps<{
    record: Partial<RoleRecord>;
  }>();

  const formModel = ref<Partial<RoleMenuRequest>>({});
  const title = ref<string>('');
  const visible = ref<boolean>(false);
  const formRef = ref<FormInstance | null>(null);
  const treeData = ref<TreeNodeData[]>([]);

  const openDrawer = () => (visible.value = true);
  const closeDrawer = () => (visible.value = false);

  const convertMenuToTreeNode = (menus: MenuRecord[]): TreeNodeData[] => {
    return menus.map((menu) => {
      const node: TreeNodeData = {
        key: menu.id,
        title: menu.name,
        children: menu.children
          ? convertMenuToTreeNode(menu.children)
          : undefined
      };
      if (menu.icon) {
        node.icon = () => [h(DynamicIcon, { icon: menu.icon })];
      }
      return node;
    });
  };

  const {} = useMenus(ref({}), {
    enabled: visible,
    onSuccess: (data) => {
      treeData.value = convertMenuToTreeNode(data);
    }
  });

  // 开启后
  const afterOpen = () => {
    if (!!props.record.id) {
      formModel.value = { role_id: props.record.id };
      title.value = `更新 ${props.record.name}`;
    } else {
      title.value = '新建角色';
    }
  };
  // 关闭后
  const afterClose = () => (formModel.value = {});

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

  const selectedKeys = ref();
  const checkedKeys = ref();

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
        <a-form-item label="菜单权限" field="menu_ids">
          <a-tree
            v-model:selected-keys="selectedKeys"
            v-model:checked-keys="checkedKeys"
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
