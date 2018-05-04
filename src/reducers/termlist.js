//引入action类型常量名
import {
    UPDATE_LIST_CONFIGS,
    UPDATE_LIST_FILTRATE,
    CHANGE_LIST_CHECKBOX,
    GET_TERM_LIST,
    GET_TERM_INFO,
    POST_TERM_INFO,
    DELETE_TERM,
    UPDATE_TERM_STATE
} from '../constants'


//初始化状态
const termlistInitialState = {
    isFetching: 0,
    error: 0,
    message: '',
    tools: [
        {
            text: '删除',
            icon: 'icon-close'
        }
    ],
    list: [], //列表数据
    info: null, //单条管理员信息(用于查看和编辑)
    count: 0, //列表总条数
    filtrate: {}, //筛选条件 {os: 'window 10'}
    filtrateData: {
        online: [{
            text: '全部',
            value: 'all',
            total: 200,
            color: 'blue'
        },{
            text: '在线',
            value: 'online',
            total: 126,
            color: 'green'
        },{
            text: '离线',
            value: 'unonline',
            total: 74,
            color: 'blue'
        }],
        os: [{
            text: '全部',
            value: 'all',
            total: 200,
            color: 'blue'
        },{
            text: 'window xp',
            value: 'window xp',
            total: 234,
            color: 'blue'
        },{
            text: 'window 7',
            value: 'window 7',
            total: 13,
            color: 'blue'
        },{
            text: 'window 8',
            value: 'window 8',
            total: 2345,
            color: 'blue'
        },{
            text: 'window 10',
            value: 'window 10',
            total: 23,
            color: 'blue'
        },{
            text: 'mac os',
            value: 'mac os',
            total: 23,
            color: 'orange'
        },{
            text: 'ios',
            value: 'ios',
            total: 1272,
            color: 'yellow'
        },{
            text: 'android',
            value: 'android',
            total: 12,
            color: 'yellow'
        }]
    }, //筛选条件下拉选项 {os: [{ text: 'window 10', value: 'window 10', total: 99, color: 'blue' }]}
    //列表配置
    configs:{
        listPath: 'termlist',
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
            key: 'type',
            title: '类型',
            order: true,
            visibility: false,
            width: 120,
            resize: 1
        },{
            key: 'ou',
            title: '部门',
            order: true,
            visibility: false,
            width: 200,
            resize: 1
        },{
            key: 'mac',
            title: 'mac',
            order: true,
            visibility: true,
            width: 200,
            resize: 1
        },{
            key: 'ip',
            title: 'ip',
            order: true,
            visibility: true,
            width: 200,
            resize: 1
        },{
            key: 'hostname',
            title: '主机名',
            order: true,
            visibility: true,
            width: 200,
            resize: 1
        },{
            key: 'os',
            title: '操作系统',
            order: true,
            visibility: true,
            width: 200,
            resize: 1
        },{
            key: 'user',
            title: '用户',
            order: true,
            visibility: true,
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
            resize: 1
        }]
    }
}

export function termlist(state = termlistInitialState, action) {

    if (action.path !== "termlist") {
        return state
    }

    let ids = [], oldlist = []

    //根据不同的action type进行state的更新
    switch (action.type) {
        case GET_TERM_LIST:
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
        case UPDATE_LIST_FILTRATE:
            let filtrate = {...state.filtrate, ...action.payload}
            return {...state, ...{filtrate}}
        case CHANGE_LIST_CHECKBOX:
            let list = [...action.payload]
            return {...state, list:[...list]}
        case GET_TERM_INFO:
            return {...state, info: action.payload.info}
        case POST_TERM_INFO:
            return {...state, ...action.payload}
        case DELETE_TERM:
            ids = action.payload.ids
            oldlist = state.list
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
        case UPDATE_TERM_STATE:
            ids = action.payload.ids
            oldlist = state.list
            if (ids) {
                for (let i = 0; i < ids.length; i++) {
                    for (let k = 0; k < oldlist.length; k++) {
                        if (ids[i] == oldlist[k].id) {
                            oldlist[k].state = action.payload.state
                        }
                    }
                }
            }
            return {...state, ...action.payload, list: [...oldlist]}
        default:
            return {...state}
    }
}
