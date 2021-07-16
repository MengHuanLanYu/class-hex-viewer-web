import Vue from 'vue';
import App from './App.vue';
import i18n from "./components/i18n";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
    i18n,
    render: h => h(App),
}).$mount('#app');
