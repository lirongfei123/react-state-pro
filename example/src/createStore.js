import { createProviderAndConnect, createStore } from 'react-state-pro'
import stateConfig from './modules'
const state = createStore(stateConfig)
const context = createProviderAndConnect(state)
const Provider = context.Provider
const connect = context.connect
export { Provider, connect }
