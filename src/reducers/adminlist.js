//引入action类型常量名
import {
    GET_ADMIN_LIST,
    UPDATE_LIST_CONFIGS,
    CHANGE_LIST_CHECKBOX,
    GET_ADMIN_INFO,
    POST_ADMIN_INFO
} from '../constants'


//初始化状态
const adminlistInitialState = {
    isFetching: 0,
    error: 0,
    message: '',
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
    info: null, //单条管理员信息(用于查看和编辑)
    count: 64, //列表总条数
    //列表配置
    configs:{
        listPath: 'adminlist',
        page: 1, //当前页
        limit: 20, //单页显示条数
        searchMode: 0, //搜索模式
        checkboxs: true, //选择框 0->无, 1->有
        checked: false, //false->无, all->全选, []->单多选
        search: '',
        order: [],
        column: [{
            key: 'id',
            title: '序号',
            order: true,
            visibility: true,
            width: 60,
            resize: 0
        },{
            key: 'name',
            title: '名称',
            order: true,
            visibility: true,
            width: 200,
            resize: 1
        },{
            key: 'email',
            title: '邮箱',
            order: true,
            visibility: false,
            width: 200,
            resize: 1
        },{
            key: 'type',
            title: '类型',
            order: true,
            visibility: false,
            width: 120,
            resize: 0
        },{
            key: 'ouname',
            title: '部门',
            order: true,
            visibility: false,
            width: 200,
            resize: 1
        },{
            key: 'state',
            title: '状态',
            order: true,
            visibility: false,
            width: 200,
            resize: 1
        },{
            key: 'desp',
            title: '描述',
            order: false,
            visibility: true,
            width: 200,
            resize: 0
        }]
    }
}

export function adminlist(state = adminlistInitialState, action) {

    if (action.path !== "adminlist") {
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
        default:
            return {...state}
    }
}
