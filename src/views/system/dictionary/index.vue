<script setup lang="ts">
  import {
    useDictionaries,
    useDictionaryDelete
  } from '@/api/system/dictionary/query';
  import {
    DictionaryParams,
    DictionaryRecord
  } from '@/api/system/dictionary/type';
  import DictionaryTag from '@/components/dictionary_tag/index.vue';
  import useOptions from '@/hooks/useOptions';
  import { CalCurrent } from '@/utils/paginator';
  import { ref } from 'vue';
  import DictionaryItem from '../dictionary-item/index.vue';
  import { Columns } from './columns';
  import MutationDrawer from './components/mutation-drawer.vue';
  import OperatorButton from './components/operator-button.vue';
  import SearchForm from './components/search-form.vue';

  const mutationRef = ref();
  const searchFormParams = ref<Partial<DictionaryParams>>({});
  const currentRecord = ref<Partial<DictionaryRecord>>({});
  // 请求分页
  const { data, isLoading } = useDictionaries(searchFormParams);
  // 搜索
  const onSearch = (params: Partial<DictionaryParams>) =>
    (searchFormParams.value = { ...params });
  // 新建
  const onCreate = () => {
    currentRecord.value = {};
    mutationRef.value?.openDrawer();
  };
  // 删除
  const { confirmRemove } = useDictionaryDelete();
  const onDelete = (record: Partial<DictionaryRecord>) => {
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
  const onModify = (record: Partial<DictionaryRecord>) => {
    currentRecord.value = record;
    mutationRef.value?.openDrawer();
  };
  // 分页
  const onPageChange = (current: number) => {
    searchFormParams.value = { ...searchFormParams.value, current };
  };
  // 查看 字典选项表格
  const dictionaryItemRef = ref();
  const onView = (record: Partial<DictionaryRecord>) => {
    currentRecord.value = record;
    dictionaryItemRef.value?.openDrawer();
  };
  // 数据字典
  const statusOptions = useOptions('system_status');
</script>

<template>
  <a-card :bordered="false">
    <SearchForm @onSearch="onSearch" />
    <OperatorButton @onCreate="onCreate" />
    <a-table
      row-key="id"
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
            <a-button title="查看选项" @click="onView(record)">
              <template #icon><icon-list /></template>
            </a-button>
            <a-dropdown-button
              v-auth="'/system/dictionaries:PUT'"
              @click="onModify(record)"
            >
              <span title="编辑">编辑</span>
              <template #icon>
                <icon-down />
              </template>
              <template #content>
                <a-doption
                  v-auth="'/system/dictionaries:DELETE'"
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
  <DictionaryItem ref="dictionaryItemRef" :record="currentRecord" />
</template>

<style scoped lang="less"></style>
