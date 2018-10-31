import React, { Component } from 'react'
import { Route } from 'react-router'
import Com from './Com'
import { connect } from './createStore'
class App extends Component {
    add () {
        this.props.dispatch('state1/add')
    }
    reduce () {
        this.props.dispatch('state2/reduce')
    }
    render () {
        return (
            <div className="App">
                <button onClick={this.add.bind(this)}>增加state1</button>
                <button onClick={this.add.bind(this)}>增加state1</button>
                <div>state1的值：{this.props.state1.count}</div>
                <div>state2的值：{this.props.state2.count}</div>
                <Route path="/app/component/:count" component={Com} />
            </div>
        )
    }
}
export default connect((state) => {
    return {
        state1: state.state1,
        state2: state.state2
    }
})(App)
