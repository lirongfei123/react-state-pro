import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Switch, Route, Redirect} from 'react-router';
import createHistory from 'history/createBrowserHistory';
import App from './App';
import Com from './Com';
const history = createHistory();
import { Provider } from './createStore';
ReactDOM.render(
    <Provider>
        <Router history={history}>
            <Switch>
                <Route path="/app/:count" component={App} />
                <Redirect to="/app" />
            </Switch>
        </Router>
    </Provider>,
document.getElementById('app'));