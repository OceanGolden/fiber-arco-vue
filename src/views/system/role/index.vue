<script setup lang="ts">
  import { useRoleDelete, useRoles } from '@/api/system/role/query';
  import type { RoleParams, RoleRecord } from '@/api/system/role/type';
  import DictionaryTag from '@/components/dictionary_tag/index.vue';
  import useOptions from '@/hooks/useOptions';
  import { CalCurrent } from '@/utils/paginator';
  import { ref } from 'vue';
  import { Columns } from './columns';
  import MutationDrawer from './components/mutation-drawer.vue';
  import MutationMenuDrawer from './components/mutation-menu-drawer.vue';
  import OperatorButton from './components/operator-button.vue';
  import SearchForm from './components/search-form.vue';

  const searchFormParams = ref<Partial<RoleParams>>({});
  const currentRecord = ref<Partial<RoleRecord>>({});
  const mutationRef = ref();
  const mutationMenuRef = ref();

  // 请求分页
  const { data, isLoading } = useRoles(searchFormParams);
  const { confirmRemove } = useRoleDelete();
  // 搜索
  const onSearch = (params: Partial<RoleParams>) =>
    (searchFormParams.value = { ...params });
  // 新建
  const onCreate = () => {
    currentRecord.value = {};
    mutationRef.value?.openDrawer();
  };
  // 删除
  const onDelete = (record: Partial<RoleRecord>) => {
    confirmRemove(record, () => {
      const current = CalCurrent(
        data?.value?.current,
        data?.value?.pageSize,
        data?.value?.total
      );
      searchFormParams.value = { ...searchFormParams.value, current };
      return data?.value?.current === current;
    });
  };
  // 修改
  const onModify = (record: Partial<RoleRecord>) => {
    currentRecord.value = record;
    mutationRef.value?.openDrawer();
  };
  // 分页
  const onPageChange = (current: number) => {
    searchFormParams.value = { ...searchFormParams.value, current };
  };
  // 分配权限
  const onGrant = (record: Partial<RoleRecord>) => {
    currentRecord.value = record;
    mutationMenuRef.value?.openDrawer();
  };
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
      :data="data?.list"
      :loading="isLoading"
      @pageChange="onPageChange"
      :pagination="{
        showTotal: true,
        pageSize: data?.pageSize,
        current: data?.current,
        total: data?.total
      }"
    >
      <template #status="{ record }">
        <DictionaryTag :status="record.status" :options="statusOptions" />
      </template>
      <template #operations="{ record }">
        <a-space :size="0">
          <a-button-group>
            <a-button title="分配权限" @click="onGrant(record)">
              <template #icon><icon-list /></template>
            </a-button>
            <a-dropdown-button
              v-auth="'/system/roles:PUT'"
              @click="onModify(record)"
            >
              <span title="编辑">编辑</span>
              <template #icon>
                <icon-down />
              </template>
              <template #content>
                <a-doption
                  v-auth="'/system/roles:DELETE'"
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
  <MutationMenuDrawer ref="mutationMenuRef" :record="currentRecord" />
</template>

<style scoped lang="less"></style>
