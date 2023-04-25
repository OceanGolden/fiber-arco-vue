import { ref } from 'vue';

export default function useCollapsed(initValue = false) {
  const collapsed = ref(initValue);
  const setCollapsed = (value: boolean) => {
    collapsed.value = value;
  };
  const toggle = () => {
    collapsed.value = !collapsed.value;
  };
  return {
    collapsed,
    setCollapsed,
    toggle
  };
}
