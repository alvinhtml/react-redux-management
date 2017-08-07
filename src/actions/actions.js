//引入isomorphic-fetch API来进行Ajax
import fetch from 'isomorphic-fetch'

//引入action类型常量名
import {
    ERROR,
    SUCCESS,
    REQUESTPOST,
    RECEIVEPOST,
    REQUESTGET,
    RECEIVEGET,
    POST_LOGIN,
    GET_AUTH_INFO,
    GET_ADMIN_LIST
} from '../constants'

/**
 * json to url
 * @param  {[json]} data json
 * @return {[string]}
 */
function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    return arr.join("&");
}

/**
 * Action Creators 生成器
 * @param  {[type]} type     action.type
 * @param  {[type]} argNames action argument
 * @return {[type]}          action creator
 */
const makeActionCreator = (type, ...argNames) => {
    return function(...args) {
        let action = { type }
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index]
        })
        return action
    }
}



//发起POST请求
export const requestPosts = makeActionCreator(REQUESTPOST, "payload", "path", "error")
//接收POST请求
export const receivePosts = makeActionCreator(RECEIVEPOST, "payload", "path", "error")
//发起GET请求
export const requestGets = makeActionCreator(REQUESTGET, "payload", "path", "error")
//接收GET请求
export const receiveGets = makeActionCreator(RECEIVEGET, "payload", "path", "error")


//异步Action函数创建器 POST请求
const makePostActionCreator = (type, url, ...argNames) => {

    return (...args) => (dispatch, getState) => {
        let [body, path, error] = [...args]

        //第一次dispatch, 表示将要发起fetch，Action创建函数会更新对应的isFetching为true
        dispatch({
            type: type,
            payload: {
                isFetching: true,
            },
            path: path
        });

        //发起fetch请求
        return fetch(url, {
            method: "POST",
            //请求带上cookie
            credentials: 'include',
            headers: {
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': window.Laravel.csrfToken
            },
            body: JSON.stringify({_token: window.Laravel.csrfToken, ...body})
        })

        //判断HTTP请求结果，200-299 表示请求成功
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response
            } else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        })

        //生成JSON.parse(responseText)的结果
        .then(response => response.json())

        //获取并处理请求结果
        .then(json => {
            console.log("then json")
            return dispatch({
                type: type,
                path: path,
                payload: {
                    isFetching: false,
                    ...json
                }
            })
        })

        //处理请求错误
        .catch(error => {
            //
        })
    }
}

//异步Action函数创建器 GET请求
const makeGetActionCreator = (type, url, ...argNames) => {

    return (...args) => (dispatch, getState) => {
        let [body, path, error] = [...args]

        //第一次dispatch, 表示将要发起fetch，Action创建函数会更新对应的isFetching为true
        dispatch({
            type: type,
            payload: {
                isFetching: true,
            },
            path: path
        });

        //将json参数转为url参数
        let urlParams = body ? formatParams(body) : '';

        //发起fetch请求
        return fetch(url + '?' + urlParams, {
            method: "GET",
            //请求带上cookie
            credentials: 'include',
            headers: {
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': window.Laravel.csrfToken
            }
        })

        //判断HTTP请求结果，200-299 表示请求成功
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response
            } else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        })

        //生成JSON.parse(responseText)的结果
        .then(response => response.json())

        //获取并处理请求结果
        .then(json => {
            console.log("then json")
            return dispatch({
                type: type,
                path: path,
                payload: {
                    isFetching: false,
                    ...json
                }
            })
        })

        //处理请求错误
        .catch(error => {
            //
        })
    }
}

//feps(body, payload, path)


//发送登录请求
export const loginFetch = makePostActionCreator(POST_LOGIN, '/api/admin/login', 'body', 'path', 'error')
//退出登录
export const logoutFetch = makeGetActionCreator(POST_LOGIN, '/api/admin/logout' , 'path', 'error')



//获取认证信息
export const authInfo = makeGetActionCreator(GET_AUTH_INFO, '/api/authinfo', 'path', 'error')

console.log('loginFetch', loginFetch)
