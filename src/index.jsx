import React from 'react'
import {render} from 'react-dom'

import {Provider} from 'react-redux'


//引入样式文件
// import './less/miniui.less'
// import './css/style.css'

//引入action类型常量名
import {RESIZE_TH_WIDTH} from './constants'

//引入store配置
import finalCreateStore from './stores/configureStore'

//引入reducers集合
import reducer from './reducers/index'

console.log("reducer:", reducer)

//引入路由配置
import App from './routes'

//引入Redux调试工具DevTools
import DevTools from './container/DevTools'

//给增强后的store传入reducer
const store = finalCreateStore(reducer)

console.log("state",store);

render(
    <Provider store={store}>
        <div>
            <App />
            <DevTools />
        </div>
    </Provider>,
document.getElementById('webApplication'))

//body事件
document.addEventListener('mousemove', (e) => {

    let state = store.getState()

    //拖动改变表格列宽
    if (state.common.resizeing) {
        const width = state.common.resize_column[state.common.resize_key].width

        //限制表头宽总是 >= 60
        if ((width + e.clientX - state.common.resize_clientX) > 60) {
            state.common.resize_column[state.common.resize_key].width = width + e.clientX - state.common.resize_clientX
            console.log(state.common.resize_clientX, e.clientX, width, width + e.clientX - state.common.resize_clientX)
            store.dispatch({
                type: state.common.resize_path + "_resize_th",
                payload: {
                    column: state.common.resize_column
                }
            })
            store.dispatch({
                type: RESIZE_TH_WIDTH,
                payload: {
                    resize_clientX: e.clientX
                }
            })
        }
    }
})

document.addEventListener('mouseup', (e) => {

    let state = store.getState()

    if (state.common.resizeing) {
        store.dispatch({
            type: RESIZE_TH_WIDTH,
            payload: {
                resizeing: false,
                resize_column: undefined,
                resize_path: undefined,
                resize_key: undefined,
                resize_clientX: undefined
            }
        })
    }
})
