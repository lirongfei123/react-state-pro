import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Switch, Route, Redirect } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import App from './App'
import { Provider } from './createStore'
const history = createHistory()
ReactDOM.render(
    <Provider>
        <Router history={history}>
            <Switch>
                <Route path="/app" component={App} />
                <Redirect to="/app" />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('app'))
