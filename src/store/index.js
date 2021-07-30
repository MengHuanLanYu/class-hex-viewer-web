import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const state = {
    isShowAuxiliaryLine: false,
    classInfo: {}
}

const getters = {
    getIsShowAuxiliaryLine(state) {
        return state.isShowAuxiliaryLine;
    },
    getClassInfo(state) {
        return state.classInfo;
    }
}

const mutations = {
    setIsShowAuxiliaryLine(state, info) {
        state.isShowAuxiliaryLine = info;
    },
    setClassInfo(state, info) {
        state.classInfo = info;
    }
}

const actions = {
    setIsShowAuxiliaryLine(context, info) {
        context.commit('setIsShowAuxiliaryLine', info);
    },
    setClassInfo(context, info) {
        context.commit('setClassInfo', info);
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    plugins: [createPersistedState()]
});