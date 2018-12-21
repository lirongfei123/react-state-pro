/* eslint-disable */
import React, { Component } from 'react';
import PropChecks from 'prop-checks';
const diff = require('deep-diff');
function extendWithDefined(oldObj, newObj) {
    Object.keys(newObj).forEach((key) => {
        if (typeof newObj[key] !== 'undefined') {
            oldObj[key] = newObj[key];
        }
    });
    return oldObj;
}
export default function (Consumer) {
    return function (mapStateToProps) {
        return function (App) {
            const preset = extendWithDefined({
                startRequest: function () {
                    return <div>开始请求</div>
                },
                waitRequest: function (waitRequests) {
                    return <div>还在请求{waitRequests.join(', ')}</div>
                },
                typeError: function (messages) {
                    return <div>
                        因为类型{messages.join(',')}不满足要求，无法进行渲染</div>
                },
            }, {
                startRequest: App.startRequest,
                waitRequest: App.waitRequest,
                typeError: App.typeError,
                autoActions: App.autoActions,
                requireProps: App.requireProps,
            });
            if (preset.autoActions) {
                preset.autoActions = preset.autoActions.map((action) => {
                    if (typeof action === 'string') {
                        return {
                            name: action,
                            message: action
                        }
                    }
                    return action;
                });
            }
            class ConnectComponent extends Component {
                constructor () {
                    super();
                    if (preset.autoActions) {
                        this.requested = false;
                    }
                }
                baseGet(object, path) {
                    path = path.split('.');
                    let index = 0
                    const length = path.length
                    while (object != null && index < length) {
                        object = object[path[index++]]
                    }
                    return (index && index == length) ? object : undefined
                }
                requested = true
                willRequestAction = new Set();
                oldRequestParams = {};
                handleParams(params, props) {
                    props = this.fillProps(props);
                    const reg = /^\{(.*)\}$/;
                    if (params) {
                        const newParams = {};
                        Object.keys(params).forEach((path) => {
                            const result = reg.exec(params[path]);
                            if (result) {
                                newParams[path] = this.baseGet(props, result[1]);
                            } else {
                                newParams[path] = params[path];
                            }
                        })
                        return newParams;
                    }
                    return params;
                }
                componentWillReceiveProps(props) {
                    let ok = diff(props, this.props);
                    const willRequestActions = [];
                    Object.keys(this.oldRequestParams).forEach((actionName) => {
                        const actionParams = this.oldRequestParams[actionName];
                        const newParamValue = this.handleParams(actionParams[0], props);
                        if (diff(newParamValue, actionParams[1])) {
                            willRequestActions.push(actionName);
                        }
                    });
                    if (preset.requireProps && this.store && (ok || willRequestActions.length)) {
                        // 对props做处理
                        willRequestActions.forEach((actionName) => {
                            const params = this.handleParams(this.oldRequestParams[actionName][0], props);
                            this.oldRequestParams[actionName] = [this.oldRequestParams[actionName][0], params];
                            this.store.dispatch(actionName, params);
                        });
                    }
                }
                setStore(store) {
                    this.store = store;
                }
                fillProps(props) {
                    let newProps = {};
                    if (this.props.location) {
                        const search = this.props.location.search;
                        if (search.trim() !== '') {
                            const searchObj = search.substring('1').split('&');
                            searchObj.forEach((value) => {
                                const temp = value.split('=');
                                newProps[temp[0]] = temp[1];
                            })
                        }
                    }
                    if (this.props.match) {
                        newProps = {
                            ...newProps,
                            ...this.props.match.params
                        }
                    }
                    return {
                        ...newProps,
                        ...props,
                    };
                }
                render() {
                    return <Consumer>
                        {
                            (store) => {
                                this.setStore(store);
                                if (!this.requested) {
                                    preset.autoActions.forEach((action) => {
                                        const params = this.handleParams(action.params, this.props);
                                        this.oldRequestParams[action.name] = [action.params, params];
                                        store.dispatch(action.name, params);
                                        this.willRequestAction.add(action.name);
                                    })
                                    this.requested = true;
                                    return preset.startRequest();
                                } else if (this.willRequestAction.size > 0) {
                                    this.willRequestAction.delete(store.reason)
                                    if (this.willRequestAction.size !== 0) {
                                        return preset.waitRequest([...this.willRequestAction]);
                                    }
                                }
                                const newProps = mapStateToProps(store.store);
                                const result = {
                                    ...this.fillProps(this.props),
                                    ...newProps,
                                    dispatch: store.dispatch,
                                    commit: store.commit
                                }
                                if (preset.requireProps) {
                                    const checkResults = PropChecks.checkPropTypes(preset.requireProps, result, 'prop', App.name);
                                    if (checkResults.length > 0) {
                                        const messages = [];
                                        checkResults.forEach((type) => {
                                            messages.push(type.name);
                                        });
                                        return preset.typeError(messages);
                                    }
                                }
                                return <App {...result}></App>;
                            }
                        }
                    </Consumer>
                }
            }
            return ConnectComponent;
        }
    }
}