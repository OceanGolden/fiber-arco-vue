import 'virtual:windi.css';

import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { createApp } from 'vue';
import App from './App.vue';
import { setupGlobDirectives } from './directives';
import router from './router';
import pinia from './stores';

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: { queries: { refetchOnWindowFocus: false } }
  }
});
app.use(setupGlobDirectives);
app.use(ArcoVueIcon);

app.mount('#app');
