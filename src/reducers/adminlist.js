//引入action类型常量名
import {
    POST_LOGIN
} from '../constants'


//初始化状态
const adminlistInitialState = {
    isFetching: 0,
    error: 0,
    message: '',
    dropTools: [
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
    count: 0, //列表总条数
    page: 1, //当前页

    //列表配置
    listConfig:{
        tbname: 'admins',
        limit: 20, //单页显示条数
        searchMode: '精确搜索', //搜索模式
        column: [{
            name: 'index',
            title: '序号',
            order: false,
            visibility: true,
            width: 200
        },{
            name: 'name',
            title: '名称',
            order: false,
            visibility: true,
            width: 200
        },{
            name: 'email',
            title: '邮箱',
            order: false,
            visibility: true,
            width: 200
        },{
            name: 'type',
            title: '类型',
            order: false,
            visibility: true,
            width: 200
        },{
            name: 'ouname',
            title: '部门',
            order: false,
            visibility: true,
            width: 200
        },{
            name: 'ip',
            title: '可登录IP',
            order: false,
            visibility: true,
            width: 0
        },{
            name: 'state',
            title: '状态',
            order: false,
            visibility: true,
            width: 200
        },{
            name: 'desp',
            title: '描述',
            order: false,
            visibility: true,
            width: 0
        }]
    }
}

export function adminlist(state = adminlistInitialState, action) {

    //根据不同的action type进行state的更新
    switch (action.type) {
        case GET_ADMIN_LIST:
            return {...state, ...action.payload}
        default:
            return { ...state }
    }
}