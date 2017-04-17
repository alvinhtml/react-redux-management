//引入action类型常量名
import {
    ERROR,
    SUCCESS,
    REQUESTPOST,
    RECEIVEPOST,
    REQUESTGET,
    RECEIVEGET
} from '../constants'


//初始化状态
let initialListState = {
    data: 0,
    isFetching: 0,
    error: 0,
    message: ''
}

export function list(state = initialListState, action) {

    //根据不同的action type进行state的更新
    switch (action.type) {
        case REQUESTPOST:
            console.log(action.payload)
            return {...state, ...action.payload}
        case RECEIVEPOST:
            return {...state, ...action.payload}
        default:
            return { ...state }
    }
}
