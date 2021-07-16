import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enUS from './en-us';
import zhCN from './zh-cn';

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'zh-cn',  // 语言标识
    messages: {
        'zh-cn': zhCN,
        'en-us': enUS
    },
    silentTranslationWarn: true // 去除console中黄色报错
});

export default i18n;