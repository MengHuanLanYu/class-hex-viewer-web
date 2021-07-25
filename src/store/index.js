import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const state = {
    isShowAuxiliaryLine: false
}

const getters = {
    getIsShowAuxiliaryLine(state) {
        return state.isShowAuxiliaryLine;
    }
}

const mutations = {
    setIsShowAuxiliaryLine(state, info) {
        state.isShowAuxiliaryLine = info;
    }
}

const actions = {
    setIsShowAuxiliaryLine(context, info) {
        context.commit('setIsShowAuxiliaryLine', info);
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    plugins: [createPersistedState()]
});