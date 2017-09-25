//引入action类型常量名
import {
    GET_ADMIN_LIST
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
    count: 64, //列表总条数
    page: 2, //当前页

    //列表配置
    configs:{
        listPath: 'adminlist',
        limit: 6, //单页显示条数
        searchMode: '精确搜索', //搜索模式
        selectAll: true,
        actions: [],
        column: [{
            key: 'index',
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
            visibility: true,
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
            visibility: true,
            width: 200,
            resize: 0
        },{
            key: 'ip',
            title: '可登录IP',
            order: false,
            visibility: true,
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

export function adminlist(state = adminlistInitialState, action) {

    //根据不同的action type进行state的更新
    switch (action.type) {
        case GET_ADMIN_LIST:
            return {...state, ...action.payload}
        case "MOUSEDOWN":
            return {...state, ...action.payload}
        default:
            return { ...state }
    }
}
