import * as DictionaryService from '@/api/system/dictionary/service';

import { computed, ref } from 'vue';

import { DictionaryItemRecord } from '@/api/system/dictionary_item/type';
import { defineStore } from 'pinia';
import { useQuery } from '@tanstack/vue-query';

export const useDictionaryStore = defineStore('dictionary', () => {
  // 设定基础状态
  const dictionaryMap = ref<Map<string, DictionaryItemRecord[]>>(new Map());
  const isLoading = ref<boolean>(false);
  const selectOptions = computed(
    () => (code: string) => dictionaryMap.value.get(code)
  );

  const fetchDictionaryItemsByCode = async (code: string) => {
    useQuery({
      queryKey: ['dictionary-items-query', code],
      queryFn: () => DictionaryService.queryItems(code),
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        dictionaryMap.value.set(code, data);
      }
    });
    // const res = await DictionaryService.queryItems(code);
    // this.dictionaryMap.set(code, res);
  };
  return {
    dictionaryMap,
    isLoading,
    selectOptions,
    fetchDictionaryItemsByCode
  };
});
