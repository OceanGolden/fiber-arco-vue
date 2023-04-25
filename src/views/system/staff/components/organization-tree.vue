<template>
  <div>
    <a-input-search style="margin-bottom: 1rem" v-model="searchKey" />
    <a-tree
      v-if="treeData"
      :data="treeData"
      :field-names="{
        key: 'id',
        title: 'name',
        children: 'children'
      }"
      default-expand-all
      @select="onSelect"
    >
    </a-tree>
  </div>
</template>

<script lang="ts" setup>
  import { useOrganizations } from '@/api/system/organization/query';
  import { OrganizationRecord } from '@/api/system/organization/type';
  import { computed, ref } from 'vue';

  const emit = defineEmits<{
    (e: 'onSelect', value: string | number): void;
  }>();

  const onSelect = (
    selectedKeys: (string | number)[]
    // event: {
    //   selected?: boolean;
    // }
  ) => {
    emit('onSelect', selectedKeys.shift() || '');
  };

  const searchKey = ref('');
  const treeData = computed(() => {
    if (!searchKey.value) return data.value;
    return searchData(searchKey.value);
  });

  // 搜索
  function searchData(keyword: string) {
    const loop = (data: OrganizationRecord[] | undefined) => {
      const result = <OrganizationRecord[]>[];
      data?.forEach((item) => {
        if (item.name.indexOf(keyword) > -1) {
          result.push({ ...item });
        } else if (item.children) {
          const filterData = loop(item.children);
          if (filterData.length) {
            result.push({
              ...item,
              children: filterData
            });
          }
        }
      });
      return result;
    };

    return loop(data?.value);
  }

  const { data } = useOrganizations(ref({}));
</script>
