import React from 'react'
import {render} from 'react-dom'

import {Provider} from 'react-redux'

import {Router, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

//引入样式文件
// import './less/miniui.less'
// import './css/style.css'



//引入store配置
import finalCreateStore from './stores/configureStore'

//引入Redux调试工具DevTools
import DevTools from './container/DevTools'

//引入reducers集合
import reducer from './reducers/index'

console.log("reducer", reducer)

//引入路由配置
import routes from './routes'



//给增强后的store传入reducer
const store = finalCreateStore(reducer)

console.log("state",store.getState());

//创建一个增强版的history来结合store同步导航事件
const history = syncHistoryWithStore(browserHistory, store)

render(
    <Provider store={store}>
        <div>
            <Router history={history} routes={routes} />
            <DevTools />
        </div>
	</Provider>,
    document.getElementById('webApplication')
)
