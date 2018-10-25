export default {
    state: {// 目前支持state必须是一个对象，不支持重新赋值
        count: 0,
        urlParam: null,
    },
    mutations:{
        add(state, data) {
            state.count = data;
        },
        changeUrlParam(state, data) {
            state.urlParam = data;
        }
    },
    actions: {
        async add({commit, store}, {count}) {
            setTimeout(function () {
                commit('state1/add', store.count + count);
            }, 1000);
        },
        async changeUrlParam({commit}, {data}) {
            setTimeout(() => {
                commit('state1/changeUrlParam', data)
            }, 2000);
        } 
    },
}
