import React from 'react';
import innerCreateProvider from './createProvider';
import innerCreateConnect from './createConnect';
import createStore from './createStore';
function createProviderAndConnect (store) {
    const newContent =  React.createContext({});
    const Provider = innerCreateProvider(newContent.Provider, store);
    const connect = innerCreateConnect(newContent.Consumer);
    return {
        Provider,
        connect
    };
}
export {
    createStore,
    createProviderAndConnect
};