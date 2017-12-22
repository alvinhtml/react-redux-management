//引入action类型常量名
import {
    GET_ADMIN_LIST,
    UPDATE_LIST_CONFIGS
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
    actions: [{
        type: 'link',
        name: '编辑',
        icon: 'icon-note'
    },{
        type: 'button',
        name: '删除',
        icon: 'icon-trash'
    }], //列表单条操作
    //列表配置
    configs:{
        listPath: 'adminlist',
        page: 1, //当前页
        limit: 20, //单页显示条数
        searchMode: 0, //搜索模式
        checkboxs: true, //选择框 0->无, 1->有
        checked: false, //false->无, all->全选, []->单多选
        search: '',
        orderkey: '', //排序字段
        orderby: '', //排序方式
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
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_LIST_CONFIGS:
            let configs = {...state.configs, ...action.payload}
            return {...state, ...{configs}}
        default:
            return {...state}
    }
}
