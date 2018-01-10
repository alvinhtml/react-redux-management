//引入action类型常量名
import {
    LOGIN,
    LOGOUT,
    GET_AUTH_INFO,
    GET_OU_IN_COMPONENT
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
    message: '',
    ouObjectList: [{
        id: 1,
        name: '根部门',
        path: '/根部门'
    }, {
        id: 2,
        name: '技术部',
        path: '/根部门/技术部'
    }, {
        id: 3,
        name: '销售部',
        path: '/根部门/销售部'
    }],
    adminTypeObjectList: [{
        id: 0,
        name: '超级管理员',
    }, {
        id: 1,
        name: '系统管理员',
    }, {
        id: 2,
        name: '安全管理员',
    }, {
        id: 3,
        name: '审计管理员',
    }],
    typeObjectList: [{
        id: 0,
        name: '台式机'
    }, {
        id: 1,
        name: '服务器'
    }, {
        id: 2,
        name: '笔记机'
    }, {
        id: 3,
        name: '手机'
    }, {
        id: 4,
        name: '平板电脑'
    }, {
        id: 5,
        name: '交换机'
    }, {
        id: 6,
        name: '路由器'
    }, {
        id: 7,
        name: '虚拟机'
    }]
}

export function common(state = commonInitialState, action) {

    if (action.path !== "common") {
        return state
    }

    //根据不同的action type进行state的更新
    switch (action.type) {
        case LOGIN:
            return {...state, ...action.payload}
        case LOGOUT:
            return {...state, ...action.payload}
        case GET_AUTH_INFO:
            return {...state, ...action.payload}
        case GET_OU_IN_COMPONENT:
            return {...state, ...action.payload}
        default:
            return { ...state }
    }
}
