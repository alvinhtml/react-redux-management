import React from 'react'
import {render} from 'react-dom'

import {Provider} from 'react-redux'


//引入样式文件
// import './less/miniui.less'
// import './css/style.css'

//引入store配置
import finalCreateStore from './stores/configureStore'

//引入reducers集合
import reducer from './reducers/index'

//console.log("reducer:", reducer)

//引入路由配置
import {App} from './routes'

//给增强后的store传入reducer
const store = finalCreateStore(reducer)

console.log("state",store.getState());

render(
    <Provider store={store}>
        <App />
    </Provider>,
document.getElementById('webApplication'))
