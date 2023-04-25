<script setup lang="ts">
  import type { DictionaryRecord } from '@/api/system/dictionary/type';
  import {
    useDictionaryItemDelete,
    useDictionaryItems
  } from '@/api/system/dictionary_item/query';
  import type {
    DictionaryItemParams,
    DictionaryItemRecord
  } from '@/api/system/dictionary_item/type';
  import DictionaryTag from '@/components/dictionary_tag/index.vue';
  import useOptions from '@/hooks/useOptions';
  import { CalCurrent } from '@/utils/paginator';
  import { ref } from 'vue';
  import { Columns } from './columns';
  import MutationDrawer from './components/mutation-drawer.vue';
  import OperatorButton from './components/operator-button.vue';
  import SearchForm from './components/search-form.vue';

  // Props
  const props = defineProps<{
    record: Partial<DictionaryRecord>;
  }>();

  const mutationRef = ref();
  const visible = ref<boolean>(false);
  const queryHandle = ref<boolean>(false);
  const searchFormParams = ref<Partial<DictionaryItemParams>>({});
  const currentRecord = ref<Partial<DictionaryItemRecord>>({});

  // 请求分页
  const { data, isLoading } = useDictionaryItems(searchFormParams, {
    enabled: queryHandle
  });
  // 搜索
  const onSearch = (params: Partial<DictionaryItemParams>) =>
    (searchFormParams.value = { ...params, dictionary_id: props.record.id });
  // 新建
  const onCreate = () => {
    currentRecord.value = { dictionary_id: props.record.id };
    mutationRef.value?.openDrawer();
  };
  // 删除
  const { confirmRemove } = useDictionaryItemDelete();
  const onDelete = (record: Partial<DictionaryItemRecord>) => {
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
  const onModify = (record: Partial<DictionaryItemRecord>) => {
    currentRecord.value = record;
    mutationRef.value?.openDrawer();
  };
  // 分页
  const onPageChange = (current: number) => {
    searchFormParams.value = { ...searchFormParams.value, current };
  };

  // drawer 操作
  const openDrawer = () => {
    visible.value = true;
  };
  const closeDrawer = () => {
    visible.value = false;
    queryHandle.value = false;
  };
  // 开启后
  const afterOpen = () => {
    searchFormParams.value = { dictionary_id: props.record.id };
    queryHandle.value = true;
  };

  // 关闭后
  const afterClose = () => {
    searchFormParams.value = {};
    queryHandle.value = false;
    closeDrawer();
  };
  // 数据字典
  const statusOptions = useOptions('system_status');

  defineExpose({ openDrawer, searchFormParams });
</script>

<template>
  <a-drawer
    :visible="visible"
    @open="afterOpen"
    @cancel="afterClose"
    width="45%"
    :unmountOnClose="true"
    :title="props.record.name"
    :footer="false"
  >
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
        <template #color="{ record }">
          <a-tag :key="record.color" :color="record.color">
            {{ record.color }}
          </a-tag>
        </template>
        <template #status="{ record }">
          <DictionaryTag :status="record.status" :options="statusOptions" />
        </template>
        <template #operations="{ record }">
          <a-space :size="0">
            <a-button-group>
              <a-dropdown-button
                v-auth="'/system/dictionary/items:PUT'"
                @click="onModify(record)"
              >
                <span title="编辑">编辑</span>
                <template #icon>
                  <icon-down />
                </template>
                <template #content>
                  <a-doption
                    v-auth="'/system/dictionary/items:DELETE'"
                    @click="onDelete(record)"
                  >
                    <template #icon>
                      <icon-delete />
                    </template>
                    <template #default>
                      <a-typography-text type="danger">
                        删除
                      </a-typography-text>
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
  </a-drawer>
</template>

<style scoped lang="less"></style>
