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

//引入 Query
import Query from './tools/query.js'


//定义两个全局变量用来存放列表拖动时的信息
const resize = {
    resizeing: false
}
const remove = {
    moving: false
}
export {resize, remove}

const colmove = function (index) {
    let tds = Query("#olist_table tr td:nth-child(" + index + ")")
    tds.addClass("moving")
    return 1
}

//document mousemove 事件
document.addEventListener('mousemove', (e) => {

    //表头宽度调整
    if (resize && resize.resizeing) {
        let {event, configs, pageX, element, width, index} = resize
        let {column, listPath} = configs

        if (width + e.pageX - pageX > 60) {
            element.style.width = (width + e.pageX - pageX) + 'px'
        }
        console.log("resize", resize);
    }

    //表格拖动
    if (remove && remove.moving) {

        let {event, configs, pageX, mirrorArr, mirror, position, width, index, mouseOffsetLeft} = remove
        let {column, listPath} = configs

        //鼠标向对于按下时在X轴上移动的距离
        let moveX = e.pageX - pageX


        mirror.style.top = position.top + 'px'
        mirror.style.left = e.pageX - mouseOffsetLeft + 'px'

        //mirrorArr[index].position.left = position.left + moveX

        let orientation = moveX > 0 ? 1 : -1
        //console.log(mirrorArr[index + orientation]);
        if (Math.abs(moveX) > mirrorArr[index + orientation].width / 2) {

            mirrorArr[index + orientation].mirror.style.left = mirrorArr[index].position.left + 'px'

            let left = mirrorArr[index + orientation].position.left

            mirrorArr[index + orientation].position.left = mirrorArr[index].position.left

            mirrorArr[index].position.left = left

            remove.index = index + orientation
            remove.pageX = e.pageX
            remove.position.left = left

            mirrorArr.splice(index, 0, mirrorArr.splice(index + orientation, 1)[0])

            console.log("mirrorArr", mirrorArr)

        }


        // for (let i = 0; i < mirrorArr.length; i++) {
        //
        //
        //
        //
        //     // console.log("i index",i, index, moveToX, mirrorArr[i].position.left + mirrorArr[i].width / 2)
        //     //
        //     // if (moveToX > mirrorArr[i].position.left + mirrorArr[i].width / 2) {
        //     //     console.log(mirrorArr[i].mirror, mirrorArr[i].position.left , mirrorArr[index].position.left)
        //     //     mirrorArr[i].mirror.style.left = mirrorArr[index].position.left + 'px'
        //     //     // mirrorArr[i].position.left = mirror.position.left
        //     //     // mirrorArr[i].position.left = mirror.position.left
        //     // }
        // }




        // let moveToX;
        // if (moveX > 0) {
        //
        //     moveToX = position.left + width + moveX
        //
        //     console.log(position.left, width , moveX)
        //
        //     for (let i = mirrorArr.length; i--;) {
        //
        //         console.log("i index",i, index, moveToX, mirrorArr[i].position.left + mirrorArr[i].width / 2)
        //
        //         if (i == index) {
        //             break;
        //         }
        //
        //         if (moveToX > mirrorArr[i].position.left + mirrorArr[i].width / 2) {
        //             console.log(mirrorArr[i].mirror, mirrorArr[i].position.left , mirrorArr[index].position.left)
        //             mirrorArr[i].mirror.style.left = mirrorArr[index].position.left + 'px'
        //             // mirrorArr[i].position.left = mirror.position.left
        //             // mirrorArr[i].position.left = mirror.position.left
        //         }
        //     }
        //
        //
        // } else if (moveX < 0)  {
        //     moveToX = position.left + moveX
        // }




        //console.log("remove", position.left + (e.pageX - pageX))
    }
})
document.addEventListener('mouseup', (e) => {
    if (resize && resize.resizeing) {
        let {event, configs, pageX, element, width, index} = resize
        let {column, listPath} = configs

        column[index].width = element.offsetWidth

        //更新store中的数据
        store.dispatch({
            type: listPath + "resize",
            payload: {
                column: column
            }
        })

        //更新数据库中的数据
        makePost('/api/setting/list_configs', {
            listPath: listPath,
            configs: JSON.stringify(configs)
        })

        resize.resizeing = false
    }

})
