//引入action类型常量名
import {
    GET_ADMIN_LIST,
    UPDATE_LIST_CONFIGS,
    CHANGE_LIST_CHECKBOX
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
    //列表配置
    configs:{
        listPath: 'adminlist',
        page: 1, //当前页
        limit: 20, //单页显示条数
        searchMode: 0, //搜索模式
        checkboxs: true, //选择框 0->无, 1->有
        checked: false, //false->无, all->全选, []->单多选
        search: '',
        actions: [], //列表单条操作
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
            order: true,
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

    let configs

    //根据不同的action type进行state的更新
    switch (action.type) {
        case GET_ADMIN_LIST:
            return {
                ...state,
                ...action.payload
            }
        case 'adminlist_resize_th':
            configs = {...state.configs, ...action.payload}
            return {...state, ...{configs}}
        case UPDATE_LIST_CONFIGS:
            configs = {...state.configs, ...action.payload}
            return {...state, ...{configs}}
        case CHANGE_LIST_CHECKBOX:
            if (action.path === "adminlist") {
                if (action.payload.hasOwnProperty("isCheckAll")) {
                    //参数为全选的时候
                    var list = [];
                    for (let v of state.list) {
                        v.checked = action.payload.isCheckAll
                    }
                    return {...state, ...action.payload}
                } else {
                    //参数为单选的时候
                    let isCheckAll = true
                    for (let v of state.list) {
                        if (action.payload.id == v.id) {
                            v.checked = action.payload.checked
                        }
                        //只要有一个复选框为 false, 全选复选框就会为 false
                        console.log(v.id, v.checked)
                        if (v.checked === false || v.checked === undefined) {
                            isCheckAll = false
                        }
                    }
                    return {...state, ...{list:[...state.list]}, ...{isCheckAll}}
                }
            }
            configs = {...state.configs, ...action.payload}
            return {...state, ...{configs}}
        default:
            return {...state}
    }
}
