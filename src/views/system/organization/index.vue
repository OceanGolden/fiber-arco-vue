<script setup lang="ts">
  import {
    useOrganizationDelete,
    useOrganizations
  } from '@/api/system/organization/query';
  import type {
    OrganizationParams,
    OrganizationRecord
  } from '@/api/system/organization/type';
  import DictionaryTag from '@/components/dictionary_tag/index.vue';
  import useOptions from '@/hooks/useOptions';
  import { ref } from 'vue';
  import { Columns } from './columns';
  import MutationDrawer from './components/mutation-drawer.vue';
  import OperatorButton from './components/operator-button.vue';
  import SearchForm from './components/search-form.vue';

  const mutationRef = ref();
  const searchFormParams = ref<Partial<OrganizationParams>>({});
  const currentRecord = ref<Partial<OrganizationRecord>>({});
  // 请求
  const { data, isLoading } = useOrganizations(searchFormParams);
  // 搜索
  const onSearch = (params: Partial<OrganizationParams>) =>
    (searchFormParams.value = { ...params });
  // 新建
  const onCreate = () => {
    currentRecord.value = {};
    mutationRef.value?.openDrawer();
  };
  // 删除
  const { confirmRemove } = useOrganizationDelete();
  const onDelete = (record: Partial<OrganizationRecord>) => {
    confirmRemove(record);
  };
  // 修改
  const onModify = (record: Partial<OrganizationRecord>) => {
    currentRecord.value = record;
    mutationRef.value?.openDrawer();
  };

  const statusOptions = useOptions('system_status');
</script>

<template>
  <a-card :bordered="false">
    <SearchForm @onSearch="onSearch" />
    <OperatorButton @onCreate="onCreate" />
    <a-table
      v-if="data"
      row-key="id"
      :columns="Columns"
      :data="data"
      :loading="isLoading"
      :pagination="false"
      :expandable="{
        defaultExpandAllRows: true
      }"
    >
      <template #status="{ record }">
        <DictionaryTag :status="record.status" :options="statusOptions" />
      </template>
      <template #operations="{ record }">
        <a-space :size="0">
          <a-button-group>
            <a-dropdown-button
              v-auth="'/system/organizations:PUT'"
              @click="onModify(record)"
            >
              <span title="编辑">编辑</span>
              <template #icon>
                <icon-down />
              </template>
              <template #content>
                <a-doption
                  v-auth="'/system/organizations:DELETE'"
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
