/* eslint-disable */
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
            const result = await this.modelMaps[action[0]].actions[action[1]]({
                commit: this.commit.bind(this, dispatchAction),
                dispatch: this.dispatch.bind(this),
                store: {
                    ...this.store[action[0]]
                },
                state: {
                    ...this.store[action[0]]
                },
            }, params);
            this.subscribes.forEach((fn) => {
                fn(this.store, dispatchAction);
            });
            return result;
        });
    }
    commit (dispatchAction, commonAction, params) {
        const action = dispatchAction.split('/');
        if (!this.modelMaps[action[0]].mutations[commonAction]) {
            throw(new Error('不存在此action'));
            return;
        }
        this.modelMaps[action[0]].mutations[commonAction](this.store[action[0]], params);
    }
    subscribe (fn) {
        this.subscribes.push(fn);
    }
}

export default function (modelMaps) {
    return new Store(modelMaps);
}