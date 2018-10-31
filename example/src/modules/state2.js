export default {
    state: {// 目前支持state必须是一个对象，不支持重新赋值
        count: 100
    },
    mutations: {
        reduce (state, data) {
            state.count = data
        }
    },
    actions: {
        async reduce ({ commit, store }, data) {
        }
    }
}
