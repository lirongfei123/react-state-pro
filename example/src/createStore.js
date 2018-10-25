import { createProviderAndConnect, createStore } from '../../src/index';
import stateConfig from './modules';
const state = createStore(stateConfig);
const context = createProviderAndConnect(state);
const Provider = context.Provider;
const connect = context.connect;
export {Provider, connect};