<script setup lang="ts">
  import { useDictionaryItemMutation } from '@/api/system/dictionary_item/query';
  import type { DictionaryItemRecord } from '@/api/system/dictionary_item/type';
  import useOptions from '@/hooks/useOptions';
  import type { FormInstance } from '@arco-design/web-vue';
  import { ref } from 'vue';
  import Rules from './rules';

  const colorOptions = [
    { label: 'red', value: 'red' },
    { label: 'orangered', value: 'orangered' },
    { label: 'orange', value: 'orange' },
    { label: 'gold', value: 'gold' },
    { label: 'lime', value: 'lime' },
    { label: 'green', value: 'green' },
    { label: 'cyan', value: 'cyan' },
    { label: 'blue', value: 'blue' },
    { label: 'arcoblue', value: 'arcoblue' },
    { label: 'purple', value: 'purple' },
    { label: 'magenta', value: 'magenta' }
  ];
  // Props
  const props = defineProps<{
    record: Partial<DictionaryItemRecord>;
  }>();

  const formModel = ref<Partial<DictionaryItemRecord>>({});
  const title = ref<string>('');
  const visible = ref<boolean>(false);
  const formRef = ref<FormInstance | null>(null);

  const statusOptions = useOptions('system_status');

  const openDrawer = () => (visible.value = true);
  const closeDrawer = () => (visible.value = false);

  // 开启后
  const afterOpen = () => {
    if (!!props.record.id) {
      formModel.value = { ...props.record };
      title.value = `更新 ${props.record.label}`;
    } else {
      formModel.value = {
        sort: 1000,
        dictionary_id: props.record.dictionary_id
      };
      title.value = '新建字典选项';
    }
  };
  // 关闭后
  const afterClose = () => (formModel.value = {});

  // Mutation操作
  const dictionaryItemMutation = useDictionaryItemMutation();
  const handleOk = async () => {
    const err = await formRef.value?.validate();
    if (!err) {
      dictionaryItemMutation.mutate(formModel.value, {
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
    :okLoading="dictionaryItemMutation.isLoading.value"
    :title="title"
  >
    <a-card :bordered="false">
      <a-form ref="formRef" :model="formModel" layout="vertical" :rules="Rules">
        <a-form-item label="选项名称" field="label">
          <a-input v-model="formModel.label" placeholder="请输入名称" />
        </a-form-item>
        <a-form-item label="选项数据" field="value">
          <a-input v-model="formModel.value" placeholder="请输入数据" />
        </a-form-item>
        <a-form-item label="颜色" field="color">
          <a-select
            v-model="formModel.color"
            allowclear
            placeholder="请选择颜色"
            :style="{ backgroundColor: `${formModel.color}` }"
          >
            <a-option
              v-for="option in colorOptions"
              :value="option.value"
              :label="option.label"
              :style="{ backgroundColor: `${option.value}` }"
            />
          </a-select>
        </a-form-item>
        <a-form-item label="状态" field="status">
          <a-select
            v-model="formModel.status"
            allowclear
            placeholder="请选择状态"
            :options="statusOptions"
          />
        </a-form-item>
        <a-form-item label="排序" field="sort" initialValue="{1000}">
          <a-input-number
            v-model="formModel.sort"
            placeholder="请输入排序数值"
          />
        </a-form-item>
        <a-form-item label="备注" field="remark">
          <a-textarea v-model="formModel.remark" placeholder="请输入备注" />
        </a-form-item>
      </a-form>
    </a-card>
  </a-drawer>
</template>
