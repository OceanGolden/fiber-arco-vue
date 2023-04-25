import { useDictionaryStore } from '@/stores';
import { computed } from 'vue';

export default function useOptions(code: string) {
  const store = useDictionaryStore();
  const { selectOptions } = store;
  const options = computed(() => selectOptions(code));

  if (!selectOptions(code)?.length) {
    store.fetchDictionaryItemsByCode(code);
  }
  // const options = computed(() => selectOptions(code));
  return options;
}

// export function useDictOptions(code: string) {
//   const store = useDictionaryStore();
//   const { selectOptions } = store;
//   const options = computedAsync(() => {
//     store.fetchDictionaryItemsByCode(code);
//     return selectOptions(code);
//   }, selectOptions(code));

//   return options;
// }
