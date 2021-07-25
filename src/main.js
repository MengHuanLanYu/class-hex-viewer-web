import Vue from 'vue';
import App from './App.vue';
import store from './store';
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
    store,
    render: h => h(App),
}).$mount('#app');
