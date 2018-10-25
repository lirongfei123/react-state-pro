react-state-pro
### Usage
### 安装
npm install react-state-pro --save
### 运行 example
cd react-state-pro && npm install
cd react-state-pro/example && npm install
npm install global-create-react
npm start
### 编写store配置
```
config['state1'] = export default {
    state: {// 目前支持state必须是一个对象，不支持重新赋值
        count: 0,
        urlParam: null,
    },
    mutations:{
        add(state, data) {
            state.count = data;
        },
        changeUrlParam(state, data) {
            state.urlParam = data;
        }
    },
    actions: {
        async add({commit, store}, {count}) {
            setTimeout(function () {
                commit('state1/add', store.count + count);
            }, 1000);
        },
        async changeUrlParam({commit}, {data}) {
            setTimeout(() => {
                commit('state1/changeUrlParam', data)
            }, 2000);
        } 
    },
}
export default config;
```
### 生成store, 然后传入store, 生成Provider， connect 
```
// 文件: createStore.js 
import { createProviderAndConnect, createStore } from '../../src/index';
import stateConfig from './modules';
const state = createStore(stateConfig);
const context = createProviderAndConnect(state);
const Provider = context.Provider;
const connect = context.connect;
export {Provider, connect};
```
### 首页，以及子组件配置
#### 首页
import { Provider } from './createStore';
```
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
```
#### 子组件
```
import { connect } from './createStore';
export default connect(() => {
    // 类似react-redux的mapStateToProps
})(Component)
```
## API
### createProviderAndConnect
用来生成Provider，以及connect
### createStore
用来生成state
### autoActions
组件默认发起的action，只有action调用commit之后，组件才会被渲染
### requireProps
组件默认的必选参数，参数也可以来自state，当参数不满足要求的时候，会显示tyepError的值
### startRequest
当有默认的autoAction， 请求过程中显示的元素
### typeError
当必选参数不满足要求的时候，显示的元素
### waitRequest
当autoActions有很多个的时候，告诉你目前有那些action正在请求

## state API
### state
默认值，必须是一个对象
### actions
所有的异步操作
### mutations
所有的同步操作，state只有在这里面才会被改变
### dispatch
异步操作触发器
### commit
通过操作触发器，只有在dispatch里面可用
