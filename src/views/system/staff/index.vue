<script setup lang="ts">
  import { useStaffDelete, useStaffs } from '@/api/system/staff/query';
  import { StaffParams, StaffRecord } from '@/api/system/staff/type';
  import DictionaryTag from '@/components/dictionary_tag/index.vue';
  import useOptions from '@/hooks/useOptions';
  import { CalCurrent } from '@/utils/paginator';
  import { ref } from 'vue';
  import { Columns } from './columns';
  import MutationDrawer from './components/mutation-drawer.vue';
  import MutationRoleDrawer from './components/mutation-role-drawer.vue';
  import OperatorButton from './components/operator-button.vue';
  import OrganizationTree from './components/organization-tree.vue';
  import SearchForm from './components/search-form.vue';

  const mutationRef = ref();
  const roleDrawerRef = ref();
  const searchFormParams = ref<Partial<StaffParams>>({});
  const currentRecord = ref<Partial<StaffRecord>>({});

  const { data, isLoading } = useStaffs(searchFormParams);

  // 搜索
  const onSearch = (params: Partial<StaffParams>) => {
    searchFormParams.value = { ...params };
  };
  // 新建
  const onCreate = () => {
    currentRecord.value = {};
    mutationRef.value?.openDrawer();
  };
  // 删除
  const { confirmRemove } = useStaffDelete();
  const onDelete = (record: StaffRecord) => {
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
  const onModify = (record: Partial<StaffRecord>) => {
    currentRecord.value = record;
    mutationRef.value?.openDrawer();
  };
  // 分页
  const onPageChange = (current: number) => {
    searchFormParams.value = { ...searchFormParams.value, current };
  };
  // 点击组织
  const onSelectOrganizaiton = (organization_id: string | number) => {
    searchFormParams.value = { organization_id: organization_id as string };
  };
  // 分配角色
  const onAssignRole = (record: Partial<StaffRecord>) => {
    currentRecord.value = record;
    roleDrawerRef.value?.openDrawer();
  };

  const genderOptions = useOptions('staff_gender');
  const statusOptions = useOptions('system_status');
  const workOptions = useOptions('staff_work_status');
</script>

<template>
  <a-row>
    <a-col
      :span="4"
      class="border-0 border-r border-solid border-arco-border-2 h-full"
    >
      <a-card :bordered="false">
        <OrganizationTree @onSelect="onSelectOrganizaiton" />
      </a-card>
    </a-col>
    <a-col :span="20">
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
          <template #gender="{ record }">
            <DictionaryTag :status="record.gender" :options="genderOptions" />
          </template>
          <template #status="{ record }">
            <DictionaryTag :status="record.status" :options="statusOptions" />
          </template>
          <template #work_status="{ record }">
            <DictionaryTag
              :status="record.work_status"
              :options="workOptions"
            />
          </template>
          <template #operations="{ record }">
            <a-space :size="0">
              <a-button-group>
                <a-button
                  v-auth="'/system/staffs/roles:POST'"
                  title="分配角色"
                  @click="onAssignRole(record)"
                >
                  <template #icon><icon-list /></template>
                </a-button>
                <a-dropdown-button
                  v-auth="'/system/staffs:PUT'"
                  @click="onModify(record)"
                >
                  <span title="编辑">编辑</span>
                  <template #icon>
                    <icon-down />
                  </template>
                  <template #content>
                    <a-doption
                      v-auth="'/system/staffs:DELETE'"
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
    </a-col>
  </a-row>
  <MutationDrawer ref="mutationRef" :record="currentRecord" />
  <MutationRoleDrawer ref="roleDrawerRef" :record="currentRecord" />
</template>

<style scoped lang="less"></style>
