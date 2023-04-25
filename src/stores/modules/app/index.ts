import { defineStore } from 'pinia';
import { ref } from 'vue';

const useAppStore = defineStore('app', () => {
  const themeState = ref<string>('light');

  // Change theme color
  const toggleTheme = (dark: boolean) => {
    if (dark) {
      themeState.value = 'dark';
      document.body.setAttribute('arco-theme', 'dark');
    } else {
      themeState.value = 'light';
      document.body.removeAttribute('arco-theme');
    }
  };

  return { themeState, toggleTheme };
});

export default useAppStore;
