export default {
    state: {// 目前支持state必须是一个对象，不支持重新赋值
        count: 0
    },
    mutations: {
        add (state, data) {
            state.count = data
        }
    },
    actions: {
        async add ({ commit, store }, data) {
            setTimeout(function () {
                commit('state1/add', ++store.count)
            }, 500)
        }
    }
}
