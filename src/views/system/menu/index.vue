<script setup lang="ts">
  import { useMenuDelete, useMenus } from '@/api/system/menu/query';
  import type { MenuParams, MenuRecord } from '@/api/system/menu/type';
  import type { RoleParams } from '@/api/system/role/type';
  import DictionaryTag from '@/components/dictionary_tag/index.vue';
  import DynamicIcon from '@/components/dynamic_icon/index.vue';
  import useOptions from '@/hooks/useOptions';
  import { ref } from 'vue';
  import { Columns } from './columns';
  import MutationDrawer from './components/mutation-drawer.vue';
  import OperatorButton from './components/operator-button.vue';
  import SearchForm from './components/search-form.vue';

  const searchFormParams = ref<Partial<MenuParams>>({});
  const currentRecord = ref<Partial<MenuRecord>>({});
  const mutationRef = ref();

  // 请求分页
  const { data, isLoading } = useMenus(searchFormParams);
  // 搜索
  const onSearch = (params: Partial<RoleParams>) =>
    (searchFormParams.value = { ...params });
  // 新建
  const onCreate = () => {
    currentRecord.value = {};
    mutationRef.value?.openDrawer();
  };
  // 删除
  const { confirmRemove } = useMenuDelete();
  const onDelete = (record: Partial<MenuRecord>) => {
    confirmRemove(record);
  };
  // 修改
  const onModify = (record: Partial<MenuRecord>) => {
    currentRecord.value = record;
    mutationRef.value?.openDrawer();
  };

  const typesOptions = useOptions('menu_type');
  const statusOptions = useOptions('system_status');
</script>

<template>
  <a-card :bordered="false">
    <SearchForm @onSearch="onSearch" />
    <OperatorButton @onCreate="onCreate" />
    <a-table
      row-key="id"
      table-layout-fixed
      :columns="Columns"
      :data="data"
      :loading="isLoading"
      :pagination="false"
    >
      <template #type="{ record }">
        <DictionaryTag :status="record.type" :options="typesOptions" />
      </template>
      <template #icon="{ record }">
        <DynamicIcon :icon="record.icon" />
      </template>
      <template #status="{ record }">
        <DictionaryTag :status="record.status" :options="statusOptions" />
      </template>
      <template #operations="{ record }">
        <a-space :size="0">
          <a-button-group>
            <a-dropdown-button
              v-auth="'/system/menus:PUT'"
              @click="onModify(record)"
            >
              <span title="编辑">编辑</span>
              <template #icon>
                <icon-down />
              </template>
              <template #content>
                <a-doption
                  v-auth="'/system/menus:DELETE'"
                  @click="onDelete(record)"
                >
                  <template #icon>
                    <icon-delete />
                  </template>
                  <template #default>
                    <a-typography-text type="danger"> 删除 </a-typography-text>
                  </template>
                </a-doption>
              </template>
            </a-dropdown-button>
          </a-button-group>
        </a-space>
      </template>
    </a-table>
  </a-card>
  <MutationDrawer ref="mutationRef" :record="currentRecord" />
</template>

<style scoped lang="less"></style>
