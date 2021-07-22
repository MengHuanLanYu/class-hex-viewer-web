import Vue from 'vue';
import App from './App.vue';
import i18n from "./components/i18n";
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
// 用于vue总线事件
Vue.prototype.$eventBus = new Vue();
Vue.use(ElementUI);

new Vue({
    i18n,
    router,
    render: h => h(App),
}).$mount('#app');
