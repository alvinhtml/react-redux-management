import React from 'react'
import {render} from 'react-dom'

import {Provider} from 'react-redux'

//引入样式文件
// import './less/miniui.less'
// import './css/style.css'

//引入Action创建函数
import {makePost} from './actions/actions'

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


//document mousemove 事件
document.addEventListener('mousemove', (e) => {

    //表头宽度调整
    if (window.resize) {
        let {column, element, pageX, width, key, listPath} = window.resize
        if (width + e.pageX - pageX > 60) {
            element.style.width = (width + e.pageX - pageX) + 'px'
        }
    }
})

document.addEventListener('mouseup', (e) => {

    //结束表头宽度调整, 并把调整后的宽 dispatch 到 store
    if (window.resize) {
        let {column, element, key, listPath} = window.resize
        column[key].width = element.offsetWidth
        store.dispatch({
            type: listPath + "_resize_th",
            payload: {
                column: column
            }
        })
        let stores = store.getState()
        makePost('/api/setting/list_configs', {
            listPath: listPath,
            configs: JSON.stringify(stores[listPath].configs)
        })
        window.resize = undefined
    }
})
