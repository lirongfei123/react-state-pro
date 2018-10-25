const co = require('co');
class Store {
    constructor(modelMaps) {
        Object.keys(modelMaps).forEach((namespace) => {
            this.store[namespace] = modelMaps[namespace].state;
        });
        this.modelMaps = modelMaps;
    }
    store = {
    };
    subscribes = [];
    getStore() {
        return this.store;
    }
    dispatch(dispatchAction, params) {
        const action = dispatchAction.split('/');
        return co(async () => {
            await this.modelMaps[action[0]].actions[action[1]]({
                commit: this.commit.bind(this, dispatchAction),
                dispatch: this.dispatch.bind(this),
                store: {
                    ...this.store[action[0]]
                },
                state: {
                    ...this.store[action[0]]
                },
            }, params)
        });
    }
    commit (dispatchAction, commonAction, params) {
        const action = commonAction.split('/');
        if (!this.modelMaps[action[0]].mutations[action[1]]) {
            throw(new Error('不存在此action'));
            return;
        }
        this.modelMaps[action[0]].mutations[action[1]](this.store[action[0]], params);
        this.subscribes.forEach((fn) => {
            fn(this.store, dispatchAction);
        });
    }
    subscribe (fn) {
        this.subscribes.push(fn);
    }
}

export default function (modelMaps) {
    return new Store(modelMaps);
}