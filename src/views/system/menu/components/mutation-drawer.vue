<script setup lang="ts">
  import { useMenuMutation, useMenus } from '@/api/system/menu/query';
  import type { MenuRecord } from '@/api/system/menu/type';
  import { SystemMenuEnum } from '@/common/constants';
  import useOptions from '@/hooks/useOptions';
  import { FormInstance } from '@arco-design/web-vue';
  import { ref } from 'vue';
  import Rules from './rules';

  // Props
  const props = defineProps<{
    record: Partial<MenuRecord>;
  }>();

  const formModel = ref<Partial<MenuRecord>>({});
  const title = ref<string>('');
  const visible = ref<boolean>(false);
  const formRef = ref<FormInstance | null>(null);

  const typesOptions = useOptions('menu_type');
  const methodsOptions = useOptions('menu_method');
  const statusOptions = useOptions('system_status');

  const openDrawer = () => (visible.value = true);
  const closeDrawer = () => (visible.value = false);

  // 请求
  const { isLoading, treeSelectData } = useMenus(ref({}), {
    enabled: visible
  });
  // 开启后
  const afterOpen = () => {
    if (!!props.record.id) {
      formModel.value = { ...props.record };
      title.value = `更新 ${props.record.name}`;
    } else {
      formModel.value = { sort: 1000 };
      title.value = '新建菜单';
    }
  };
  // 关闭后
  const afterClose = () => (formModel.value = {});

  // Mutation操作
  const menuMutation = useMenuMutation(title.value);
  const handleOk = async () => {
    const err = await formRef.value?.validate();
    if (!err) {
      menuMutation.mutate(formModel.value, {
        onSuccess: () => {
          closeDrawer();
        }
      });
    }
  };
  const filterTreeNode = (searchValue: string, nodeData: any) => {
    return nodeData.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
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
    :okLoading="menuMutation.isLoading.value"
    :title="title"
  >
    <a-card :bordered="false">
      <a-form ref="formRef" :model="formModel" layout="vertical" :rules="Rules">
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="类型" field="type">
              <a-radio-group
                :options="typesOptions"
                v-model="formModel.type"
                type="button"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="上级菜单" field="parent_id">
              <a-tree-select
                v-model="formModel.parent_id"
                :data="treeSelectData"
                :loading="isLoading"
                :allow-search="true"
                :allow-clear="true"
                placeholder="请选择上级菜单"
                :filter-tree-node="filterTreeNode"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="名称" field="name">
              <a-input v-model="formModel.name" placeholder="请输入名称" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="图标"
              field="icon"
              v-if="formModel.type != SystemMenuEnum.Button"
            >
              <a-input v-model="formModel.icon" placeholder="请选择图标" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="路径" field="path">
              <a-input v-model="formModel.path" placeholder="请输入路径" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="组件"
              field="component"
              v-if="formModel.type === SystemMenuEnum.Menu"
            >
              <a-input v-model="formModel.component" placeholder="请输入组件" />
            </a-form-item>
          </a-col>
        </a-row>
        <!-- <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="权限" field="permission">
              <a-input v-model="formModel.permission" placeholder="请输入权限标识" />
            </a-form-item>
          </a-col>
        </a-row> -->
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item
              label="请求方式"
              field="method"
              v-if="formModel.type === SystemMenuEnum.Button"
            >
              <a-select
                v-model="formModel.method"
                allowclear
                placeholder="请选择请求方式"
                :options="methodsOptions"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
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
          <a-col :span="12">
            <a-form-item label="排序" field="sort">
              <a-input-number
                v-model="formModel.sort"
                placeholder="请输入排序数值"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="备注" field="remark">
              <a-textarea v-model="formModel.remark" placeholder="请输入备注" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
  </a-drawer>
</template>
