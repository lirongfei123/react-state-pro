import React, { Component } from 'react';
import {Route} from 'react-router';
import Com from './Com';
import { connect } from './createStore';
class App extends Component {
  add() {
    this.props.dispatch('state1/add', {
      count: 1
    });
  }
  // 可选：默认请求，只有这个请求完成了，才会渲染此组件
  static autoActions = [
    {
      name: 'state1/add',
      params: {
        count: '{match.params.count}'
      }
    }
  ]
  // 可选
  static startRequest() {
    return <div>可选： 当autoActions 设置的时候，进行请求的时候，组件未被渲染的时候显示的内容</div>
  }
  setUrlParam() {
    this.props.dispatch('state1/changeUrlParam', {
      data: '设置给子组件的值'
    });
  }
  render() {
    return (
      <div className="App">
        <button onClick={this.add.bind(this)}>增加state1</button>
        <button onClick={this.setUrlParam.bind(this)}>设置子组件的值</button>
        <div>state1的值：{this.props.state1.count}</div>
        <Route path="/app/:count/:comId" component={Com}></Route>
      </div>
    );
  }
}

export default connect((state)=>{
  return {
    state1: state.state1,
  }
})(App);
