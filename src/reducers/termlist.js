//引入action类型常量名
import {
    GET_ADMIN_LIST,
    UPDATE_LIST_CONFIGS,
    CHANGE_LIST_CHECKBOX
} from '../constants'


//初始化状态
const termlistInitialState = {
    isFetching: 0,
    error: 0,
    message: '',
    statistics:{
        total: 2345,
        online: [{
            number: 1827,
            key: 'online',
            name: '在线'

        }]
    },
    tools: [
        {
            text: '删除',
            icon: 'icon-close'
        },{
            text: '停用',
            icon: 'icon-ban'
        },{
            text: '启用',
            icon: 'icon-check'
        }
    ],
    list: [], //列表数据
    count: 64, //列表总条数
    isCheckAll: false,
    //列表配置
    configs:{
        listPath: 'termlist',
        page: 1, //当前页
        limit: 20, //单页显示条数
        searchMode: '精确搜索', //搜索模式
        checkboxs: true, //选择框 0:无, 1:有
        search: '',
        actions: [],
        column: [{
            key: 'id',
            title: '序号',
            order: 'order',
            visibility: true,
            width: 60,
            resize: 0
        },{
            key: 'name',
            title: '名称',
            order: 'order',
            visibility: true,
            width: 200,
            resize: 1
        },{
            key: 'email',
            title: '邮箱',
            order: 'order',
            visibility: false,
            width: 200,
            resize: 1
        },{
            key: 'type',
            title: '类型',
            order: 'order',
            visibility: false,
            width: 120,
            resize: 0
        },{
            key: 'ouname',
            title: '部门',
            order: 'order',
            visibility: false,
            width: 200,
            resize: 0
        },{
            key: 'ip',
            title: '可登录IP',
            order: false,
            visibility: false,
            width: 0
        },{
            key: 'state',
            title: '状态',
            order: 'order',
            visibility: false,
            width: 200,
            resize: 0
        },{
            key: 'desp',
            title: '描述',
            order: false,
            visibility: true,
            width: 0,
            resize: 0
        }]
    }
}

export function termlist(state = termlistInitialState, action) {

    if (action.path !== "termlist") {
        return state
    }

    //根据不同的action type进行state的更新
    switch (action.type) {
        case GET_ADMIN_LIST:
            action.payload.configs = {
                ...state.configs,
                ...action.payload.configs
            }
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_LIST_CONFIGS:
            let configs = {...state.configs, ...action.payload}
            return {...state, ...{configs}}
        case CHANGE_LIST_CHECKBOX:
            let list = [...action.payload]
            return {...state, list:[...list]}
        case GET_ADMIN_INFO:
            return {...state, info: action.payload.info}
        case POST_ADMIN_INFO:
            return {...state, ...action.payload}
        case DELETE_ADMIN:
            let ids = action.payload.delete
            let oldlist = state.list
            if (ids) {
                for (let i = 0; i < ids.length; i++) {
                    for (let k = 0; k < oldlist.length; k++) {
                        if (ids[i] == oldlist[k].id) {
                            oldlist.splice(k, 1)
                        }
                    }
                }
            }
            return {...state, ...action.payload, list: [...oldlist]}
        default:
            return {...state}
    }
}
