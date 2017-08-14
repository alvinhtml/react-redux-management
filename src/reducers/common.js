//引入action类型常量名
import {
    POST_LOGIN,
    GET_AUTH_INFO
} from '../constants'


//初始化状态
const commonInitialState = {
    logined: 0,
    renew_csrf_token: 0,
    isFetching: 0,
    error: 0,
    version: '10.0.106',
    logo: 'http://project.xuehtml.com/react-redux/src/images/login-logo.png',
    logoname: "画方科技",
    message: ''
}

export function common(state = commonInitialState, action) {

    //根据不同的action type进行state的更新
    switch (action.type) {
        case POST_LOGIN:
            return {...state, ...action.payload}
        case GET_AUTH_INFO:
            return {...state, ...action.payload}
        default:
            return { ...state }
    }
}
