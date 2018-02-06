//引入action类型常量名
import {

} from '../constants'


//初始化状态
const viewInitialState = {
    isFetching: 0,
    error: 0,
    message: '',
    termview: {}
}

export function view(state = viewInitialState, action) {

    if (action.path !== "view") {
        return state
    }

    //根据不同的action type进行state的更新
    switch (action.type) {
        case 1:
            return {
                ...state,
                ...action.payload
            }
        default:
            return {...state}
    }
}
