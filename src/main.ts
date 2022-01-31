import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import VueApexCharts from 'vue3-apexcharts';
import '@fontsource/roboto';

createApp(App).use(VueApexCharts).use(store).use(router).mount('#app');
