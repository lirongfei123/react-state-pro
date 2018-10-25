// @ts-nocheck
import React, { Component } from 'react';
export default function (Provider, store) {
    class WrapProvider extends Component {
        constructor() {
            super();
            this.state = {
                store: store.getStore(),
                reason: 'init',
            }
            store.subscribe((store, reason) => {
                this.setState({
                    store,
                    reason,
                });
            });
        }
        render() {
            const props = {
                commit: store.commit.bind(store),
                dispatch: store.dispatch.bind(store),
                store: this.state.store,
                state: this.state.store,
                reason: this.state.reason,
            }
            return <Provider value={props}>
                {
                    this.props.children
                }
            </Provider>
        }
    }
    WrapProvider.propTypes = {
        
    };
    return WrapProvider;
}